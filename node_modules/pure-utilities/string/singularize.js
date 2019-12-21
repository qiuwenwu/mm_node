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

module.exports = singularize
