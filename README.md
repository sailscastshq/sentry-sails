# sentry-sails

Sails hook for [Sentry](https://sentry.io) error tracking and performance monitoring.

## Installation

```bash
npm install sentry-sails
```

## Quick Start

1. Install the hook:

```bash
npm install sentry-sails
```

2. Set your Sentry DSN via environment variable:

```bash
SENTRY_DSN=https://your-dsn@sentry.io/project
```

Or create `config/sentry.js`:

```javascript
module.exports.sentry = {
  dsn: process.env.SENTRY_DSN
}
```

That's it! The hook will automatically capture errors and set up performance tracing.

## Configuration

All configuration options can be set in `config/sentry.js`:

```javascript
module.exports.sentry = {
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  sendDefaultPii: true
}
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `dsn` | string | `process.env.SENTRY_DSN` | Your Sentry Data Source Name |
| `environment` | string | `process.env.NODE_ENV` | Environment name (e.g., 'production') |
| `tracesSampleRate` | number | `1.0` | Sample rate for performance tracing (0.0 to 1.0) |
| `profilesSampleRate` | number | `1.0` | Sample rate for profiling (0.0 to 1.0) |
| `sendDefaultPii` | boolean | `true` | Capture request headers and IP |

## Manual Error Capture

Access the Sentry instance via `sails.sentry`:

```javascript
// In any controller or action
try {
  await riskyOperation()
} catch (error) {
  sails.sentry.captureException(error)
  throw error
}
```

## Adding Context

```javascript
// Set user context
sails.sentry.setUser({
  id: req.session.userId,
  email: req.session.userEmail
})

// Add breadcrumb
sails.sentry.addBreadcrumb({
  category: 'auth',
  message: 'User logged in',
  level: 'info'
})

// Set tags
sails.sentry.setTag('feature', 'checkout')
```

## Requirements

- Node.js >= 18.0.0
- Sails.js >= 1.0.0

## Documentation

Full documentation available at [docs.sailscasts.com/sentry-sails](https://docs.sailscasts.com/sentry-sails)

## License

MIT
