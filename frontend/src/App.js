import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import ProductPage from "./pages/ProductPage.js";
import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.js";

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
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
