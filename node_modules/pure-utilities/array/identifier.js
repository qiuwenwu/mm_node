function identifier (array) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  let index = 0
  while (array.indexOf(alphabet[index]) !== -1) {
    index += 1
    if (index === alphabet.length) {
      index = 0
      alphabet = alphabet.map(character => '_' + character)
    }
  }
  return alphabet[index]
}

module.exports = identifier
