function titleize (string) {
  return string.split(' ').map(word => word.substr(0, 1).toUpperCase() + word.substr(1)).join(' ')
}

module.exports = titleize
