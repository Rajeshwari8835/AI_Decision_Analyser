import { useState } from "react";

function DilemmaForm({ onSubmit, loading }) {
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState("auto");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim().length < 10) {
      alert("Please enter a meaningful question (at least 10 characters)");
      return;
    }
    onSubmit(question, mode);
  };

  return (
    <div className="card">

      {/* ── Mode Selector ── */}
      <h2 style={{ marginBottom: "8px" }}>💬 Ask Anything</h2>
      <p style={{ color: "var(--text-light)", fontSize: "14px", marginBottom: "20px" }}>
        Choose a mode or let AI detect it automatically
      </p>

      {/* ── Mode Buttons ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
        marginBottom: "24px",
      }}>

        {/* Auto */}
        <button
          type="button"
          onClick={() => setMode("auto")}
          style={{
            padding: "12px 8px",
            borderRadius: "10px",
            border: mode === "auto"
              ? "2px solid var(--primary)"
              : "2px solid var(--border)",
            background: mode === "auto"
              ? "rgba(108, 99, 255, 0.08)"
              : "var(--bg-main)",
            color: mode === "auto" ? "var(--primary)" : "var(--text-light)",
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
            transition: "all 0.2s",
            textAlign: "center",
          }}
        >
          🤖 Auto
          <p style={{ fontSize: "11px", fontWeight: "400", marginTop: "4px" }}>
            AI decides
          </p>
        </button>

        {/* Dilemma */}
        <button
          type="button"
          onClick={() => setMode("dilemma")}
          style={{
            padding: "12px 8px",
            borderRadius: "10px",
            border: mode === "dilemma"
              ? "2px solid var(--accent)"
              : "2px solid var(--border)",
            background: mode === "dilemma"
              ? "rgba(255, 101, 132, 0.08)"
              : "var(--bg-main)",
            color: mode === "dilemma" ? "var(--accent)" : "var(--text-light)",
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
            transition: "all 0.2s",
            textAlign: "center",
          }}
        >
          🤔 Dilemma
          <p style={{ fontSize: "11px", fontWeight: "400", marginTop: "4px" }}>
            Pros & cons
          </p>
        </button>

        {/* Roadmap */}
        <button
          type="button"
          onClick={() => setMode("roadmap")}
          style={{
            padding: "12px 8px",
            borderRadius: "10px",
            border: mode === "roadmap"
              ? "2px solid var(--success)"
              : "2px solid var(--border)",
            background: mode === "roadmap"
              ? "rgba(16, 185, 129, 0.08)"
              : "var(--bg-main)",
            color: mode === "roadmap" ? "var(--success)" : "var(--text-light)",
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
            transition: "all 0.2s",
            textAlign: "center",
          }}
        >
          🗺️ Roadmap
          <p style={{ fontSize: "11px", fontWeight: "400", marginTop: "4px" }}>
            Learning path
          </p>
        </button>

        {/* Chat */}
        <button
          type="button"
          onClick={() => setMode("chat")}
          style={{
            padding: "12px 8px",
            borderRadius: "10px",
            border: mode === "chat"
              ? "2px solid var(--secondary)"
              : "2px solid var(--border)",
            background: mode === "chat"
              ? "rgba(72, 202, 228, 0.08)"
              : "var(--bg-main)",
            color: mode === "chat" ? "var(--secondary)" : "var(--text-light)",
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
            transition: "all 0.2s",
            textAlign: "center",
          }}
        >
          💬 Chat
          <p style={{ fontSize: "11px", fontWeight: "400", marginTop: "4px" }}>
            Just talk
          </p>
        </button>

      </div>

      {/* ── Placeholder based on mode ── */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            {mode === "auto" && "Your Question"}
            {mode === "dilemma" && "Your Dilemma"}
            {mode === "roadmap" && "What do you want to learn?"}
            {mode === "chat" && "Ask me anything"}
          </label>
          <textarea
            className="form-textarea"
            placeholder={
              mode === "auto"
                ? 'Example: "Should I learn React or Python?" or "Give me a roadmap for ML"'
                : mode === "dilemma"
                ? 'Example: "Should I leave my job to start a business?"'
                : mode === "roadmap"
                ? 'Example: "Give me a roadmap to become a full stack developer"'
                : 'Example: "What is the difference between AI and ML?"'
            }
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={5}
            disabled={loading}
          />
          <p style={{
            fontSize: "12px",
            color: question.length < 10 ? "var(--accent)" : "var(--success)",
            marginTop: "6px",
            fontWeight: "500",
          }}>
            {question.length} characters {question.length < 10 ? "(minimum 10)" : "✓"}
          </p>
        </div>

        {/* ── Submit Button ── */}
        <button
          type="submit"
          className="btn-primary"
          disabled={loading || question.trim().length < 10}
          style={{ width: "100%" }}
        >
          {loading
            ? "⏳ AI is thinking..."
            : mode === "roadmap"
            ? "🗺️ Generate Roadmap"
            : mode === "dilemma"
            ? "🤔 Analyze Dilemma"
            : mode === "chat"
            ? "💬 Send Message"
            : "🚀 Ask AI"}
        </button>
      </form>
    </div>
  );
}

export default DilemmaForm;