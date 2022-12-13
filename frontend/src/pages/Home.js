import React from "react";
import products from "../products.js";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Products.js";

const Home = () => {
  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Home;
