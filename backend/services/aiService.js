const Groq = require("groq-sdk");

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ── Detect mode from question ─────────────
const detectMode = (question) => {
  const q = question.toLowerCase();

  const roadmapKeywords = [
    "roadmap", "learning path", "how to learn", "guide to",
    "path to", "steps to become", "how do i become",
    "plan to learn", "where to start", "how to start",
  ];

  const dilemmaKeywords = [
    "should i", "which is better", "or", "vs",
    "choose between", "what should i", "is it worth",
    "better to", "which one",
  ];

  if (roadmapKeywords.some((k) => q.includes(k))) return "roadmap";
  if (dilemmaKeywords.some((k) => q.includes(k))) return "dilemma";
  return "chat";
};

// ── Dilemma Prompt ────────────────────────
const getDilemmaPrompt = (question) => `
You are an expert decision analyst.

User's Dilemma: "${question}"

Respond ONLY with a valid JSON object (no markdown, no extra text):
{
  "category": "Career / Tech / Personal / Finance / Education / Lifestyle / Other",
  "summary": "A 2-sentence neutral overview of the dilemma",
  "pros": ["pro 1", "pro 2", "pro 3", "pro 4"],
  "cons": ["con 1", "con 2", "con 3", "con 4"],
  "suggestion": "A clear, actionable recommendation in 2-3 sentences",
  "actionSteps": ["Step 1", "Step 2", "Step 3"],
  "confidenceLevel": 78,
  "confidenceLabel": "High"
}

Rules:
- pros and cons must each have 3 to 5 items
- actionSteps must have exactly 3 items
- confidenceLevel is a number between 0 and 100
- confidenceLabel is one of: Low, Medium, High
- No markdown formatting in any field
`;

// ── Roadmap Prompt ────────────────────────
const getRoadmapPrompt = (question) => `
You are an expert learning coach and career advisor.

User Request: "${question}"

Respond ONLY with a valid JSON object (no markdown, no extra text):
{
  "category": "Tech / Career / Education / Other",
  "title": "Complete roadmap title",
  "description": "2 sentence overview of this roadmap",
  "totalDuration": "X months",
  "phases": [
    {
      "phase": 1,
      "title": "Phase title",
      "duration": "X weeks",
      "topics": ["topic 1", "topic 2", "topic 3"],
      "resources": ["resource 1", "resource 2"]
    },
    {
      "phase": 2,
      "title": "Phase title",
      "duration": "X weeks",
      "topics": ["topic 1", "topic 2", "topic 3"],
      "resources": ["resource 1", "resource 2"]
    },
    {
      "phase": 3,
      "title": "Phase title",
      "duration": "X weeks",
      "topics": ["topic 1", "topic 2", "topic 3"],
      "resources": ["resource 1", "resource 2"]
    },
    {
      "phase": 4,
      "title": "Phase title",
      "duration": "X weeks",
      "topics": ["topic 1", "topic 2", "topic 3"],
      "resources": ["resource 1", "resource 2"]
    }
  ]
}

Rules:
- Always give exactly 4 phases
- Each phase must have 3 to 5 topics
- Each phase must have 2 to 3 resources
- Resources should be real websites or books
- No markdown formatting in any field
`;

// ── Chat Prompt ───────────────────────────
const getChatPrompt = (question) => `
You are a helpful, friendly AI assistant.

User Question: "${question}"

Respond ONLY with a valid JSON object (no markdown, no extra text):
{
  "category": "General / Tech / Career / Education / Other",
  "reply": "Your helpful, conversational answer here in 3-5 sentences"
}

Rules:
- Be friendly, clear and helpful
- No markdown formatting inside the reply field
- Keep it conversational
`;

// ── Main analyze function ─────────────────
const analyzeDilemma = async (question) => {
  const mode = detectMode(question);

  let prompt;
  if (mode === "roadmap") prompt = getRoadmapPrompt(question);
  else if (mode === "dilemma") prompt = getDilemmaPrompt(question);
  else prompt = getChatPrompt(question);

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });

  const rawText = response.choices[0].message.content.trim();
  const cleaned = rawText.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  // ── Attach mode to result ─────────────
  parsed.mode = mode;

  return parsed;
};

module.exports = { analyzeDilemma };