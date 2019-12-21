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

module.exports = flatten
