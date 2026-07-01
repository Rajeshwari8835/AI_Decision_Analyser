import { useNavigate } from "react-router-dom";

function HistoryCard({ data, onDelete }) {
  const { _id, question, category, analysis, createdAt, mode } = data;
  const { confidenceLevel, confidenceLabel, suggestion } = analysis || {};
  const navigate = useNavigate();

  const date = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const confidenceColor =
    confidenceLevel >= 70
      ? "var(--success)"
      : confidenceLevel >= 40
      ? "var(--warning)"
      : "var(--accent)";

  return (
    <div
      className="card"
      style={{ marginBottom: "16px", cursor: "pointer" }}
      onClick={() => navigate(`/history/${_id}`)}
    >
      {/* ── Top Row ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <span className="badge badge-primary">📂 {category}</span>
          {mode === "roadmap" && (
            <span className="badge" style={{ background: "rgba(16,185,129,0.12)", color: "var(--success)" }}>🗺️ Roadmap</span>
          )}
          {mode === "chat" && (
            <span className="badge" style={{ background: "rgba(72,202,228,0.12)", color: "var(--secondary)" }}>💬 Chat</span>
          )}
          {mode === "dilemma" && confidenceLabel && (
            <span className="badge" style={{ background: `${confidenceColor}20`, color: confidenceColor }}>
              {confidenceLabel} — {confidenceLevel}%
            </span>
          )}
        </div>
        <span style={{ fontSize: "12px", color: "var(--text-light)" }}>🗓 {date}</span>
      </div>

      {/* ── Question ── */}
      <h3 style={{ fontSize: "16px", marginBottom: "10px", color: "var(--text-dark)" }}>
        🤔 {question}
      </h3>

      {/* ── Preview ── */}
      <p style={{
        fontSize: "13px",
        color: "var(--text-light)",
        lineHeight: "1.6",
        marginBottom: "16px",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        {mode === "chat" && `🤖 ${data.chat?.reply}`}
        {mode === "roadmap" && `🗺️ ${data.roadmap?.description}`}
        {mode === "dilemma" && `💡 ${suggestion}`}
      </p>

      {/* ── Stats ── */}
      {mode === "dilemma" && (
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <span style={{ fontSize: "13px", color: "var(--success)", fontWeight: "600" }}>✅ {analysis.pros.length} Pros</span>
          <span style={{ fontSize: "13px", color: "var(--accent)", fontWeight: "600" }}>❌ {analysis.cons.length} Cons</span>
          <span style={{ fontSize: "13px", color: "var(--primary)", fontWeight: "600" }}>📋 {analysis.actionSteps.length} Steps</span>
        </div>
      )}
      {mode === "roadmap" && (
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <span style={{ fontSize: "13px", color: "var(--success)", fontWeight: "600" }}>📅 {data.roadmap?.totalDuration}</span>
          <span style={{ fontSize: "13px", color: "var(--primary)", fontWeight: "600" }}>🔢 {data.roadmap?.phases?.length} Phases</span>
        </div>
      )}

      {/* ── Confidence Bar (dilemma only) ── */}
      {mode === "dilemma" && (
        <div style={{ marginBottom: "16px" }}>
          <div className="confidence-bar-track">
            <div className="confidence-bar-fill" style={{ width: `${confidenceLevel}%` }} />
          </div>
        </div>
      )}

      <div className="divider" style={{ margin: "12px 0" }} />

      {/* ── Bottom Row ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "13px", color: "var(--primary)", fontWeight: "500" }}>
          👆 Click to view full details
        </span>
        <button
          className="btn-danger"
          onClick={(e) => {
            e.stopPropagation(); // prevent card click
            onDelete(_id);
          }}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default HistoryCard;