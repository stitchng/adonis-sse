'use strict'

class EventSourceWatcher {
  constructor (stream) {
    this.stream = stream
  }

  async handle ({ request, source, session }, next) {
    
    let middlewareFunc = (req, res, next) => next()
    
    try {
      middlewareFunc = this.stream.setup(source);
    } catch (err) {
      ;
    }
    
    await middlewareFunc(request.request, request.response, next);
    
  }
}

module.exports = EventSourceWatcher
