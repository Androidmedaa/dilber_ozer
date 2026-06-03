from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "qwen2.5:7b-instruct"
    knowledge_dir: str = "../knowledge"
    cors_origins: str = "http://localhost:3000"
    max_context_chars: int = 24_000

    @property
    def knowledge_path(self) -> Path:
        raw = Path(self.knowledge_dir)
        if raw.is_absolute():
            return raw
        # backend/app/config.py -> backend -> repo root
        backend_root = Path(__file__).resolve().parents[1]
        return (backend_root / raw).resolve()

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
