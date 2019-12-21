function partition (array = [], predicate) {
  return array.reduce((acc, value) => predicate(value) ? [[...acc[0], value], acc[1]] : [acc[0], [...acc[1], value]], [[], []])
}

module.exports = partition
