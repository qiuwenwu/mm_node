function classify (string) {
  if (string.endsWith('s')) {
    return string.charAt(0).toUpperCase() + string.substr(1, string.length - 2)
  }
  return string.charAt(0).toUpperCase() + string.substr(1)
}

module.exports = classify
