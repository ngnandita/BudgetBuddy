
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wallet,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import "../Auth.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Demo only: real authentication comes with the backend.
    const demoUser = localStorage.getItem("budgetbuddy_demo_user");

    if (demoUser) {
      const user = JSON.parse(demoUser);

      if (
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
      ) {
        localStorage.setItem("budgetbuddy_demo_session", "true");
        navigate("/dashboard");
        return;
      }
    }

    setError(
      "Demo account not found. Please register first, or use your registered demo credentials."
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />

      <Link to="/" className="auth-back-home">
        <span>←</span> Back to home
      </Link>

      <div className="auth-layout">
        <section className="auth-showcase">
          <Link to="/" className="logo auth-logo">
            <span className="logo-icon">
              <Wallet size={23} />
            </span>
            Budget<span>Buddy</span>
          </Link>

          <div className="auth-showcase-content">
            <span className="auth-eyebrow">
              <Sparkles size={15} />
              YOUR FINANCIAL JOURNEY
            </span>

            <h1>
              Your money.
              <br />
              Your goals.
              <br />
              <span>Your future.</span>
            </h1>

            <p>
              Take charge of your spending, build better
              habits and make every rupee count.
            </p>

            <div className="auth-points">
              <div>
                <ShieldCheck size={20} />
                <span>Personal finance management</span>
              </div>
              <div>
                <LockKeyhole size={20} />
                <span>Authentication integration coming next</span>
              </div>
            </div>
          </div>

          <p className="auth-side-footer">
            Small steps today. Smarter finances tomorrow.
          </p>
        </section>

        <section className="auth-form-panel">
          <div className="auth-card">
            <div className="auth-card-icon">
              <LockKeyhole size={24} />
            </div>

            <span className="section-tag">WELCOME BACK</span>

            <h2>Sign in to BudgetBuddy</h2>

            <p className="auth-subtitle">
              Enter your details to continue.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="login-email">Email address</label>

              <div className="auth-input-wrap">
                <Mail size={18} />
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label htmlFor="login-password">Password</label>

              <div className="auth-input-wrap">
                <LockKeyhole size={18} />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {error && (
                <p className="auth-error" role="alert">{error}</p>
              )}

              <button type="submit" className="btn btn-primary auth-submit">
                Sign In <ArrowRight size={18} />
              </button>
            </form>

            <p className="auth-switch">
              Don't have an account?{" "}
              <Link to="/register">Create account</Link>
            </p>

            <p className="auth-demo-note">
              Demo UI only · Secure backend authentication is not enabled yet.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
