function dot (string) {
  return string.endsWith('.') ? string : string.concat('.')
}

module.exports = dot
