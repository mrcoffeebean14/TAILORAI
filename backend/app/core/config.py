"""Application settings and provider model routing."""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Any, Literal

import yaml
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings, SettingsConfigDict

ProviderName = Literal["openai", "anthropic", "google", "groq"]


class ProviderModelConfig(BaseModel):
    """Provider + model tuple used by runtime chain builders."""

    provider: ProviderName = "openai"
    company: str = "OpenAI"
    model: str = "gpt-4o-mini"
    temperature: float = 0.2


class AppSettings(BaseSettings):
    """Environment and file-backed settings."""

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    app_name: str = "ResumeForge API"
    app_env: str = "development"
    app_host: str = "0.0.0.0"
    app_port: int = 8000
    cors_origins: list[str] = Field(default_factory=lambda: ["http://localhost:3000"])

    provider_model_config_path: str = "app/config/model_provider.yaml"

    openai_api_key: str | None = None
    anthropic_api_key: str | None = None
    google_api_key: str | None = None
    groq_api_key: str | None = None


@lru_cache(maxsize=1)
def get_settings() -> AppSettings:
    return AppSettings()


def load_provider_model_config(
    settings: AppSettings | None = None,
) -> ProviderModelConfig:
    """Load provider/model mapping from YAML so users can switch vendors quickly."""
    app_settings = settings or get_settings()
    config_path = Path(app_settings.provider_model_config_path)

    if not config_path.exists():
        return ProviderModelConfig()

    with config_path.open("r", encoding="utf-8") as file_handle:
        raw_data: dict[str, Any] = yaml.safe_load(file_handle) or {}

    return ProviderModelConfig(**raw_data)
