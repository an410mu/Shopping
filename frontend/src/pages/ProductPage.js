import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Card, Button, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
//import products from "../products.js";
import Rating from "../components/Rating.js";
import { useDispatch, useSelector } from "react-redux";
import { oneProduct } from "../actions/productActions.js";

const ProductPage = () => {
  const params = useParams();
  //const product = products.find((ele) => ele._id === params.id);
  //const [product, setProduct] = useState({});

  const dispatch = useDispatch();
  //need to initialize in the store.js for the action
  const productOne = useSelector((state) => state.productOne);
  const { loading, error, product } = productOne;

  useEffect(() => {
    dispatch(oneProduct(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h3>Error!</h3>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews}reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock "}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disable={product.countInStock === 0 ? "true" : "false"}
                  >
                    ADD TO CART
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductPage;
