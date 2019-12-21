function squeeze (string, pattern = 'a-zA-Z') {
  string = string.replace(/\s+/g, ' ')
  const regExp = new RegExp(`[${pattern}]`)
  for (let i = 1; i < string.length; i++) {
    const currentCharacter = string[i]
    const previousCharacter = string[i - 1]
    if (regExp.test(currentCharacter) && currentCharacter === previousCharacter) {
      string = string.substr(0, i) + string.substr(i + 1)
      i--
    }
  }
  return string
}

module.exports = squeeze
