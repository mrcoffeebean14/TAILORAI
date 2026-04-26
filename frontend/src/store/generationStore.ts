"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { GenerateResumeRequest, GenerateResumeResponse } from "@/types/api";

interface GenerationState {
  request: GenerateResumeRequest;
  response: GenerateResumeResponse | null;
  isLoading: boolean;
  error: string | null;
  setRequest: (request: GenerateResumeRequest) => void;
  setResponse: (response: GenerateResumeResponse) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const defaultRequest: GenerateResumeRequest = {
  resume_latex: "",
  job_description: "",
  role: "",
  generate_cover_letter: true,
};

export const useGenerationStore = create<GenerationState>()(
  persist(
    (set) => ({
      request: defaultRequest,
      response: null,
      isLoading: false,
      error: null,
      setRequest: (request) => set({ request }),
      setResponse: (response) => set({ response, error: null }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      reset: () =>
        set({
          request: defaultRequest,
          response: null,
          error: null,
          isLoading: false,
        }),
    }),
    {
      name: "resumeforge-generation",
      partialize: (state) => ({ request: state.request, response: state.response }),
    },
  ),
);
