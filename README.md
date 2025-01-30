# Sails Sentry

A Sails hook for to easily setup up Application Monitoring and Error Tracking with Sentry in Sails applications

## Installation

```bash
npm install sails-sentry
```

## Usage

To use the Sentry hook in your Sails.js application, add the following configuration to your `config/sentry.js` file:

```javascript
module.exports.sentry = {
  dsn: 'your-sentry-dsn',
  environment: process.env.NODE_ENV || 'development',
};
```

## Configuration

- `dsn`: Your Sentry Data Source Name (DSN).
- `environment`: The environment in which your application is running (e.g., development, production).

## License

This project is licensed under the MIT License.
