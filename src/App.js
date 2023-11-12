import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './JSX/NavBar';
import Footer from './JSX/Footer';
import Home from './JSX/Home';




function App() {
  return (
    <>

      <BrowserRouter>

        <NavBar />

        <Routes>

          <Route path='/' element={<Home />} />
          


        </Routes>



        <Footer />



      </BrowserRouter>

    </>
  );
}

export default App;
