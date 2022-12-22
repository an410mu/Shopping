import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { addToCart } from "../actions/cartActions.js";

const CartPage = ({ location }) => {
  const params = useParams(); //older version use ({match})
  const history = useNavigate(); //older version use history.push()
  const [searchParams] = useSearchParams();

  const qty = searchParams.get("qty");
  console.log(qty);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    if (params.id) {
      dispatch(addToCart(params.id, qty));
    }
  }, [dispatch, params.id, qty]);

  return <h1>CartPage</h1>;
};

export default CartPage;
