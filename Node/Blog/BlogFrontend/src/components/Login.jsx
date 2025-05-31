import React, { useEffect, useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner"; // ✅ import reusable spinner

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [pageLoading, setPageLoading] = useState(true); // For initial page load
  const [formLoading, setFormLoading] = useState(false); // For form submission
  const navigate = useNavigate();

  // ✅ Page load spinner
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return <Spinner message="Loading Login Page..." />;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setFormLoading(true); // ✅ start form loading

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await axios.post(`${backendUrl}/user/login`, data);
             localStorage.setItem("accessToken" , response.data.accessToken)
             localStorage.setItem("userId" , response.data.userId)
             localStorage.setItem("refreshToken" , response.data.refreshToken)
      if (response.status === 200) {
        alert("User logged in successfully!");
        navigate("/blogs");
      }
    } catch (error) {
      setError("Login failed. Check your credentials or register first.");
    }

    setData({
      username: "",
      password: "",
    });
    setFormLoading(false); // ✅ stop form loading
  }

  return (
    <div className="container">
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {formLoading && (
        <p style={{ color: "blue", marginBottom: "10px" }}>Logging in...</p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={data.username}
          name="username"
          placeholder="username"
          type="text"
          required
          disabled={formLoading}
        />
        <input
          onChange={handleChange}
          value={data.password}
          name="password"
          placeholder="password"
          type="text"
          required
          disabled={formLoading}
        />
        <button type="submit" disabled={formLoading}>
          {formLoading ? "Please wait..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
