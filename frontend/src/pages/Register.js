import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer.js";

const Register = ({ location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const history = useNavigate();

  // const redirect = location.search ? location.search.split("=")[1] : "/";
  const redirect = "/";

  useEffect(() => {
    if (userInfo) {
      history("/");
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //Dispatch lOGIN
    dispatch(register(email, password, name));
  };

  return (
    <FormContainer>
      <h1>Register a New User</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading && <h4>Loading</h4>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" varuabt="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already have a account ?
          <Link to={"/user/login"} style={{ color: "black" }}>
            Log in
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
