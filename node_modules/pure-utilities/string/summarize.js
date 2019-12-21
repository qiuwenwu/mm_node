function summarize (string, length = 100) {
  return string.length >= length ? string.concat('...') : string
}

module.exports = summarize
