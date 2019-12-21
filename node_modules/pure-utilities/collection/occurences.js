function occurences (collection, string) {
  if (typeof collection === 'string') {
    collection = collection.split(/\s+/g)
  }

  const { [string]: count = 0 } = collection.reduce((object, item) => ({ ...object, [item]: (object[item] || 0) + 1 }), {})

  return count
}

module.exports = occurences
