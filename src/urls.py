urlpatterns = [
    path('', views.home, name='selfserve_2_home'),
    path('fetch_ran_projects/', FetchRanProjectView.as_view(), name='fetch_ran_projects'),
    path('fetch_ran_databases/', FetchRanDatabaseView.as_view(), name='fetch_ran_databases'),
    path('fetch_ran_tables/', FetchRanTableView.as_view(), name='fetch_ran_tables'),
    path('dispatch_MLProfile_data/', MLProfiler.as_view(), name='dispatch_MLProfile_data'),

    path('table_repo/', views.table_repo, name='table_repo'),
    path('table_repo/ui_fetch/', UIFetch.as_view(), name='table_repo/ui_fetch'),
    path('table_repo/table_repo_second_form/', views.table_repo_second_form, name='table_repo/table_repo_second_form'),
    path('ml_profiler_config_form/', views.ml_profiler_config_form, name='self_serve2/ml_profiler_config_form'),
    # path('table_repo/table_repo_second_form/save_table_form/', UISave.as_view(), name='table_repo/table_repo_second_form/save_table_form/'),
    # path('table_repo/table_repo_second_form/configure_rule_home/', views.configure_rule_home, name='configure_rule_home'),
    path('search/', views.search_reports, name= 'search_reports'),
    path('download/<str:filename>/', views.download_html, name= 'download_html'),
    path('ml_profiler_config_form/autopopulate_columns/', AutoPopulateColumns.as_view(), name='ml_profiler_config_form/autopopulate_columns'),
    

]
