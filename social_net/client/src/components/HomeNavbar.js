import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap'


export default function HomeNavbar() {

  return (

    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">SocialNet</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/singup">SignUp</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link href="/about" >About</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}