function camelize (string, lowercased = false) {
  const endings = /[^(a-zA-Z0-9)]|_|\s/g
  string = string.trim()
  string = string.charAt(0)[lowercased ? 'toUpperCase' : 'toLowerCase']() + string.substr(1)

  for (let i = 1, ilen = string.length; i < ilen; i += 1) {
    if (endings.test(string[i])) {
      string = string.substr(0, i) + string.charAt(i + 1).toUpperCase() + string.substr(i + 2)
    }
  }

  return string
}

module.exports = camelize
