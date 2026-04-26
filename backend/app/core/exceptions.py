"""Custom domain exceptions for ResumeForge."""


class ResumeForgeError(Exception):
    """Base exception for domain-specific failures."""


class MalformedLatexError(ResumeForgeError):
    """Raised when the input LaTeX fails basic structure validation."""


class ProviderNotConfiguredError(ResumeForgeError):
    """Raised when provider credentials or model settings are missing."""
