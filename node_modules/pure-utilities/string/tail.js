function tail (string, length = 30, ending = '...') {
  if (string.length > length) {
    return ending + string.substr(string.length - length + ending.length)
  }
  return string
}

module.exports = tail
