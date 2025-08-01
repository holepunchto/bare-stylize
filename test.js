const test = require('brittle')
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
