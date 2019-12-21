function pluck (array, propertyName) {
  const length = array.length
  const extracted = []

  for (let i = 0, element, value; i < length; i++) {
    element = array[i]
    value = element[propertyName]

    if (Object.prototype.toString.call(element) === '[object Object]' && value) {
      extracted.push(value)
    }
  }

  return extracted
}

module.exports = pluck
