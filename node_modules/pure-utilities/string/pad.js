function pad (value, pad, left = true) {
  if (!pad) { return value }
  if (Object.is(pad, Number(pad))) {
    pad = ' '.repeat(pad)
  }
  return String(value).split(/\r\n|\n/).map(line => {
    if (!line) return line
    return left ? pad + line : line + pad
  }).join('\n')
}

module.exports = pad
