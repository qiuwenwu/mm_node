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

module.exports = unflatten
