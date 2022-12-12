import React from 'react';
import products from '../products';
import {Row, Col} from 'react-bootstrap';

const Home = () => {
  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {products.map(product => { return <Col key={product._id}><h3>{product.name}</h3></Col>})}
      </Row>
    </>
  )
}

export default Home