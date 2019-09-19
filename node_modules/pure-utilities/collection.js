function append (collection, ...args) {
  if (args.length === 0) {
    return collection
  }

  if (typeof collection === 'string') {
    return collection + args.join('')
  } else if (Array.isArray(collection)) {
    return [...collection, ...args]
  }

  throw new TypeError("[ERROR]: 'append' filter processes only strings or arrays")
}

function prepend (collection, ...args) {
  if (args.length === 0) {
    return collection
  }

  if (typeof collection === 'string') {
    return args.join('') + collection
  } else if (Array.isArray(collection)) {
    return [...args, ...collection]
  }

  throw new TypeError("[ERROR]: 'prepend' filter processes only strings or arrays")
}

function reverse (collection) {
  return Array.isArray(collection) ? collection.reverse() : [...collection].reverse().join('')
}

function size (collection) {
  const type = Object.prototype.toString.call(collection).substr(8).replace(']', '')
  if (type === 'Array' || type === 'String') return collection.length
  if (type === 'Object') return Object.keys(collection).length
  if (type === 'Map' || type === 'Set') return collection.size
}

function flatten (collection) {
  if (Array.isArray(collection)) {
    return collection.reduce((previous, current) => {
      return previous.concat(Array.isArray(current) ? flatten(current) : current)
    }, [])
  }
  const result = {}
  for (const key in collection) {
    if (typeof collection[key] === 'object') {
      const deep = flatten(collection[key])
      for (const prefix in deep) {
        result[key + '.' + prefix] = deep[prefix]
      }
    } else {
      result[key] = collection[key]
    }
  }
  return result
}

function unflatten (collection) {
  const result = {}
  for (const key in collection) {
    const parts = key.split('.')
    let current = result
    let property = '_'
    for (let i = 0; i < parts.length; i++) {
      current = current[property] || (current[property] = {})
      property = parts[i]
    }
    current[property] = collection[key]
  }
  return result._
}

module.exports = {
  append,
  prepend,
  reverse,
  size,
  flatten,
  unflatten
}
