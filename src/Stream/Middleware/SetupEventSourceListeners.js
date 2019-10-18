'use strict'

class SetupEventSourceListeners {
  constructor (stream) {
    this.stream = stream
  }

  async handle ({ request, source, session }, next) {
    try {

      let middlewareFunc = this.stream.setup(source);
    } catch (err) {
      ;
    }
    
    await middlewareFunc(request.request, request.response, next);
    
  }
}

module.exports = SetupEventSourceListeners
