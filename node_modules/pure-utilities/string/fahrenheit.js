function fahrenheit (string) {
  if (string.endsWith('K')) {
    string = Number(string.substring(0, string.lastIndexOf('K')))
    return Math.round((string - 273.15) * 1.8000 + 32) + '°F'
  }
  if (string.endsWith('°C')) {
    string = Number(string.substring(0, string.indexOf('°C')))
    return Math.round(string * 9 / 5 + 32) + '°F'
  }
  if (string.endsWith('°F')) {
    return string
  }
  return string + '°F'
}

module.exports = fahrenheit
