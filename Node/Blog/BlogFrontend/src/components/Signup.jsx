import React, { useState, useEffect } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Form submit loader
  const [pageLoading, setPageLoading] = useState(true); // Initial page loader
  const navigate = useNavigate();

  // Simulate loading effect when the page first loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false); // Stop page loader after 2 seconds
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await axios.post(`${backendUrl}/user/register`, data);

      if (response.status === 201) {
        alert("You registered successfully!");
        navigate("/login");
      }
    } catch (err) {
      setError("Registration failed! Try again later or use a different username.");
      console.error("Registration Error:", err);
    }

    setData({ username: "", password: "", role: "" });
    setLoading(false);
  }

  if (pageLoading) {
   return <Spinner/>
  }

  return (
    <div className="container">
      <h1>Signup</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p style={{ color: "blue" }}>Please wait... Registering</p>}
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          value={data.username}
          name="username"
          placeholder="username"
          required
          disabled={loading}
        />
        <br />

        <input
          onChange={handleChange}
          type="password"
          value={data.password}
          name="password"
          placeholder="password"
          required
          disabled={loading}
        />
        <br />

        <select
          onChange={handleChange}
          value={data.role}
          name="role"
          required
          disabled={loading}
        >
          <option value="" disabled>
            Select role
          </option>
          <option value="author">author</option>
          <option value="reader">reader</option>
          <option value="admin">admin</option>
        </select>
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
