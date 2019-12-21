function reverse (collection) {
  return Array.isArray(collection) ? collection.reverse() : [...collection].reverse().join('')
}

module.exports = reverse
