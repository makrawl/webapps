---
title: Examples - Library v2
description: Practical examples and use cases for Library v2
---

# Examples - Library v2

This page contains practical examples showing how to use Library v2 in various scenarios.

## Basic Usage

Get started with a simple example:

\`\`\`typescript
import { Library } from '@makralabs/library-v2';

const lib = new Library({
  apiKey: 'your-api-key',
});

const result = await lib.process({
  input: 'Hello, World!',
});
\`\`\`

## Using New Features

Library v2 introduces new features like batch processing:

\`\`\`typescript
import { Library } from '@makralabs/library-v2';

const lib = new Library({
  apiKey: 'your-api-key',
});

// Process multiple items in a single call
const results = await lib.batchProcess([
  { input: 'Item 1' },
  { input: 'Item 2' },
  { input: 'Item 3' },
]);
\`\`\`

## Advanced Configuration

Configure Library v2 with advanced options:

\`\`\`typescript
import { Library } from '@makralabs/library-v2';

const lib = new Library({
  apiKey: 'your-api-key',
  timeout: 10000,
  retries: 5,
  cache: true,
  enableMetrics: true,
});

const result = await lib.process({
  input: 'Complex data',
  mode: 'advanced',
  options: {
    format: 'json',
    validate: true,
    optimize: true,
  },
});
\`\`\`

## Error Handling

Library v2 provides better error handling:

\`\`\`typescript
import { Library, LibraryError, ValidationError } from '@makralabs/library-v2';

try {
  const lib = new Library({ apiKey: 'your-api-key' });
  const result = await lib.process({ input: 'data' });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.details);
  } else if (error instanceof LibraryError) {
    console.error('Library error:', error.message, error.code);
  } else {
    console.error('Unexpected error:', error);
  }
}
\`\`\`

## Using Hooks

Library v2 supports hooks for custom processing:

\`\`\`typescript
import { Library } from '@makralabs/library-v2';

const lib = new Library({
  apiKey: 'your-api-key',
});

lib.on('beforeProcess', (data) => {
  console.log('Before processing:', data);
});

lib.on('afterProcess', (result) => {
  console.log('After processing:', result);
});

const result = await lib.process({ input: 'data' });
\`\`\`

