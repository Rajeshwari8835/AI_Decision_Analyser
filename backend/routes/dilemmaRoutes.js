const express = require("express");
const router = express.Router();

const {
  createDilemma,
  getAllDilemmas,
  getDilemmaById,
  deleteDilemma,
  getStats,
} = require("../controllers/dilemmaController");

// ── Stats (must be before /:id) ──────────────
router.get("/stats", getStats);

// ── Main Routes ──────────────────────────────
router.post("/", createDilemma);
router.get("/", getAllDilemmas);
router.get("/:id", getDilemmaById);
router.delete("/:id", deleteDilemma);

module.exports = router;