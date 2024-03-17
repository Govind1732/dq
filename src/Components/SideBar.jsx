import React, { useState } from "react";
import { Link } from 'react-router-dom'
import '../index.css'
import { Nav, Accordion, Container, Row, Col } from "react-bootstrap";

const SideBar = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const handleSelect = (link) => {
    setSelectedLink(link)
  }
  // const Styles={
  //   accordion:{
  //     --bs-accordion-btn-bg:"#000000"
  //   }
  // }
  return (
    <>
      <Nav variant="pills" className="d-flex my-2 mx-0 bg-black" id="parentM">

        <Nav.Item className="my-3">
          <Link to='/' className="nav-link" style={{ color: selectedLink === '/' ? 'black' : 'white', backgroundColor: selectedLink === '/' ? 'white' : 'transparent' }}
            onClick={() => { handleSelect('/') }}>
            <span className="ms-2">
              Home
            </span>
          </Link>
        </Nav.Item>

        <Nav.Item className="my-3">
          <Link to='/autoProfile' className="nav-link" style={{ color: selectedLink === '/autoProfile' ? 'black' : 'white', backgroundColor: selectedLink === '/autoProfile' ? 'white' : 'transparent' }}
            onClick={() => { handleSelect('/autoProfile') }}>
            <span className="ms-2 ">
              Auto Profile
            </span>
          </Link>
        </Nav.Item>

        {/* <Nav.Item className="my-3" >
          <Accordion className="accordion">
            <Accordion.Header>Rule Profile</Accordion.Header>
            <Accordion.Body >
              <Link to='/rantdt' className="nav-link" style={{color:selectedLink==='/rantdt'?'black':'white',backgroundColor:selectedLink==='/rantdt'?'white':'black'}}
            onClick={()=>{handleSelect('/rantdt')}}>
                <span className="ms-2 ">
                  RANT DT
                </span>
              </Link>
            </Accordion.Body>
            <Accordion.Body>
              <Link to='/corpData' className="nav-link" style={{ color: selectedLink === '/corpData' ? 'black' : 'white', backgroundColor: selectedLink === '/corpData' ? 'white' : 'black' }}
                onClick={() => { handleSelect('/corpData') }}>
                <span className="ms-2 ">
                  1CorpData
                </span>
              </Link>
            </Accordion.Body>
            <Accordion.Body>
              <Link to='/allProjects' className="nav-link" style={{ color: selectedLink === '/allProjects' ? 'black' : 'white', backgroundColor: selectedLink === '/allProjects' ? 'white' : 'black' }}
                onClick={() => { handleSelect('/allProjects') }}>
                <span className="ms-2 ">
                  All Projects
                </span>
              </Link>
            </Accordion.Body>
          </Accordion>
        </Nav.Item> */}
        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}

        <Nav.Item className="my-3">
          <Link to='/mlProfile' className="nav-link" style={{ color: selectedLink === '/mlProfile' ? 'black' : 'white', backgroundColor: selectedLink === '/mlProfile' ? 'white' : 'transparent' }}
            onClick={() => { handleSelect('/mlProfile') }}>
            <span className="ms-2">
              ML Profile
            </span>
          </Link>
        </Nav.Item>

        {/* <Nav.Item className="my-auto">
          <Link to='' className="nav-link" style={{ color:'black', backgroundColor: 'white'}}>
            <div className="ms-2 ">Any Queries:</div>
            <div className="ms-2"><a href="mailto:DQ-DEV-Team@verizon.com">DQ-DEV-Team@verizon.com</a></div>
          </Link>
        </Nav.Item> */}

      </Nav>
    </>
  );
};

export default SideBar;