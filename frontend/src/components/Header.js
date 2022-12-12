import React from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand='lg'>
        <Container>
          <Navbar.Brand href="/home">Catharine's Shop</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#promotion"><i className="fa-solid fa-rectangle-ad"></i>Promotion</Nav.Link>
            <Nav.Link href="/cart"><i className="fa-solid fa-cart-shopping"></i>Cart</Nav.Link>
            <Nav.Link href="/login"><i className="fa-solid fa-circle-user"></i>Sign In</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header

