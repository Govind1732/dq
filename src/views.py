import json
import mimetypes
import os
import re
from .forms import SearchForm
from django.conf import settings
from django.shortcuts import render
from django.http import Http404, HttpResponse, JsonResponse
from google.cloud import bigquery
from django.views import View
from httpx import HTTPError
import pandas as pd
import pandas_gbq
import requests
from configparser import ConfigParser
import google
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timedelta
import sys
from sqlalchemy import text
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from ml_profiler import auto_profile_ml
import threading
from rest_framework.decorators import api_view

# Create your views here.
def home(request):
    return render(request, 'selfserve_2_home.html')

def table_repo(request):
    return render(request, 'table_repo.html')

def table_repo_second_form(request):
    return render(request, "table_repo_second_form.html")

def ml_profiler_config_form(request):
    return render(request, "ml_profiler_config_form.html")

class FetchDatabasesView(View):
    def __init__(self):
        __path=os.path.join(settings.BASE_DIR,'config','config.ini')

        self.config =ConfigParser()
        self.config.read(filenames=__path)

        #getting dataset credentials config.json
        self.dq_sa_json_file = self.config.get('dir','dq_sa_path')

        # Set Credentials
        http_proxy = self.config.get('proxy','http_proxy')
        https_proxy = self.config.get('proxy','https_proxy')
        no_proxy = self.config.get('proxy','no_proxy')

        self.proxies = {
                "http_proxy": 'http://proxy.ebiz.verizon.com:80/',
                "https_proxy": 'http://proxy.ebiz.verizon.com:80/',
                "no_proxy": 'http://proxy.ebiz.verizon.com:80/'
    }

        # os.environ['http_proxy'] = 'http://proxy.ebiz.verizon.com:80/'
        # os.environ['https_proxy'] = 'http://proxy.ebiz.verizon.com:80/'
        # os.environ['no_proxy'] = 'http://proxy.ebiz.verizon.com:80/'
        #Setting GCP Credentials
        self.dq_client_id = self.config.get('gcp','client_id')
        self.dq_client_secret = self.config.get('gcp','client_secret')
        self.dq_project_id = self.config.get('gcp','project_id')
        self.dq_dataset = self.config.get('gcp','db_name')
        self.url = self.config.get('gcp','token_url')
        #TeraData Connection Details
        # self.uid = self.config.get('td','uid')
        # self.pwd = self.config.get('td','pwd')
        # self.hostname = self.config.get('td','hostname')
        # self.td_dbname = self.config.get('td','td_dbname')

    def exchange_and_save_oidc_token_for_jwt(self,client_id,client_secret) -> None:
        print(f'Retrieving JWT from OIDC provider...')
        payload = {"grant_type": "client_credentials", "client_id": client_id,"client_secret": client_secret, "scope": "read"}
        try:
            response = requests.post(url=self.url, params=payload,proxies=self.proxies)
            response.raise_for_status()
            token = response.json()
            print(f"Saving token...")
            # Serializing json
            oidc_token_file_name = "oidc_token.json"
            if os.path.isfile(oidc_token_file_name):
                os.remove(oidc_token_file_name)
                # time.sleep(15)

            print(f"path: {oidc_token_file_name}")
            with open(oidc_token_file_name, "w") as f:
                json.dump(token, f)
        except HTTPError as e:
            raise e

    def dq_bigquery_client(self):
        self.exchange_and_save_oidc_token_for_jwt(self.dq_client_id,self.dq_client_secret)
        print(f"Setting environment variable...")
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = self.dq_sa_json_file
        os.environ["GOOGLE_CLOUD_PROJECT"] = self.dq_project_id
        self.credentials, _ = google.auth.default()
        print(f"project_id={self.dq_project_id}, credentials={self.credentials}")
        self.client = bigquery.Client(credentials=self.credentials, project=self.dq_project_id)
        return self.client, self.credentials
    
    def td_client(self):
        try:
            self.td_engine = create_engine(f"teradatasql://{self.uid}:{self.pwd}@{self.hostname}/{self.td_dbname}?encryptdata=true")
            self.td_conn = self.td_engine.connect()
            return self.td_engine, self.td_conn
        except Exception as e:
            print(f"Teradata Connection Error. Error:{e}")
    
    def db_conn_td(self, uid: str, pwd: str, hostname: str, db_name: str, connection_str: str, section: str, driver: str):
        print(f"encrypted_connection_string_section db_name: '{db_name}', section: '{section}'")
        print(connection_str)
        # db_str = connection_str.format(driver, uid, pwd, hostname, db_name)
        db_str = connection_str.replace('{driver}', driver).replace('{conn_user_id}', uid).replace('{conn_password}', pwd)     .replace('{server_name}', hostname).replace('{db_name}', db_name)
        print(db_str)
        db_engine = create_engine(db_str)
        session = sessionmaker(bind=db_engine)
        session()
        engine = db_engine
        conn = engine.connect()
        return conn
    
    def td_db_access(self):
        try:
            user_id = self.config.get('td', 'uid')
            user_pwd = self.config.get('td', 'pwd')
            server_name = self.config.get('td', 'hostname')
            db_name = self.config.get('td', 'td_dbname')
            connection_str = self.config.get('td', 'connection_str')
            driver = self.config.get('td', 'DRIVER_NAME')
            print(driver, connection_str)
            db_obj = self.db_conn_td(user_id, user_pwd, server_name, db_name, connection_str, 'TD - Autoprofile', driver)
            print("db object", db_obj)
            return db_obj
        except Exception as e:
            print(f'Error while trying to create Teradata DB Object : {e}')

    def validate_td_tables(self, db_name, table_name):
            verify_query = f"select top 1 * from {db_name}.{table_name}"
            print(verify_query)
            print("query",verify_query)
            try:
                # GET DB OBJ
                db_obj = self.td_db_access()
                res_df = pd.read_sql(verify_query, db_obj)
                print("response df", res_df)
                if len(res_df) > 0:
                    print(f"Given Input table has records")
                    return 1
            except Exception as e:
                print(f'Exception occured while accessing table, Error message : {e}')
            return 0

    def validate_bq_tables(self, project_id, db_name, table_name):
        verify_query = f"select count(*) from {project_id}.{db_name}.{table_name}"
        print(verify_query)
        try:
            self.dq_bigquery_client()
            res_df = self.client.query(verify_query).to_dataframe()
            if len(res_df) > 0:
                print(f"Given Input table has records")
                return 1
        except Exception as e:
            print(f'Exception occured while accessing table, Error message : {e}')
        return 0

    def verify_table_history(self, db_type, project_id, db_name, table_name):
        table_status = self.dq_project_id+ "." +r"dga_dq_tbls.dqaas_tbl_properties"
        query = ""
        if db_type == 'GCP':
            query = f"""select 1 as STATUS from {table_status} where 
                SRC_TBL = '{table_name}' and DB_NAME = '{db_name}' and project_id = '{project_id}'"""
            print("BQ status query", query)
        elif db_type == 'TD':
            query = f"""select 1 as STATUS from {table_status} where 
                            SRC_TBL = '{table_name}' and DB_NAME = '{db_name}'"""
            print("TD status query", query)
        try:
            # df_res = bq_client.execute_query(query).to_dataframe()
            self.dq_bigquery_client()
            df_res = self.client.query(query).to_dataframe()
            if len(df_res) > 0:
                # df_status = df_res[["STATUS"]]
                # if df_status == 1:
                #     print(f'Table has access to the Input Table : {table_name}')
                return 1
            else:
                print('No data available')
                return 0
        except Exception as e:
            print(f'Error while verifying the connection between given table from dqaas environment: {e}')
            return 0

    def insert_tbl_prop(self,project_id,db_name,table_name):
        try:
            insert_query = f"INSERT INTO `{self.dq_project_id}.dga_dq_tbls.dqaas_tbl_properties` (DB_NAME,SRC_TBL,project_id,entry_made_ts,update_made_ts) VALUES ('{project_id}.{db_name}','{table_name}','{project_id}',current_timestamp(),current_timestamp())"
            print(insert_query)
            self.dq_bigquery_client()
            insert_job = self.client.query(insert_query)
            insert_job.result()
        except Exception as e:
            print(f'Error while inserting into table properties: {e}')
        
    def validate_table(self, db_type, project_id, db_name, table_name):
        print(f'User DB Inputs for verify: {table_name}')
        res_v=0
        if table_name:
            if db_type.upper() == "GCP":
                res_v = self.validate_bq_tables( project_id, db_name, table_name)
                if res_v == 0:
                    print(f"Table({table_name}) dont have access from DQAAS Server") # just msg.
                    return f"Table({table_name}) dont have access from DQAAS Server"
                elif res_v == 1:
                    print(f'Table({table_name}) has access from the DQAAS environment')  # insert statement
                    #self.insert_tbl_prop(project_id,db_name,table_name)
                    return f'Table({table_name}) has access from the DQAAS environment'
            elif db_type.upper() == "TD":
                res_v = self.validate_td_tables(db_name=db_name, table_name=table_name)
                if res_v == 0:
                    print(f"Table({table_name}) dont have access from DQAAS Server")
                    return f"Table({table_name}) dont have access from DQAAS Server"
                elif res_v == 1:
                    print(f'Table({table_name}) has access from the DQAAS environment')
                    #self.insert_tbl_prop(project_id,db_name,table_name)
                    return f"Table({table_name}) has access from the DQAAS environment"

@method_decorator(csrf_exempt, name='dispatch')   
class UIFetch(FetchDatabasesView,View):
    
    def post(self, request,*args, **kwargs):
        try:
            ip_db_type = request.POST.get("data_source")
            ip_project_id = request.POST.get("project_name")
            ip_db_name = request.POST.get("dbname")
            ip_table_name = request.POST.get("table_name")
            print(request.POST)
            print(settings.BASE_DIR)
            
            
            # bq_client = self.dq_bigquery_client()
            # Table validation
            response = self.validate_table(db_type=ip_db_type, project_id=ip_project_id, db_name=ip_db_name,
                                    table_name=ip_table_name)
            print("Output response:",response)
            if "has access" in str(response):
                results = False
            elif "dont has access" in str(response):
                results = True
            else:
                results = "None"
            print(results)
            combination_exists = bool(results)
            response_data = {
                        'combination_exists' : combination_exists,
                        'message': 'Do not have access.' if combination_exists else 'Access is Available. Please input further details to insert a new record'
                    }
            print("Output response2:",response_data)
            return JsonResponse(response_data)
        except Exception as e:
            return JsonResponse({'error':str(e)})

# functionalities regarding profiler config page. Will fetch project,db and table from table properties table.
class FetchRanProjectView(FetchDatabasesView,View):
    def get(self, request,*args, **kwargs):
        
        print("fetching list of projects in dtran mtd ")
        query = f"SELECT distinct(project_id) FROM `{self.dq_project_id}.dga_dq_tbls.dqaas_tbl_properties` where db_name like '%.%'"  #Fetching only GCP projects
        print("query" , query)
        self.dq_bigquery_client()
        query_job = self.client.query(query)
        results = query_job.result()
        projects = [row.project_id for row in results]   
        print(projects)
        return JsonResponse({'projects':projects})
    
class FetchRanDatabaseView(FetchDatabasesView,View):
    def get(self, request,*args, **kwargs):
        print("fetching list of databases in dtran mtd ")
        project = request.GET.get("project")
        request.session["project"] = project
        if project:
            query = f"SELECT distinct(db_name) FROM `{self.dq_project_id}.dga_dq_tbls.dqaas_tbl_properties` where project_id='{project}'"
        else:
            query = f"SELECT distinct(db_name) FROM `{self.dq_project_id}.dga_dq_tbls.dqaas_tbl_properties` where db_name not like '%.%'"
        print("query" , query)
        self.dq_bigquery_client()
        query_job = self.client.query(query)
        results = query_job.result()
        databases = [row.db_name for row in results]   
        print(databases)
        return JsonResponse({'databases':databases})
    
class FetchRanTableView(FetchDatabasesView,View):
    def get(self, request,*args, **kwargs):
        print("fetching list of tables in dtran mtd ")
        project = request.session.get("project")
        database = request.GET.get("database")
        request.session["database"] = database
        query = f"SELECT distinct(SRC_TBL) FROM `{self.dq_project_id}.dga_dq_tbls.dqaas_tbl_properties`  where db_name = '{database}'"
        print("query" , query)
        self.dq_bigquery_client()
        query_job = self.client.query(query)
        results = query_job.result()
        print("results table", results)
        tables = [row.SRC_TBL for row in results]   
        print(tables)
        return JsonResponse({'tables':tables})

# ML PROFILER CONFIG STARTS FROM HERE
class MLProfiler(FetchDatabasesView,View):
    def post(self, request, *args, **kwargs):
        try:
            print("Request Submitted")
            if request.method == 'POST':
                print("******** ML Profiler Invoked******")
                if request.content_type == 'application/json':
                    data = json.loads(request.body.decode('utf-8'))
                    print(data)
                else:
                    data = request.POST
                    print(data)
                project =  data.get("project_name")
                data_source = data.get("data_source")
                DB_NAME = data.get("dbname")
                TBL_NAME = data.get("table_name")
                INCR_COL = data.get('incr_col')
                INCR_COND = data.get('incr_cond')
                EMAIL_DISTRO = data.get('email')
                EMAIL_DISTRO_VARIABLE = EMAIL_DISTRO
                project_sql = f"{project}.{DB_NAME}" if data_source in ['BQ','GCP'] else DB_NAME
                print("Inputs Received from User :: ",data_source,DB_NAME,TBL_NAME,INCR_COL,INCR_COND,EMAIL_DISTRO)
                query = f"select DISTINCT * from `{self.dq_project_id}.dga_dq_tbls.dqaas_ml_auto_prfl_mtd` where DB_NAME = '{project_sql}' AND SRC_TBL = '{TBL_NAME}' "
                print(query)
                self.dq_bigquery_client()
                query_job_here = self.client.query(query)
                results = list(query_job_here.result())
                if not results:
                    print("no records,inserting the record")
                    max_sequence_query = f"SELECT MAX(PRFL_TBL_ID) as max_sequence FROM `{self.dq_project_id}.dga_dq_tbls.dqaas_ml_auto_prfl_mtd`"
                    self.dq_bigquery_client()
                    max_sequence_query_job = self.client.query(max_sequence_query)
                    max_sequence_result = max_sequence_query_job.result()
                    max_sequence = list(max_sequence_result)[0]['max_sequence']
                    new_sequence = max_sequence + 1 if max_sequence is not None else 1
                    print(new_sequence)
                    insert_query = f"""
                    INSERT INTO `{self.dq_project_id}.dga_dq_tbls.dqaas_ml_auto_prfl_mtd` 
                    (PRFL_TBL_ID,DB_NAME,SRC_TBL,INCR_DT_COL,INCR_DT_COND,DATA_SRC,IS_ACTIVE_FLG,UPDATE_MADE_TS,ENTRY_MADE_TS) VALUES 
                    ({new_sequence},'{project_sql}','{TBL_NAME}',{'NULL' if INCR_COL is None else f"'{INCR_COL}'"},
                    {0 if not INCR_COND else INCR_COND},'{data_source}','Y',current_timestamp(),current_timestamp())"""
                    print(insert_query)
                    self.dq_bigquery_client()
                    insert_job = self.client.query(insert_query)
                    insert_job.result()
                else:
                    print("records exist in dqaas_ml_auto_prfl_mtd")

                #API call to trigger ML profiler        
                ml_request = {"DATA_SRC": data_source,
                              "DB_NAME": project_sql,
                              "SRC_TBL": TBL_NAME,
                              "INCR_DT_COL": INCR_COL,
                              "INCR_DT_COND": INCR_COND,
                              "EMAIL_DISTRO": EMAIL_DISTRO
                }
                t = threading.Thread(target=auto_profile_ml.adhoc_ml_auto_profile_request,args=(ml_request,))
                t.daemon = True
                t.start()
                
                return JsonResponse({'status':'success','message':'ML Profiler Triggered, Report will send through Email Notification'}, safe=False)
            else:
                response_data = {'status':'error', 'message':'only supports POST Method'}
        except Exception as e:
            response_data = {'status':'error', 'message':str(e)}

        return JsonResponse(response_data, safe=False)
    


def search_reports(request):
    pattern = r'^([^_]+(?:_[^_]+)*)_[^_]+'
    filenames = []
    dbname = ''
    table_name = ''
    file_dbname = ''
    no_match_message = ''
    if request.method == 'POST':
        form = SearchForm(request.POST)
        if form.is_valid():
            data_source = form.cleaned_data.get('data_source', '')
            dbname = form.cleaned_data.get('dbname', '')
            table_name = form.cleaned_data.get('table_name', '')
            date = form.cleaned_data.get('date', None)
            print("data source", data_source)
            start_datetime = None
            end_datetime = None 
            if date:
                start_datetime = datetime.combine(date, datetime.min.time()) 
                end_datetime = datetime.combine(date, datetime.max.time())
            print(dbname, table_name, date)
            media_folder = os.path.join(settings.BASE_DIR, 'ml_profiler/result_dir')
            for filename in os.listdir(media_folder):
                if filename.endswith(".html"):
                    file_datetime_str = filename.split('_')[-1].split('.')[0]
                    filedatetime = datetime.strptime(file_datetime_str, '%Y-%m-%d-%H-%M-%S')
                    file_tbl_name_with_date = filename.split('.')[1]
                    match = re.search(pattern, file_tbl_name_with_date)
                    file_tbl_name = match.group(1)
                    file_dbname_with_source = filename.split('.')[0]
                    file_dbname = file_dbname_with_source.split('_')
                    file_dbname = '_'.join(file_dbname[1:])
                    
                    if (
                        (not data_source or file_dbname_with_source.startswith(data_source)) and
                        (not dbname or file_dbname == dbname) and
                        (not table_name or table_name in  file_tbl_name) and
                        (start_datetime is None or end_datetime is None or start_datetime <= filedatetime <= end_datetime) 
                    ):
                        filenames.append(filename)
            if not filenames:
                no_match_message = f"No such combination or files exist"
            # return render(request,'report_template.html', {'reports':reports})
    else:
        form = SearchForm()
    return render(request, 'search_form.html', {'form':form, 'filenames':filenames, 'dbname':dbname, 'table_name':table_name, 'no_match_message':no_match_message})


def download_html(request, filename):
    file_path = os.path.join(settings.MEDIA_ROOT, filename)
    if os.path.exists(file_path):
        with open(file_path, 'rb') as file:
            response = HttpResponse(file.read())
            content_type, encoding = mimetypes.guess_type(file_path)
            response['Content-Type'] = content_type
            response['Content-Disposition'] = f'attachment; filename="{filename}"'
            return response
    else:
        raise Http404("File not found")
        
@method_decorator(csrf_exempt, name='dispatch') 
class AutoPopulateColumns(FetchDatabasesView,View):
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            if request.content_type == 'application/json':
                data = json.loads(request.body.decode('utf-8'))
                print(data)
            else:
                data = request.POST
                print(data)
            project =  data.get("project_name")
            data_source = data.get("data_source")
            DB_NAME = data.get("dbname")
            TBL_NAME = data.get("table_name")
            project_sql = f"{project}.{DB_NAME}" if data_source in ['BQ','GCP'] else DB_NAME
            query = f"select INCR_DT_COL,INCR_DT_COND from `{self.dq_project_id}.dga_dq_tbls.dqaas_ml_auto_prfl_mtd` where DB_NAME = '{project_sql}' AND SRC_TBL = '{TBL_NAME}' AND IS_ACTIVE_FLG = 'Y'"
            print(query)
            self.dq_bigquery_client()
            try:
                query_job = self.client.query(query)
                results = [dict(row) for row in query_job]
                if results:
                    return JsonResponse(results[0])
                else:                    
                    return JsonResponse({}, status = 204)
            except Exception as e:
                return JsonResponse({'error': str(e)})
    
    

    
