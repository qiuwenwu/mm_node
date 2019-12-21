function append (collection, ...args) {
  if (args.length === 0) {
    return collection
  }

  if (typeof collection === 'string') {
    return collection + args.join('')
  } else if (Array.isArray(collection)) {
    return [...collection, ...args]
  }

  return []
}

module.exports = append
