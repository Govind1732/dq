import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import '../index.css'; // Import your custom CSS file

const AutoViewEdit = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center my-xl-1">
        <Col xl={5}>
          <div className="px-5 py-2 rounded shadow-lg my-2">
            <h2 className="mb-2 text-center">Auto Profile View or Edit</h2>
            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-2" controlId="ControlInput1">
                <Form.Label>DB Name</Form.Label>
                <Form.Control type="text" placeholder="Database" />
              </Form.Group>

              <Form.Group className="mb-2" controlId="ControlInput2">
                <Form.Label>Table Name</Form.Label>
                <Form.Control type="text" placeholder="Table" className="file-input" />
              </Form.Group>

              <Form.Group className="mb-2" controlId="ControlInput3">
                <Form.Label>Email Id</Form.Label>
                <Form.Control type="email" placeholder="Email Id" className="file-input" />
              </Form.Group>

              <div className="d-flex justify-content-center mb-2">
                <Button variant="dark" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AutoViewEdit;
