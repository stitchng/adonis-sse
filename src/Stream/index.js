'use strict'

class Stream {
  constructor (EventStream, Logger, Config) {

    this._logger = Logger
    this.init = EventStream.init;
    this.options = {
      detect_ie_and_pad_with_comments: Config.get('sse.detect_ie')
      compress_output: Config.get('compress_output'),
      prefer_event_name: Config.get('prefer_event_name'),
      prefered_event_name: Config.get('prefered_event_name')
    }
  }

  static set logger (newLogger) {
    this.prototype._logger = newLogger
  }
  
  setup (source){
      return this.init(source, this.options);
  }
}

module.exports = Stream
