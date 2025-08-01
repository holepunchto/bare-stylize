const test = require('brittle')
const stylize = require('.')

const stream = { isTTY: true } // mock

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

  const nonTTYStream = { isTTY: false } // mock
  t.is(stylize('bold', 'hello', { stream: nonTTYStream }), 'hello')
})
