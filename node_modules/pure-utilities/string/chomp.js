function chomp (string, pattern) {
  if (!string) return string
  if (!pattern) {
    const match = string.match(/(\r\n)+$/)
    if (match) return string.substr(0, match.index)
    if (string.endsWith('\n') || string.endsWith('\r')) return string.substr(0, string.length - 1)
  }

  const match = string.match(new RegExp(`${pattern}+$`), '')
  return match ? string.substr(0, match.index) : string
}

module.exports = chomp
