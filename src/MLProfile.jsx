import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios'
// import '../index.css'; // Import your custom CSS file

const MLProfile = () => {
  const [data_source, setDataSource] = useState('');
  const [project_name, setProject] = useState('');
  const [dbname, setDatabase] = useState('');
  const [table_name, setTable] = useState('');
  const [IncreColumn, setIncreColumn] = useState('');
  const [IncreCondition, setIncreCondition] = useState('');
  const [email, setEmail] = useState('');
  const [additionalData,setAdditionalData]=useState([""])
  const [showProject, setShowProject] = useState(true);
  // const [showProject, setShowProject] = useState(true);

  const [validated, setValidated] = useState(false);


  const handleDataSourceChange = (e) => {
    const selectedDataSource = e.target.value;
    setDataSource(selectedDataSource);
    setShowProject(selectedDataSource === 'GCP');
  };

  // Check for Connectivity
  const connectivityHandler=async (e)=>{
    console.log("submitteed")
    e.preventDefault()
    try{
      await axios.post('http://127.0.0.1:8000/ui_fetch/',{data_source,project_name,dbname,table_name});

      await fetchAdditionalDetails()
    }
    catch(error){
      console.error('Error sending details',error)
      alert("Connectivity/Access doesnot exist. Redirecting to marketplace to raise a request");
      //window.open('https://marketplace.verizon.com/#/subscriptionReqForm', '_blank'); 
    }
  }

  useEffect(fetchAdditionalDetails(),[])

  // Fetch Additional Details
  const fetchAdditionalDetails=async ()=>{
    try{
      const response=await axios.get('http://127.0.0.1:8000/ml_profiler_config_form/autopopulate_columns/');
      setAdditionalData(response.data)
      console.log(response)
    }
    catch(error){
      console.error('Error sending details',error)
      alert("Connectivity/Access doesnot exist. Redirecting to marketplace to raise a request");
      window.open('https://marketplace.verizon.com/#/subscriptionReqForm', '_blank'); 
    }
  }

  // Submit ML Profile
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      await axios.post('http://127.0.0.1:8000/dispatch_MLProfile_data/',{data_source,project_name,dbname,table_name});
      await fetchAdditionalDetails()
    }
    catch(error){
      console.error('Error sending details',error) 
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center my-xl-1">
        <Col xl={5}>
          <div className="px-5 py-2 rounded shadow-lg my-2">
            <h2 className="mb-2 text-center">ML Profile Form</h2>

            <Form onSubmit={connectivityHandler}>
            {/* <fieldset disabled={additionalData.length>0}> */}
              <Form.Group className="mb-2" controlId="ControlInput1">
                <Form.Label>Data Source</Form.Label>
                <Form.Select value={data_source} onChange={handleDataSourceChange}>
                  <option>Select Environment</option>
                  <option value="GCP">GCP</option>
                  <option value="Tera Data">Tera Data</option>
                </Form.Select>    
              </Form.Group>

              {showProject && (
                <Form.Group className="mb-2" controlId="ControlInput2">
                  <Form.Label>Select Project</Form.Label>
                  <Form.Control type="text" value={project_name} required onChange={e=>setProject(e.target.value)} placeholder="Project" className="custom-file-input" />
                  <Form.Control.Feedback type="invalid">
              Please choose a Project.
            </Form.Control.Feedback>
                </Form.Group>
              )}
              <Form.Group className="mb-2" controlId="ControlInput3">
                <Form.Label>Select Database</Form.Label>
                <Form.Control type="text" value={dbname} required onChange={e=>setDatabase(e.target.value)} placeholder="Database" />
                <Form.Control.Feedback type="invalid">
              Please choose a Database.
            </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-2" controlId="ControlInput4">
                <Form.Label>Select Tables</Form.Label>
                <Form.Control type="text" value={table_name} required onChange={e=>setTable(e.target.value)} placeholder="Table" className="file-input" />
                <Form.Control.Feedback type="invalid">
              Please choose a Tables.
            </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-center mb-2">
                <Button variant="danger" type="submit">
                Check For Connectivity
                </Button>
              </div>
              {/* </fieldset> */}
              </Form>
                {additionalData.length>0 ?
                
                (
                  <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-2" controlId="ControlInput4">
                <Form.Label>Incremental Column</Form.Label>
                <Form.Control type="text" value={IncreColumn} required onChange={e=>setIncreColumn(e.target.value)} placeholder="Table" className="file-input" />
                <Form.Control.Feedback type="invalid">
              Please choose a Tables.
            </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-2" controlId="ControlInput4">
                <Form.Label>Incremental Condition</Form.Label>
                <Form.Control type="text" value={IncreCondition} required onChange={e=>setIncreCondition(e.target.value)} placeholder="Table" className="file-input" />
                <Form.Control.Feedback type="invalid">
              Please choose a Tables.
            </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-2" controlId="ControlInput4">
                <Form.Label>Select Email</Form.Label>
                <Form.Control type="email" value={email} required onChange={e=>setEmail(e.target.value)} placeholder="Table" className="file-input" />
                <Form.Control.Feedback type="invalid">
              Please choose a Email.
            </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-center mb-2">
                <Button variant="danger" type="submit">
                Submit Profile
                </Button>
              </div>

            </Form>
                ):""}
              
          </div>
          {/* <div className="d-flex justify-content-around my-3">
            <Button variant="dark" type="submit" className="px-5">
              Download Report
            </Button>
          </div> */}
        </Col>
      </Row>
    </Container>
  );
};

export default MLProfile;
