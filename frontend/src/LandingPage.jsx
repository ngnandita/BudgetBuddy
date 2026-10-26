import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Target,
  PieChart,
  Bell,
  ShieldCheck,
  FileBarChart,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Heart,
  Plus,
  Coffee,
  GraduationCap,
  ShoppingBag,
  CircleDollarSign
} from "lucide-react";

import Navbar from "./components/Navbar";
import "./index.css";

const features = [
  {
    icon: Wallet,
    title: "Expense Tracking",
    description: "Track your daily spending and understand exactly where your money goes."
  },
  {
    icon: PieChart,
    title: "Smart Budget Planning",
    description: "Create monthly budgets and manage category-wise spending limits."
  },
  {
    icon: Target,
    title: "Savings Goals",
    description: "Set personal savings targets and visualize your progress."
  },
  {
    icon: TrendingUp,
    title: "Financial Analytics",
    description: "Understand your financial habits through interactive charts and insights."
  },
  {
    icon: Bell,
    title: "Budget Alerts",
    description: "Stay informed when your spending approaches your planned budget."
  },
  {
    icon: FileBarChart,
    title: "Financial Reports",
    description: "Generate monthly summaries and export your financial reports."
  }
];

const transactions = [
  {
    icon: Coffee,
    name: "Food & Coffee",
    category: "Food",
    amount: "-₹250",
    className: "orange"
  },
  {
    icon: GraduationCap,
    name: "Scholarship",
    category: "Income",
    amount: "+₹5,000",
    className: "green"
  },
  {
    icon: ShoppingBag,
    name: "Shopping",
    category: "Shopping",
    amount: "-₹850",
    className: "purple"
  }
];

function DashboardPreview() {
  return (
    <div className="dashboard-preview">

      <div className="preview-header">
        <div>
          <span className="preview-label">YOUR OVERVIEW</span>
          <h3>Financial Dashboard</h3>
        </div>
        <span className="live-badge">
          <span className="live-dot"></span>
          Demo Preview
        </span>
      </div>

      <div className="balance-card">
        <div className="balance-top">
          <span>Total Balance</span>
          <Wallet size={22} />
        </div>

        <h2>₹12,450.00</h2>

        <div className="balance-bottom">
          <span>
            <ArrowUpRight size={15} />
            +12.5% this month
          </span>
          <span>October 2026</span>
        </div>
      </div>

      <div className="preview-stats">

        <div className="mini-stat">
          <span className="stat-label">
            <ArrowDownRight size={17} />
            Income
          </span>
          <h3>₹18,000</h3>
          <span className="stat-change positive">Monthly income</span>
        </div>

        <div className="mini-stat">
          <span className="stat-label">
            <ArrowUpRight size={17} />
            Expenses
          </span>
          <h3>₹5,550</h3>
          <span className="stat-change">Monthly spending</span>
        </div>

      </div>

      <div className="spending-card">
        <div className="section-row">
          <h4>Monthly Budget</h4>
          <span>69%</span>
        </div>

        <div className="progress-track">
          <div className="progress-fill"></div>
        </div>

        <div className="budget-info">
          <span>₹5,550 spent</span>
          <span>₹8,000 budget</span>
        </div>
      </div>

      <div className="transactions-card">
        <div className="section-row">
          <h4>Recent Transactions</h4>
          <span className="muted-small">Demo data</span>
        </div>

        {transactions.map((transaction, index) => {
          const Icon = transaction.icon;

          return (
            <div className="transaction" key={index}>
              <div className={`transaction-icon ${transaction.className}`}>
                <Icon size={18} />
              </div>

              <div className="transaction-info">
                <strong>{transaction.name}</strong>
                <span>{transaction.category}</span>
              </div>

              <strong className={transaction.amount.startsWith("+") ? "positive" : ""}>
                {transaction.amount}
              </strong>
            </div>
          );
        })}
      </div>

    </div>
  );
}

function App() {
  return (
    <div className="app">

      <Navbar />

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-glow"></div>

        <div className="container hero-grid">

          <div className="hero-content">

            <div className="eyebrow">
              <Sparkles size={15} />
              YOUR MONEY. YOUR FUTURE.
            </div>

            <h1>
              Take Control of
              <br />
              Your Money.
              <br />
              <span>Build Your Future.</span>
            </h1>

            <p className="hero-description">
              Meet BudgetBuddy — your personal finance companion.
              Track expenses, plan smarter budgets, achieve savings
              goals and build better money habits, all in one place.
            </p>

            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary btn-large">
  Start Your Journey
  <ArrowRight size={19} />
</Link>

              <a href="#features" className="btn btn-outline btn-large">
                Explore Features
              </a>
            </div>

            <div className="hero-benefits">
              <span><CheckCircle2 size={17} /> Student Friendly</span>
              <span><CheckCircle2 size={17} /> Easy to Use</span>
              <span><CheckCircle2 size={17} /> Smart Insights</span>
            </div>

          </div>

          <div className="hero-visual">
            <div className="floating-tag tag-top">
              <Target size={17} />
              Track your goals
            </div>

            <DashboardPreview />

            <div className="floating-tag tag-bottom">
              <TrendingUp size={17} />
              Smarter money habits
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features section-padding" id="features">
        <div className="container">

          <div className="section-heading">
            <span className="section-tag">POWERFUL FEATURES</span>

            <h2>
              Everything You Need to
              <br />
              <span>Manage Money Smarter.</span>
            </h2>

            <p>
              Simple, powerful tools designed to make personal
              finance management easier for students.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div className="feature-card" key={index}>
                  <div className="feature-icon">
                    <Icon size={25} />
                  </div>

                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>

                  <span className="feature-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section section-padding" id="how-it-works">
        <div className="container">

          <div className="section-heading">
            <span className="section-tag">SIMPLE & EFFECTIVE</span>
            <h2>How BudgetBuddy <span>Works</span></h2>
            <p>Start managing your finances in three simple steps.</p>
          </div>

          <div className="steps-grid">

            <div className="step-card">
              <span className="step-number">01</span>
              <div className="step-icon">
                <ShieldCheck size={29} />
              </div>
              <h3>Create Your Account</h3>
              <p>
                Register securely and set up your personal
                financial profile.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number">02</span>
              <div className="step-icon">
                <Plus size={29} />
              </div>
              <h3>Track Your Money</h3>
              <p>
                Add income, record expenses and organize
                your monthly budget.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number">03</span>
              <div className="step-icon">
                <CircleDollarSign size={29} />
              </div>
              <h3>Achieve Your Goals</h3>
              <p>
                Monitor your progress, explore insights
                and build better saving habits.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section section-padding" id="about">
        <div className="container about-grid">

          <div className="about-visual">
            <div className="about-icon-circle">
              <Wallet size={65} strokeWidth={1.4} />
            </div>
            <div className="about-small-card">
              <Target size={21} />
              <div>
                <strong>Plan. Track. Save.</strong>
                <span>One smart platform</span>
              </div>
            </div>
          </div>

          <div className="about-content">
            <span className="section-tag">ABOUT BUDGETBUDDY</span>

            <h2>
              Financial Freedom
              <br />
              Starts With
              <span> Better Habits.</span>
            </h2>

            <p>
              BudgetBuddy is a student-focused personal budget
              planning and expense management platform.
              Our goal is to make financial tracking simple,
              accessible and insightful.
            </p>

            <p>
              Whether you want to manage your pocket money,
              track scholarship income or save for your next
              big goal, BudgetBuddy brings your financial
              planning together.
            </p>

            <a href="#features" className="btn btn-outline">
              Discover Features <ArrowRight size={18} />
            </a>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section" id="get-started">
        <div className="container">

          <div className="cta-box">
            <div className="cta-glow"></div>

            <Sparkles size={31} className="cta-sparkle" />

            <h2>
              Your Financial Journey
              <br />
              Starts Here.
            </h2>

            <p>
              A smarter way to plan your budget,
              understand spending and reach your goals.
            </p>

            <span className="coming-soon">
              Secure registration and login — coming in Part 3
            </span>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">

          <div className="footer-top">

            <div className="footer-brand">
              <a href="#home" className="logo">
                <span className="logo-icon">
                  <Wallet size={22} />
                </span>
                Budget<span>Buddy</span>
              </a>

              <p>
                Your personal companion for smarter
                budgeting and financial planning.
              </p>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <a href="#home">Home</a>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#about">About</a>
            </div>

            <div className="footer-links">
              <h4>Project</h4>
              <span>React.js</span>
              <span>Django REST Framework</span>
              <span>JWT Authentication</span>
              <span>PostgreSQL</span>
            </div>

            <div className="footer-links">
              <h4>Development</h4>
              <span className="footer-tech">
                GitHub Project
                </span>
              
              <span>Full-Stack Application</span>
              <span>Built for Students</span>
            </div>

          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} BudgetBuddy. All rights reserved.</span>

            <span>
              Made with <Heart size={15} fill="currentColor" />
              for smarter financial habits.
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;
