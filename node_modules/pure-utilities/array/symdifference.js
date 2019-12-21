function symdifference (...arrays) {
  return arrays.reduce((accumulator, array) => {
    return accumulator.filter(element => !array.includes(element))
      .concat(array.filter(element => !accumulator.includes(element)))
  }, [])
}

module.exports = symdifference
