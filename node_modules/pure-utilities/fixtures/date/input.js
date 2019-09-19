const date = {
  format: {
    examples:
    [
      {
        input: [new Date('2013/06/13')],
        code: 'format(new Date("2013/06/13"))'
      },
      {
        input: [new Date(2018, 4, 23), 'MM'],
        code: 'format(new Date(2018, 4, 23), "MM")'
      },
      {
        input: [new Date(2018, 4, 23), 'DD/MM/YYYY'],
        code: 'format(new Date(2018, 4, 23), "DD/MM/YYYY")'
      }
    ]
  },
  isostring: {
    examples:
    [
      {
        input: ['1460303444338']
      }
    ]
  },
  prettydate: {
    examples:
    [
      {
        input: [new Date(2043, 9, 25)],
        code: 'prettydate(new Date(2043, 9, 25))'
      },
      {
        input: [new Date(2018, 2, 21)],
        code: 'prettydate(new Date(2018, 2, 21)'
      },
      {
        input: [new Date(2018, 2, 21), 'pl-Pl'],
        code: 'prettydate(new Date(2018, 2, 21)'
      }
    ]
  },
  timestamp: {
    examples:
    [
      {
        input: [new Date(2018, 4, 28), 'YYYY'],
        code: 'timestamp(new Date(2018, 4, 28), "YYYY")'
      },
      {
        input: [new Date(2018, 4, 28), 'YYYY/MM'],
        code: 'timestamp(new Date(2018, 4, 28), "YYYY/MM")'
      },
      {
        input: [new Date(2018, 4, 28), 'YYYY/MM/DD'],
        code: 'timestamp(new Date(2018, 4, 28), "YYYY/MM/DD")'
      }
    ]
  },
  day: {
    examples:
    [
      {
        input: [new Date(2018, 4, 28)],
        code: 'day(new Date(2018, 4, 28)'
      }
    ]
  },
  month: {
    examples:
    [
      {
        input: [new Date(2018, 4, 28)],
        code: 'month(new Date(2018, 4, 28))'
      }
    ]
  },
  weekday: {
    examples:
    [
      {
        input: [new Date(2017, 1, 11)],
        code: 'weekday(new Date(2017, 1, 11))'
      }
    ]
  },
  year: {
    examples:
    [
      {
        input: [new Date(2018, 4, 2)],
        code: 'year(new Date (2018, 4, 2))'
      }
    ]
  }
}

module.exports = date
