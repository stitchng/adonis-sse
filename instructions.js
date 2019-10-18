'use strict'

/**
 * adonis-sse
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 *
 * @extended Oparand - Ifeora Okechukwu <isocroft@gmail.com>
 */

const path = require('path')

module.exports = async function (cli) {
  try {
    await cli.makeConfig('sse.js', path.join(__dirname, './config/sse.js'))
    cli.command.completed('create', 'config/sse.js')
  } catch (error) {
    // ignore if sse.js file already exists
  }
}
