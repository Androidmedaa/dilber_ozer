from fastapi import APIRouter, File, UploadFile

from app.models.schemas import SttStubResponse, TtsStubResponse

router = APIRouter(prefix="/voice", tags=["voice"])


@router.post("/stt", response_model=SttStubResponse)
async def speech_to_text(_audio: UploadFile = File(...)) -> SttStubResponse:
    """Phase 2: wire faster-whisper here."""
    return SttStubResponse(
        status="not_implemented",
        message=(
            "STT stub — Phase 2 will use faster-whisper (open source). "
            "Install: pip install faster-whisper"
        ),
    )


@router.post("/tts", response_model=TtsStubResponse)
async def text_to_speech() -> TtsStubResponse:
    """Phase 2: wire Piper TTS here."""
    return TtsStubResponse(
        status="not_implemented",
        message=(
            "TTS stub — Phase 2 will use Piper (Turkish voice). "
            "See docs/OPEN_SOURCE_AI_STACK.md"
        ),
    )
