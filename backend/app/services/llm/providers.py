"""Provider abstraction for multi-vendor LLM support."""

from __future__ import annotations

from langchain_anthropic import ChatAnthropic
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI

from app.core.config import ProviderModelConfig, get_settings
from app.core.exceptions import ProviderNotConfiguredError


def _raise_missing_key(provider_name: str) -> None:
    raise ProviderNotConfiguredError(
        f"{provider_name} API key is missing. Configure .env and retry."
    )


def get_chat_model(config: ProviderModelConfig):
    """Return a configured LangChain chat model for selected provider."""
    settings = get_settings()

    if config.provider == "openai":
        if not settings.openai_api_key:
            _raise_missing_key("OpenAI")
        return ChatOpenAI(
            model=config.model,
            temperature=config.temperature,
            api_key=settings.openai_api_key,
        )

    if config.provider == "anthropic":
        if not settings.anthropic_api_key:
            _raise_missing_key("Anthropic")
        return ChatAnthropic(
            model=config.model,
            temperature=config.temperature,
            api_key=settings.anthropic_api_key,
        )

    if config.provider == "google":
        if not settings.google_api_key:
            _raise_missing_key("Google")
        return ChatGoogleGenerativeAI(
            model=config.model,
            temperature=config.temperature,
            google_api_key=settings.google_api_key,
        )

    if config.provider == "groq":
        if not settings.groq_api_key:
            _raise_missing_key("Groq")
        return ChatGroq(
            model=config.model,
            temperature=config.temperature,
            api_key=settings.groq_api_key,
        )

    raise ProviderNotConfiguredError(
        f"Unsupported provider '{config.provider}'. Supported providers: openai, anthropic, google, groq"
    )
