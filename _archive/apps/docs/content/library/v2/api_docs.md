---
title: API Documentation - Library v2
description: Complete API reference for Library v2
---

# API Documentation - Library v2

Complete reference documentation for all classes, methods, and types in Library v2.

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
- \`options.enableMetrics\` (boolean, optional): Enable performance metrics. Default: false
- \`options.version\` (string, optional): API version. Default: 'v2'

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
  mode: 'advanced',
  options: { format: 'json' },
});
\`\`\`

#### \`batchProcess(inputs: ProcessInput[]): Promise<ProcessResult[]>\`

Processes multiple inputs in a single batch operation.

**Parameters:**
- \`inputs\` (ProcessInput[]): Array of input data to process

**Returns:**
- \`Promise<ProcessResult[]>\`: Array of processed results

**Example:**
\`\`\`typescript
const results = await lib.batchProcess([
  { input: 'Item 1' },
  { input: 'Item 2' },
]);
\`\`\`

#### \`validate(input: any): ValidationResult\`

Validates input data with detailed results.

**Parameters:**
- \`input\` (any): The data to validate

**Returns:**
- \`ValidationResult\`: Detailed validation result

#### \`on(event: string, callback: Function): void\`

Subscribe to library events.

**Parameters:**
- \`event\` (string): Event name ('beforeProcess', 'afterProcess', 'error')
- \`callback\` (Function): Callback function

## Types

### LibraryOptions

\`\`\`typescript
interface LibraryOptions {
  apiKey: string;
  timeout?: number;
  retries?: number;
  cache?: boolean;
  enableMetrics?: boolean;
  version?: string;
}
\`\`\`

### ProcessInput

\`\`\`typescript
interface ProcessInput {
  input: string;
  mode?: 'basic' | 'advanced';
  options?: {
    format?: 'json' | 'xml' | 'text';
    validate?: boolean;
    optimize?: boolean;
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
    metrics?: {
      processingTime: number;
      memoryUsage: number;
    };
  };
}
\`\`\`

### ValidationResult

\`\`\`typescript
interface ValidationResult {
  valid: boolean;
  errors?: ValidationError[];
}
\`\`\`

## Error Types

### LibraryError

Base error class for library-specific errors.

\`\`\`typescript
class LibraryError extends Error {
  code: string;
  statusCode?: number;
  details?: any;
}
\`\`\`

### ValidationError

Thrown when input validation fails.

\`\`\`typescript
class ValidationError extends LibraryError {
  code: 'VALIDATION_ERROR';
  details: ValidationErrorDetail[];
}
\`\`\`

### TimeoutError

Thrown when a request times out.

\`\`\`typescript
class TimeoutError extends LibraryError {
  code: 'TIMEOUT_ERROR';
}
\`\`\`

