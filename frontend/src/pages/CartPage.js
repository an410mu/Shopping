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
import { addToCart, removeFromCart } from "../actions/cartActions.js";
//import { login } from "../actions/userActions";

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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (params.id) {
      dispatch(addToCart(params.id, qty));
    }
  }, [dispatch, params.id, qty, userInfo]);

  const removeFromCartHandler = (id) => {
    console.log(`remove ${id}`);
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    console.log("check out cart");
    if (!userInfo) {
      history("/user/login");
    } else {
      history("/user/shipping");
    }
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <h3>
              Your cart is empty{" "}
              <Link to="/" style={{ color: "black", border: "solid" }}>
                Go Back
              </Link>
            </h3>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/product/${item.product}`}
                        style={{ color: "black" }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>{item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((ele) => (
                          <option key={ele + 1} value={ele + 1}>
                            {ele + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5>
                  Subtotal (
                  {cartItems.reduce((acc, ele) => acc + Number(ele.qty), 0)})
                </h5>
                $
                {cartItems
                  .reduce((acc, ele) => acc + ele.price * ele.qty, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Check Out
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={2}></Col>
      </Row>
    </>
  );
};

export default CartPage;
