import React from 'react'
import { Link , Outlet } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <Link to="/">Home</Link>
    <Link to="/contact">Contact</Link>
    <Link to="/about">About</Link>
    <Link to="/login">Login</Link>

    
    <Outlet/>
    </>
  )
}

export default Navbar