import Header from './components/Header.js';
import Footer from './components/Footer.js'
import React from 'react';
import {Container} from 'react-bootstrap';
import './index.css';
import Home from './pages/Home.js';


function App() {
  return (
    <div className="App">
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome shopping</h1>
          <Home/>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
