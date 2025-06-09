import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import "./layout.css";
const Layout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    alert("User logged out successfully!")
    navigate("/login");
  }
  return (
    <>
      <div className="container">
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/create">CreateBlog</Link>
        {token ? (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/singup">Singup</Link>
          </>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
