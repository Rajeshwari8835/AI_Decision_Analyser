const Dilemma = require("../models/Dilemma");
const { analyzeDilemma } = require("../services/aiService");

// ── POST /api/dilemmas ───────────────────────
const createDilemma = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Please enter a meaningful question (at least 10 characters).",
      });
    }

    // Call AI service
    const aiResult = await analyzeDilemma(question.trim());
    const mode = aiResult.mode;

    // ── Build save object based on mode ──
    const saveData = {
      mode,
      question: question.trim(),
      category: aiResult.category || "General",
    };

    if (mode === "dilemma") {
      saveData.analysis = {
        pros: aiResult.pros || [],
        cons: aiResult.cons || [],
        suggestion: aiResult.suggestion || "",
        confidenceLevel: aiResult.confidenceLevel || 0,
        confidenceLabel: aiResult.confidenceLabel || "Medium",
        summary: aiResult.summary || "",
        actionSteps: aiResult.actionSteps || [],
      };
    }

    if (mode === "roadmap") {
      saveData.roadmap = {
        title: aiResult.title || "",
        description: aiResult.description || "",
        totalDuration: aiResult.totalDuration || "",
        phases: aiResult.phases || [],
      };
    }

    if (mode === "chat") {
      saveData.chat = {
        reply: aiResult.reply || "",
      };
    }

    // Save to MongoDB
    const dilemma = await Dilemma.create(saveData);

    return res.status(201).json({
      success: true,
      data: dilemma,
    });

  } catch (error) {
    console.error("❌ createDilemma error:", error.message);
    return res.status(500).json({
      success: false,
      message: "AI analysis failed. Please try again.",
      error: error.message,
    });
  }
};

// ── GET /api/dilemmas ────────────────────────
const getAllDilemmas = async (req, res) => {
  try {
    const dilemmas = await Dilemma.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    return res.status(200).json({
      success: true,
      count: dilemmas.length,
      data: dilemmas,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch history.",
      error: error.message,
    });
  }
};

// ── GET /api/dilemmas/:id ────────────────────
const getDilemmaById = async (req, res) => {
  try {
    const dilemma = await Dilemma.findById(req.params.id).select("-__v");

    if (!dilemma) {
      return res.status(404).json({
        success: false,
        message: "Dilemma not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: dilemma,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

// ── DELETE /api/dilemmas/:id ─────────────────
const deleteDilemma = async (req, res) => {
  try {
    const dilemma = await Dilemma.findByIdAndDelete(req.params.id);

    if (!dilemma) {
      return res.status(404).json({
        success: false,
        message: "Dilemma not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

// ── GET /api/dilemmas/stats ──────────────────
const getStats = async (req, res) => {
  try {
    const total = await Dilemma.countDocuments();

    const categoryStats = await Dilemma.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const modeStats = await Dilemma.aggregate([
      { $group: { _id: "$mode", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const avgConfidence = await Dilemma.aggregate([
      { $match: { mode: "dilemma" } },
      { $group: { _id: null, avg: { $avg: "$analysis.confidenceLevel" } } },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        total,
        categoryStats,
        modeStats,
        avgConfidence: avgConfidence[0]?.avg?.toFixed(1) || 0,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stats.",
      error: error.message,
    });
  }
};

module.exports = {
  createDilemma,
  getAllDilemmas,
  getDilemmaById,
  deleteDilemma,
  getStats,
};