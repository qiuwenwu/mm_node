function dig (object, string) {
  const keys = string.split('.')
  for (let i = 0, ilen = keys.length; i < ilen; i += 1) {
    const key = keys[i]
    if (key in object) {
      object = object[key]
    } else {
      return null
    }
  }
  return object
}

module.exports = dig
