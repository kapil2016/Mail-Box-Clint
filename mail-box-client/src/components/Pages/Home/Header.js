import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { setAuthantication } from '../../../States/Reducers/auth-reducer';
import { useDispatch } from 'react-redux';



const Header = () => {
 const dispatch = useDispatch();
 const logoutHandler = ()=>{
    dispatch(setAuthantication({idToken: null , isLogin:false, userID:null , email:null}))
    localStorage.setItem('idToken' , null)
    localStorage.setItem('userID' , null)
    localStorage.setItem('email' , null)

 }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Mail Box Client</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact Us</Nav.Link>
          </Nav>
          <Button variant="primary" onClick={logoutHandler}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
