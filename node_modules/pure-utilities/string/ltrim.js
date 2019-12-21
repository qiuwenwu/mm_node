function ltrim (string, characters = ' ') {
  let counter
  let character

  while (true) {
    counter = 0

    for (let i = 0, ilen = characters.length; i < ilen; i++) {
      character = characters[i]

      if (string.startsWith(character)) {
        counter += 1
        string = string.substring(1)
      }
    }

    if (counter === 0) {
      break
    }
  }

  return string
}

module.exports = ltrim
