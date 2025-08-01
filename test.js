const test = require('brittle')
const { Writable } = require('bare-stream')
const tty = require('bare-tty')
const stylize = require('.')

const stream = new tty.WriteStream(1)

test('basic', (t) => {
  t.is(stylize('bold', 'hello', { stream }), '\x1B[1mhello\x1B[0m', 'modifier')

  t.is(stylize('green', 'hello', { stream }), '\x1B[32mhello\x1B[0m', 'color')

  t.is(
    stylize(['bold', 'green'], 'hello', { stream }),
    '\x1B[1m\x1B[32mhello\x1B[0m',
    'multiple'
  )
})

test('options', (t) => {
  t.is(stylize('bold', 'hello', { validateStream: false, stream }), 'hello')

  t.is(
    stylize('bold', 'hello', { validateStream: true, stream }),
    '\x1B[1mhello\x1B[0m'
  )

  const nonTTYStream = new Writable()
  t.is(stylize('bold', 'hello', { stream: nonTTYStream }), 'hello')
})
