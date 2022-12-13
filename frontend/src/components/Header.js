import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <NavLink to="/">
            <Navbar.Brand>Catharine's Shop</Navbar.Brand>
          </NavLink>
          <Nav className="ml-auto">
            <NavLink to="/promotion">
              <i className="fa-solid fa-rectangle-ad"></i>Promotion
            </NavLink>
            <NavLink to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>Cart
            </NavLink>
            <NavLink to="/login">
              <i className="fa-solid fa-circle-user"></i>Sign In
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
