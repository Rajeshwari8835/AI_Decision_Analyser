import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HistoryCard from "../components/HistoryCard";
import Loader from "../components/Loader";
import { getAllDilemmas, deleteDilemma, getStats } from "../services/api";

function HistoryPage() {
  const [dilemmas, setDilemmas] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ── Fetch all dilemmas on load ──
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [dilemmasRes, statsRes] = await Promise.all([
        getAllDilemmas(),
        getStats(),
      ]);
      setDilemmas(dilemmasRes.data);
      setStats(statsRes.data);
    } catch (err) {
      setError("Failed to load history. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ── Handle Delete ──
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await deleteDilemma(id);
      setDilemmas((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      alert("Failed to delete. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)" }}>

      {/* ── Navbar ── */}
      <nav className="navbar">
        <a className="navbar-logo" href="/">🧠 DilemmaAI</a>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/ask">Ask AI</Link></li>
          <li><Link to="/history">History</Link></li>
        </ul>
      </nav>

      <div className="page-wrapper">

        {/* ── Page Header ── */}
        <h1 className="page-title">📜 Decision History</h1>
        <p className="page-subtitle">
          All your past dilemmas and AI analysis results
        </p>

        {/* ── Stats Section ── */}
        {stats && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "32px",
          }}>

            {/* Total */}
            <div className="card" style={{ textAlign: "center", padding: "20px" }}>
              <p style={{ fontSize: "36px", fontWeight: "700", color: "var(--primary)" }}>
                {stats.total}
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-light)", marginTop: "4px" }}>
                Total Dilemmas
              </p>
            </div>

            {/* Avg Confidence */}
            <div className="card" style={{ textAlign: "center", padding: "20px" }}>
              <p style={{ fontSize: "36px", fontWeight: "700", color: "var(--success)" }}>
                {stats.avgConfidence}%
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-light)", marginTop: "4px" }}>
                Avg Confidence
              </p>
            </div>

            {/* Top Category */}
            <div className="card" style={{ textAlign: "center", padding: "20px" }}>
              <p style={{ fontSize: "24px", fontWeight: "700", color: "var(--secondary)" }}>
                {stats.categoryStats[0]?._id || "N/A"}
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-light)", marginTop: "4px" }}>
                Top Category
              </p>
            </div>

          </div>
        )}

        {/* ── Loading ── */}
        {loading && <Loader />}

        {/* ── Error ── */}
        {error && (
          <div style={{
            background: "rgba(255, 101, 132, 0.10)",
            border: "1px solid var(--accent)",
            borderRadius: "10px",
            padding: "16px 20px",
            color: "var(--accent)",
            fontSize: "14px",
            fontWeight: "500",
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && !error && dilemmas.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🤔</div>
            <h3>No dilemmas yet</h3>
            <p style={{ marginBottom: "24px" }}>
              Ask your first question and it will appear here
            </p>
            <Link to="/ask">
              <button className="btn-primary">
                🚀 Ask AI Now
              </button>
            </Link>
          </div>
        )}

        {/* ── Dilemma List ── */}
        {!loading && dilemmas.length > 0 && (
          <>
            <p style={{
              fontSize: "13px",
              color: "var(--text-light)",
              marginBottom: "16px",
            }}>
              Showing {dilemmas.length} result{dilemmas.length > 1 ? "s" : ""}
            </p>

            {dilemmas.map((dilemma) => (
              <HistoryCard
                key={dilemma._id}
                data={dilemma}
                onDelete={handleDelete}
              />
            ))}
          </>
        )}

      </div>
    </div>
  );
}

export default HistoryPage;