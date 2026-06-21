import "../styles/adminLogin.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaCoffee,
  FaEnvelope,
  FaChartBar,
  FaCalendarAlt,
  FaLock,
  FaEye,
  FaRegEnvelope,
} from "react-icons/fa";

import { RiShieldKeyholeLine } from "react-icons/ri";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      navigate("/admin/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side */}
      <div className="login-left">
        <div className="overlay">
          <div className="brand">
            <FaCoffee />
            <span>CafeFlow</span>
          </div>

          <div className="admin-hero-content">
            <p className="welcome-tag">
              WELCOME BACK
            </p>

            <h1>
              Welcome to <br />
              CafeFlow Admin
            </h1>

            <p className="hero-text">
              Sign in to manage your
              reservations, messages,
              and cafe operations.
            </p>
          </div>

          <div className="feature-cards">
            <div className="feature">
              <FaCalendarAlt />
              <h4>Manage Reservations</h4>
              <p>
                View and manage customer
                reservations
              </p>
            </div>

            <div className="feature">
              <FaEnvelope />
              <h4>Messages</h4>
              <p>
                Check and respond to
                customer messages
              </p>
            </div>

            <div className="feature">
              <FaChartBar />
              <h4>Reports</h4>
              <p>
                Track performance and
                view insights
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-icon">
            <RiShieldKeyholeLine />
          </div>

          <h2>Admin Login</h2>

          <p className="subtitle">
            Enter your credentials to
            access the dashboard
          </p>

          {error && (
            <p
              style={{
                color: "red",
                marginBottom: "15px",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>

              <div className="input-box">
                <FaRegEnvelope />

                <input
                  type="email"
                  placeholder="admin@cafeflow.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="input-box">
                <FaLock />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                />

                <FaEye
                  className="eye"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                />
              </div>
            </div>

            <div className="options">
              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="signin-btn"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>

            {/* <div className="divider">
              <span> OR</span>
            </div>

            <button
              type="button"
              className="security-btn"
            >
              <FaLock />
              Sign in with Security Key
            </button> */}
          </form>

          <div className="copyright">
            © 2024 CafeFlow. All rights
            reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;