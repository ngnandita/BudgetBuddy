import React, { useState, useMemo } from "react";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  LayoutDashboard,
  CreditCard,
  Target,
  LogOut,
  Plus,
  X,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "./Dashboard.css";

const initialTransactions = [
  {
    id: 1,
    title: "Monthly Allowance",
    category: "Allowance",
    type: "income",
    amount: 35000,
    date: "2026-10-01",
  },
  {
    id: 2,
    title: "Groceries",
    category: "Food",
    type: "expense",
    amount: 1500,
    date: "2026-10-03",
  },
  {
    id: 3,
    title: "Shopping",
    category: "Lifestyle",
    type: "expense",
    amount: 2200,
    date: "2026-10-05",
  },
];

const CATEGORY_COLORS = [
  "#a78bfa",
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#fb7185",
  "#c084fc",
  "#22d3ee",
];

const formatMoney = (amount) =>
  `₹${amount.toLocaleString("en-IN")}`;

export default function Dashboard() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("budgetbuddy_transactions");

      return saved ? JSON.parse(saved) : initialTransactions;
    } catch {
      return initialTransactions;
    }
  });

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date().toLocaleDateString("en-CA"),
  });

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expenses;

  const savings = Math.max(balance, 0);

  
  // Dynamic monthly expense analytics
  const chartData = useMemo(() => {
    const today = new Date();

    const months = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(
        today.getFullYear(),
        today.getMonth() - (5 - index),
        1
      );

      return {
        key: `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`,
        month: date.toLocaleString("en-IN", {
          month: "short",
          year: "2-digit",
        }),
        expenses: 0,
      };
    });

    transactions.forEach((transaction) => {
      if (transaction.type !== "expense") return;

      const monthKey = transaction.date?.slice(0, 7);
      const match = months.find((month) => month.key === monthKey);

      if (match) {
        match.expenses += Number(transaction.amount) || 0;
      }
    });

    return months;
  }, [transactions]);

  // Dynamic category breakdown
  const categoryData = useMemo(() => {
    const totals = {};

    transactions
      .filter((transaction) => transaction.type === "expense")
      .forEach((transaction) => {
        const category = transaction.category || "Other";

        totals[category] =
          (totals[category] || 0) +
          (Number(transaction.amount) || 0);
      });

    return Object.entries(totals)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const highestCategory = categoryData[0] || null;


  const saveTransactions = (updated) => {
    setTransactions(updated);

    localStorage.setItem(
      "budgetbuddy_transactions",
      JSON.stringify(updated)
    );
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();

    const amount = Number(form.amount);

    if (
      !form.title.trim() ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      !form.date
    ) {
      alert("Please enter valid transaction details.");
      return;
    }

    const newTransaction = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      amount,
      type: form.type,
      category: form.category,
      date: form.date,
    };

    saveTransactions([newTransaction, ...transactions]);

    setShowModal(false);

    setForm({
      title: "",
      amount: "",
      type: "expense",
      category: "Food",
      date: new Date().toLocaleDateString("en-CA"),
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("budgetbuddy_logged_in");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-layout">

      <aside className="dashboard-sidebar">
        <h2 className="dashboard-logo">BudgetBuddy</h2>

        <nav>
          <a className="active" href="/dashboard">
            <LayoutDashboard size={19} /> Dashboard
          </a>

          <a href="#transactions">
            <CreditCard size={19} /> Transactions
          </a>

          <a href="#goals">
            <Target size={19} /> Savings Goals
          </a>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={19} /> Logout
        </button>
      </aside>

      <main className="dashboard-main">

        <header className="dashboard-header">
          <div>
            <h1>Financial Dashboard</h1>
            <p>Manage your income and expenses.</p>
          </div>

          <button
            className="add-transaction-btn"
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} />
            Add Transaction
          </button>
        </header>

        <section className="stats-grid">

          <div className="stat-card">
            <Wallet />
            <p>Total Balance</p>
            <h2>{formatMoney(balance)}</h2>
          </div>

          <div className="stat-card">
            <TrendingUp />
            <p>Total Income</p>
            <h2>{formatMoney(income)}</h2>
          </div>

          <div className="stat-card">
            <TrendingDown />
            <p>Total Expenses</p>
            <h2>{formatMoney(expenses)}</h2>
          </div>

          <div className="stat-card">
            <PiggyBank />
            <p>Available Savings</p>
            <h2>{formatMoney(savings)}</h2>
          </div>

        </section>

        
<section className="dashboard-panel">
  <h2>Expense Overview</h2>
  <p>Your spending over the last six calendar months</p>

  <div className="chart-container">
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient
            id="expenseGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#a78bfa"
              stopOpacity={0.45}
            />
            <stop
              offset="95%"
              stopColor="#a78bfa"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="#39304f"
          strokeDasharray="3 3"
        />

        <XAxis dataKey="month" stroke="#aaa" />
        <YAxis stroke="#aaa" />

        <Tooltip
          formatter={(value) => formatMoney(Number(value))}
          contentStyle={{
            background: "#211a32",
            border: "1px solid #493961",
            borderRadius: "10px",
            color: "#fff",
          }}
        />

        <Area
          type="monotone"
          dataKey="expenses"
          stroke="#a78bfa"
          strokeWidth={3}
          fill="url(#expenseGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
</section>

<section className="dashboard-panel">
  <h2>Expense Categories</h2>
  <p>Understand where your money is going</p>

  {categoryData.length === 0 ? (
    <p className="analytics-empty">
      No expense data yet. Add an expense to see analytics.
    </p>
  ) : (
    <div className="category-analytics">
      <div className="category-chart">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={
                    CATEGORY_COLORS[index % CATEGORY_COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => formatMoney(Number(value))}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="category-list">
        {categoryData.map((category, index) => (
          <div className="category-item" key={category.name}>
            <div className="category-name">
              <span
                className="category-dot"
                style={{
                  background:
                    CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                }}
              />
              <span>{category.name}</span>
            </div>

            <strong>{formatMoney(category.value)}</strong>
          </div>
        ))}
      </div>
    </div>
  )}
</section>

<section className="dashboard-panel">
  <h2>Spending Insights</h2>

  {highestCategory ? (
    <div className="spending-insight">
      <p>Your highest spending category is</p>
      <h2>{highestCategory.name}</h2>
      <h3>{formatMoney(highestCategory.value)}</h3>
      <p>
        {expenses > 0
          ? `${((highestCategory.value / expenses) * 100).toFixed(1)}% of your recorded expenses`
          : "No spending recorded"}
      </p>
    </div>
  ) : (
    <p>Add an expense to generate spending insights.</p>
  )}
</section>


          <p>Sample monthly spending trend</p>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid
                  stroke="#39304f"
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#a78bfa"
                  strokeWidth={3}
                  fill="#a78bfa"
                  fillOpacity={0.15}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        

        <section className="dashboard-panel" id="transactions">
          <h2>Recent Transactions</h2>

          {transactions.length === 0 && (
            <p>No transactions added yet.</p>
          )}

          {transactions.map((item) => (
            <div className="transaction-row" key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.category} • {item.date}</p>
              </div>

              <span
                style={{
                  color:
                    item.type === "income"
                      ? "#4ade80"
                      : "#ff8f9a",
                }}
              >
                {item.type === "income" ? "+" : "-"}
                {formatMoney(Number(item.amount))}
              </span>
            </div>
          ))}
        </section>

        <section className="dashboard-panel" id="goals">
          <h2>Savings Goal</h2>
          <p>Emergency Fund — demo target</p>

          <h3>
            {formatMoney(savings)} / ₹50,000
          </h3>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(
                  (savings / 50000) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </section>
      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="transaction-modal">

            <div className="modal-header">
              <h2>Add New Transaction</h2>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleAddTransaction}>

              <label>Transaction Type</label>

              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                    category:
                      e.target.value === "income"
                        ? "Allowance"
                        : "Food",
                  })
                }
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <label>Title</label>

              <input
                type="text"
                placeholder="e.g. College Canteen"
                value={form.title}
                required
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <label>Amount (₹)</label>

              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter amount"
                value={form.amount}
                required
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
              />

              <label>Category</label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                {(form.type === "income"
                  ? ["Allowance", "Salary", "Freelance", "Other"]
                  : [
                      "Food",
                      "Travel",
                      "Shopping",
                      "Education",
                      "Entertainment",
                      "Bills",
                      "Other",
                    ]
                ).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <label>Date</label>

              <input
                type="date"
                value={form.date}
                required
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />

              <button className="save-transaction-btn" type="submit">
                Save Transaction
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
