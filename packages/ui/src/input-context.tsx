"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface InputContextType {
  inputValue: string;
  setInputValue: (value: string) => void;
  submittedQuery: string;
  submitQuery: (value: string) => void;
}

const InputContext = createContext<InputContextType | undefined>(undefined);

export const InputProvider = ({ children }: { children: ReactNode }) => {
  const [inputValue, setInputValue] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const submitQuery = (value: string) => {
    setSubmittedQuery(value);
    setInputValue(value);
  };

  return (
    <InputContext.Provider value={{ inputValue, setInputValue, submittedQuery, submitQuery }}>
      {children}
    </InputContext.Provider>
  );
};

export const useInput = () => {
  const context = useContext(InputContext);
  if (context === undefined) {
    throw new Error("useInput must be used within an InputProvider");
  }
  return context;
};

