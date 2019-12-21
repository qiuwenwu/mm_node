function quote (string, lang = 'en') {
  return lang === 'en' ? `"${string}"` : `„${string}”`
}

module.exports = quote
