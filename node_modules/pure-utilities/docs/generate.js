const utilities = require('..')
const documentation = require('.')

for (const name in utilities) {
  const utility = utilities[name]
  for (const method in utility) {
    if (!documentation[name][method]) {
      throw new Error(`Documentation missing for: ${method}`)
    }
    const { description } = documentation[name][method]
    if (!description) {
      throw new Error(`Description missing for: ${method}`)
    }
    if (!description.en || !description.pl) {
      throw new Error(`Translations missing for: ${method}`)
    }
    if (description.en[description.en.length - 1] !== '.' ||
      description.pl[description.pl.length - 1] !== '.') {
      throw new Error(`Translation for ${method} must end with a dot`)
    }
  }
}
