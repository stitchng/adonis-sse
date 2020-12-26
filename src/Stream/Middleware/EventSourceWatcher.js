'use strict'

class EventSourceWatcher {
  constructor (stream) {
    this.stream = stream
  }

  async handle ({ request, source, session }, next) {
    let middlewareFunc = null
    /* eslint-disable no-unused-vars */
    try {
      let isIE = (request.hasHeader('ua-cpu') || ((request.header('User-Agent', 'unknown')).match(/Trident [\d]{1}/g) !== null))

      middlewareFunc = this.stream.setup(source, {
        is_ie_req: isIE
      })
    } catch (err) {
      middlewareFunc = (req, res, nex) => nex()
    }
    /* eslint-enable no-unused-vars */
    await middlewareFunc(request.request, request.response, next)
  }
}

module.exports = EventSourceWatcher
