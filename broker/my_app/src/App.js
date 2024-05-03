import React from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import  {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Container} from "react-bootstrap";
import Brokers from "./component/brokers";
import Stock from "./component/Stock";
import Settings from "./component/Settings";
import './App.css';

function App() {
  return (
    <Router class='navbar'>
      <Navbar expand="lg" classname="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/">Биржа</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav classname="me-auto my-2 my-lg-0" style={{maxHeight: '100px'}} navbarScroll>
              <Nav.Link as={Link} to='/brokers'>Брокеры</Nav.Link>
              <Nav.Link as={Link} to='/stock'>Акции</Nav.Link>
              <Nav.Link as={Link} to='/setting'>Настройки</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Brokers/>} />
        <Route path="/brokers" element={<Brokers/>} />
        <Route path="/stock" element={<Stock/>} />
        <Route path="/setting" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
