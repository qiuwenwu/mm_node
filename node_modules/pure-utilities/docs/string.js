const string = {
  camelize: {
    parameters: ['string', 'lowercased'],
    description: {
      en: 'Converts string to camelcase notation. Second parameter sets the first letter to lowercase or uppercase.',
      pl: 'Konwertuje łańcuch znaków do notacji camelcase. Drugi parametr określa konwersję pierwszej litery na małą lub dużą.'
    }
  },
  capitalize: {
    parameters: ['string'],
    description: {
      en: 'Converts first letter of the string to uppercase.',
      pl: 'Konwertuje pierwszą literę łańcucha znaków na wielką literę.'
    }
  },
  celsius: {
    parameters: ['string'],
    description: {
      en: 'Converts temperature in Fahrenheit and Kelvin notation to Celsius degree. When passed string is a number, appends °C to the string.',
      pl: 'Konwertuje temperaturę wyrażoną w stopniach Fahrenheita lub jednostkach Kelvina na stopnie Celsiusza.'
    }
  },
  chomp: {
    parameters: ['string', 'pattern'],
    description: {
      en: 'Removes from the end of the string passed pattern.',
      pl: 'Usuwa podany wzorzec z końca łańcucha znaków.'
    }
  },
  chop: {
    parameters: ['string'],
    description: {
      en: 'Returns string with last character removed. If the string ends with line ending characters then both will be removed.',
      pl: 'Zwraca łańcuch tekstowy z usuniętym ostatnim znakiem. Jeśli łańcuch znaków kończy się znakami końca linii, to oba są usuwane.'
    }
  },
  classify: {
    parameters: ['string'],
    description: {
      en: 'Creates a class name based on the string.',
      pl: 'Tworzy nazwę klasy na podstawie łańcucha znaków.'
    }
  },
  constantize: {
    parameters: ['string'],
    description: {
      en: 'Converts string to constant notation.',
      pl: 'Konwertuje łańcuch tekstowy do notacji constant.'
    }
  },
  crop: {
    parameters: ['string', 'length', 'append'],
    description: {
      en: 'Truncates string at full words. Adds ... if the string is longer than the second parameter.',
      pl: 'Przycina łańcuch znaków do całych wyrazów. Dodaje ... jeśli string jest dłuższy niż drugi parametr.'
    }
  },
  dasherize: {
    parameters: ['string'],
    description: {
      en: 'Replaces _ with -.',
      pl: 'Zamienia _ na -.'
    }
  },
  dot: {
    parameters: ['string'],
    description: {
      en: 'Returns string with dot at the end.',
      pl: 'Zwraca łańcuch znaków z kropką na końcu.'
    }
  },
  fahrenheit: {
    parameters: ['string'],
    description: {
      en: 'Converts temperature in Celsius and Kelvin notation to Fahrenheit degree. When passed string is a number, appends °F to the string.',
      pl: 'Konwertuje temperaturę wyrażoną w stopniach Celsjusza lub jednostkach Kelvina na stopnie Fahrenheita.'
    }
  },
  htmlstrip: {
    parameters: ['string'],
    description: {
      en: 'Removes HTML tags from the string. Warning: do not use it as a security mechanism.',
      pl: 'Usuwa tagi HTML z podanego łańcucha znaków. Uwaga: nie należy stosować jako mechanizmu zabezpieczającego.'
    }
  },
  humanize: {
    parameters: ['string', 'capitalize = true'],
    description: {
      en: 'Replaces _ with singlespaces. When capitalize is truthy, converts first char of the string to uppercase.',
      pl: 'Zamienia _ na spacje. Gdy flaga capitalize ustawiona jest na true, konwertuje pierwszą literę łańcucha na wielką.'
    }
  },
  hyphenate: {
    parameters: ['string'],
    description: {
      en: 'Replaces spaces with hyphens, splits camelcase text, remove non-word chars and converts string to lowercase.',
      pl: 'Zastępuje znak spacji myślnikami, oddziela znakiem myślnika wyrazy zapisane w notacji camelcase. Usuwa wyrazy niebędące słowami i konwertuje wszystkie litery na małe.'
    }
  },
  index: {
    parameters: ['string', 'pattern', 'start = 0'],
    description: {
      en: 'Returns index of searched pattern.',
      pl: 'Zwraca indeks szukanego wzorca.'
    }
  },
  initials: {
    parameters: ['string', 'separator = ""'],
    description: {
      en: 'Returns initials separated by the separator.',
      pl: 'Zwraca inicjały rozdzielone separatorem.'
    }
  },
  kelvin: {
    parameters: ['string'],
    description: {
      en: 'Converts temperature in Celsius and Fahrenheit notation to Kelvin scale. When passed string is a number, appends K to the string.',
      pl: 'Konwertuje temperaturę wyrażoną w stopniach Fahrenheita lub Celsjusza, na skalę Kelvina.'
    }
  },
  lowercase: {
    parameters: ['string'],
    description: {
      en: 'Converts string to lowercase.',
      pl: 'Konwertuje litery na małe.'
    }
  },
  lowerfirst: {
    parameters: ['string'],
    description: {
      en: 'Converts first letter of the string to lowercase.',
      pl: 'Konwertuje pierwszą literę łańcucha znaków na małą literę.'
    }
  },
  ltrim: {
    parameters: ['string', 'characters = " "'],
    description: {
      en: 'Removes white space characters or other specified in parameter characters from the beginning of the string.',
      pl: 'Usuwa białe znaki lub też inne określone w parametrze znaki od początku łańcucha znaków.'
    }
  },
  pad: {
    parameters: ['string', 'pad', 'left = true'],
    description: {
      en: 'Returns string with added pad from left side or right side.',
      pl: 'Zwraca łańcuch znaków z dodanym marginesem z lewej lub prawej strony.'
    }
  },
  pluralize: {
    parameters: ['string'],
    description: {
      en: 'Returns plural form of the string.',
      pl: 'Zwraca liczbę mnogą rzeczownika.'
    }
  },
  repeat: {
    parameters: ['string', 'count'],
    description: {
      en: 'Repeats the string n times.',
      pl: 'Powiela łańcuch znaków okresloną ilość razy.'
    }
  },
  replace: {
    parameters: ['string', 'pattern', 'replace'],
    description: {
      en: 'Replaces searched pattern by the last parameter.',
      pl: 'Zastępuje podany wzorzec nowym łańcuchem znaków.'
    }
  },
  rtrim: {
    parameters: ['string', 'characters = " "'],
    description: {
      en: 'Removes white space characters or other specified in parameter characters from the end of the string.',
      pl: 'Usuwa białe znaki lub też inne określone w parametrze znaki od końca łańcucha znaków.'
    }
  },
  singlespace: {
    parameters: ['string'],
    description: {
      en: 'Replaces in the string multiple spaces to single spaces.',
      pl: 'Zastępuje wielokrotne wystąpienia spacji na pojedyncze.'
    }
  },
  singularize: {
    parameters: ['string', 'appendix = ""'],
    description: {
      en: 'Returns singular form of the string.',
      pl: 'Zwraca liczbę pojedynczą rzeczownika.'
    }
  },
  slugify: {
    parameters: ['string', 'separator = "-"'],
    description: {
      en: 'Converts string to lower case, remove non-word chars and replace spaces with the separator.',
      pl: 'Konwertuje litery łańcucha znaków na małe, usuwa wyrazy niebędące słowami, zastępuje spacje przekazanym do funkcji separatorem.'
    }
  },
  split: {
    parameters: ['string', 'separator = ""'],
    description: {
      en: 'Splits string into an array by separating the string into substrings.',
      pl: 'Dzieli łańcuch znaków na tablicę, dzieląc łańcuch znaków na części na podstawie separatora.'
    }
  },
  strip: {
    parameters: ['string', 'pattern'],
    description: {
      en: 'Removes the passed pattern from the string.',
      pl: 'Usuwa przekazany wzorzec z łańcucha znaków.'
    }
  },
  squeeze: {
    parameters: ['string', 'pattern = "a-zA-Z"'],
    description: {
      en: 'Replaces in string multiple repetitions of the same characters to the one character.',
      pl: 'Usuwa z łańcucha tekstowego wielokrotne wystąpienia tego samego znaku.'
    }
  },
  summarize: {
    parameters: ['string', 'length = 100'],
    description: {
      en: 'Adds three dots at the end of the string, when the string is longer than the passed length.',
      pl: 'Dodaje trzy kropki na końcu łańcucha znaków, gdy ciąg jest dłuższy niż podana długość.'
    }
  },
  swapcase: {
    parameters: ['string'],
    description: {
      en: 'Replaces in string lowercased letters to uppercase and uppercased letters to lowercase.',
      pl: 'Zamienia duże litery na małe, a małe na duże.'
    }
  },
  tail: {
    parameters: ['string', 'length = 30', 'ending = "..."'],
    description: {
      en: 'Truncates the tail of a given string.',
      pl: 'Skraca dany łańcuch tekstowy.'
    }
  },
  titleize: {
    parameters: ['string'],
    description: {
      en: 'Converts to \'uppercase\' first letter of each word in string.',
      pl: 'Konwertuje pierwszą literą każdego wyrazu na wielką.'
    }
  },
  trim: {
    parameters: ['string'],
    description: {
      en: 'Removes whitespace from the start and the end of the string.',
      pl: 'Usuwa spacje z początku i końca łańcucha znaków.'
    }
  },
  truncate: {
    parameters: ['string', 'length = 30', 'ending = "..."'],
    description: {
      en: 'Truncates a given string if it  longer than the passed length and replaces last chars of new string with the passed ending.',
      pl: 'Ucina łańcuch tekstowy, jeśli jest dłuższy niż podana długość i dokleja w miejscu ucięcia ostatni parametr.'
    }
  },
  quote: {
    parameters: ['string', 'lang = "en"'],
    description: {
      en: 'Puts the string inside quotations marks.',
      pl: 'Umieszcza łańcuch tekstowy w cudzysłowiu.'
    }
  },
  uid: {
    parameters: ['length = 32'],
    description: {
      en: 'Returns an unique identifier.',
      pl: 'Zwraca unikalny identyfikator.'
    }
  },
  underscore: {
    parameters: ['string'],
    description: {
      en: 'Returns new string with words separated by _. All letters are lowercased.',
      pl: 'Zwraca nowy łańcuch znaków, w którym wyrazy oddzielone są od siebie znakiem _. Wszystkie litery są konwertowane na małe.'
    }
  },
  unquote: {
    parameters: ['string'],
    description: {
      en: 'Rmoves "" or „” from the string.',
      pl: 'Usuwa "" lub „” z łańcucha znaków.'
    }
  },
  unwrap: {
    parameters: ['string', 'first', 'last = first'],
    description: {
      en: 'Removes characters from the start and end of the string based on the passed values.',
      pl: 'Usuwa znaki z początku i końca łańcucha znaków na podstawie przekazanych parametrów.'
    }
  },
  uppercase: {
    parameters: ['string'],
    description: {
      en: 'Converts string to uppercase.',
      pl: 'Konwertuje litery na wielkie.'
    }
  },
  unescape: {
    parameters: ['string'],
    description: {
      en: 'Converts the HTML entities to their corresponding characters.',
      pl: 'Konwertuje encje HTML na odpowiadające im znaki.'
    }
  },
  whitespacestrip: {
    parameters: ['string'],
    description: {
      en: 'Removes whitespaces from the string.',
      pl: 'Usuwa spacje z łańcucha znaków.'
    }
  },
  wrap: {
    parameters: ['string', 'first', 'last = first'],
    description: {
      en: 'Wraps string between the first and last parameters.',
      pl: 'Umieszcza łańcuch znaków pomiędzy przekazanymi parametrami.'
    }
  }
}
module.exports = string
