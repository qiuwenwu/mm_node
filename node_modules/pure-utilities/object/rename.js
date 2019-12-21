function rename (object, keys) {
  const { hasOwnProperty } = Object.prototype
  for (const key in keys) {
    if (hasOwnProperty.call(keys, key) && hasOwnProperty.call(object, key)) {
      object[keys[key]] = object[key]
      delete object[key]
    }
  }
  return object
}

module.exports = rename
