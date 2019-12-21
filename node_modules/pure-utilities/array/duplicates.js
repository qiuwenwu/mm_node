
function duplicates (array) {
  const duplicates = []
  array.forEach((element, index) => {
    if (array.indexOf(element) !== index && !duplicates.includes(element)) {
      duplicates.push(element)
    }
  })
  return duplicates
}

module.exports = duplicates
