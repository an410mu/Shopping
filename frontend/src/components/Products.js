import React from "react";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating.js";
import { Link, useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const qty = 1;
  const history = useNavigate();

  const addToCartHandler = () => {
    console.log("clicked");
    history(`/cart/${product._id}?qty=${qty}`);
  };

  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`} style={{ color: "black" }}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </Card.Text>
          <Card.Text as="h3">{product.price}</Card.Text>
          <Button
            className="my-3"
            size="sm"
            onClick={addToCartHandler}
            type="button"
            disabled={product.countInStock === 0 ? true : false}
          >
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
