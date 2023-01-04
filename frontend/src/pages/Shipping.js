import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer.js";
import CheckoutStep from "../components/CheckoutStep.js";
import { saveShipping } from "../actions/cartActions.js";

const Shipping = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shipping } = cart;

  const [address, setAddress] = useState(shipping.address);
  const [city, setCity] = useState(shipping.city);
  const [zipCode, setZipCode] = useState(shipping.zipCode);
  const [country, setCountry] = useState(shipping.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, zipCode, country }));
    console.log("submit address");
    history("/user/payment");
  };

  return (
    <>
      <CheckoutStep step1 step2 />
      <FormContainer>
        <h1 className="checkout-title">Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="address"
              placeholder="Address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="city"
              placeholder="City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="zipCode">
            <Form.Label>zipCode</Form.Label>
            <Form.Control
              type="zipCode"
              placeholder="zipCode"
              value={zipCode}
              required
              onChange={(e) => setZipCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="country"
              placeholder="country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Shipping;
