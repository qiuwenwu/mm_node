function whitespacestrip (string) {
  return string.replace(/\s/g, '')
}

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

function trim (string) {
  return string.trim()
}

function ltrim (string, characters = ' ') {
  let counter
  let character

  while (true) {
    counter = 0

    for (let i = 0, ilen = characters.length; i < ilen; i++) {
      character = characters[i]

      if (string.startsWith(character)) {
        counter += 1
        string = string.substring(1)
      }
    }

    if (counter === 0) {
      break
    }
  }

  return string
}

function rtrim (string, characters = ' ') {
  let counter
  let character
  let indexEnd = string.length - 1

  while (true) {
    counter = 0

    for (let i = characters.length - 1; i >= 0; i--) {
      character = characters[i]

      if (string.endsWith(character)) {
        counter += 1
        string = string.substring(0, indexEnd)
        indexEnd -= 1
      }
    }

    if (counter === 0) {
      break
    }
  }

  return string
}

function strip (string, pattern) {
  if (!pattern) return string.trim()
  if (!Array.isArray(pattern)) {
    if (pattern.length === 1) {
      const regExp = new RegExp(pattern, 'g')
      return string.replace(regExp, '')
    }
    const start = string.indexOf(pattern)
    const end = start + pattern.length
    return string.substr(0, start - 1) + '' + string.substr(end)
  }
  const regExp = new RegExp(pattern.join('|'), 'g')
  return string.replace(regExp, '')
}

function uppercase (string) {
  return string.toUpperCase()
}

function underscore (string) {
  string = string.trim()
  const specialCharacters = /[^a-zA-Z0-9]/g

  for (let i = 1; i < string.length; i += 1) {
    const character = string[i]
    const previousCharacter = string[i - 1]

    if (character === ' ') {
      string = string.substr(0, i) + '_' + string.substr(i).trim()
    } else if (specialCharacters.test(character)) {
      string = string.substr(0, i) + '_' + string.substr(i + 1)
    } else if (Number.isInteger(Number(previousCharacter)) && !Number.isInteger(Number(character))) {
      string = string.substr(0, i) + '_' + string.substr(i)
    } else if ((previousCharacter.toUpperCase() !== previousCharacter) && character.toUpperCase() === character) {
      string = string.substr(0, i) + '_' + string.substr(i)
    }
  }
  return string.toLowerCase()
}

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.substr(1)
}

function unescape (string) {
  const entities = new Map([
    ['&amp;', '&'],
    ['&lt;', '<'],
    ['&gt;', '>'],
    ['&quot;', '"'],
    ['&39;', '\'']
  ])

  entities.forEach((value, key) => {
    if (string.includes(key)) {
      string = string.replace(new RegExp(key, 'g'), value)
    }
  })

  return string
}

function lowerfirst (string) {
  return string.charAt(0).toLowerCase() + string.substr(1)
}

function lowercase (string) {
  return string.toLowerCase()
}

function humanize (string, capitalize = true) {
  string = string.replace(/_/g, ' ')
  return capitalize ? string.charAt(0).toUpperCase() + string.substr(1) : string
}

function titleize (string) {
  return string.split(' ').map(word => word.substr(0, 1).toUpperCase() + word.substr(1)).join(' ')
}

function dasherize (string) {
  return string.replace(/_/g, '-')
}

function classify (string) {
  if (string.endsWith('s')) {
    return string.charAt(0).toUpperCase() + string.substr(1, string.length - 2)
  }
  return string.charAt(0).toUpperCase() + string.substr(1)
}

function pluralize (string) {
  const endings = ['ch', 's', 'ss', 'sh', 'x', 'o']
  const vowels = ['a', 'e', 'i', 'o', 'u']
  const last = string.charAt(string.length - 1)
  const lasts = string.substr(string.length - 2)

  if (endings.includes(last) || endings.includes(lasts)) {
    return string.concat('es')
  }

  if (string.endsWith('f')) {
    return string.replace(last, 'ves')
  }

  if (string.endsWith('fe')) {
    return string.replace(lasts, 'ves')
  }

  if (string.endsWith('y') && !vowels.includes(string.charAt(string.length - 2))) {
    return string.replace(last, 'ies')
  }

  return string.concat('s')
}

function singularize (string, appendix = '') {
  if (string.endsWith('ves')) {
    return string.substr(0, string.length - 3).concat(appendix || 'fe')
  }

  if (string.endsWith('ies')) {
    return string.substr(0, string.length - 3).concat(appendix || 'y')
  }

  if (string.endsWith('es')) {
    return string.substr(0, string.length - 2).concat(appendix)
  }

  return string.substr(0, string.length - 1)
}

function swapcase (string) {
  return [...string].map(character => {
    return character.toUpperCase() === character ? character.toLowerCase() : character.toUpperCase()
  }).join('')
}

function camelize (string, lowercased = false) {
  const endings = /[^(a-zA-Z0-9)]|_|\s/g
  string = string.trim()
  string = string.charAt(0)[lowercased ? 'toUpperCase' : 'toLowerCase']() + string.substr(1)

  for (let i = 1, ilen = string.length; i < ilen; i += 1) {
    if (endings.test(string[i])) {
      string = string.substr(0, i) + string.charAt(i + 1).toUpperCase() + string.substr(i + 2)
    }
  }

  return string
}

function constantize (string) {
  const specialCharacters = /[^a-zA-Z0-9]/g
  string = string.replace(/\s+/g, ' ')

  for (let i = 1; i < string.length; i += 1) {
    const character = string.charAt(i)
    const previousCharacter = string.charAt(i - 1)

    if (character === '_' || previousCharacter === '_') continue

    if (specialCharacters.test(character)) {
      string = string.substr(0, i) + '_' + string.substr(i + 1)
    } else if (character.toUpperCase() === character && previousCharacter.toLowerCase() === previousCharacter) {
      string = string.substr(0, i) + '_' + string.substr(i)
    }
  }

  return string.toUpperCase()
}

function truncate (string, length = 30, ending = '...') {
  if (string.length > length) {
    return string.substr(0, length - ending.length).concat(ending)
  }
  return string
}

function tail (string, length = 30, ending = '...') {
  if (string.length > length) {
    return ending + string.substr(string.length - length + ending.length)
  }
  return string
}

function summarize (string, length = 100) {
  return string.length >= length ? string.concat('...') : string
}

function repeat (string, count) {
  return string.repeat(count)
}

function singlespace (string) {
  return string.replace(/\s\s+/g, ' ')
}

function quote (string, lang = 'en') {
  return lang === 'en' ? `"${string}"` : `„${string}”`
}

function unquote (string) {
  if (string.startsWith('"') && string.endsWith('"')) return string.substr(1, string.length - 2)
  if (string.startsWith('„') && string.endsWith('”')) return string.substr(1, string.length - 2)
  return string
}

function squeeze (string, pattern = 'a-zA-Z') {
  string = string.replace(/\s+/g, ' ')
  const regExp = new RegExp(`[${pattern}]`)
  for (let i = 1; i < string.length; i++) {
    const currentCharacter = string[i]
    const previousCharacter = string[i - 1]
    if (regExp.test(currentCharacter) && currentCharacter === previousCharacter) {
      string = string.substr(0, i) + string.substr(i + 1)
      i--
    }
  }
  return string
}

function wrap (string, first, last = first) {
  if (!first) return string
  return first + string + last
}

function unwrap (string, first, last = first) {
  if (!first) return string
  if (string.startsWith(first)) string = string.substr(1)
  if (string.endsWith(last)) string = string.substr(0, string.length - 1)

  return string
}

function replace (string, pattern, newString) {
  return string.replace(pattern, newString)
}

function index (string, pattern, start = 0) {
  return string.indexOf(pattern, start)
}

function chop (string) {
  if (!string) return string
  const match = string.match(/(\r\n)+$/)
  return match ? string.substr(0, match.index) : string.substr(0, string.length - 1)
}

function chomp (string, pattern) {
  if (!string) return string
  if (!pattern) {
    const match = string.match(/(\r\n)+$/)
    if (match) return string.substr(0, match.index)
    if (string.endsWith('\n') || string.endsWith('\r')) return string.substr(0, string.length - 1)
  }

  const match = string.match(new RegExp(`${pattern}+$`), '')
  return match ? string.substr(0, match.index) : string
}

function dot (string) {
  return string.endsWith('.') ? string : string.concat('.')
}

function crop (string, length, append = '...') {
  if (string.length < length) return string
  string = string.substr(0, length + 1)
  return string.substr(0, string.lastIndexOf(' ')) + append
}

function slugify (string, separator = '-') {
  if (!string) return string

  const nonWords = /[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g
  string = string.replace(nonWords, '')
  string = string.trim()
  string = string.replace(/\s+/g, separator)

  return string.toLowerCase()
}

function hyphenate (string) {
  if (!string) return string

  const nonWords = /[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF]/g
  const camelCase = /[a-z]{1}[A-Z]{1}/g
  const group = string.match(camelCase)

  string = string.replace(nonWords, '')
  string = string.trim()
  string = string.replace(/\s+/g, '-')

  if (group) {
    group.forEach(element => {
      const index = string.indexOf(element)
      string = string.substring(0, index + 1) + '-' + string.substr(index + 1)
    })
  }

  return string.toLowerCase()
}

function initials (string, separator = '') {
  if (!Array.isArray(string)) {
    string = string.replace('-', ' ')
    return string.split(' ').map(name => name[0].toUpperCase()).join(separator)
  }
  return string.map(element => {
    element = element.replace('-', ' ')
    return element.split(' ').map(name => name[0].toUpperCase()).join(separator)
  })
}

function htmlstrip (string) {
  string = string.replace(/'|:|\/|\./g, '')
  return string.replace(/(<[a-z]+((\s?)(([a-z]-?)+="(\/?[a-z]*\s?)+(|\s?)")?)+>)|<\/[a-z]*>/g, '')
}

function split (string, separator) {
  return string.split(separator)
}

function celsius (string) {
  if (string.endsWith('K')) {
    string = Number(string.substring(0, string.lastIndexOf('K')))
    return Math.round(string - 273.15) + '°C'
  }
  if (string.endsWith('°F')) {
    string = Number(string.substring(0, string.indexOf('°F')))
    return Math.round((string - 32) * 5 / 9) + '°C'
  }
  if (string.endsWith('°C')) {
    return string
  }
  return string + '°C'
}

function fahrenheit (string) {
  if (string.endsWith('K')) {
    string = Number(string.substring(0, string.lastIndexOf('K')))
    return Math.round((string - 273.15) * 1.8000 + 32) + '°F'
  }
  if (string.endsWith('°C')) {
    string = Number(string.substring(0, string.indexOf('°C')))
    return Math.round(string * 9 / 5 + 32) + '°F'
  }
  if (string.endsWith('°F')) {
    return string
  }
  return string + '°F'
}

function kelvin (string) {
  if (string.endsWith('°F')) {
    string = Number(string.substring(0, string.indexOf('°F')))
    return Math.round((string + 459.67) * 5 / 9) + 'K'
  }
  if (string.endsWith('°C')) {
    string = Number(string.substring(0, string.indexOf('°C')))
    return Math.round(string + 273.15) + 'K'
  }
  if (string.endsWith('K')) {
    return string
  }
  return string + 'K'
}

function uid (length = 32) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

module.exports = {
  pad,
  trim,
  ltrim,
  rtrim,
  strip,
  uppercase,
  underscore,
  capitalize,
  unescape,
  lowerfirst,
  lowercase,
  humanize,
  titleize,
  dasherize,
  classify,
  pluralize,
  singularize,
  swapcase,
  camelize,
  constantize,
  truncate,
  repeat,
  singlespace,
  whitespacestrip,
  quote,
  unquote,
  squeeze,
  summarize,
  wrap,
  unwrap,
  replace,
  index,
  chop,
  chomp,
  dot,
  crop,
  hyphenate,
  slugify,
  initials,
  htmlstrip,
  tail,
  split,
  celsius,
  fahrenheit,
  kelvin,
  uid
}
