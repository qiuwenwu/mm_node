function difference (array, ...arrays) {
  const difference = []
  array.forEach(element => {
    if (!arrays.flat().includes(element)) {
      difference.push(element)
    }
  })
  return difference
}

module.exports = difference
