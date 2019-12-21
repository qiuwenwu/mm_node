function median (array) {
  array = array.sort((a, b) => a - b)
  const index = Math.floor(array.length / 2)

  if (array.length % 2 === 0) {
    return (array[index] + array[index - 1]) / 2
  }

  return array[index]
}

module.exports = median
