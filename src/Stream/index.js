'use strict'

class Stream {
  constructor (EventStream, Logger, Config) {
    this._logger = Logger
    this._init = EventStream.init.bind(EventStream)

    this.options = {
      // pad_for_ie: false,
      no_ids: Config.get('sse.no_ids'),
      compress_output: Config.get('sse.compress_output'),
      prefer_event_name: Config.get('sse.prefer_event_name'),
      prefered_event_name: Config.get('sse.prefered_event_name')
    }
  }

  static set logger (newLogger) {
    this.prototype._logger = newLogger
  }

  setup (source, optionsOverride = {}) {
    this.options.pad_for_ie = optionsOverride.is_ie_req
    return this._init(source, this.options)
  }
}

module.exports = Stream
