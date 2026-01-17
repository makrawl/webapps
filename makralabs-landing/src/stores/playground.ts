import { create } from "zustand";

interface PlaygroundState {
  inputValue: string;
  query: string;
  result: string | null;
  isProcessing: boolean;
  setInputValue: (value: string) => void;
  setQuery: (query: string) => void;
  submitQuery: (query: string) => void;
  setResult: (result: string) => void;
  reset: () => void;
}

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  // Input state
  inputValue: "",
  setInputValue: (value) => set({ inputValue: value }),

  // Query state
  query: "",
  setQuery: (query) => set({ query }),

  // Results state
  result: null,
  isProcessing: false,

  // Actions
  submitQuery: (query) => {
    set({ query, isProcessing: true, result: null });
  },

  setResult: (result) => {
    set({ result, isProcessing: false });
  },

  reset: () => {
    set({ inputValue: "", query: "", result: null, isProcessing: false });
  },
}));
