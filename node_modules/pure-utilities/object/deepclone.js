
function deepclone (object = {}) {
  try {
    return JSON.parse(JSON.stringify(object))
  } catch (err) {
    return {}
  }
}

module.exports = deepclone
