# Knowledge base (RAG source)

Phase 1 uses JSON chunks loaded by the FastAPI backend.

## Update after portfolio edits

```bash
node scripts/export-knowledge.mjs
```

## Files

| File | Content |
|------|---------|
| `profile.json` | Bio, education, skills, career |
| `internships.json` | Work experience summaries |
| `projects.json` | Project list + highlights |

Phase 3: ingest into PostgreSQL + pgvector with `bge-m3` embeddings.
