import json
from dataclasses import dataclass
from pathlib import Path

from app.config import settings


@dataclass
class KnowledgeChunk:
    id: str
    title: str
    source: str
    text: str
    tags: list[str]


def load_knowledge_chunks(knowledge_dir: Path | None = None) -> list[KnowledgeChunk]:
    base = knowledge_dir or settings.knowledge_path
    chunks: list[KnowledgeChunk] = []

    if not base.exists():
        return chunks

    for path in sorted(base.glob("*.json")):
        if path.name == "manifest.json":
            continue
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            continue

        if isinstance(data, list):
            for item in data:
                chunks.append(_chunk_from_dict(item, path.stem))
        elif isinstance(data, dict):
            if "chunks" in data and isinstance(data["chunks"], list):
                for item in data["chunks"]:
                    chunks.append(_chunk_from_dict(item, path.stem))
            else:
                chunks.append(
                    KnowledgeChunk(
                        id=data.get("id", path.stem),
                        title=data.get("title", path.stem),
                        source=path.name,
                        text=data.get("text", json.dumps(data, ensure_ascii=False)),
                        tags=data.get("tags", []),
                    )
                )

    return chunks


def _chunk_from_dict(item: dict, default_source: str) -> KnowledgeChunk:
    return KnowledgeChunk(
        id=str(item.get("id", default_source)),
        title=str(item.get("title", default_source)),
        source=str(item.get("source", default_source)),
        text=str(item.get("text", "")),
        tags=list(item.get("tags", [])),
    )
