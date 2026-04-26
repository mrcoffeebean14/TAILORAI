"use client";

import { useCallback } from "react";

import { generateResume } from "@/services/apiClient";
import { useGenerationStore } from "@/store/generationStore";
import { GenerateResumeRequest } from "@/types/api";

export function useGenerateResume() {
  const setLoading = useGenerationStore((state) => state.setLoading);
  const setError = useGenerationStore((state) => state.setError);
  const setRequest = useGenerationStore((state) => state.setRequest);
  const setResponse = useGenerationStore((state) => state.setResponse);

  const runGeneration = useCallback(
    async (payload: GenerateResumeRequest) => {
      setLoading(true);
      setError(null);
      setRequest(payload);

      try {
        const response = await generateResume(payload);
        setResponse(response);
        return response;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error while generating resume";
        setError(message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setError, setLoading, setRequest, setResponse],
  );

  return { runGeneration };
}
