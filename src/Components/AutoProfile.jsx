import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const AutoProfile = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileInput = e.target.elements.formFile;

    // Check if files were selected
    if (!fileInput.files || fileInput.files.length === 0) {
        alert('Please select a file');
        return;
    }

    const file = fileInput.files[0];

    // Check if the selected file is a CSV file
    if (!file.name.toLowerCase().endsWith('.csv')) {
        alert('Please select a CSV file');
        return;
    }
};

  return (
    <Container fluid className="">
      <Row className="justify-content-center align-items-center my-5">
        <Col xl={5}>
          <div className="px-5 py-3 rounded shadow-lg">
            <h2 className="mb-4 text-center">Auto Profile Form</h2>

            <Form onSubmit={handleSubmit}>
              <h6>dqaas_auto_prfl_mtd_&lt;proj_name&gt;.csv</h6>

              <Form.Group controlId="formFile" className="my-3">
                {/* <Form.Label>Only csv file format is allowed</Form.Label> */}
                <Form.Control type="file" accept=".csv" />
              </Form.Group>

              <a href="/assets/dqaas_auto_prfl_mtd_tier1.csv" download className="text-decoration-none text-danger">
                Download sample Template(CSV)
              </a>
              <div className="d-flex justify-content-center my-3">
              <Button variant="dark" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
            
          </div>
          {/* <div className="d-flex justify-content-around my-3">
                <Button variant="dark" type="submit">
                  view mtd
                </Button>
                <Button variant="dark" type="submit">
                  Edit mtd
                </Button>
              </div> */}
        </Col>
      </Row>
    </Container>
  );
};

export default AutoProfile;
