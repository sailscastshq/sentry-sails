/**
 * sentry-sails hook
 *
 * @description :: A Sails hook for Sentry error tracking and performance monitoring.
 * @docs        :: https://docs.sailscasts.com/sentry-sails
 */
const Sentry = require('@sentry/node')

module.exports = function defineSentryHook(sails) {
  return {
    defaults: {
      sentry: {
        tracesSampleRate: 1.0,
        profilesSampleRate: 1.0,
        environment: process.env.NODE_ENV || 'development',
        release: process.env.SENTRY_RELEASE,
        sendDefaultPii: true
      }
    },

    configure: function () {
      const dsn = sails.config.sentry.dsn || process.env.SENTRY_DSN

      if (!dsn) {
        sails.log.warn(
          'sentry-sails: No DSN configured. Sentry will not capture errors.'
        )
        sails.log.warn(
          'sentry-sails: Set SENTRY_DSN environment variable or configure dsn in config/sentry.js'
        )
      }
    },

    initialize: function (done) {
      sails.after('hook:http:loaded', () => {
        const config = sails.config.sentry
        const dsn = config.dsn || process.env.SENTRY_DSN

        if (!dsn) {
          sails.log.verbose('sentry-sails: Skipping initialization (no DSN)')
          return done()
        }

        Sentry.init({
          dsn,
          environment: config.environment,
          tracesSampleRate: config.tracesSampleRate,
          profilesSampleRate: config.profilesSampleRate,
          sendDefaultPii: config.sendDefaultPii,
          ...config
        })

        sails.after('ready', () => {
          Sentry.setupExpressErrorHandler(sails.hooks.http.app)
          sails.log.verbose('sentry-sails: Express error handler attached')
        })

        sails.sentry = Sentry

        sails.log.info('sentry-sails: Initialized successfully')
        return done()
      })
    }
  }
}
