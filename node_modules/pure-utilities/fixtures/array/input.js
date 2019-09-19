module.exports = {
  average: {
    examples:
    [
      {
        input: [[100, 200]],
        code: 'average(100, 200)'
      }
    ]
  },
  compact: {
    examples:
    [
      {
        input: [[0, 1, false, 2, '', 3]],
        code: 'compact([0, 1, false, 2, "", 3])'
      }
    ]
  },
  drop: {
    examples:
    [
      {
        input: [[1, 2, 3], 2],
        code: 'drop([1, 2, 3], 2)'
      }
    ]
  },
  head: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 6]],
        code: 'head([1, 2, 3, 4, 5, 6])'
      }
    ]
  },
  identifier: {
    examples:
    [
      {
        input: [['a']],
        code: 'identifier(["a"])'
      }
    ]
  },
  median: {
    examples:
    [
      {
        input: [[6, 4, 2, 4, 4]],
        code: 'median([6, 4, 2, 4, 4])'
      }
    ]
  },
  rotate: {
    examples:
    [
      {
        input: [[1, 2, 3], 2],
        code: 'rotate([1, 2, 3], 2)'
      }
    ]
  },
  sample: {
    examples:
    [
      {
        input: [[1, 2, 3]],
        code: 'sample([[1, 2, 3]])'
      }
    ]
  },
  slice: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 6], 3, 5],
        code: 'slice([1, 2, 3, 4,5, 6], 3, 5)'
      }
    ]
  },
  sum: {
    examples:
    [
      {
        input: [[3, 10, 2]],
        code: 'sum([3, 10, 2])'
      }
    ]
  },
  take: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 6], 2],
        code: 'take([1, 2, 3, 4, 5, 6], 2)'
      }
    ]
  },
  unique: {
    examples:
    [
      {
        input: [[1, 1, 2, 10, 2, 33]],
        code: 'unique([1, 1, 2, 10, 2, 33])'
      }
    ]
  },
  first: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        code: 'first([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])'
      }
    ]
  },
  second: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        code: 'second([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])'
      }
    ]
  },
  third: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        code: 'third([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])'
      }
    ]
  },
  fourth: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        code: 'fourth([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])'
      }
    ]
  },
  fifth: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        code: 'fifth([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])'
      }
    ]
  },
  sixth: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        code: 'sixth([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])'
      }
    ]
  },
  seventh: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        code: 'seventh([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])'
      }
    ]
  },
  eigth: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        code: 'eigth([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])'
      }
    ]
  },
  ninth: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        code: 'ninth([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])'
      }
    ]
  },
  tenth: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        code: 'tenth([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])'
      }
    ]
  },
  last: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        code: 'last([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])'
      }
    ]
  },
  nth: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3],
        code: 'nth([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)'
      }
    ]
  },
  pluck: {
    examples:
    [
      {
        input: [[{ foo: 'bar' }, { name: 'baz' }], 'name'],
        code: 'pluck([{ foo: "bar"}, { name: "baz"}], "name")'
      }
    ]
  },
  intersection: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 100], [100, 2, 3, 10, 31]],
        code: 'intersection([1, 2, 3, 4, 5, 100], [100, 2, 3, 10, 31])'
      }
    ]
  },
  difference: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5, 100], [100, 2, 3, 10, 31]],
        code: 'difference([1, 2, 3, 4, 5, 100], [100, 2, 3, 10, 31])'
      }
    ]
  },
  duplicates: {
    examples:
    [
      {
        input: [[1, 1, 2, 3, 5, 5]],
        code: 'duplicates([1, 1, 2, 3, 5, 5])'
      }
    ]
  },
  symdifference: {
    examples:
    [
      {
        input: [[1, 3, 4, 6, 7, 9], [3, 5, 6, 7, 8, 9]],
        code: 'symdifference([1, 3, 4, 6, 7, 9], [3, 5, 6, 7, 8, 9])'
      }
    ]
  }
}
