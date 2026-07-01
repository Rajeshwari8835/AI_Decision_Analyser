import { useState } from "react";
import { Link } from "react-router-dom";
import DilemmaForm from "../components/DilemmaForm";
import ResultCard from "../components/ResultCard";
import Loader from "../components/Loader";
import { analyzeDilemma } from "../services/api";

function AskPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detectedMode, setDetectedMode] = useState("");

  // ── Handle Form Submit ──
  const handleSubmit = async (question, mode) => {
    try {
      setLoading(true);
      setError("");
      setResult(null);
      setDetectedMode("");

      const response = await analyzeDilemma(question);
      setResult(response.data);
      setDetectedMode(response.data.mode);

    } catch (err) {
      setError("Something went wrong. Please check your API key or try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ── Handle Reset ──
  const handleReset = () => {
    setResult(null);
    setError("");
    setDetectedMode("");
  };

  // ── Mode label for display ──
  const getModeLabel = (mode) => {
    if (mode === "roadmap") return "🗺️ Roadmap";
    if (mode === "chat") return "💬 Chat";
    return "🤔 Dilemma";
  };

  const getModeColor = (mode) => {
    if (mode === "roadmap") return "var(--success)";
    if (mode === "chat") return "var(--secondary)";
    return "var(--accent)";
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

      {/* ── Page Content ── */}
      <div className="page-wrapper">

        {/* ── Page Header ── */}
        <h1 className="page-title">🧠 Ask the AI</h1>
        <p className="page-subtitle">
          Ask a dilemma, request a roadmap, or just have a conversation
        </p>

        {/* ── Mode Tips ── */}
        {!result && !loading && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
            marginBottom: "24px",
          }}>
            <div style={{
              background: "rgba(255, 101, 132, 0.06)",
              border: "1px solid rgba(255, 101, 132, 0.2)",
              borderRadius: "10px",
              padding: "12px 16px",
            }}>
              <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--accent)", marginBottom: "4px" }}>
                🤔 Dilemma Example
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-light)" }}>
                "Should I learn React or Vue?"
              </p>
            </div>

            <div style={{
              background: "rgba(16, 185, 129, 0.06)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              borderRadius: "10px",
              padding: "12px 16px",
            }}>
              <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--success)", marginBottom: "4px" }}>
                🗺️ Roadmap Example
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-light)" }}>
                "Give me a roadmap to learn ML"
              </p>
            </div>

            <div style={{
              background: "rgba(72, 202, 228, 0.06)",
              border: "1px solid rgba(72, 202, 228, 0.2)",
              borderRadius: "10px",
              padding: "12px 16px",
            }}>
              <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--secondary)", marginBottom: "4px" }}>
                💬 Chat Example
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-light)" }}>
                "What is the difference between AI and ML?"
              </p>
            </div>
          </div>
        )}

        {/* ── Form — hide after result ── */}
        {!result && (
          <DilemmaForm
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}

        {/* ── Loader ── */}
        {loading && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div className="loader-spinner" style={{ margin: "0 auto 16px" }}></div>
            <p className="loader-text">🧠 AI is thinking...</p>
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div style={{
            background: "rgba(255, 101, 132, 0.10)",
            border: "1px solid var(--accent)",
            borderRadius: "10px",
            padding: "16px 20px",
            marginTop: "20px",
            color: "var(--accent)",
            fontSize: "14px",
            fontWeight: "500",
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* ── Detected Mode Badge ── */}
        {detectedMode && result && (
          <div style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <span style={{ fontSize: "13px", color: "var(--text-light)" }}>
              AI detected mode:
            </span>
            <span
              className="badge"
              style={{
                background: `${getModeColor(detectedMode)}20`,
                color: getModeColor(detectedMode),
              }}
            >
              {getModeLabel(detectedMode)}
            </span>
          </div>
        )}

        {/* ── Result ── */}
        {result && (
          <>
            <ResultCard data={result} />

            {/* ── Action Buttons ── */}
            <div style={{
              display: "flex",
              gap: "16px",
              marginTop: "24px",
              flexWrap: "wrap",
            }}>
              <button
                className="btn-primary"
                onClick={handleReset}
              >
                🔄 Ask Another Question
              </button>
              <Link to="/history">
                <button className="btn-secondary">
                  📜 View History
                </button>
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default AskPage;