function comma (array, spacing = 0) {
  return array.join(',' + ' '.repeat(spacing))
}

module.exports = comma
