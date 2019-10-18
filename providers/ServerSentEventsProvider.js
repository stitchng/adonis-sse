'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ServerSentEventsProvider extends ServiceProvider {
  
  /**
   * Registers instance under `Adonis/Addon/Queue`
   * namespace.
   *
   * @method _registerStream
   *
   * @return {void}
   *
   * @private
   */
  _registerEventStream () {
    this.app.singleton('Adonis/Addon/Stream', () => {
      const Config = this.app.use('Adonis/Src/Config')
      const Logger = this.app.use('Logger')
      const EventStream = require('ssenode').EventStream

      let Stream = require('../src/Stream/index.js');
      return new Stream(EventStream, Logger, Config)
    })

    this.app.alias('Adonis/Addon/Stream', 'Stream')
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

    /**
     * Adding getter to the HTTP context. Please note the queue
     * instance...
     */
    HttpContext.getter('source', function () { // A NEW SOURCE INSTANCE ON EVERY REQUEST [HTTP]
      const Source = require('ssenode').Source
      
      if((this.request.header('Accept') || "").indexOf('text/event-stream') > -1){
          return new Source(require('uuid/v4'))
      }else{
          return {send:function(){}}
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
        let Source = require('ssenode').Source
      
        if((this.request.header('Accept') || "").indexOf('text/event-stream') > -1){
          return new Source(require('uuid/v4'))
        }else{
          return {send:function(){}}
        }
      }, true)
    } catch (error) {}
  }
}

module.exports = ServerSentEventsProvider
