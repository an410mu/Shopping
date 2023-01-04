import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import ProductPage from "./pages/ProductPage.js";
import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.js";
import CartPage from "./pages/CartPage.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Shipping from "./pages/Shipping.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="py-3">
          <Container>
            {/* <h1>Welcome shopping</h1>
          <Home/> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/register" element={<Register />} />
              <Route path="/user/shipping" element={<Shipping />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/cart/:id" element={<CartPage />} />
              {/* ?make id optional */}
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
