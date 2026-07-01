require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dilemmaRoutes = require("./routes/dilemmaRoutes");

const app = express();

// ── Connect Database ─────────────────────────
connectDB();

// ── Middleware ───────────────────────────────
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "DELETE"],
}));
app.use(express.json());

// ── Health Check ─────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "🧠 AI Decision Helper API is running!" });
});

// ── Routes ───────────────────────────────────
app.use("/api/dilemmas", dilemmaRoutes);

// ── 404 Handler ──────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ── Global Error Handler ─────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});