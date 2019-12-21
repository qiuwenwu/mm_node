const array = {
  average: {
    parameters: ['array'],
    description: {
      en: 'Returns the average of the array elements.',
      pl: 'Zwraca średnią z elementów tablicy.'
    }
  },
  compact: {
    parameters: ['array', 'strict'],
    description: {
      en: 'Returns an array with truthy values.',
      pl: 'Zwraca tablicę, zawierającą tylko te elementy, których wartości są prawdziwe.'
    }
  },
  drop: {
    parameters: ['array', 'digit'],
    description: {
      en: 'Removes elements of the array.',
      pl: 'Usuwa wybraną liczbę elementów z tablicy.'
    }
  },
  head: {
    parameters: ['array'],
    description: {
      en: 'Returns the first element of the array.',
      pl: 'Zwraca pierwszy element tablicy.'
    }
  },
  identifier: {
    parameters: ['array'],
    description: {
      en: 'Returns a new unique identifier based on passed in identifiers.',
      pl: 'Zwraca unikalny identyfikator bazując na wykorzystanych identyfikatorach.'
    }
  },
  median: {
    parameters: ['array'],
    description: {
      en: 'Returns the median of the array elements.',
      pl: 'Zwraca medianę na podstawie wartości elementów tablicy.'
    }
  },
  pluck: {
    parameters: ['array'],
    description: {
      en: 'Returns a list of property values from an array of objects.',
      pl: 'Zwraca listę wartości dla danej właściwości spośród listy obiektów.'
    }
  },
  rotate: {
    parameters: ['array', 'digit'],
    description: {
      en: 'Rotates the elements on the array. When second parameter is negative, shifting starts from the end of the array.',
      pl: 'Przesuwa elementy tablicy. Jeśli drugi parametry jest ujemny, elementy usuwane są z końca tablicy i przenoszone na jej początek.'
    }
  },
  sample: {
    parameters: [],
    description: {
      en: 'Returns random element of the array.',
      pl: 'Zwraca losowy element tablicy.'
    }
  },
  slice: {
    parameters: ['array', 'start', 'end'],
    description: {
      en: 'Extracts a fragment of the array.',
      pl: 'Wydobywa fragment tablicy.'
    }
  },
  sum: {
    parameters: ['array'],
    description: {
      en: 'Returns the sum of the array elements.',
      pl: 'Zwraca sumę elementów tablicy.'
    }
  },
  take: {
    parameters: ['array', 'digit'],
    description: {
      en: 'Takes elements from the array based on the second parameter, starting from the beginning of the array.',
      pl: 'Zwraca wybraną liczbę elementów tablicy na podstawie drugiego parametru, zaczynając od początku tablicy.'
    }
  },
  unique: {
    parameters: ['array'],
    description: {
      en: 'Returns an array with unique elements.',
      pl: 'Zwraca tablicę, zawierające tylko unikatowe elementy.'
    }
  },
  first: {
    parameters: ['array'],
    description: {
      en: 'Returns the first element of the array.',
      pl: 'Zwraca pierwszy element tablicy.'
    }
  },
  second: {
    parameters: ['array'],
    description: {
      en: 'Returns the second element of the array.',
      pl: 'Zwraca drugi element tablicy.'
    }
  },
  third: {
    parameters: ['array'],
    description: {
      en: 'Returns the third element of the array.',
      pl: 'Zwraca trzeci element tablicy.'
    }
  },
  fourth: {
    parameters: ['array'],
    description: {
      en: 'Returns the fourth element of the array.',
      pl: 'Zwraca czwarty element tablicy.'
    }
  },
  fifth: {
    parameters: ['array'],
    description: {
      en: 'Returns the fifth element of the array.',
      pl: 'Zwraca piąty element tablicy.'
    }
  },
  sixth: {
    parameters: ['array'],
    description: {
      en: 'Returns the sixth element of the array.',
      pl: 'Zwraca szósty element tablicy.'
    }
  },
  seventh: {
    parameters: ['array'],
    description: {
      en: 'Returns the seventh element of the array.',
      pl: 'Zwraca siódmy element tablicy.'
    }
  },
  eigth: {
    parameters: ['array'],
    description: {
      en: 'Returns the eigth element of the array.',
      pl: 'Zwraca ósmy element tablicy.'
    }
  },
  ninth: {
    parameters: ['array'],
    description: {
      en: 'Returns the ninth element of the array.',
      pl: 'Zwraca dziewiąty element tablicy.'
    }
  },
  tenth: {
    parameters: ['array'],
    description: {
      en: 'Returns the tenth element of the array.',
      pl: 'Zwraca dziesiąty element tablicy.'
    }
  },
  last: {
    parameters: ['array'],
    description: {
      en: 'Returns the last element of the array.',
      pl: 'Zwraca ostatni element tablicy.'
    }
  },
  nth: {
    parameters: ['array', 'position'],
    description: {
      en: 'Returns the element located at the passed position. When position is negative it searches from the end of the array.',
      pl: 'Zwraca element znajdujący się na wybranej pozycji. Gdy parametr "position" jest ujemny, wyszukiwanie elementu zaczyna się od końca tablicy.'
    }
  },
  intersection: {
    parameters: ['arrays'],
    description: {
      en: 'Returns an array containing elements common to all arrays that have been passed to the function.',
      pl: 'Zwraca tablicę, zawierającą elementy wspólne dla wszystkich tablic, które zostały przekazane do funkcji.'
    }
  },
  difference: {
    parameters: ['array', 'arrays'],
    description: {
      en: 'Returns an array containing elements that don\'t occur in other arrays.',
      pl: 'Zwraca tablicę, zawierającą elementy, które nie występują w pozostałych tablicach.'
    }
  },
  duplicates: {
    parameters: ['array'],
    description: {
      en: 'Returns an array containing repeated elements.',
      pl: 'Zwraca tablicę, zawierającą powtarzające sie elementy.'
    }
  },
  symdifference: {
    parameters: ['arrays'],
    description: {
      en: 'Returns an array of elements that are not part of intersection.',
      pl: 'Zwraca tablicę, zawierającą elementy, które nie należą do części wspólnej przekazanych tablic.'
    }
  },
  comma: {
    parameters: ['array', 'number'],
    description: {
      en: 'Returns a string created by joining array elements with comma and optional spaces.',
      pl: 'Zwraca łańcuch znaków zawierający dodatkowe przecincki i opcjonalne spacje.'
    }
  },
  union: {
    parameters: ['arrays'],
    description: {
      en: 'Returns an array of unique values.',
      pl: 'Zwraca tablicę z unikalnymi wartościami.'
    }
  },
  partition: {
    parameters: ['array', 'predicate'],
    description: {
      en: 'Returns an array of elements split into two groups, the first of which contains elements predicate returns truthy for, the second of which contains elements predicate returns falsey for. The predicate has one argument.',
      pl: 'Zwraca tablicę elementów podzieloną na dwie grupy, pierwszą zawierającą elementy dla których predykat zwraca prawdę oraz drugi, dla którego predykat zwraca fałsz. Predykat przyjmuje jeden argument.'
    }
  }
}
module.exports = array
