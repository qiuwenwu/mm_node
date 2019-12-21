function unwrap (string, first, last = first) {
  if (!first) return string
  if (string.startsWith(first)) string = string.substr(1)
  if (string.endsWith(last)) string = string.substr(0, string.length - 1)

  return string
}

module.exports = unwrap
