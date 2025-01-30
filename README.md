# Sentry SDK for Sails

A Sails hook for to easily setup up Application Monitoring and Error Tracking with Sentry in Sails applications

## Installation

```bash
npm install sentry-sails
```

## Usage

To use the Sentry hook in your Sails.js application, add the following configuration to your `config/sentry.js` file:

```javascript
module.exports.sentry = {
  dsn: 'your-sentry-dsn'
}
```

## Configuration

- `dsn`: Your Sentry Data Source Name (DSN).

## License

This project is licensed under the MIT License.
