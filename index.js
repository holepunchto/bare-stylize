const escapes = require('bare-ansi-escapes')

function getStylesMap() {
  const stylesMap = {}

  let style
  for (const escape of Object.getOwnPropertyNames(escapes)) {
    if (escape.startsWith('color')) {
      style = escape[5].toLowerCase() + escape.slice(6)
    } else if (escape.startsWith('modifier')) {
      style = escape[8].toLowerCase() + escape.slice(9)
    } else {
      continue
    }

    stylesMap[style] = escapes[escape]
  }

  return stylesMap
}

const stylesMap = getStylesMap()

module.exports = function stylize(styles, text) {
  if (typeof styles === 'string') styles = [styles]

  const code = styles.map((style) => stylesMap[style]).join('')

  return code + text + escapes.modifierReset
}
