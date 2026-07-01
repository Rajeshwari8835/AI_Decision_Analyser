function ResultCard({ data }) {
  const { question, category, mode, analysis, roadmap, chat } = data;

  // ── Confidence color ──
  const confidenceColor =
    analysis?.confidenceLevel >= 70
      ? "var(--success)"
      : analysis?.confidenceLevel >= 40
      ? "var(--warning)"
      : "var(--accent)";

  // ════════════════════════════════════════
  // 💬 CHAT MODE
  // ════════════════════════════════════════
  if (mode === "chat") {
    return (
      <div className="card" style={{ marginTop: "24px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span className="badge badge-primary">📂 {category}</span>
          <span className="badge" style={{ background: "rgba(72, 202, 228, 0.12)", color: "var(--secondary)" }}>
            💬 Chat
          </span>
        </div>

        {/* Question */}
        <h2 style={{ fontSize: "17px", marginBottom: "16px" }}>
          ❓ {question}
        </h2>

        <div className="divider" />

        {/* Reply */}
        <div style={{
          background: "rgba(72, 202, 228, 0.06)",
          border: "1px solid rgba(72, 202, 228, 0.2)",
          borderRadius: "10px",
          padding: "20px",
        }}>
          <p style={{ fontSize: "15px", color: "var(--text-dark)", lineHeight: "1.8" }}>
            🤖 {chat?.reply}
          </p>
        </div>

      </div>
    );
  }

  // ════════════════════════════════════════
  // 🗺️ ROADMAP MODE
  // ════════════════════════════════════════
  if (mode === "roadmap") {
    return (
      <div className="card" style={{ marginTop: "24px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span className="badge badge-primary">📂 {category}</span>
          <span className="badge" style={{ background: "rgba(16, 185, 129, 0.12)", color: "var(--success)" }}>
            🗺️ Roadmap
          </span>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>
          {roadmap?.title}
        </h2>

        {/* Description */}
        <p style={{ fontSize: "14px", color: "var(--text-light)", marginBottom: "8px" }}>
          {roadmap?.description}
        </p>

        {/* Total Duration */}
        <span className="badge badge-success" style={{ marginBottom: "24px", display: "inline-block" }}>
          ⏱ Total Duration: {roadmap?.totalDuration}
        </span>

        <div className="divider" />

        {/* Phases */}
        <h3 style={{ fontSize: "16px", marginBottom: "16px", color: "var(--text-dark)" }}>
          📋 Learning Phases
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {roadmap?.phases?.map((phase, index) => (
            <div
              key={index}
              style={{
                border: "1px solid var(--border)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {/* Phase Header */}
              <div style={{
                background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                padding: "12px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: "700",
                    flexShrink: 0,
                  }}>
                    {phase.phase}
                  </span>
                  <span style={{ color: "white", fontWeight: "600", fontSize: "15px" }}>
                    {phase.title}
                  </span>
                </div>
                <span style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "500",
                }}>
                  ⏱ {phase.duration}
                </span>
              </div>

              {/* Phase Body */}
              <div style={{ padding: "16px", background: "var(--bg-main)" }}>

                {/* Topics */}
                <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-dark)", marginBottom: "10px" }}>
                  📚 Topics
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
                  {phase.topics?.map((topic, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(108, 99, 255, 0.10)",
                        color: "var(--primary)",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Resources */}
                <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-dark)", marginBottom: "10px" }}>
                  🔗 Resources
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {phase.resources?.map((resource, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "13px",
                        color: "var(--text-dark)",
                      }}
                    >
                      <span style={{ color: "var(--success)", fontSize: "12px" }}>✅</span>
                      {resource}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════
  // 🤔 DILEMMA MODE (default)
  // ════════════════════════════════════════
  return (
    <div className="card" style={{ marginTop: "24px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span className="badge badge-primary">📂 {category}</span>
        <span
          className="badge"
          style={{
            background: `${confidenceColor}20`,
            color: confidenceColor,
          }}
        >
          {analysis?.confidenceLabel} Confidence
        </span>
      </div>

      {/* Question */}
      <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>
        🤔 {question}
      </h2>

      {/* Summary */}
      <p style={{ color: "var(--text-light)", fontSize: "14px", marginBottom: "20px" }}>
        {analysis?.summary}
      </p>

      <div className="divider" />

      {/* Pros and Cons */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>

        {/* Pros */}
        <div>
          <h3 style={{ fontSize: "15px", marginBottom: "12px", color: "var(--success)" }}>
            ✅ Pros
          </h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
            {analysis?.pros?.map((pro, index) => (
              <li
                key={index}
                style={{
                  background: "rgba(16, 185, 129, 0.08)",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "var(--text-dark)",
                  borderLeft: "3px solid var(--success)",
                }}
              >
                {pro}
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div>
          <h3 style={{ fontSize: "15px", marginBottom: "12px", color: "var(--accent)" }}>
            ❌ Cons
          </h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
            {analysis?.cons?.map((con, index) => (
              <li
                key={index}
                style={{
                  background: "rgba(255, 101, 132, 0.08)",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "var(--text-dark)",
                  borderLeft: "3px solid var(--accent)",
                }}
              >
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="divider" />

      {/* Suggestion */}
      <div style={{
        background: "rgba(108, 99, 255, 0.06)",
        border: "1px solid rgba(108, 99, 255, 0.2)",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "20px",
      }}>
        <h3 style={{ fontSize: "15px", marginBottom: "8px", color: "var(--primary)" }}>
          💡 Suggestion
        </h3>
        <p style={{ fontSize: "14px", color: "var(--text-dark)", lineHeight: "1.7" }}>
          {analysis?.suggestion}
        </p>
      </div>

      {/* Action Steps */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontSize: "15px", marginBottom: "12px", color: "var(--text-dark)" }}>
          📋 Action Steps
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {analysis?.actionSteps?.map((step, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                background: "var(--bg-main)",
                padding: "12px 16px",
                borderRadius: "8px",
              }}
            >
              <span style={{
                background: "var(--primary)",
                color: "white",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "700",
                flexShrink: 0,
              }}>
                {index + 1}
              </span>
              <p style={{ fontSize: "14px", color: "var(--text-dark)", marginTop: "2px" }}>
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* Confidence Bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <h3 style={{ fontSize: "14px", color: "var(--text-dark)" }}>
            📊 Confidence Level
          </h3>
          <span style={{ fontSize: "14px", fontWeight: "700", color: confidenceColor }}>
            {analysis?.confidenceLevel}%
          </span>
        </div>
        <div className="confidence-bar-track">
          <div
            className="confidence-bar-fill"
            style={{ width: `${analysis?.confidenceLevel}%` }}
          />
        </div>
      </div>

    </div>
  );
}

export default ResultCard;