
function format (date, format) {
  const separators = [',', '.', '-', '/', ' ', '|', '_']
  const months = new Map([
    ['Jan', '01'],
    ['Feb', '02'],
    ['Mar', '03'],
    ['Apr', '04'],
    ['May', '05'],
    ['Jun', '06'],
    ['Jul', '07'],
    ['Aug', '08'],
    ['Sep', '09'],
    ['Oct', '10'],
    ['Nov', '11'],
    ['Dec', '12']
  ])

  if (Object.prototype.toString.call(date) !== '[object Date]') date = new Date(date)
  if (!Number(date)) return 'Invalid Date'

  date = [
    { period: 'YYYY', value: date.getFullYear() },
    { period: 'MM', value: months.get(date.toDateString().substr(4, 3)) },
    { period: 'DD', value: `0${date.getDate()}`.slice(-2) }
  ]

  if (!format) return date[2].value + '-' + date[1].value + '-' + date[0].value
  const separator = separators.find(separator => format.includes(separator))

  if (!separator) {
    const part = date.find(date => date.period === format)
    return part ? part.value.toString() : 'Invalid Format'
  }

  format = format.split(separator)
  for (let i = 0; i < date.length; i++) {
    for (let j = 0; j < format.length; j++) {
      const index = format.indexOf(date[i].period)
      if (index === -1) {
        date.splice(i, 1)
        i--
      } else if (index !== i) {
        const copyDate = date[i]
        date[i] = date[index]
        date[index] = copyDate
      }
    }
  }

  let stringDate = ''
  date.forEach((element, index) => {
    if (index === date.length - 1) {
      stringDate += element.value
    } else {
      stringDate += element.value + separator
    }
  })
  return stringDate
}

module.exports = format
