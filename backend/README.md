# AI Digital Twin — Backend (Phase 1)

Open-source stack: **Ollama (LLM)** + JSON knowledge RAG. Phase 2 adds **faster-whisper** (STT) and **Piper** (TTS).

## Quick start

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt
cp .env.example .env
```

### Ollama (LLM)

```bash
# Install from https://ollama.com then:
ollama pull qwen2.5:7b-instruct
```

### Run API

From `backend/`:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- API docs: http://localhost:8000/docs
- Health: http://localhost:8000/api/v1/health

### Test chat

```bash
curl -X POST http://localhost:8000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"Dilber kimdir?\", \"mode\": \"default\", \"locale\": \"tr\"}"
```

## Knowledge base

JSON files in `../knowledge/`. Regenerate from portfolio data:

```bash
node ../scripts/export-knowledge.mjs
```

## Endpoints

| Method | Path | Status |
|--------|------|--------|
| GET | `/api/v1/health` | Ready |
| POST | `/api/v1/chat` | Ready (Ollama required) |
| POST | `/api/v1/voice/stt` | Stub (Phase 2) |
| POST | `/api/v1/voice/tts` | Stub (Phase 2) |

## Next.js frontend

Set in repo root `.env.local`:

```
TWIN_BACKEND_URL=http://localhost:8000
```

Open http://localhost:3000/twin
