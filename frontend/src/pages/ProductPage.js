import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Image,
  Form,
  Alert,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
//import products from "../products.js";
import Rating from "../components/Rating.js";
import { useDispatch, useSelector } from "react-redux";
import { oneProduct, createProductReview } from "../actions/productActions.js";
import { PRODUCT_CREATE_REV_RESET } from "../constants/productConstants.js";

const ProductPage = () => {
  const params = useParams(); //older version use ({match})
  const history = useNavigate(); //older version use history.push()

  //const product = products.find((ele) => ele._id === params.id);
  //const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  //const [reviewErr, setReviewErr] = useState(false);

  const dispatch = useDispatch();

  //need to initialize in the store.js for the action
  const productOne = useSelector((state) => state.productOne);
  const { loading, error, product } = productOne;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // if (product) {
  //   productReview = product.reviews;
  // }

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submited!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REV_RESET });
    }

    // if (errorProductReview) {
    //   setReviewErr(true);
    // }

    // setTimeout(() => {
    //   setReviewErr(false);
    // }, "2000");

    dispatch(oneProduct(params.id));
  }, [dispatch, params.id, successProductReview, errorProductReview]);

  //functions

  const addToCartHandler = () => {
    console.log("clicked");
    history(`/cart/${params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    );
  };

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
        <>
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
                        {product.countInStock > 0
                          ? "In Stock"
                          : "Out of Stock "}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (ele) => (
                                  <option key={ele + 1} value={ele + 1}>
                                    {ele + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Form>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0 ? true : false}
                    >
                      ADD TO CART
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {/* {product.numReviews === 1 && <div>No</div>} */}
              {product.reviews && (
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                {errorProductReview && (
                  <Alert variant="danger">Something wrong</Alert>
                )}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      Submit Review
                    </Button>
                  </Form>
                ) : (
                  <Alert variant="primary">
                    Please{" "}
                    <Link
                      to="/user/login"
                      style={{
                        color: "black",
                        textDecorationLine: "underline",
                      }}
                    >
                      Sign In
                    </Link>{" "}
                    to write a review
                  </Alert>
                )}
              </ListGroup.Item>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
