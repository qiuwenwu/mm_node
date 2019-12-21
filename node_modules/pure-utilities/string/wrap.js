function wrap (string, first, last = first) {
  if (!first) return string
  return first + string + last
}

module.exports = wrap
