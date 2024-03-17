import React from 'react';
import { Container, Image } from 'react-bootstrap';

const Home = () => {
  return (
    // <Image 
    //   src='./Data-Quality-As-a-Service.jpg' 
    //   className='img-fluid w-100 h-100 object-cover m-0 p-0'
    //   style={{ margin: '0', padding: '0' }}
    // />
    <>
      <Container fluid className="d-flex justify-content-center align-items-center ">
        <div className="text-center bg-light border my-2 ">
          <h4 className='fw-bolder text-break lh-lg'>Data Quality as a Service(DQaaS) enables quicker and accurate data profiling which helps the business team to perform analysis to understand the data better,detect and fix the data quality issues through the DQ score.</h4>
        </div>
      </Container>
    </>
  );
};

export default Home;