---
title: Examples - Library v1
description: Practical examples and use cases for Library v1
---

# Examples - Library v1

This page contains practical examples showing how to use Library v1 in various scenarios.

## Basic Usage

The most basic example of using Library v1:

\`\`\`typescript
import { Library } from '@makralabs/library-v1';

const lib = new Library({
  apiKey: 'your-api-key',
});

// Process data
const result = await lib.process({
  input: 'Hello, World!',
});
\`\`\`

## Advanced Configuration

For more advanced use cases, you can configure the library with additional options:

\`\`\`typescript
import { Library } from '@makralabs/library-v1';

const lib = new Library({
  apiKey: 'your-api-key',
  timeout: 5000,
  retries: 3,
  cache: true,
});

const result = await lib.process({
  input: 'Complex data',
  options: {
    format: 'json',
    validate: true,
  },
});
\`\`\`

## Error Handling

Always handle errors appropriately:

\`\`\`typescript
import { Library, LibraryError } from '@makralabs/library-v1';

try {
  const lib = new Library({ apiKey: 'your-api-key' });
  const result = await lib.process({ input: 'data' });
} catch (error) {
  if (error instanceof LibraryError) {
    console.error('Library error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
\`\`\`

## Working with Async Operations

Library v1 supports async operations:

\`\`\`typescript
import { Library } from '@makralabs/library-v1';

const lib = new Library({ apiKey: 'your-api-key' });

// Process multiple items in parallel
const results = await Promise.all([
  lib.process({ input: 'Item 1' }),
  lib.process({ input: 'Item 2' }),
  lib.process({ input: 'Item 3' }),
]);
\`\`\`

