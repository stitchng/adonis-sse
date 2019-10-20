'use strict'

/*
 * adonis-sse
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const test = require('japa')
const { Config, Logger } = require('@adonisjs/sink')
const { ioc } = require('@adonisjs/fold')

const ServerSentEventsProvider = require('../providers/ServerSentEventsProvider.js')
const Stream = require('../src/Stream/index.js')
// const EventSourceWatcher = require('../src/Stream/Middleware/EventSourceWatcher.js')

test.group('AdonisJS Sse Test(s)', (group) => {
  group.before(() => {
    ioc.singleton('Adonis/Src/Config', () => {
      let config = new Config()
      config.set('sse.no_ids', true)
      config.set('sse.compress_output', false)
      config.set('sse.prefer_event_name', false)
      config.set('sse.prefered_event_name', 'ping')
      return config
    })

    ioc.singleton('Logger', () => {
      return new Logger()
    })

    ioc.singleton('Adonis/Src/HttpContext', () => {
      return {
        request: {},
        response: {},
        params: {},
        getter (name, callback) {
          this[name] = callback()
        }
      }
    })
  })

  test('sse provider instance registers instance(s) as expected', async (assert) => {
    let provider = new ServerSentEventsProvider(ioc)
    provider.register()

    assert.instanceOf(ioc.use('Adonis/Addon/Stream'), Stream)
  })
})
