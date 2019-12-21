function underscore (string) {
  string = string.trim()
  const specialCharacters = /[^a-zA-Z0-9]/g

  for (let i = 1; i < string.length; i += 1) {
    const character = string[i]
    const previousCharacter = string[i - 1]

    if (character === ' ') {
      string = string.substr(0, i) + '_' + string.substr(i).trim()
    } else if (specialCharacters.test(character)) {
      string = string.substr(0, i) + '_' + string.substr(i + 1)
    } else if (Number.isInteger(Number(previousCharacter)) && !Number.isInteger(Number(character))) {
      string = string.substr(0, i) + '_' + string.substr(i)
    } else if ((previousCharacter.toUpperCase() !== previousCharacter) && character.toUpperCase() === character) {
      string = string.substr(0, i) + '_' + string.substr(i)
    }
  }
  return string.toLowerCase()
}

module.exports = underscore
