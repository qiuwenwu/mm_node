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

  return ''
}

module.exports = prettydate
