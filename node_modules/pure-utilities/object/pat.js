function pat (object, string, value) {
  const keys = string.split('.')
  const reference = object
  for (let i = 0, ilen = keys.length; i < ilen; i += 1) {
    const key = keys[i]
    if (i + 1 === ilen) {
      object[key] = value
    } else {
      object[key] = {}
      object = object[key]
    }
  }
  return reference
}

module.exports = pat
