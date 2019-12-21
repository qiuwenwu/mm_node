function year (date) {
  if (Object.prototype.toString.call(date) !== '[object Date]') date = new Date(date)
  if (!Number(date)) return date.toDateString()
  return date.getFullYear()
}

module.exports = year
