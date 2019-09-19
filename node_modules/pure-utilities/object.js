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

function values (object) {
  return Object.values(object)
}

function keys (object) {
  return Object.keys(object)
}

function merge (object, ...source) {
  return Object.assign(object, ...source)
}

function clone (object) {
  return Object.assign({}, object)
}

function deepclone (object) {
  return JSON.parse(JSON.stringify(object))
}

module.exports = {
  rename,
  dig,
  pat,
  values,
  keys,
  merge,
  clone,
  deepclone
}
