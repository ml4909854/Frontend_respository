import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    otp: ""
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form is submitted with:", data);
    try {
      let response = await axios.post("http://localhost:3000/user/verify-otp", data);
      console.log(response);

      if (response.status === 200 && response.data.token) {
        // ✅ Save token to localStorage
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        navigate("/"); // Redirect to homepage or dashboard
      } else {
        alert("Login failed. Invalid OTP or Email.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed. Please try again.");
    }

    // ✅ Reset input fields
    setData({
      email: "",
      otp: ""
    });
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login with OTP</h2>

        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter your Email address"
          style={styles.input}
          required
        />

        <input
          type="text"
          name="otp"
          value={data.otp}
          onChange={handleChange}
          placeholder="Enter your OTP"
          minLength={6}
          maxLength={6}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  heading: {
    marginBottom: "10px",
    textAlign: "center",
    fontSize: "24px",
    color: "#333"
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
