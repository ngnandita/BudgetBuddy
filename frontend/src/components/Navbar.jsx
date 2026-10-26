import { Link } from "react-router-dom";
import { useState } from "react";
import { Wallet, Menu, X, ArrowRight } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-container">

        <a href="#home" className="logo" onClick={closeMenu}>
          <span className="logo-icon">
            <Wallet size={23} />
          </span>
          Budget<span>Buddy</span>
        </a>

        <nav className={menuOpen ? "nav-links active" : "nav-links"}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#features" onClick={closeMenu}>Features</a>
          <a href="#how-it-works" onClick={closeMenu}>How It Works</a>
          <a href="#about" onClick={closeMenu}>About</a>

          <div className="mobile-actions">
            <a href="#get-started" onClick={closeMenu}>Login</a>
            <a href="#get-started" className="btn btn-primary" onClick={closeMenu}>
              Get Started <ArrowRight size={17} />
            </a>
          </div>
        </nav>

        <div className="nav-actions">
            <Link to="/login" className="login-link">Login</Link>
            <Link to="/register" className="btn btn-primary nav-cta">Get Started <ArrowRight size={17} /></Link>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

      </div>
    </header>
  );
}

export default Navbar;
