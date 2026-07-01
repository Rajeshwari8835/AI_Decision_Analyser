const mongoose = require("mongoose");

const dilemmaSchema = new mongoose.Schema(
  {
    mode: {
      type: String,
      enum: ["dilemma", "roadmap", "chat"],
      default: "dilemma",
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "General",
    },

    // ── Dilemma fields ──────────────────────
    analysis: {
      pros: [{ type: String }],
      cons: [{ type: String }],
      suggestion: { type: String, default: "" },
      confidenceLevel: { type: Number, default: 0 },
      confidenceLabel: { type: String, default: "" },
      summary: { type: String, default: "" },
      actionSteps: [{ type: String }],
    },

    // ── Roadmap fields ──────────────────────
    roadmap: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      totalDuration: { type: String, default: "" },
      phases: [
        {
          phase: { type: Number },
          title: { type: String },
          duration: { type: String },
          topics: [{ type: String }],
          resources: [{ type: String }],
        },
      ],
    },

    // ── Chat fields ─────────────────────────
    chat: {
      reply: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dilemma", dilemmaSchema);