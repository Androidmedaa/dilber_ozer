from fastapi import APIRouter

from app.models.schemas import ChatRequest, ChatResponse
from app.services.llm import generate_reply
from app.services.rag import retrieve_context

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
async def chat(body: ChatRequest) -> ChatResponse:
    context, sources = retrieve_context(body.message, mode=body.mode)
    reply, model, fallback = await generate_reply(
        body.message,
        context,
        mode=body.mode,
        locale=body.locale,
    )
    return ChatResponse(
        reply=reply,
        mode=body.mode,
        sources_used=sources,
        model=model,
        fallback=fallback,
    )
