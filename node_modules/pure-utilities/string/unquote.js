function unquote (string) {
  if (string.startsWith('"') && string.endsWith('"')) return string.substr(1, string.length - 2)
  if (string.startsWith('„') && string.endsWith('”')) return string.substr(1, string.length - 2)
  return string
}

module.exports = unquote
