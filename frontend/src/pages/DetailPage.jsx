import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import Loader from "../components/Loader";
import { getDilemmaById } from "../services/api";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await getDilemmaById(id);
        setData(res.data);
      } catch (err) {
        setError("Failed to load. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

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

        {/* ── Back Button ── */}
        <button
          className="btn-secondary"
          onClick={() => navigate("/history")}
          style={{ marginBottom: "24px" }}
        >
          ← Back to History
        </button>

        {/* ── Loading ── */}
        {loading && <Loader />}

        {/* ── Error ── */}
        {error && (
          <div style={{
            background: "rgba(255,101,132,0.10)",
            border: "1px solid var(--accent)",
            borderRadius: "10px",
            padding: "16px 20px",
            color: "var(--accent)",
            fontSize: "14px",
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* ── Full Detail ── */}
        {data && <ResultCard data={data} />}

      </div>
    </div>
  );
}

export default DetailPage;