'use strict'

class EventSourceWatcher {
  constructor (stream) {
    this.stream = stream
  }

  async handle ({ request, source, session }, next) {
    /* eslint-disable no-unused-vars */
    let middlewareFunc = (rq, rs, nx) => nx()

    try {
      middlewareFunc = this.stream.setup(source)
    } catch (err) {
      middlewareFunc = (req, res, nex) => nex()
    }
    /* eslint-enable no-unused-vars */
    await middlewareFunc(request.request, request.response, next)
  }
}

module.exports = EventSourceWatcher
