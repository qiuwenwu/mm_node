function rtrim (string, characters = ' ') {
  let counter
  let character
  let indexEnd = string.length - 1

  while (true) {
    counter = 0

    for (let i = characters.length - 1; i >= 0; i--) {
      character = characters[i]

      if (string.endsWith(character)) {
        counter += 1
        string = string.substring(0, indexEnd)
        indexEnd -= 1
      }
    }

    if (counter === 0) {
      break
    }
  }

  return string
}

module.exports = rtrim
