function celsius (string) {
  if (string.endsWith('K')) {
    string = Number(string.substring(0, string.lastIndexOf('K')))
    return Math.round(string - 273.15) + '°C'
  }
  if (string.endsWith('°F')) {
    string = Number(string.substring(0, string.indexOf('°F')))
    return Math.round((string - 32) * 5 / 9) + '°C'
  }
  if (string.endsWith('°C')) {
    return string
  }
  return string + '°C'
}

module.exports = celsius
