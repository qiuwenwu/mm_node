function rotate (array, digit) {
  if (!digit) return array
  if (Math.abs(digit) === array.length) return array
  if (digit < 0) {
    digit = Math.abs(digit)
    for (let i = 0; i < digit; i++) {
      const item = array.pop()
      array.unshift(item)
    }
    return array
  }
  if (digit > array.length) digit = digit - array.length
  for (let i = 0; i < digit; i++) {
    const item = array.shift()
    array.push(item)
  }
  return array
}

module.exports = rotate
