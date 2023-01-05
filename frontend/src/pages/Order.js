import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Card, Image, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderActions.js";
import { ORDER_PAY_RESET } from "../constants/orderConstants.js";

const Order = () => {
  const [sdkReady, setSdkReady] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  //const history = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay; //rename success and loading

  //prices

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, ele) => acc + ele.price * ele.qty,
      0
    );
    const total =
      Number(order.itemsPrice) +
      Number(order.shippingPrice) +
      Number(order.taxPrice);
    order.totalPrice = addDecimals(total);
  }

  const successPayHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(order._id, paymentResult));
  };

  useEffect(() => {
    const addPayPal = async () => {
      const { data: clientId } = await axios.get("/config/paypal");
      //console.log(clientId);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      //if dont reset, it will keep paying
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(params.id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPal();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, params.id, dispatch, successPay]);

  return loading ? (
    <p>Loading</p>
  ) : error ? (
    <p>Something wrong</p>
  ) : (
    <>
      <h2>
        Order {":"} {order._id}
      </h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>Name: </strong> {order.user.name}
              <p>
                <strong>Email:</strong>
                <a
                  href={`mailto:${order.user.email}`}
                  style={{ color: "black" }}
                >
                  {order.user.email}
                </a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.zipcode} {order.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {"  "}
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Alert variant="primary">Paid on {order.paidAt}</Alert>
              ) : (
                <Alert variant="danger">Not Paid</Alert>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <p>Order is Empty</p>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <p>Loading</p>}
                  {!sdkReady ? (
                    <p>Loading</p>
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPayHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Order;
