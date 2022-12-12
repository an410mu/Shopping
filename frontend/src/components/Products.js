import React from "react";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating.js";

const Product = ({ product }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <a href={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </a>
        <Card.Body>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </Card.Text>
          <Card.Text as="h3">{product.price}</Card.Text>
          <Button as="div" className="my-3" variant="secondary" size="sm">
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
