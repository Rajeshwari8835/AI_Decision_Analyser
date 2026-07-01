import { Link } from "react-router-dom";

function Home() {
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

      {/* ── Hero Section ── */}
      <div style={{ textAlign: "center", padding: "80px 20px 60px" }}>

        

        {/* Heading */}
        <h1 style={{ fontSize: "48px", fontWeight: "700", lineHeight: "1.2", marginBottom: "20px", maxWidth: "700px", margin: "0 auto 20px" }}>
          Make Better Decisions
          <span style={{ color: "var(--primary)", display: "block" }}>
            with AI Guidance
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: "18px", color: "var(--text-light)", maxWidth: "520px", margin: "0 auto 40px", lineHeight: "1.7" }}>
          Stuck between two choices? Describe your dilemma and get a structured AI analysis with pros, cons, and a clear suggestion.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/ask">
            <button className="btn-primary" style={{ fontSize: "17px", padding: "16px 40px" }}>
              🚀 Ask AI Now
            </button>
          </Link>
          <Link to="/history">
            <button className="btn-secondary" style={{ fontSize: "17px", padding: "16px 40px" }}>
              📜 View History
            </button>
          </Link>
        </div>
      </div>

      {/* ── Features Section ── */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px 80px" }}>

        <h2 style={{ textAlign: "center", fontSize: "28px", marginBottom: "40px" }}>
          What You Get
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>

          {/* Feature 1 */}
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>✅</div>
            <h3 style={{ fontSize: "17px", marginBottom: "10px" }}>Pros & Cons</h3>
            <p style={{ fontSize: "14px", color: "var(--text-light)", lineHeight: "1.6" }}>
              Get a clear breakdown of advantages and disadvantages for your situation
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>💡</div>
            <h3 style={{ fontSize: "17px", marginBottom: "10px" }}>AI Suggestion</h3>
            <p style={{ fontSize: "14px", color: "var(--text-light)", lineHeight: "1.6" }}>
              Receive a clear, actionable recommendation tailored to your dilemma
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>📊</div>
            <h3 style={{ fontSize: "17px", marginBottom: "10px" }}>Confidence Score</h3>
            <p style={{ fontSize: "14px", color: "var(--text-light)", lineHeight: "1.6" }}>
              See how confident the AI is about its recommendation with a score
            </p>
          </div>

          {/* Feature 4 */}
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>📜</div>
            <h3 style={{ fontSize: "17px", marginBottom: "10px" }}>Decision History</h3>
            <p style={{ fontSize: "14px", color: "var(--text-light)", lineHeight: "1.6" }}>
              All your past dilemmas are saved so you can revisit them anytime
            </p>
          </div>

          {/* Feature 5 */}
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>📋</div>
            <h3 style={{ fontSize: "17px", marginBottom: "10px" }}>Action Steps</h3>
            <p style={{ fontSize: "14px", color: "var(--text-light)", lineHeight: "1.6" }}>
              Get 3 clear steps to take action on your decision immediately
            </p>
          </div>

          {/* Feature 6 */}
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>⚡</div>
            <h3 style={{ fontSize: "17px", marginBottom: "10px" }}>Instant Analysis</h3>
            <p style={{ fontSize: "14px", color: "var(--text-light)", lineHeight: "1.6" }}>
              Get your full AI analysis in seconds — no waiting, no signup needed
            </p>
          </div>

        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ textAlign: "center", padding: "24px", borderTop: "1px solid var(--border)", color: "var(--text-light)", fontSize: "14px" }}>
        Built with ❤️ using React + Node.js 
      </div>

    </div>
  );
}

export default Home;