import axios from "axios";

// ── Base URL ──────────────────────────────
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ── Analyze a new dilemma ─────────────────
export const analyzeDilemma = async (question) => {
  const response = await API.post("/dilemmas", { question });
  return response.data;
};

// ── Get all past dilemmas ─────────────────
export const getAllDilemmas = async () => {
  const response = await API.get("/dilemmas");
  return response.data;
};

// ── Get single dilemma by ID ──────────────
export const getDilemmaById = async (id) => {
  const response = await API.get(`/dilemmas/${id}`);
  return response.data;
};

// ── Delete a dilemma ──────────────────────
export const deleteDilemma = async (id) => {
  const response = await API.delete(`/dilemmas/${id}`);
  return response.data;
};

// ── Get stats ─────────────────────────────
export const getStats = async () => {
  const response = await API.get("/dilemmas/stats");
  return response.data;
};