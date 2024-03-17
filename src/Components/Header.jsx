import React, { useState } from "react";
import {
  Container,
  Navbar,
  NavbarText,
  Image,
  Nav,
  NavDropdown,
  Dropdown,
  DropdownButton,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // const handleOptionSelect = (option) => {
  //   setSelectedOption(option);
  // };
  const handleDropdownToggle = (isOpen) => {
    setDropdownOpen(isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const style = {
    padding: "0",
    margin: "0",
    boxSizing: "border-box",
  };
  return (
    <>
      <Navbar className="bg-black">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <Image
                src="./verizon-red-icon-black.png"
                className="rounded float-start"
                alt="verizon-icon"
                width="60"
                height="60"
              />
              <Image
                src="DQaaSlogo.png"
                alt="DQaas_logo"
                width="100"
                height="60"
                className="rounded float-start"
              />
            </Link>
          </Navbar.Brand>
          <NavbarText>
            <h5 className="text-white fw-bolder">Data Quality As a Service</h5>
          </NavbarText>
          <Image
            src="beta3.png"
            alt="beta3"
            width="40"
            height="60"
            className="rounded float-end"
          />
        </Container>
      </Navbar>
      <Navbar className="bg-black" variant="dark" style={style}>
        <Container>
          <Navbar.Toggle aria-controls="nav" />
          <Navbar.Collapse id="nav" style={style}>
            <Nav
              className="me-auto"
              onSelect={(selectedKey) => setSelectedOption(selectedKey)}
              style={style}>
              {/* <Stack direction="horizontal" gap={3} style={style}> */}

              {/* Home */}
              <Nav.Link
                to="/"
                as={Link}
                eventKey="/"
                style={{
                  backgroundColor:
                    selectedOption === "/" ? "white" : "transparent",
                  color: selectedOption === "/" ? "black" : "white",
                }}>
                Home
              </Nav.Link>

              {/* Auto Profile */}
              <NavDropdown
                title="Auto Profile"
                menuVariant="dark"
                show={dropdownOpen}
                onSelect={(selectedKey) => setSelectedOption(selectedKey)}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                style={{
                  backgroundColor:
                    selectedOption === "/autoProfile" ? "white" : "transparent",
                  color: selectedOption === "/autoProfile" ? "black" : "white",
                }}>
                <NavDropdown.Item
                  as={Link}
                  to="/autoProfile"
                  eventKey="/autoProfile"
                  onClick={() => handleOptionSelect("/autoProfile")}
                  className="dropdown-item-custom">
                  Submit Request
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/autoviewedit"
                  onClick={() => handleOptionSelect("/autoviewedit")}
                  className="dropdown-item-custom">
                  View/Edit Request
                </NavDropdown.Item>
              </NavDropdown>

              {/* Rule PRofile */}
              <Dropdown
                data-bs-theme="dark"
                show={selectedOption === "RuleProfile"}
                onMouseEnter={() => handleOptionSelect("RuleProfile")}
                onMouseLeave={() => handleOptionSelect(null)}>
                <Dropdown.Toggle
                  variant="dark"
                  style={{
                    backgroundColor:
                      selectedOption === "RuleProfile"
                        ? "white"
                        : "transparent",
                    color: selectedOption === "RuleProfile" ? "black" : "white",
                  }}>
                  <span>Rule Profile</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* Rant DT */}
                  <Dropdown
                    data-bs-theme="dark"
                    drop="end"
                    show={dropdownOpen === "RantDT"}
                    onMouseEnter={() => handleDropdownToggle("RantDT")}
                    onMouseLeave={() => handleDropdownToggle(null)}>
                    <Dropdown.Toggle variant="dark">
                      <span className="p-4">RANT DT</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/rantdt"
                        onClick={() => handleOptionSelect("RuleProfile")}
                        className="dropdown-item-custom">
                        Submit Request
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/rantdtviewedit"
                        onClick={() => handleOptionSelect("RuleProfile")}
                        className="dropdown-item-custom">
                        View/Edit Request
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  {/* corpData */}
                  <Dropdown
                    data-bs-theme="dark"
                    drop="end"
                    show={dropdownOpen === "corpData"}
                    onMouseEnter={() => handleDropdownToggle("corpData")}
                    onMouseLeave={() => handleDropdownToggle(null)}>
                    <Dropdown.Toggle variant="dark">
                      <span className="p-4">corpData</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/corpData"
                        onClick={() => handleOptionSelect("RuleProfile")}
                        className="dropdown-item-custom">
                        Submit Request
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/corpDataviewedit"
                        onClick={() => handleOptionSelect("RuleProfile")}
                        className="dropdown-item-custom">
                        View/Edit Request
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  {/* All Projects */}
                  <Dropdown
                    data-bs-theme="dark"
                    drop="end"
                    show={dropdownOpen === "AllProjects"}
                    onMouseEnter={() => handleDropdownToggle("AllProjects")}
                    onMouseLeave={() => handleDropdownToggle(null)}>
                    <Dropdown.Toggle variant="dark">
                      <span className="p-3">All Projects</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/allProjects"
                        onClick={() => handleOptionSelect("RuleProfile")}
                        className="dropdown-item-custom">
                        Submit Request
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/allprojectviewedit"
                        onClick={() => handleOptionSelect("RuleProfile")}
                        className="dropdown-item-custom">
                        View/Edit Request
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Dropdown.Menu>
              </Dropdown>

              {/* ML Profile */}
              <Dropdown
                data-bs-theme="dark"
                className="border-none"
                show={selectedOption === "MLProfile"}
                onMouseEnter={() => handleOptionSelect("MLProfile")}
                onMouseLeave={() => handleOptionSelect(null)}>
                <Dropdown.Toggle
                  variant="dark"
                  style={{
                    backgroundColor:
                      selectedOption === "MLProfile" ? "white" : "transparent",
                    color: selectedOption === "MLProfile" ? "black" : "white",
                  }}>
                  <span>ML Profile</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to="/mlProfile"
                    onClick={() => handleOptionSelect("MLProfile")}
                    className="dropdown-item-custom">
                    Submit Request
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/mlDownloadReport"
                    onClick={() => handleOptionSelect("MLProfile")}
                    className="dropdown-item-custom">
                    View/Edit Request
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* </Stack> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
