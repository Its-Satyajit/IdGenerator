# ID Generator

A lightweight TypeScript utility for generating various types of unique identifiers. This library provides three different ID generation methods, each optimized for specific use cases.


## Usage

```typescript
import { id } from '@its-satyajit/id-generator';

// Generate different types of IDs
const id = id.generate();  // "Zk9mP2nQ4R"
const id20 = id.generate(20); // "2sgU035ser58knde42at"           
const shortId = id.shortUuidV7(); // "7LJSr5nwRp9vK3mX2yD4qN"
const shortId = id.uuidV7()(); // "f47d08e7-9f9d-7a2e-b290-5a96f0b8c9e1"
const timeId = id.timeId();       // "lq1pgsk-x7y8z9w0"
```

## API Reference

### `id.generate()`

Generates a 16-character random identifier by default.

- **Params**: `number` - The length of the ID to generate
- **Returns**: `string` - A 16  -character random string by default using base62 alphabet (a-zA-Z0-9)
- **Use Case**: General purpose unique IDs, user-friendly references
- **Example**: `"Zk9mP2nQ4R"`

### `id.uuidV7()`

Generates a uuid v7 identifier.

- **Returns**: `string` -  A 128 bits containing timestamp and random data
- **Use Case**: Database records, distributed systems, time-sortable unique IDs
- **Features**:
  - Timestamp-sortable
  - Millisecond precision
  - Monotonic sequence within the same millisecond
- **Example**: `"f47d08e7-9f9d-7a2e-b290-5a96f0b8c9e1"`
### `id.shortUuidV7()`

Generates a 22-character timestamp-based identifier based on UUID v7 specification.

- **Returns**: `string` - A   36-character string containing timestamp and random data
- **Use Case**: Database records, distributed systems, time-sortable unique IDs
- **Features**:
  - Timestamp-sortable
  - Millisecond precision
  - Monotonic sequence within the same millisecond
- **Example**: `"7LJSr5nwRp9vK3mX2yD4qN"`

### `id.timeId()`

Generates a human-readable time-based identifier.

- **Returns**: `string` - A time-based ID in format `${timestamp-base36}-${random-base62}`
- **Use Case**: Logging, debugging, human-readable timestamps
- **Features**:
  - Visible timestamp component
  - Sortable by creation time
  - Random suffix for uniqueness
- **Example**: `"lq1pgsk-x7y8z9w0"`

## Features

- Zero dependencies
- Cryptographically secure random generation
- TypeScript support
- Collision resistant
- Monotonic timestamp-based IDs
- Base62 encoding for URL-safe IDs

## Security

All methods use the Web Crypto API (`crypto.getRandomValues()`) for secure random number generation.

## Performance

- All methods are optimized for performance
- No regex-based parsing
- Minimal memory allocation
- Efficient base conversion algorithms

## ID Comparison

| Method | Length | Sortable | Time-Based | Format |
|--------|---------|-----------|------------|---------|
| `generate()` | 16/any | No | No | Random |
| `uuidV7()` | 22 | Yes | Yes | Timestamp + Random |
| `shortUuidV7()` | 22 | Yes | Yes | Timestamp + Random |
| `timeId()` | Variable | Yes | Yes | Timestamp-Random |

## Best Practices

- Use `generate()` for short, user-facing IDs
- Use `shortUuidV7()` for database primary keys and distributed systems
- Use `timeId()` for logging and debugging purposes

## Browser Support

Works in all modern browsers that support the Web Crypto API:
- Chrome ≥ 43
- Firefox ≥ 36
- Safari ≥ 10.1
- Edge ≥ 12

## License

MIT
