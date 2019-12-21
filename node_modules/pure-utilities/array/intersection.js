function intersection (...arrays) {
  const result = []
  const array = arrays[0]
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (result.includes(item)) continue
    let j = 1
    for (j; j < arrays.length; j++) {
      if (!arrays[j].includes(item)) break
    }
    if (j === arrays.length) result.push(item)
  }
  return result
}

module.exports = intersection
