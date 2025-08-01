const test = require('brittle')
const { Writable } = require('bare-stream')
const stylize = require('.')

test('basic', (t) => {
  t.is(stylize('bold', 'hello'), '\x1B[1mhello\x1B[0m', 'modifier')

  t.is(stylize('green', 'hello'), '\x1B[32mhello\x1B[0m', 'color')

  t.is(
    stylize(['bold', 'green'], 'hello'),
    '\x1B[1m\x1B[32mhello\x1B[0m',
    'multiple'
  )
})

test('options', (t) => {
  t.is(stylize('bold', 'hello', { validateStream: false }), 'hello')

  t.is(
    stylize('bold', 'hello', { validateStream: true }),
    '\x1B[1mhello\x1B[0m'
  )

  const stream = new Writable()
  t.is(stylize('bold', 'hello', { stream }), 'hello')
})
