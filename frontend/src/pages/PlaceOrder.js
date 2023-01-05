import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Card, Button, Image } from "react-bootstrap";
import CheckoutStep from "../components/CheckoutStep.js";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions.js";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useNavigate();

  //prices
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, ele) => acc + ele.price * ele.qty,
    0
  );
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.shippingPrice = cart.itemsPrice > 100 ? 5 : 15;
  cart.taxPrice = addDecimals(Number(0.12 * cart.itemsPrice));
  const total =
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice);
  cart.totalPrice = addDecimals(total);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history(`/order/${order._id}`);
    }
  }, [success, history]);

  const placeOrderHandler = () => {
    console.log("place order");
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shipping,
        paymentMethod: cart.payment,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shipping.address}, {cart.shipping.city},{" "}
                {cart.shipping.zipcode} {cart.shipping.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {"  "}
                {cart.payment}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <p>Your Car is Empty</p>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            style={{ color: "black" }}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>{error && <p>Something wrong</p>}</ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
