# Project coding standards

## Guidelines
- Don't use Typescript
- Follow functional programming principles where possible
- Prefer immutable data (const, readonly)
- Use optional chaining (?.) and nullish coalescing (??) operators

## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants

## Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries
- Always log errors with contextual information

## General
- For every new features implemented, update README.md accordingly.
- Backend must include Swagger
- Every route or controller created must display data information in the swagger
- For every new features implemented, add data in releaseNotes.txt.