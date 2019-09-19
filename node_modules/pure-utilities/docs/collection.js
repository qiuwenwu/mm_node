const collection = {
  append: {
    parameters: ['collection', 'indefinite', 'amount', 'of', 'arguments'],
    description: {
      en: 'Adds arguments at the end of the collecion.',
      pl: 'Dodaje argumenty na koniec kolekcji.'
    }
  },
  prepend: {
    parameters: ['collection', 'indefinite', 'amount', 'of', 'arguments'],
    description: {
      en: 'Adds arguments at the beginning of the collection.',
      pl: 'Dodaje argumenty na początek kolekcji.'
    }
  },
  reverse: {
    parameters: ['collection'],
    description: {
      en: 'Reverses the elements of the collection.',
      pl: 'Odwraca kolejność elementów kolekcji.'
    }
  },
  size: {
    parameters: ['collection'],
    description: {
      en: 'Returns the size of the collection.',
      pl: 'Zwraca liczbę elementów kolekcji.'
    }
  },
  flatten: {
    parameters: ['collection'],
    description: {
      en: 'Flattens n-dimensional array or n-depth object to a single depth array or object.',
      pl: 'Spłaszcza wielowymiarową tablicę lub wielokrotnie zagnieżdżony obiekt do jednowymiarowej tablicy lub płaskiego obiektu.'
    }
  },
  unflatten: {
    parameters: ['collection'],
    description: {
      en: 'Converts properties of the object, which contain in the name dots(.), to multi-depth object.',
      pl: 'Konwertuje właściwości obiektu, których nazwy zawierają kropki(.), na zagnieżdżone obiety, zwracając obiekt o różnym stopniu głębokości.'
    }
  }
}
module.exports = collection
