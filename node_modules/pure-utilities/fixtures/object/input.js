const object = {
  dig: {
    examples:
    [
      {
        input: [{ foo: { bar: 'baz' } }, 'foo.bar']
      }
    ]
  },
  keys: {
    examples:
    [
      {
        input: [{ foo: 'bar', baz: [1, 2, 3] }]
      }
    ]
  },
  pat: {
    examples:
    [
      {
        input: [{ foo: 'bar' }, 'foo', 'baz']
      }
    ]
  },
  rename: {
    examples:
    [
      {
        input: [{ created_at: '2000-01-01' }, { created_at: 'createdAt' }]
      }
    ]
  },
  values: {
    examples:
    [
      {
        input: [{ foo: 'bar', baz: [1, 2, 3] }]
      }
    ]
  },
  merge: {
    examples:
    [
      {
        input: [{ foo: { a: 1, b: 1, c: 1 }, baz: { b: 2, c: 2 } }]
      },
      {
        input: [{ foo: { a: 1, b: 1, c: 1 }, baz: { b: 2, c: 2 }, bar: { c: 3 } }]
      }
    ]
  },
  clone: {
    examples:
    [
      {
        input: [{ a: 0, b: { c: 0 } }]
      }
    ]
  },
  deepclone: {
    examples:
    [
      {
        input: [{ a: 0, b: { c: 0 } }]
      }
    ]
  },
  recsort: {
    examples:
    [
      {
        input: [{ b: 2, a: 1 }]
      }
    ]
  }
}
module.exports = object
