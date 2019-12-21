function singlespace (string) {
  return string.replace(/\s\s+/g, ' ')
}

module.exports = singlespace
