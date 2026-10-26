
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wallet,
  Eye,
  EyeOff,
  UserRound,
  Mail,
  LockKeyhole,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import "../Auth.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const existing = localStorage.getItem("budgetbuddy_demo_user");

      if (existing) {
        const user = JSON.parse(existing);

        if (user.email.toLowerCase() === email.trim().toLowerCase()) {
          setError("This demo email is already registered. Please sign in.");
          return;
        }
      }

      // Demo only. Never store real passwords in localStorage.
      localStorage.setItem(
        "budgetbuddy_demo_user",
        JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password
        })
      );

      navigate("/login", {
        state: { registered: true }
      });
    } catch {
      setError("Unable to save the demo account in this browser.");
    }
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
              START SOMETHING SMART
            </span>

            <h1>
              Better habits.
              <br />
              Bigger goals.
              <br />
              <span>Brighter future.</span>
            </h1>

            <p>
              Start your journey towards smarter budgeting
              and more confident financial decisions.
            </p>

            <div className="auth-points">
              <div>
                <CheckCircle2 size={20} />
                <span>Organize your personal finances</span>
              </div>
              <div>
                <CheckCircle2 size={20} />
                <span>Plan budgets and savings goals</span>
              </div>
            </div>
          </div>

          <p className="auth-side-footer">
            Your journey to smarter money habits starts here.
          </p>
        </section>

        <section className="auth-form-panel">
          <div className="auth-card">
            <div className="auth-card-icon">
              <UserRound size={24} />
            </div>

            <span className="section-tag">CREATE YOUR ACCOUNT</span>

            <h2>Join BudgetBuddy</h2>

            <p className="auth-subtitle">
              Create your account to get started.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="register-name">Full name</label>

              <div className="auth-input-wrap">
                <UserRound size={18} />
                <input
                  id="register-name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <label htmlFor="register-email">Email address</label>

              <div className="auth-input-wrap">
                <Mail size={18} />
                <input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label htmlFor="register-password">Password</label>

              <div className="auth-input-wrap">
                <LockKeyhole size={18} />
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
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

              <label htmlFor="register-confirm">Confirm password</label>

              <div className="auth-input-wrap">
                <LockKeyhole size={18} />
                <input
                  id="register-confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {error && (
                <p className="auth-error" role="alert">{error}</p>
              )}

              <button type="submit" className="btn btn-primary auth-submit">
                Create Account <ArrowRight size={18} />
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?{" "}
              <Link to="/login">Sign in</Link>
            </p>

            <p className="auth-demo-note">
              Demo registration only · Backend integration comes next.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Register;
