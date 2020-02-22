const object = {
  dig: {
    parameters: ['object', 'string'],
    description: {
      en: 'Returns the value of any object property, which the name has been passed in the string.',
      pl: 'Zwraca wartość dowolnej właściwości obiektu, na podstawie przekazanego łańcucha znaków.'
    }
  },
  keys: {
    parameters: ['object'],
    description: {
      en: 'Returns an array of a given object\'s property names.',
      pl: 'Zwraca tablicę zawierającą nazwy właściwości obiektu.'
    }
  },
  pat: {
    parameters: ['object', 'string', 'value'],
    description: {
      en: 'Overrides the value of any object property, which the name has been passed in the string with the value.',
      pl: 'Nadpisuje wartość właściwości, której nazwa została przekazana w parametrze string, na wartość przekazaną w parametrze value.'
    }
  },
  rename: {
    parameters: ['object', 'keys'],
    description: {
      en: 'Changes names of the object properties to responds values from the keys object.',
      pl: 'Zmienia nazwy właściwości obiektu, na odpowiadające im wartości z obiektu keys.'
    }
  },
  values: {
    parameters: ['object'],
    description: {
      en: 'Returns an array of a given object\'s own enumerable property values.',
      pl: 'Zwraca tablicę zawierającą własne, wyliczalne właściwości obiektu.'
    }
  },
  merge: {
    parameters: ['object', 'sources'],
    description: {
      en: 'Merges properties of sources into the destination object.',
      pl: 'Scala właściwości obiektów źródłowych z obiektem docelowym.'
    }
  },
  clone: {
    parameters: ['object'],
    description: {
      en: 'Creates shallow copy of the passed object (objects are clone as reference).',
      pl: 'Tworzy płytką kopię przekazanego obiektu (obiekty są klonowane jako referencja).'
    }
  },
  deepclone: {
    parameters: ['object'],
    description: {
      en: 'Creates deep copy of the passed object (objects are clone as value).',
      pl: 'Tworzy głęboką kopię przekazanego obiektu (obiekty są klonowane jako wartość).'
    }
  },
  recsort: {
    parameters: ['object'],
    description: {
      en: 'Sorts keys of an object.',
      pl: 'Sortuje klucze obiektu.'
    }
  }
}
module.exports = object
