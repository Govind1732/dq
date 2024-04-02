import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Breadcrumb } from "react-bootstrap";
import axios from "axios";
import { GridLoader } from "react-spinners";
import './AutoProfile.css'

const AutoProfile = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (event) => {
    if (unsavedChanges) {
      event.preventDefault();
      event.returnValue = ''; // This is necessary for Chrome
      return ''; // This is necessary for Firefox
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setUnsavedChanges(true); // Mark changes as unsaved when file is selected
    } else {
      alert('Please select a csv file');
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file');
      return;
    }
    const formData = new FormData();
    setLoading(true);
    formData.append('file', file);

    axios.post('http://tdcldizcva002.ebiz.verizon.com:8000/mle/MLESelfServe/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log(response.data);
      setLoading(false);
      setUnsavedChanges(false); // Mark changes as saved after successful upload
    })
    .catch(error => {
      console.error('Error uploading file: ', error);
      setLoading(false);
    });
  };

  const resetHandler = () => {
    setFile(null); // Reset the file state
    setUnsavedChanges(false); // Mark changes as saved
  };

  return (
    <>
      <Container fluid className={`wrapper ${loading ? 'blur' : ''}`}>
        {/* Your Content */}
        <Container fluid className="my-2 pt-3">
          <Breadcrumb>
            <Breadcrumb.Item active>Auto Profile</Breadcrumb.Item>
            <Breadcrumb.Item active><span className='fw-bold'>Auto Profile Submit Request</span></Breadcrumb.Item>
          </Breadcrumb>
        </Container>

        <Container fluid className="mx-8 px-8 mb-2">
          <Row className="justify-content-center align-items-center my-5">
            <Col xl={5}>
              <div className="px-5 py-3">
                <h2 className="mb-4 text-center">Auto Profile Form</h2>
                <h6>dqaas_auto_prfl_mtd_&lt;proj_name&gt;.csv</h6>

                <Form.Group controlId="formFile" className="my-3">
                  <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
                </Form.Group>

                <a href="/assets/dqaas_auto_prfl_mtd_tier1.csv" download className="text-decoration-none text-danger">
                  Download sample Template(CSV)
                </a>

                <div className="d-flex justify-content-center my-3">
                  <Button variant="dark" onClick={resetHandler}>Reset</Button>{' '}
                  <Button variant="dark" type="submit" onClick={handleUpload} className="mx-2">Submit</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      
      {/* Loading Overlay */}
      {loading &&
        <div className="loading-overlay">
          <GridLoader color="#ff0000" loading={loading} size={20} aria-label="Loading Spinner" />
        </div>
      }
    </>
  );
};

export default AutoProfile;
