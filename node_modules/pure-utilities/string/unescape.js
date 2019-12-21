function unescape (string) {
  const entities = new Map([
    ['&amp;', '&'],
    ['&lt;', '<'],
    ['&gt;', '>'],
    ['&quot;', '"'],
    ['&39;', '\'']
  ])

  entities.forEach((value, key) => {
    if (string.includes(key)) {
      string = string.replace(new RegExp(key, 'g'), value)
    }
  })

  return string
}

module.exports = unescape
