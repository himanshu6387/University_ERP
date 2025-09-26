import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, Loader2, Shield } from "lucide-react";
import ApiService from "../services/api";
import "./AdminLogin.css"; // Import CSS file

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await ApiService.login(formData);
      localStorage.setItem("adminUser", JSON.stringify(response.user));
      navigate("/adminDashboard");
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Icon */}
        <div className="login-icon">
          <Shield size={40} />
        </div>

        {/* Header */}
        <h2 className="login-title">Admin Login</h2>
        <p className="login-subtitle">Access the Admin Panel</p>

        {/* Error */}
        {error && (
          <div className="error-box">
            <AlertCircle className="error-icon" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading && <Loader2 className="spin" size={18} />}
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="login-footer">
          &copy; {new Date().getFullYear()} Admin Panel. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
