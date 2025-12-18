---
title: Introduction to Library v2
description: Get started with version 2 of the Makra Labs library
---

# Introduction to Library v2

Welcome to the Makra Labs Library v2 documentation. This is the latest version of our library, featuring improved performance, better TypeScript support, and new features.

## What's New in v2

Library v2 includes several major improvements:

- **Better Performance**: Up to 2x faster than v1
- **Enhanced Type Safety**: Improved TypeScript definitions
- **New Features**: Additional functionality and capabilities
- **Better Error Handling**: More descriptive error messages
- **Improved Documentation**: Better examples and guides

## Installation

Install Library v2 using your preferred package manager:

\`\`\`bash
npm install @makralabs/library-v2
# or
yarn add @makralabs/library-v2
# or
pnpm add @makralabs/library-v2
\`\`\`

## Quick Start

Here's a simple example to get you started:

\`\`\`typescript
import { Library } from '@makralabs/library-v2';

const lib = new Library({
  apiKey: 'your-api-key',
  version: 'v2',
});

const result = await lib.process({
  input: 'Hello, World!',
  mode: 'advanced',
});

console.log(result);
\`\`\`

## Migration from v1

If you're upgrading from v1, check out our migration guide. Most code should work with minimal changes, but there are some breaking changes to be aware of.

## Next Steps

- Explore [Examples](/library/v2/examples) for practical use cases
- Read the [API Documentation](/library/v2/api_docs) for complete reference
- Join our community for support

