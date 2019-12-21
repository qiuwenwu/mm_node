function strip (string, pattern) {
  if (!pattern) return string.trim()
  if (!Array.isArray(pattern)) {
    if (pattern.length === 1) {
      const regExp = new RegExp(pattern, 'g')
      return string.replace(regExp, '')
    }
    const start = string.indexOf(pattern)
    const end = start + pattern.length
    return string.substr(0, start - 1) + '' + string.substr(end)
  }
  const regExp = new RegExp(pattern.join('|'), 'g')
  return string.replace(regExp, '')
}

module.exports = strip
