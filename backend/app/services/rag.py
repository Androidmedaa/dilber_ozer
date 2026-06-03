from app.config import settings
from app.services.knowledge import KnowledgeChunk, load_knowledge_chunks


def retrieve_context(query: str, mode: str = "default", top_k: int = 8) -> tuple[str, list[str]]:
    """
    Phase 1: lightweight keyword scoring over JSON knowledge chunks.
    Phase 3: replace with pgvector + embedding model (bge-m3).
    """
    chunks = load_knowledge_chunks()
    if not chunks:
        return "", []

    if mode == "skills":
        chunks = [c for c in chunks if _matches_skills(c)]
    elif mode == "interview":
        chunks = [c for c in chunks if "interview" in c.tags or "experience" in c.tags]

    scored = [(c, _score_chunk(query, c)) for c in chunks]
    scored.sort(key=lambda x: x[1], reverse=True)

    selected = [c for c, s in scored[:top_k] if s > 0] or [c for c, _ in scored[:top_k]]

    parts: list[str] = []
    sources: list[str] = []
    total = 0

    for chunk in selected:
        block = f"### {chunk.title}\n{chunk.text.strip()}\n"
        if total + len(block) > settings.max_context_chars:
            break
        parts.append(block)
        sources.append(chunk.source)
        total += len(block)

    return "\n".join(parts), list(dict.fromkeys(sources))


def _matches_skills(chunk: KnowledgeChunk) -> bool:
    skill_tags = {"skills", "ai", "projects", "ml", "cloud", "rag", "speech"}
    return bool(skill_tags.intersection(set(chunk.tags)))


def _score_chunk(query: str, chunk: KnowledgeChunk) -> float:
    q = query.lower()
    text = f"{chunk.title} {chunk.text} {' '.join(chunk.tags)}".lower()
    score = 0.0
    for token in q.split():
        if len(token) < 3:
            continue
        if token in text:
            score += 2.0
        if token in chunk.title.lower():
            score += 3.0
    return score
