function crop (string, length, append = '...') {
  if (string.length < length) return string
  string = string.substr(0, length + 1)
  return string.substr(0, string.lastIndexOf(' ')) + append
}

module.exports = crop
