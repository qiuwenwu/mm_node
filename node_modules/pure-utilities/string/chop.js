function chop (string) {
  if (!string) return string
  const match = string.match(/(\r\n)+$/)
  return match ? string.substr(0, match.index) : string.substr(0, string.length - 1)
}

module.exports = chop
