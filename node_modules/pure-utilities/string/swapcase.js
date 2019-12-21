function swapcase (string) {
  return [...string].map(character => {
    return character.toUpperCase() === character ? character.toLowerCase() : character.toUpperCase()
  }).join('')
}

module.exports = swapcase
