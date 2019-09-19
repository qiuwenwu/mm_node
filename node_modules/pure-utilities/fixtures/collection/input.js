module.exports = {
  reverse: {
    examples:
    [
      {
        input: [[1, 2, 3, 4]],
        code: 'reverse([1, 2, 3, 4])'
      },
      {
        input: ['foo'],
        code: 'reverse("foo")'
      }
    ]
  },
  size: {
    examples:
    [
      {
        input: [[1, 2, 3, 4, 5]],
        code: 'size(1, 2, 3, 4, 5)'
      },
      {
        input: [{ a: 1, b: 2 }],
        code: 'size({ a: 1, b: 2 })'
      }
    ]
  },
  prepend: {
    examples: [
      {
        input: ['foo', 'bar'],
        code: 'prepend("foo", "bar")'
      },
      {
        input: [[1, 2, 3], 4, 5, 6],
        code: 'prepend([1, 2, 3], 4, 5, 6)'
      }
    ]
  },
  append: {
    examples: [
      {
        input: ['foo', 'bar'],
        code: 'append("foo", "bar")'
      },
      {
        input: [[1, 2, 3], 4, 5, 6],
        code: 'append([1, 2, 3], 4, 5, 6)'
      }
    ]
  },
  flatten: {
    examples:
    [
      {
        input: [[1, [2], [[3, [4, [5]]]]]],
        code: 'flatten([1, [2], [ [3, [ 4, [5] ] ] ] ])'
      },
      {
        input: [{ titles: { index: 'Buxus - Plants, seedlings, producer' } }]
      }
    ]
  },
  unflatten: {
    examples:
    [
      {
        input: [{ 'errors.404.title': 'Page not found' }]
      }
    ]
  }
}
