const { stringify } = JSON
function replacer (key, value) {
  return typeof value === 'function' ? value.toString() : value
}
function getCode (fn, input) {
  const args = input.map(value => stringify(value, replacer)).join(', ')
  return `${fn.name}(${args})`
}

function generate (utility, fixtures) {
  for (const key in utility) {
    const fn = utility[key]
    const fixture = fixtures[key]
    if (!fixture) throw new Error(`There is no example for the ${key} method`)
    for (const example of fixture.examples) {
      const { input } = example
      if (!example.code) { example.code = getCode(fn, input) }
      example.output = fn(...input)
    }
  }
  return fixtures
}
module.exports = generate
