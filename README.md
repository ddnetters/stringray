# 🌊 StringRay

> **Shine a light on your code's communication.**

StringRay is a GitHub Action that scans your codebase for string literals and validates their quality - checking length limits, brand style compliance, or custom rules you define.

---

## Quickstart

Add this to `.github/workflows/stringray.yml`:

```yaml
name: StringRay
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: ddnetters/stringray@v1
        with:
          files: 'src/**/*.{js,ts,md}'
          checker: 'char_count'
          decider: 'threshold'
```

That's it. StringRay now runs on every push and PR.

---

## What It Does

StringRay operates through a three-stage pipeline:

```
Files → String Extraction → Validation (Checkers) → Decision (Deciders) → Pass/Fail
```

**Example output:**

```
StringRay Results:
├── src/messages.js
│   ├── Line 1: "An error occurred while processing..." ❌ Too long (75 > 50)
│   ├── Line 2: "Done" ✅ OK
│   └── Line 3: "Please check your configuration..." ❌ Too long (58 > 50)
└── Summary: 1/3 strings valid (33%) - FAILED
```

---

## Configuration

### Inputs

| Input | Description | Default |
|-------|-------------|---------|
| `files` | Glob pattern for files to scan | `**/*.{js,ts,md,json}` |
| `checker` | Validation type: `char_count`, `custom`, `brand_style` | `char_count` |
| `checker-options` | JSON config for checker | `{}` |
| `decider` | Decision logic: `threshold`, `noCritical`, `custom` | `threshold` |
| `decider-options` | JSON config for decider | `{}` |

### Outputs

| Output | Description |
|--------|-------------|
| `results` | JSON array of all string validations |
| `summary` | Human-readable pass/fail summary |
| `pass` | Boolean for CI gates |

### Example: Custom Length Limit

```yaml
- uses: ddnetters/stringray@v1
  with:
    files: 'src/**/*.{js,ts}'
    checker: 'char_count'
    checker-options: '{"maxChars": 80}'
    decider: 'threshold'
    decider-options: '{"minValidRatio": 0.95}'
```

### Example: Block TODOs in Production

```yaml
- uses: ddnetters/stringray@v1
  with:
    checker: 'custom'
    checker-options: |
      {
        "logic": "!content.includes('TODO')"
      }
    decider: 'noCritical'
```

---

## Documentation

| Guide | Description |
|-------|-------------|
| [Installation](docs/installation.md) | Setup, local dev, Docker, npm package |
| [Configuration](docs/configuration.md) | All options in detail |
| [Checkers](docs/checkers.md) | char_count, custom, brand_style |
| [Deciders](docs/deciders.md) | threshold, noCritical, custom |
| [Examples](docs/examples.md) | Real-world usage scenarios |
| [API Reference](docs/api.md) | TypeScript interfaces |
| [Troubleshooting](docs/troubleshooting.md) | Common issues |

---

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

- [Report Issues](https://github.com/ddnetters/stringray/issues)

## License

MIT - see [LICENSE](LICENSE)
