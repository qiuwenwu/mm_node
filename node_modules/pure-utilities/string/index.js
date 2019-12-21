function index (string, pattern, start = 0) {
  return string.indexOf(pattern, start)
}

const pad = require('./pad')
const trim = require('./trim')
const ltrim = require('./ltrim')
const rtrim = require('./rtrim')
const strip = require('./strip')
const uppercase = require('./uppercase')
const underscore = require('./underscore')
const capitalize = require('./capitalize')
const unescape = require('./unescape')
const lowerfirst = require('./lowerfirst')
const lowercase = require('./lowercase')
const humanize = require('./humanize')
const titleize = require('./titleize')
const dasherize = require('./dasherize')
const classify = require('./classify')
const pluralize = require('./pluralize')
const singularize = require('./singularize')
const swapcase = require('./swapcase')
const camelize = require('./camelize')
const constantize = require('./constantize')
const truncate = require('./truncate')
const repeat = require('./repeat')
const singlespace = require('./singlespace')
const whitespacestrip = require('./whitespacestrip')
const quote = require('./quote')
const unquote = require('./unquote')
const squeeze = require('./squeeze')
const summarize = require('./summarize')
const wrap = require('./wrap')
const unwrap = require('./unwrap')
const replace = require('./replace')
const chop = require('./chop')
const chomp = require('./chomp')
const dot = require('./dot')
const crop = require('./crop')
const hyphenate = require('./hyphenate')
const slugify = require('./slugify')
const initials = require('./initials')
const htmlstrip = require('./htmlstrip')
const tail = require('./tail')
const split = require('./split')
const celsius = require('./celsius')
const fahrenheit = require('./fahrenheit')
const kelvin = require('./kelvin')
const uid = require('./uid')
const bytes = require('./bytes')

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
  uid,
  bytes
}
