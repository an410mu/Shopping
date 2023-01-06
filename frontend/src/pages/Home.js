import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Products.js";
import ProductCarousel from "../components/ProductCarousel.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions.js";

const Home = () => {
  //states are updated from redux reducer
  //const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    // const fetchProducts = async () => {
    //   const { data } = await axios.get("/products");
    //   setProducts(data);
    // };
    // fetchProducts();

    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <ProductCarousel />
      <h1 style={{ marginTop: "30px" }}>Latest Product</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>error</h3>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default Home;
