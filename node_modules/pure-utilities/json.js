function prettify (value, indent = 2) {
  const object = typeof value === 'string' ? JSON.parse(value) : value
  return JSON.stringify(object, null, indent)
}

module.exports = { prettify }
