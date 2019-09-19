const date = {
  format: {
    parameters: ['date', 'format'],
    description: {
      en: 'Formats the date. First argument can be a Date object or a date string. By default date is parsed to the YYYY-MM-DD format.',
      pl: 'Formatuje datę. Pierwszy parametr może być obiektem typu Date lub łańcuchem znaków, z którego można utworzyć datę. Domyślnym formatem jest: YYYY-MM-DD.'
    }
  },
  isostring: {
    parameters: ['value'],
    description: {
      en: 'Returns a string in simplified extended ISO format.',
      pl: 'Zwraca łańuch znaków w uproszczonym rozszerzonym formacie ISO.'
    }
  },
  prettydate: {
    parameters: ['date', 'localization'],
    description: {
      en: 'Returns a string, that contains: the name of weekday, day of the month (from 1 to 31), name of the month, and year (four digits for dates between year 1000 and 9999). Localization can be "en-En" or "pl-Pl", in other case function throws error. By default localization equals "en-En".',
      pl: 'Zwraca łańuch znaków, który zawiera: nazwę dnia tygodnia, dzień miesiąca (od 1 do 31), nazwę miesiąca oraz rok. Parametr "localization" może przyjąć wartość "en-En" lub "pl-Pl", w innym przypadku funkcja zwróci błąd. Domyślnie parametr "localization" przyjmuje wartość "en-En" i zwraca łańuch znaków w języku angielskim.'
    }
  },
  timestamp: {
    parameters: ['date', 'pattern'],
    description: {
      en: 'Returns a formatted date, based on the passed pattern.',
      pl: 'Zwraca sformatowaną datę, na podstawie przekazanego wzorca.'
    }
  },
  day: {
    parameters: ['date'],
    description: {
      en: 'Returns the day of the month (from 1 to 31) of the passed date.',
      pl: 'Zwraca dzień miesiąca (od 1 do 31), na podstawie przekazanej daty.'
    }
  },
  month: {
    parameters: ['date'],
    description: {
      en: 'Returns the month (from 0 to 11) of the passed date.',
      pl: 'Zwraca miesiąc (od 0 do 11), na podstawie przekazanej daty.'
    }
  },
  weekday: {
    parameters: ['date'],
    description: {
      en: 'Returns the day of the week (from 0 to 6) of the specified date.',
      pl: 'Zwraca dzień tygodnia (od 0 do 6) na podstawie przekazanej daty.'
    }
  },
  year: {
    parameters: ['date'],
    description: {
      en: 'Returns the year of the passed date.',
      pl: 'Zwraca rok, na podstawie przekazanej daty.'
    }
  }
}

module.exports = date
