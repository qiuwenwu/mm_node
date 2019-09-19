function abs (number) {
  return Math.abs(number)
}

function acos (number) {
  return Math.acos(number)
}

function acosh (number) {
  return Math.acosh(number)
}

function asin (number) {
  return Math.asin(number)
}

function asinh (number) {
  return Math.asinh(number)
}

function atan (number) {
  return Math.atan(number)
}

function atan2 (number1, number2) {
  return Math.atan2(number1, number2)
}

function atanh (number) {
  return Math.atanh(number)
}

function cbrt (number) {
  return Math.cbrt(number)
}

function ceil (number) {
  return Math.ceil(number)
}

function cos (number) {
  return Math.cos(number)
}

function cosh (number) {
  return Math.cosh(number)
}

function exp (number) {
  return Math.exp(number)
}

function floor (number) {
  return Math.floor(number)
}

function log (number) {
  return Math.log(number)
}

function max (array) {
  return Math.max.apply(this, array)
}

function min (array) {
  return Math.min.apply(this, array)
}

function pow (number1, number2) {
  return Math.pow(number1, number2)
}

function random () {
  return Math.random()
}

function round (number) {
  return Math.round(number)
}

function sin (number) {
  return Math.sin(number)
}

function sinh (number) {
  return Math.sinh(number)
}

function sqrt (number) {
  return Math.sqrt(number)
}

function tan (number) {
  return Math.tan(number)
}

function tanh (number) {
  return Math.tanh(number)
}

function trunc (number) {
  return Math.trunc(number)
}

function square (number) {
  return number * number
}

function radians (number, precision = 2) {
  return Number(((number * Math.PI) / 180).toFixed(precision))
}

function degrees (number, precision = 2) {
  return Number(((180 / Math.PI) * number).toFixed(precision))
}

function factorial (number) {
  return number < 2 ? 1 : number * factorial(number - 1)
}

function add (number1, number2) {
  return number1 + number2
}

function subtract (number1, number2) {
  return number1 - number2
}

function multiply (number1, number2) {
  return number1 * number2
}

function divide (number1, number2) {
  return number1 / number2
}

function modulo (number1, number2) {
  return number1 % number2
}

function increment (number) {
  return ++number
}

function decrement (number) {
  return --number
}

function int (string) {
  return parseInt(string)
}

function float (value) {
  value = value.toString()
  value = value.replace(/\s/g, '')
  value = value.replace(/,/g, '.')
  return parseFloat(value)
}

function clamp (number, min, max) {
  if (number <= min) return min
  if (number >= max) return max
  return number
}

function percentage (number) {
  return number * 100 + '%'
}

function fixed (number1, digits = 0) {
  return number1.toFixed(digits)
}

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

function cube (number) {
  return (number) ** 3
}

function feet (number, precision = 2, decimal = true) {
  const result = Number(((number) * (1 / 12)).toFixed(precision))
  return decimal ? result : `${result}′`
}

function inches (number, precision = 2, decimal = true) {
  const result = Number((number * 12).toFixed(precision))
  return decimal ? result : `${result}″`
}

module.exports = {
  abs,
  acos,
  acosh,
  asin,
  asinh,
  atan,
  atan2,
  atanh,
  cbrt,
  ceil,
  cos,
  cosh,
  exp,
  floor,
  log,
  max,
  min,
  pow,
  random,
  round,
  sin,
  sinh,
  sqrt,
  tan,
  tanh,
  trunc,
  square,
  factorial,
  add,
  subtract,
  multiply,
  divide,
  modulo,
  increment,
  decrement,
  int,
  float,
  clamp,
  percentage,
  fixed,
  monetize,
  cube,
  feet,
  inches,
  radians,
  degrees
}
