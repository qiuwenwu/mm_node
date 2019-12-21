function union (...arrays) {
  return [...new Set(arrays.reduce((acc, value) => [...acc, ...value], []))]
}

module.exports = union
