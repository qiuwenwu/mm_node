function initials (string, separator = '') {
  if (!Array.isArray(string)) {
    string = string.replace('-', ' ')
    return string.split(' ').map(name => name[0].toUpperCase()).join(separator)
  }
  return string.map(element => {
    element = element.replace('-', ' ')
    return element.split(' ').map(name => name[0].toUpperCase()).join(separator)
  })
}

module.exports = initials
