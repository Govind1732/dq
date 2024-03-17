import React,{useState} from 'react'
import { Container,Row,Col,Nav } from 'react-bootstrap'


const Body = () => {
    const [selectedOption, setSelectedOption] = useState('Auto Profile');
  const [subOption, setSubOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSubOption(null);
  };

  const handleSubOptionClick = (subOption) => {
    setSubOption(subOption);
  };
  return (
    <Container fluid className="content-wrapper">
        <Row>
          <Col md={2} className="sidebar">
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link onClick={() => handleOptionClick('Auto Profile')} active={selectedOption === 'Auto Profile'}>
                Auto Profile
              </Nav.Link>
              <Nav.Link onClick={() => handleOptionClick('Rule Profile')} active={selectedOption === 'Rule Profile'}>
                Rule Profile
              </Nav.Link>
              {selectedOption === 'Rule Profile' && (
                <Nav defaultActiveKey="/home" className="flex-column ml-3">
                  <Nav.Link onClick={() => handleSubOptionClick('RANT DT')} active={subOption === 'RANT DT'}>
                    RANT DT
                  </Nav.Link>
                  <Nav.Link onClick={() => handleSubOptionClick('1CorpData')} active={subOption === '1CorpData'}>
                    1CorpData
                  </Nav.Link>
                  <Nav.Link onClick={() => handleSubOptionClick('All Projects')} active={subOption === 'All Projects'}>
                    All Projects
                  </Nav.Link>
                </Nav>
              )}
            </Nav>
          </Col>

          <Col md={10} className="content">
            <h1>{selectedOption}</h1>
            {subOption && <h2>{subOption}</h2>}
            {/* Add your main content here */}
          </Col>
        </Row>
      </Container>
  )
}

export default Body