---
title: API Documentation - Library v1
description: Complete API reference for Library v1
---

# API Documentation - Library v1

Complete reference documentation for all classes, methods, and types in Library v1.

## Library Class

The main class for interacting with the library.

### Constructor

\`\`\`typescript
new Library(options: LibraryOptions)
\`\`\`

#### Parameters

- \`options.apiKey\` (string, required): Your API key
- \`options.timeout\` (number, optional): Request timeout in milliseconds. Default: 30000
- \`options.retries\` (number, optional): Number of retry attempts. Default: 0
- \`options.cache\` (boolean, optional): Enable caching. Default: false

### Methods

#### \`process(input: ProcessInput): Promise<ProcessResult>\`

Processes input data and returns a result.

**Parameters:**
- \`input\` (ProcessInput): The input data to process

**Returns:**
- \`Promise<ProcessResult>\`: The processed result

**Example:**
\`\`\`typescript
const result = await lib.process({
  input: 'data',
  options: { format: 'json' },
});
\`\`\`

#### \`validate(input: any): boolean\`

Validates input data.

**Parameters:**
- \`input\` (any): The data to validate

**Returns:**
- \`boolean\`: True if valid, false otherwise

## Types

### LibraryOptions

\`\`\`typescript
interface LibraryOptions {
  apiKey: string;
  timeout?: number;
  retries?: number;
  cache?: boolean;
}
\`\`\`

### ProcessInput

\`\`\`typescript
interface ProcessInput {
  input: string;
  options?: {
    format?: 'json' | 'xml' | 'text';
    validate?: boolean;
  };
}
\`\`\`

### ProcessResult

\`\`\`typescript
interface ProcessResult {
  success: boolean;
  data: any;
  metadata?: {
    timestamp: number;
    version: string;
  };
}
\`\`\`

## Error Types

### LibraryError

Base error class for library-specific errors.

\`\`\`typescript
class LibraryError extends Error {
  code: string;
  statusCode?: number;
}
\`\`\`

### ValidationError

Thrown when input validation fails.

\`\`\`typescript
class ValidationError extends LibraryError {
  code: 'VALIDATION_ERROR';
}
\`\`\`

