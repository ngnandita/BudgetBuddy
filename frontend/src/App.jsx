import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./Dashboard";

function DashboardPlaceholder() {
  return (
    <main className="auth-page">
      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-card-icon">
            <Wallet size={24} />
          </div>

          <h2>Welcome to BudgetBuddy!</h2>
          <p className="auth-subtitle">
            Your demo login worked. The real financial dashboard
            will be developed in a later milestone.
          </p>

          <Link to="/" className="btn btn-primary auth-submit">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

function NotFound() {
  return (
    <main className="auth-page">
      <div className="auth-form-panel">
        <div className="auth-card">
          <h2>Page not found</h2>
          <p className="auth-subtitle">
            The page you're looking for doesn't exist.
          </p>
          <Link to="/" className="btn btn-primary auth-submit">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
