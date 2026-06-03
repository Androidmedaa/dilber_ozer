from fastapi import APIRouter

from app.models.schemas import HealthResponse
from app.services.knowledge import load_knowledge_chunks
from app.services.llm import check_ollama

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    chunks = load_knowledge_chunks()
    ollama_ok = await check_ollama()
    return HealthResponse(
        status="ok" if ollama_ok else "degraded",
        ollama=ollama_ok,
        knowledge_chunks=len(chunks),
    )
