import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AutoProfile from "./Components/AutoProfile";
import MLProfile from "./Components/MLProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RantDT from "./Components/RantDT";
import CorpData from "./Components/CorpData";
import AllProjects from "./Components/AllProjects";
import { Container, Row, Col } from "react-bootstrap";
import Home from "./Components/Home";
import AutoViewEdit from "./Components/AutoViewEdit";
import './App.css'

const App = () => {
  const style={
      padding:"0",
      margin:"0",
      boxSizing:"border-box"
  }
  return (
    <>
      <Router>
        <Container fluid className='d-flex flex-column overflow-hidden min-vh-100 px-0' style={style}>
          <Header />
          <div className="vh-100">
          <Row className=''>
            <Col xl={12}>
              <Routes>
                
          <Route path="/dataQuality" element={<Home />} />
          <Route path="/dataQuality/autoProfile" element={<AutoProfile />} />
          <Route path="/dataQuality/autoviewedit" element={<AutoViewEdit />} />
          <Route path="/dataQuality/rantdt" element={<RantDT />} />
          <Route path="/dataQuality/rantdtviewedit" element={<RantDTViewEdit />} />
          <Route path="/dataQuality/corpData" element={<CorpData />} />
          <Route path="/dataQuality/corpDataviewedit" element={<CorpDataViewEdit />} />
          <Route path="/dataQuality/allProjects" element={<AllProjects />} />
          <Route path="/dataQuality/allProjectsviewedit" element={<AllProjectsviewEdit />} />
          <Route path="/dataQuality/mlProfile" element={<MLProfile />} />
          <Route path="/dataQuality/mlProfileReports" element={<MLProfileReports />} />
        
              </Routes>
            </Col>
          </Row>
          </div>
          
          
          <Footer/>
        </Container>
      </Router>


      
    </>
  );
};

export default App;
