/**
 * Regenerates knowledge/*.json summaries from portfolio TypeScript data.
 * Run from repo root: node scripts/export-knowledge.mjs
 *
 * Note: uses dynamic import of compiled data is not available; writes
 * structured JSON aligned with src/data — re-run after major content edits
 * or extend this script to parse TS if needed.
 */
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const knowledgeDir = join(root, "knowledge");

mkdirSync(knowledgeDir, { recursive: true });

// Keep in sync with src/data — update this script when adding internships/projects
const profile = {
  id: "profile",
  title: "Dilber Özer — Profile",
  tags: ["profile", "skills", "ai", "interview", "experience"],
  text: `Dilber Özer — AI Engineer / Software Engineer, İzmir, Turkey.
B.S. Computer Engineering, İzmir Bakırçay University (2022–2026, CGPA 3.10/4.0).
Skills: ML/DL, NLP, speech (ASR, diarization, emotion), LLMs, RAG, AWS, Kubernetes, FastAPI, React.
GitHub: https://github.com/Androidmedaa
LinkedIn: https://www.linkedin.com/in/dilber-ozer
Medium: https://medium.com/@dilberozer`,
};

const internships = {
  chunks: [
    {
      id: "callmetric",
      title: "CallMetric AI / BilSoft",
      source: "export",
      tags: ["internship", "speech", "rag", "aws", "interview"],
      text: "Jun 2025 – Present. Whisper fine-tune WER ~35% to ~12%. RAG, AWS, EKS, Kubernetes, emotion analysis, data masking.",
    },
    {
      id: "proceedit",
      title: "Proceedit FinTech Barcelona",
      source: "export",
      tags: ["internship", "forecasting", "scraping"],
      text: "Aug 2024 – Feb 2025. Time-series, Flask, GraphQL, web scraping, Jira, Kubernetes, international Scrum team.",
    },
    {
      id: "norm",
      title: "Norm Digital / Vinter",
      source: "export",
      tags: ["internship", "rag", "ocr"],
      text: "CV extraction, JSON blob outputs, LangChain, FAISS, OCR resumes.",
    },
  ],
};

const projects = {
  chunks: [
    { id: "kits23", title: "KiTS23", tags: ["projects", "ml"], text: "Kidney tumor segmentation; InceptionV3 92% accuracy." },
    { id: "sema", title: "SEMA AI", tags: ["projects", "rag"], text: "Document RAG + Gemini; React/Express/Firebase." },
    { id: "flower", title: "Flower Classification", tags: ["projects", "cv"], text: "ResNet101 92% test; prediction website." },
    { id: "nutuk", title: "Nutuk GPT", tags: ["projects", "nlp"], text: "Character-level Transformer from scratch." },
    { id: "rota", title: "RotaAI", tags: ["projects"], text: "AI travel planner; React + .NET 9 + Google Places." },
  ],
};

writeFileSync(join(knowledgeDir, "profile.json"), JSON.stringify(profile, null, 2), "utf-8");
writeFileSync(join(knowledgeDir, "internships.json"), JSON.stringify(internships, null, 2), "utf-8");
writeFileSync(join(knowledgeDir, "projects.json"), JSON.stringify(projects, null, 2), "utf-8");

console.log("Exported knowledge to", knowledgeDir);
