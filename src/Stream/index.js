'use strict'

class Stream {
  constructor (EventStream, Logger, Config) {
    this._logger = Logger
    this._init = EventStream.init

    this.options = {
      pad_for_ie: Config.get('sse.pad_for_ie'),
      no_ids: false,
      compress_output: Config.get('sse.compress_output'),
      prefer_event_name: Config.get('sse.prefer_event_name'),
      prefered_event_name: Config.get('sse.prefered_event_name')
    }
  }

  static set logger (newLogger) {
    this.prototype._logger = newLogger
  }

  setup (source) {
    return this.init(source, this.options)
  }
}

module.exports = Stream
