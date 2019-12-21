function monetize (number, {
  digits = 2,
  separator = ',',
  symbol = 'zł',
  ending = true,
  space = true,
  hyphen = ' ',
  size = 3
} = {}) {
  let fixed = number.toFixed(digits)
  let integer = fixed.substr(0, fixed.lastIndexOf('.'))
  const decimal = fixed.substr(fixed.lastIndexOf('.')).replace('.', separator)
  space = space ? ' ' : ''

  if (integer.length > size) {
    integer = integer.split('')
    for (let i = integer.length - size - 1; i >= 0; i -= size) {
      integer.splice(i + 1, 0, hyphen)
    }
    integer = integer.join('').trim()
  }

  fixed = integer + decimal
  return ending ? fixed + space + symbol : symbol + space + fixed
}

module.exports = monetize
