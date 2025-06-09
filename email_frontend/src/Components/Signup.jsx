import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (disabled && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setDisabled(false);
    }
    return () => clearInterval(timer);
  }, [disabled, secondsLeft]);

  function handleChange(e) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await axios.post("http://localhost:3000/user/send-otp", { email });
      if (response.status === 200) {
        alert("OTP sent successfully! Otp valid for 5 minutes");
        setDisabled(true);
        setSecondsLeft(60); // ⏱️ Start countdown
        navigate("/login");
      }
    } catch (error) {
      console.error("Error sending OTP:", error.response?.data || error.message);
      alert("Failed to send OTP");
    }

    setEmail("");
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Sign Up with OTP</h2>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your Email Address"
          required
          style={styles.input}
        />
        <button type="submit" style={disabled ? styles.buttonDisabled : styles.button} disabled={disabled}>
          {disabled ? `Wait ${secondsLeft}s` : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default Signup;

// 💄 Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5"
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  heading: {
    marginBottom: "10px",
    textAlign: "center"
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  buttonDisabled: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#ccc",
    color: "#666",
    border: "none",
    borderRadius: "5px",
    cursor: "not-allowed"
  }
};
