import React from 'react'
import { NavLink, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auction from './pages/Auction.jsx'
import Roster from './pages/Roster.jsx'
import Poll from './pages/Poll.jsx'
import Feed from './pages/Feed.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'

export default function App() {
  const location = useLocation()

  return (
    <>
      <nav>
        <div className="nav-container">
          <div className="nav-logo-container">
            <img src="/static/logo.png" className="nav-logo" alt="Battle of Bytes Logo" />
            <span className="nav-brand">Battle of Bytes 2.0</span>
          </div>
          <div className="nav-links">
            <NavLink to="/" end className={({isActive}) => 'nav-link' + (isActive ? ' active':'')}><i className="fas fa-home"></i><span>Home</span></NavLink>
            <NavLink to="/auction" className={({isActive}) => 'nav-link' + (isActive ? ' active':'')}><i className="fas fa-gavel"></i><span>Auction</span></NavLink>
            <NavLink to="/roster" className={({isActive}) => 'nav-link' + (isActive ? ' active':'')}><i className="fas fa-users"></i><span>Coordinators</span></NavLink>
            <NavLink to="/poll" className={({isActive}) => 'nav-link' + (isActive ? ' active':'')}><i className="fas fa-poll"></i><span>Poll</span></NavLink>
            <NavLink to="/feed" className={({isActive}) => 'nav-link' + (isActive ? ' active':'')}><i className="fas fa-stream"></i><span>Live Feed</span></NavLink>
            <NavLink to="/about" className={({isActive}) => 'nav-link' + (isActive ? ' active':'')}><i className="fas fa-info-circle"></i><span>About Us</span></NavLink>
            <NavLink to="/contact" className={({isActive}) => 'nav-link' + (isActive ? ' active':'')}><i className="fas fa-envelope"></i><span>Contact</span></NavLink>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="page-content">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/auction" element={<Auction />} />
            <Route path="/roster" element={<Roster />} />
            <Route path="/poll" element={<Poll />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </>
  )
}
