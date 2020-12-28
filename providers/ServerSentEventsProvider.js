'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ServerSentEventsProvider extends ServiceProvider {
  /**
   * Registers instance under `Adonis/Addon/Stream`
   * namespace.
   *
   * @method _registerEventStream
   *
   * @return {void}
   *
   * @private
   */
  _registerEventStream () {
    this.app.singleton('Adonis/Addon/EventStream', () => {
      const Config = this.app.use('Adonis/Src/Config')
      const Logger = this.app.use('Logger')
      const EventStream = require('server-events-nodejs').EventStream

      let Stream = require('../src/Stream/index.js')
      return new Stream(EventStream, Logger, Config)
    })

    this.app.alias('Adonis/Addon/EventStream', 'Stream')
  }

  /**
   * Registers instance under `Adonis/Src/EventSource`
   * namespace.
   *
   * @method _registerEventSource
   *
   * @return {void}
   *
   * @private
   *
   *
   */

  _registerEventSource () {
    this.app.bind('Adonis/Src/EventSource', () => {
      const Config = this.app.use('Adonis/Src/Config');
      const Source = require('server-events-nodejs').Source
      return new Source(require('uuid/v4'));
    })

    this.app.alias('Adonis/Src/EventSource', 'Source')
  }

  /**
   * Register method called by ioc container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this._registerEventStream()
    this._registerEventSource()

    this.app.bind('Adonis/Middleware/EventSourceWatcher', (app) => {
      let EventSourceWatcher = require('../src/Stream/Middleware/EventSourceWatcher.js')
      return new EventSourceWatcher(this.app.use('Adonis/Addon/EventStream'))
    })
  }

  /**
   * Boot the provider
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    const HttpContext = this.app.use('Adonis/Src/HttpContext')
    const source = this.app.use('Adonis/Src/EventSource')
    /**
     * Adding getter to the HTTP context. Please note the queue
     * instance...
     */
    HttpContext.getter('source', function () { // A NEW SOURCE INSTANCE ON EVERY REQUEST [HTTP]
      if (this.request.method().toLowerCase() === 'get') {
        return source
      } else {
        return { send: function () {} }
      }
    }, true)

    /**
     * Since Websocket is optional, we need to wrap the use
     * statement inside a try/catch and if user is using
     * websocket connection, we will initiate sessions
     * for them
     */
    try {
      const WsContext = this.app.use('Adonis/Addons/WsContext')
      WsContext.getter('source', function () { // A NEW SOURCE INSTANCE ON EVERY REQUEST [WS]
        if ((this.request.header('Accept', '')).indexOf('text/event-stream') > -1) {
          return source
        } else {
          return { send: function () {} }
        }
      }, true)
    } catch (error) {}
  }
}

module.exports = ServerSentEventsProvider
