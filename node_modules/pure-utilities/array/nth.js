function nth (array, position) {
  return position > 0 ? array[position - 1] : array[array.length - Math.abs(position)]
}

module.exports = nth
