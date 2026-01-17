import { create } from "zustand";

export const usePlaygroundStore = create((set) => ({
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

