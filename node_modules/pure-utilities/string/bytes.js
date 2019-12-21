function bytes (string) {
  const [, size, dimension] = string.match(/^(\d+)(B|KB|MB|GB|TB|PB|EB|ZB|YB)$/i) || [null, null, null]

  if (!size || !dimension) {
    return null
  }

  const dimensions = {
    B: 2 ** 0,
    KB: 2 ** 10,
    MB: 2 ** 20,
    GB: 2 ** 30,
    TB: 2 ** 40,
    PB: 2 ** 50,
    EB: 2 ** 60,
    ZB: 2 ** 70,
    YB: 2 ** 80
  }

  return size * dimensions[dimension]
}

module.exports = bytes
