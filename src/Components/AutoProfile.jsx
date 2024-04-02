import React, { useState, CSSProperties } from "react";
import { Container, Row, Col, Form, Button, Breadcrumb, Modal } from "react-bootstrap";
import axios from "axios";
import { GridLoader } from "react-spinners";
import { css } from '@emotion/react'
// import URLSearchParams from 'url-search-params'

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const AutoProfile = () => {

  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile)
    }
    else {
      alert('Please select a csv file')
    }
  }
  const handleUpload = () => {

    // Check if files were selected
    if (!file) {
      alert('Please select a file');
      return;
    }
    const formData = new FormData()
    setLoading(true)
    formData.append('file', file)

    console.log(loading)

    // const formData = new URLSearchParams();
    // formData.append('file', file);


    axios.post('http://tdcldizcva002.ebiz.verizon.com:8000/mle/MLESelfServe/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        console.log(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error uploading file: ', error);
        setLoading(false)
      });
  };



  const resetHandler = () => {

  }



  return (
    <Container fluid className={loading?'blur':''}>
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
                <Button variant="dark" onClick={resetHandler}>
                  Reset
                </Button>
                <Button variant="dark" type="submit" onClick={handleUpload}>
                  Submit
                </Button>
              </div>


            </div>

          </Col>
        </Row>
      </Container>

      {loading &&
        <Container className="loading-overlay">
          <GridLoader color="#ff0000" loading={loading} cssOverride={override} size={50} aria-label="Loading Spinner" data-testid='loader' />
        </Container>
      }
    </Container>
  );
};

export default AutoProfile;
