/**
 * sentry hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */
const Sentry = require('@sentry/node')
module.exports = function defineSentryHook(sails) {
  return {
    /**
     * Runs when this Sails app loads/lifts.
     */
    defaults: {
      tracesSampleRate: 1.0,
      // Set sampling rate for profiling - this is relative to tracesSampleRate
      profilesSampleRate: 1.0,
      tracing: true,
      spotlight: true
    },
    initialize: async function () {
      sails.after('hook:http:loaded', () => {
        const sentryInitOptions = {
          ...sails.config.sentry,
          integrations: [
            // enable HTTP calls tracing
            new Sentry.Integrations.Http({
              tracing: sails.config.sentry.tracing
            }),
            // enable Express.js middleware tracing
            new Sentry.Integrations.Express({ app: sails.hooks.http.app })
          ]
        }
        Sentry.init(sentryInitOptions)
        // The request handler must be the first middleware on the app
        sails.hooks.http.app.use(Sentry.Handlers.requestHandler())

        // TracingHandler creates a trace for every incoming request
        sails.hooks.http.app.use(Sentry.Handlers.tracingHandler())

        // The error handler must be registered before any other error middleware and after all controllers
        sails.hooks.http.app.use(Sentry.Handlers.errorHandler())

        sails.log.info('Initializing custom hook (`sentry`)')
      })
    }
  }
}
