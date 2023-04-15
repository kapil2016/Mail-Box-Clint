import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { setAuthantication } from "../../../States/Reducers/auth-reducer";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state=> state.auth.userAuth.isLogin);
  const logoutHandler = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("userID");
    localStorage.removeItem("email");
    dispatch(
      setAuthantication({
        idToken: null,
        isLogin: false,
        userID: null,
        email: null,
      })
    );

  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Mail Box Client</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/compose-email" style={{ textDecoration: "none" }}>
                Compose Email
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/inbox" style={{ textDecoration: "none" }}>
                Inbox
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/inbox/sentmail" style={{ textDecoration: "none" }}>
                Sent Email
              </Link>
            </Nav.Link>
          </Nav>
        {isLogin &&  <Button variant="primary" onClick={logoutHandler}>
            Logout
          </Button> }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
