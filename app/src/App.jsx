import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <Router>
        <div>
          <Navbar />
          <ToastContainer
              position="top-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
              theme="dark"
            />

          {/* pages routes */}
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/reservations' element={<Reservations />} />
            <Route path='/about' element={<About />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/reviews' element={<Reviews />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
