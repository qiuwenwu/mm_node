function slugify (string, separator = '-') {
  if (!string) return string

  const nonWords = /[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g
  string = string.replace(nonWords, '')
  string = string.trim()
  string = string.replace(/\s+/g, separator)

  return string.toLowerCase()
}

module.exports = slugify
