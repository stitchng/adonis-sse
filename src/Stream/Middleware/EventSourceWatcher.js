'use strict'

class EventSourceWatcher {
  constructor (stream) {
    this.stream = stream
  }

  async handle ({ request, source, session }, next) {
    
    let middlewareFunc = (rq, rs, nx) => nx()
    
    try {
      middlewareFunc = this.stream.setup(source);
    } catch (err) {
      middlewareFunc = (req, res, nex) => nex()
    }
    
    await middlewareFunc(request.request, request.response, next);
    
  }
}

module.exports = EventSourceWatcher
