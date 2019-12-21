function truncate (string, length = 30, ending = '...') {
  if (string.length > length) {
    return string.substr(0, length - ending.length).concat(ending)
  }
  return string
}

module.exports = truncate
