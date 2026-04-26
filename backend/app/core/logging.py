"""Centralized logging configuration."""

from __future__ import annotations

import logging
import sys


def configure_logging() -> None:
    """Initialize structured-ish console logging for local/dev workloads."""
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
        handlers=[logging.StreamHandler(sys.stdout)],
    )
