function pluralize (string) {
  const endings = ['ch', 's', 'ss', 'sh', 'x', 'o']
  const vowels = ['a', 'e', 'i', 'o', 'u']
  const last = string.charAt(string.length - 1)
  const lasts = string.substr(string.length - 2)

  if (endings.includes(last) || endings.includes(lasts)) {
    return string.concat('es')
  }

  if (string.endsWith('f')) {
    return string.replace(last, 'ves')
  }

  if (string.endsWith('fe')) {
    return string.replace(lasts, 'ves')
  }

  if (string.endsWith('y') && !vowels.includes(string.charAt(string.length - 2))) {
    return string.replace(last, 'ies')
  }

  return string.concat('s')
}

module.exports = pluralize
