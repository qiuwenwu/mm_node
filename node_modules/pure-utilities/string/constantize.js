function constantize (string) {
  const specialCharacters = /[^a-zA-Z0-9]/g
  string = string.replace(/\s+/g, ' ')

  for (let i = 1; i < string.length; i += 1) {
    const character = string.charAt(i)
    const previousCharacter = string.charAt(i - 1)

    if (character === '_' || previousCharacter === '_') continue

    if (specialCharacters.test(character)) {
      string = string.substr(0, i) + '_' + string.substr(i + 1)
    } else if (character.toUpperCase() === character && previousCharacter.toLowerCase() === previousCharacter) {
      string = string.substr(0, i) + '_' + string.substr(i)
    }
  }

  return string.toUpperCase()
}

module.exports = constantize
