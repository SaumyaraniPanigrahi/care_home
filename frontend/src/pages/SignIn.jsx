import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";
function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    // For now, we are not connecting an API.
    // After clicking Sign In, go to Portal User Search.
    navigate("/portal-users");
  };
  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(
      login({
        email: email,
        password: password,
      }),
    );
    navigate("/portal-users");
  };
  return (
    <div className="signin-page">
      <div className="signin-card">
        <div className="signin-logo">
          <span className="logo-symbol">Care</span>
          <span className="logo-text">CARE SERVICES</span>
        </div>

        <h2>Sign In</h2>

        <p className="signin-subtitle">
          Sign in to Care Services Prescription Portal
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="btn signin-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
