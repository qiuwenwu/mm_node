function htmlstrip (string) {
  string = string.replace(/'|:|\/|\./g, '')
  return string.replace(/(<[a-z]+((\s?)(([a-z]-?)+="(\/?[a-z]*\s?)+(|\s?)")?)+>)|<\/[a-z]*>/g, '')
}

module.exports = htmlstrip
