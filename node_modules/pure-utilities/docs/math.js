const math = {
  abs: {
    parameters: ['number'],
    description: {
      en: 'Returns the absolute value of the number.',
      pl: 'Zwraca wartość absolutną z liczby.'
    }
  },
  acos: {
    parameters: ['number'],
    description: {
      en: 'Returns the arccosine of the number, in radians.',
      pl: 'Zwraca arcus cosinus z liczby, wyrażony w radianach.'
    }
  },
  acosh: {
    parameters: ['number'],
    description: {
      en: 'Returns the hyperbolic arccosine of the number.',
      pl: 'Zwraca arcus cosinus hiperboliczny z liczby, wyrażony w radianach.'
    }
  },
  asin: {
    parameters: ['number'],
    description: {
      en: 'Returns the arcsine of the number, in radians.',
      pl: 'Zwraca arcus sinus z liczby, wyrażony w radianach.'
    }
  },
  asinh: {
    parameters: ['number'],
    description: {
      en: 'Returns the hyperbolic arcsine of the number.',
      pl: 'Zwraca arcus sinus hiperboliczny z liczby.'
    }
  },
  atan: {
    parameters: ['number'],
    description: {
      en: 'Returns the hyperbolic arctangent of the number.',
      pl: 'Zwraca arcus tanges hiperboliczny z liczby.'
    }
  },
  atan2: {
    parameters: ['number1', 'number2'],
    description: {
      en: 'Returns the arctangent of the quotient of its arguments.',
      pl: 'Zwraca arcus tanges ilorazu argumentów przekazanych do funkcji.'
    }
  },
  atanh: {
    parameters: ['number'],
    description: {
      en: 'Returns the hyperbolic arctangent of the number.',
      pl: 'Zwraca arcus tanges hiperboliczny z liczby.'
    }
  },
  cbrt: {
    parameters: ['number'],
    description: {
      en: 'Returns the cubic root of the number.',
      pl: 'Zwraca pierwiastek sześcienny z liczby.'
    }
  },
  ceil: {
    parameters: ['number'],
    description: {
      en: 'Returns the number, rounded upwards to the nearest integer.',
      pl: 'Zwraca liczbę zaokrągloną w górę do najbliższej liczby całkowitej.'
    }
  },
  cos: {
    parameters: ['number'],
    description: {
      en: 'Returns the cosine of the number (number is in radians).',
      pl: 'Zwraca cosinus z liczby.'
    }
  },
  cosh: {
    parameters: ['number'],
    description: {
      en: 'Returns the hyperbolic cosine of the number.',
      pl: 'Zwraca cosinus hiperboliczny z liczby.'
    }
  },
  exp: {
    parameters: ['number'],
    description: {
      en: 'Returns the value of E^number, where E is Euler\'s number.',
      pl: 'Zwraca wartość z wyrażenia E^number, gdzie E jest liczbę Eulera.'
    }
  },
  floor: {
    parameters: ['number'],
    description: {
      en: 'Returns the number, rounded downwards to the nearest integer.',
      pl: 'Zwraca liczbę zaokrągloną w dół do najbliższej liczby całkowitej.'
    }
  },
  log: {
    parameters: ['number'],
    description: {
      en: 'Returns the natural logarithm (base E) of the number.',
      pl: 'Zwraca logarytm naturalny z liczby.'
    }
  },
  max: {
    parameters: ['numbers'],
    description: {
      en: 'Returns the number with the highest value.',
      pl: 'Zwraca wartość wartość maksymalną z tablicy liczb.'
    }
  },
  min: {
    parameters: ['numbers'],
    description: {
      en: 'Returns the number with the lowest value.',
      pl: 'Zwraca wartość minimalną z tablicy liczb.'
    }
  },
  pow: {
    parameters: ['number1', 'number2'],
    description: {
      en: 'Returns the value of first parameter to the power of the second parameter.',
      pl: 'Podnosi pierwszy parametr do potęgi drugiego parametru.'
    }
  },
  random: {
    parameters: [],
    description: {
      en: 'Returns a floating-point, pseudo-random number in the range 0–1.',
      pl: 'Zwraca liczbę pseudolosową z przedziału 0-1.'
    }
  },
  round: {
    parameters: ['number'],
    description: {
      en: 'Rounds the number, to the nearest integer.',
      pl: 'Zaokrągla liczbę, do najbliższej liczby całkowitej.'
    }
  },
  sin: {
    parameters: ['number'],
    description: {
      en: 'Returns the sine of the number.',
      pl: 'Zwraca sinus z liczby.'
    }
  },
  sinh: {
    parameters: ['number'],
    description: {
      en: 'Returns the hyperbolic sine of the number.',
      pl: 'Zwraca sinus hiperboliczny z liczby.'
    }
  },
  tan: {
    parameters: ['number'],
    description: {
      en: 'Returns the tangent of the number.',
      pl: 'Zwraca tanges z liczby.'
    }
  },
  tanh: {
    parameters: ['number'],
    description: {
      en: 'Returns the hyperbolic tangent of the number.',
      pl: 'Zwraca tanges hiperboliczny z liczby.'
    }
  },
  sqrt: {
    parameters: ['number'],
    description: {
      en: 'Returns the square root of the number.',
      pl: 'Zwraca pierwiastek z liczby.'
    }
  },
  trunc: {
    parameters: ['number'],
    description: {
      en: 'Returns the integer part of the number.',
      pl: 'Zwraca część całkowitą z liczby.'
    }
  },
  square: {
    parameters: ['number'],
    description: {
      en: 'Returns square of the number.',
      pl: 'Zwraca kwadrat liczby.'
    }
  },
  radians: {
    parameters: ['number', 'precision'],
    description: {
      en: 'Converts degrees to radians and rounds received result to the passed precision. By default precision equals 2.',
      pl: 'Konwertuje stopnie na radiany. Rezultat domyślnie zaokrąglany jest do 2 miejsc po przecinku.'
    }
  },
  degrees: {
    parameters: ['number', 'precision'],
    description: {
      en: 'Converts radians to degrees and rounds received result to the passed precision. By default precision equals 2.',
      pl: 'Konwertuje radiany na stopnie. Rezultat domyślnie zaokrąglany jest do 2 miejsc po przecinku.'
    }
  },
  factorial: {
    parameters: ['number'],
    description: {
      en: 'Returns factorial of the number.',
      pl: 'Zwraca silnię z liczby.'
    }
  },
  add: {
    parameters: ['number1', 'number2'],
    description: {
      en: 'Adds two parameters.',
      pl: 'Dodaje dwa parametry.'
    }
  },
  subtract: {
    parameters: ['number1', 'number2'],
    description: {
      en: 'Subtracts two parameters.',
      pl: 'Odejmuje dwa parametry.'
    }
  },
  multiply: {
    parameters: ['number1', 'number2'],
    description: {
      en: 'Multiplies two parametrs.',
      pl: 'Mnoży dwa parametry.'
    }
  },
  divide: {
    parameters: ['number1', 'number2'],
    description: {
      en: 'Divides two parameters.',
      pl: 'Dzieli dwa parametry.'
    }
  },
  modulo: {
    parameters: ['number1', 'number2'],
    description: {
      en: 'Divides two parameters and returns the remainder.',
      pl: 'Zwraca resztę z dzielenia dwóch parametrów.'
    }
  },
  increment: {
    parameters: ['number'],
    description: {
      en: 'Increments the number.',
      pl: 'Inkrementuje liczbę.'
    }
  },
  decrement: {
    parameters: ['number'],
    description: {
      en: 'Decrements the number.',
      pl: 'Dekrementuje liczbę.'
    }
  },
  int: {
    parameters: ['number'],
    description: {
      en: 'Parses the number to the integer.',
      pl: 'Przetwarza liczbę na liczbę całkowitą.'
    }
  },
  float: {
    parameters: ['number'],
    description: {
      en: 'Parses the number to the float.',
      pl: 'Przetwarza liczbę na liczbę zmiennoprzecinkową.'
    }
  },
  clamp: {
    parameters: ['number, min, max'],
    description: {
      en: 'Returns the highest possible value from range min to max of the number.',
      pl: 'Zwraca największą możliwą wartość z zakresu min-max uwzględniając przekazaną liczbę.'
    }
  },
  percentage: {
    parameters: ['number'],
    description: {
      en: 'Converts the number to percentage format.',
      pl: 'Konwertuje liczbę na format procentowy.'
    }
  },
  fixed: {
    parameters: ['number', 'digit'],
    description: {
      en: 'Formats the number using fixed-point notation. By default digit equals 0.',
      pl: 'Formatuje liczbę używając notacji stałoprzecinkowej.'
    }
  },
  monetize: {
    parameters: ['number', 'options'],
    description: {
      en: `Formats the number to currency format
           options is an object that accepts the following parameters:
           - digits: Number of digits after comma. By default equals 2.
           - separator: Separator separating the decimal part. By default equals ','.
           - symbol: The symbol of currency. By default equals 'zł'.
           - ending: Boolean flag, that specifies position of currency symbol. By default set to true.
           - space: Boolean flag, that specifies if space should exist before currency symbol. By default set to true.
           - hyphen: The symbol between groups of integer part. By default set to empty space.
           - size: The number of integers, that should be grouped. By default set to 3.`,
      pl: `Formatuje liczbę do formatu walutowego.
           Funkcja jako drugi argument przyjmuje obiekt konfiguracyjny z następującymi parametrami:
           - digits: Liczba cyfr po przecinku. Domyślnie 2.
           - separator: Separator oddzielający część dziesiętną od części całkowitej. Domyślnie ','.
           - symbol: Symbol waluty. Domyślnie 'zł'.
           - ending: Flaga booleowska, która określa czy symbol waluty znajduje się na końcu łańcuha znaków. Domyślnie ustawiona na true.
           - space: Flaga booleowska, która określa czy przed symbole waluty powinna występować spacja. Domyślnie ustawiona na true.
           - hyphen: Symbol oddzielający grupy liczb całkowitych. Domyślnie ustawiony jako spacja.
           - size: Liczba, liczb całkowitych, które powinny zostać zebranę w grupę. Domyślnie 3.`
    }
  },
  cube: {
    parameters: ['number'],
    description: {
      en: 'Returns the third power of the number.',
      pl: 'Podnosi liczbę do potęgi 3.'
    }
  },
  feet: {
    parameters: ['number', 'precision', 'decimal'],
    description: {
      en: 'Converts inches to feets. By default precision equals 2. When decimal flag is set to false, returns result with prim (′) symbol.',
      pl: 'Konwertuje cale na stopy. Domyślnie wynik zaokrąglany jest do 2 miejsc po przecinku. Gdy flaga "decimal" ustawiona jest jako fałsz, funkcja zwraca wynik jako łańcuch tekstowy z symoblem prim (′) na końcu.'
    }
  },
  inches: {
    parameters: ['number', 'precision', 'decimal'],
    description: {
      en: 'Converts feets to inches. By default precision equals 2. When decimal flag is set to false, returns result with bis (″) symbol.',
      pl: 'Konwertuje stopy na cale. Domyślnie wynik zaokrąglany jest do 2 miejsc po przecinku. Gdy flaga "decimal" ustawiona jest jako fałsz, funkcja zwraca wynik jako łańcuch tekstowy z symoblem bis (″) na końcu.'
    }
  }
}

module.exports = math
