function sample (array) {
  const index = Math.floor(Math.random() * (array.length - 1))
  return array[index]
}

module.exports = sample
