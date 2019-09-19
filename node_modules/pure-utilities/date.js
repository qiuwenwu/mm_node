function isostring (value) {
  return new Date(parseInt(value, 10)).toISOString()
}

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
    { period: 'DD', value: date.getDate() }
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

function day (date) {
  if (Object.prototype.toString.call(date) !== '[object Date]') date = new Date(date)
  if (!Number(date)) return date.toDateString()
  return date.getDate()
}

function weekday (date) {
  if (Object.prototype.toString.call(date) !== '[object Date]') date = new Date(date)
  if (!Number(date)) return date.toDateString()
  return date.getDay()
}

function month (date) {
  if (Object.prototype.toString.call(date) !== '[object Date]') date = new Date(date)
  if (!Number(date)) return date.toDateString()
  return date.getMonth()
}

function year (date) {
  if (Object.prototype.toString.call(date) !== '[object Date]') date = new Date(date)
  if (!Number(date)) return date.toDateString()
  return date.getFullYear()
}

function prettydate (date, localization = 'en-En') {
  if (Object.prototype.toString.call(date) !== '[object Date]') date = new Date(date)
  if (!Number(date)) return date.toDateString()

  const months = {
    Jan: ['January', 'stycznia'],
    Feb: ['February', 'lutego'],
    Mar: ['March', 'marca'],
    Apr: ['April', 'kwietnia'],
    May: ['May', 'maja'],
    Jun: ['June', 'czerwca'],
    Jul: ['July', 'lipca'],
    Aug: ['August', 'sierpnia'],
    Sep: ['September', 'września'],
    Oct: ['October', 'października'],
    Nov: ['November', 'listopada'],
    Dec: ['December', 'grudnia']
  }
  const weekdays = {
    Mon: ['Monday', 'poniedziałek'],
    Tue: ['Tuesday', 'wtorek'],
    Wed: ['Wednesday', 'środa'],
    Thu: ['Thursday', 'czwartek'],
    Fri: ['Friday', 'piątek'],
    Sat: ['Saturday', 'sobota'],
    Sun: ['Sunday', 'niedziela']
  }

  let day = String(date.getDate())
  let weekday = date.toDateString().substr(0, 3)
  let month = date.toDateString().substr(4, 3)
  const year = date.getFullYear()

  if (localization === 'en-En') {
    weekday = weekdays[weekday][0]
    month = months[month][0]
    if (day === '1' || day === '21') {
      day += 'st'
    } else if (day === '2' || day === '22') {
      day += 'nd'
    } else if (day === '3' || day === '23') {
      day += 'rd'
    } else {
      day += 'th'
    }
    return `${weekday}, ${day} of ${month} ${year}`
  }
  if (localization === 'pl-Pl') {
    weekday = weekdays[weekday][1]
    month = months[month][1]
    return `${weekday}, ${day} ${month} ${year}`
  }
  throw new Error(`${localization} localization is not supported.`)
}

function timestamp (date, pattern = 'YYYY-MM-DD') {
  function method (key) {
    return ({
      YYYY: ['getFullYear', 4],
      YY: ['getFullYear', 2],
      MM: ['getMonth', 2, 1],
      DD: ['getDate', 2],
      HH: ['getHours', 2],
      mm: ['getMinutes', 2],
      ss: ['getSeconds', 2],
      ms: ['getMilliseconds', 3]
    })[key]
  }
  function assign () {
    var regex = /(?=(YYYY|YY|MM|DD|HH|mm|ss|ms))\1([:/]*)/
    var match = regex.exec(pattern)

    if (match) {
      var increment = method(match[1])
      var val = '00' + String(date[increment[0]]() + (increment[2] || 0))
      var res = val.slice(-increment[1]) + (match[2] || '')
      pattern = pattern.replace(match[0], res)
      assign()
    }
  }

  assign(pattern)
  return pattern
}

module.exports = {
  isostring,
  format,
  day,
  weekday,
  month,
  year,
  prettydate,
  timestamp
}
