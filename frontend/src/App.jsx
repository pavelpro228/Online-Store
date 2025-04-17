import React from 'react'

import './components/styles/App.css'
import './components/styles/Header.css'
import './components/styles/Footer.css'
import './components/styles/Contacts.css'
import Header from './components/Header'
import MainPage from './components/Main-page'
import Footer from './components/Footer'
import About from './components/About'
import Contacts from './components/Contacts'
import Reviews from './components/Reviews'
import Authorization from './components/Authorization'
import MyInfo from './components/MyInfo'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/myInfo" element={<MyInfo />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
