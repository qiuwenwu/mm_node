function hyphenate (string) {
  if (!string) return string

  const nonWords = /[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g
  const camelCase = /[a-z]{1}[A-Z]{1}/g
  const group = string.match(camelCase)

  string = string.replace(nonWords, '')
  string = string.trim()
  string = string.replace(/\s+/g, '-')

  if (group) {
    group.forEach(element => {
      const index = string.indexOf(element)
      string = string.substring(0, index + 1) + '-' + string.substr(index + 1)
    })
  }

  return string.toLowerCase()
}

module.exports = hyphenate
