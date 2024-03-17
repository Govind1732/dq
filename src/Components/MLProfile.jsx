import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import '../index.css'; // Import your custom CSS file

const MLProfile = () => {
  const [dataSource, setDataSource] = useState('');
  const [showProject, setShowProject] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleDataSourceChange = (e) => {
    const selectedDataSource = e.target.value;
    setDataSource(selectedDataSource);
    setShowProject(selectedDataSource === 'GCP');
  };

  return (
    <Container fluid className=''>
      <Row className="justify-content-center align-items-center my-xl-1">
        <Col xl={4}>
          <div className="px-5 py-1 rounded shadow-lg">
            <h2 className="text-center">ML Profile Form</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="" controlId="ControlInput1">
                <Form.Label>Data Source</Form.Label>
                <Form.Select onChange={handleDataSourceChange}>
                  <option>Select Environment</option>
                  <option value="GCP">GCP</option>
                  <option value="Tera Data">Tera Data</option>
                </Form.Select>
              </Form.Group>
              {showProject && (
                <Form.Group className="" controlId="ControlInput2">
                  <Form.Label>Select Project</Form.Label>
                  <Form.Control type="text" placeholder="Project" className="custom-file-input" />
                </Form.Group>
              )}
              <Form.Group className="" controlId="ControlInput3">
                <Form.Label>Select Database</Form.Label>
                <Form.Control type="text" placeholder="Database" />
              </Form.Group>
              <Form.Group className="" controlId="ControlInput4">
                <Form.Label>Select Tables</Form.Label>
                <Form.Control type="text" placeholder="Table" className="file-input" />
              </Form.Group>
              <div className="d-flex justify-content-center my-2">
                <Button variant="danger" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
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
