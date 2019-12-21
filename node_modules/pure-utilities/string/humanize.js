function humanize (string, capitalize = true) {
  string = string.replace(/_/g, ' ')
  return capitalize ? string.charAt(0).toUpperCase() + string.substr(1) : string
}

module.exports = humanize
