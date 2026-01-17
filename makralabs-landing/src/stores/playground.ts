import { create } from "zustand";
import {
  OperationType,
  ExtractDataFormState,
  QueryChunksFormState,
  PlaygroundFormData,
  DEFAULT_EXTRACT_DATA,
  DEFAULT_QUERY_CHUNKS,
} from "@/types/playground";

interface PlaygroundState {
  // URL input (common across all operations)
  url: string;
  setUrl: (url: string) => void;

  // Current operation type
  operationType: OperationType;
  setOperationType: (type: OperationType) => void;

  // Extract Data form state
  extractData: ExtractDataFormState;
  setExtractData: (data: Partial<ExtractDataFormState>) => void;

  // Query Chunks form state
  queryChunks: QueryChunksFormState;
  setQueryChunks: (data: Partial<QueryChunksFormState>) => void;

  // Results state
  result: string | null;
  isProcessing: boolean;

  // Actions
  submitForm: () => PlaygroundFormData;
  setResult: (result: string) => void;
  reset: () => void;
}

export const usePlaygroundStore = create<PlaygroundState>((set, get) => ({
  // URL state
  url: "",
  setUrl: (url) => set({ url }),

  // Operation type
  operationType: "data",
  setOperationType: (operationType) => set({ operationType }),

  // Extract Data form state
  extractData: DEFAULT_EXTRACT_DATA,
  setExtractData: (data) =>
    set((state) => ({
      extractData: { ...state.extractData, ...data },
    })),

  // Query Chunks form state
  queryChunks: DEFAULT_QUERY_CHUNKS,
  setQueryChunks: (data) =>
    set((state) => ({
      queryChunks: { ...state.queryChunks, ...data },
    })),

  // Results state
  result: null,
  isProcessing: false,

  // Actions
  submitForm: () => {
    const state = get();
    const formData: PlaygroundFormData = {
      url: state.url.startsWith("http") ? state.url : `https://${state.url}`,
      operationType: state.operationType,
      extractData: state.extractData,
      queryChunks: state.queryChunks,
    };
    set({ isProcessing: true, result: null });
    return formData;
  },

  setResult: (result) => {
    set({ result, isProcessing: false });
  },

  reset: () => {
    set({
      url: "",
      operationType: "data",
      extractData: DEFAULT_EXTRACT_DATA,
      queryChunks: DEFAULT_QUERY_CHUNKS,
      result: null,
      isProcessing: false,
    });
  },
}));
