from typing import Literal

from pydantic import BaseModel, Field


ChatMode = Literal["default", "interview", "skills"]


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    mode: ChatMode = "default"
    locale: Literal["tr", "en"] = "tr"


class ChatResponse(BaseModel):
    reply: str
    mode: ChatMode
    sources_used: list[str]
    model: str | None = None
    fallback: bool = False


class HealthResponse(BaseModel):
    status: str
    ollama: bool
    knowledge_chunks: int


class SttStubResponse(BaseModel):
    status: str
    message: str


class TtsStubResponse(BaseModel):
    status: str
    message: str
