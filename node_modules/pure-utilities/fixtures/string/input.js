const string = {
  camelize: {
    examples:
    [
      {
        input: ['foo_bar']
      },
      {
        input: ['FooBar']
      }
    ]
  },
  capitalize: {
    examples:
    [
      {
        input: ['foo']
      },
      {
        input: ['foo bar and baz']
      }
    ]
  },
  celsius: {
    examples:
    [
      {
        input: ['25']
      },
      {
        input: ['0°F']
      },
      {
        input: ['0K']
      }
    ]
  },
  chomp: {
    examples:
    [
      {
        input: ['foo bar', 'ar']
      }
    ]
  },
  chop: {
    examples:
    [
      {
        input: ['foo bar baz']
      }
    ]
  },
  classify: {
    examples:
    [
      {
        input: ['cars']
      }
    ]
  },
  constantize: {
    examples:
    [
      {
        input: ['foo']
      }
    ]
  },
  crop: {
    examples:
    [
      {
        input: ['foo bar baz ban bar', 10]
      }
    ]
  },
  dasherize: {
    examples:
    [
      {
        input: ['foo_bar__baz']
      }
    ]
  },
  dot: {
    examples:
    [
      {
        input: ['foo bar']
      }
    ]
  },
  fahrenheit: {
    examples:
    [
      {
        input: ['50']
      },
      {
        input: ['30°C']
      }
    ]
  },
  htmlstrip: {
    examples:
    [
      {
        input: ['<div>foo</div>']
      },
      {
        input: ['Hello <b><i>world!</i></b>']
      }
    ]
  },
  humanize: {
    examples:
    [
      {
        input: ['foo bar']
      },
      {
        input: ['foo_bar']
      }
    ]
  },
  hyphenate: {
    examples:
    [
      {
        input: ['%# lorem ipsum  ? $  dolor']
      },
      {
        input: ['loremIpsum']
      }
    ]
  },
  index: {
    examples:
    [
      {
        input: ['hello', 'e']
      },
      {
        input: ['hello', 'lo']
      }
    ]
  },
  initials: {
    examples:
    [
      {
        input: ['Foo Bar']
      },
      {
        input: ['Foo Barin-Bar', '.']
      }
    ]
  },
  kelvin: {
    examples:
    [
      {
        input: ['100']
      },
      {
        input: ['26°C']
      }
    ]
  },
  lowercase: {
    examples:
    [
      {
        input: ['Foo BAR and baZ']
      }
    ]
  },
  lowerfirst: {
    examples:
    [
      {
        input: ['Foo bar baz']
      }
    ]
  },
  pad: {
    examples:
    [
      {
        input: ['hello world', 5]
      },
      {
        input: ['Hello world', 5, false]
      },
      {
        input: ['hello world', '** ']
      }
    ]
  },
  pluralize: {
    examples:
    [
      {
        input: ['car']
      },
      {
        input: ['dress']
      },
      {
        input: ['wife']
      }
    ]
  },
  repeat: {
    examples:
    [
      {
        input: ['foo', 2]
      }
    ]
  },
  replace: {
    examples:
    [
      {
        input: ['foo bar baz ban', 'baz', 'qux']
      }
    ]
  },
  singlespace: {
    examples:
    [
      {
        input: ['foo     bar baz']
      }
    ]
  },
  singularize: {
    examples:
    [
      {
        input: ['cars']
      },
      {
        input: ['watches']
      },
      {
        input: ['shelves', 'f']
      }
    ]
  },
  slugify: {
    examples:
    [
      {
        input: ['LoremIpsum dolor special chars']
      }
    ]
  },
  split: {
    examples:
    [
      {
        input: ['foo,bar,bazz', ',']
      }
    ]
  },
  strip: {
    examples:
    [
      {
        input: [' foo ']
      },
      {
        input: ['foo bar baz ban', ['o', 'r', 'a']]
      }
    ]
  },
  squeeze: {
    examples:
    [
      {
        input: ['yellow moon']
      }
    ]
  },
  summarize: {
    examples:
    [
      {
        input: ['foo bar baz ban', 10]
      }
    ]
  },
  swapcase: {
    examples:
    [
      {
        input: ['foo']
      },
      {
        input: ['fOo Bar BAZ']
      }
    ]
  },
  tail: {
    examples:
    [
      {
        input: ['Once upon a time in a world far far away', 15]
      }
    ]
  },
  titleize: {
    examples:
    [
      {
        input: ['foo bar']
      }
    ]
  },
  trim: {
    examples:
    [
      {
        input: [' foo ']
      }
    ]
  },
  truncate: {
    examples:
    [
      {
        input: ['Once upon a time in a world far far away']
      },
      {
        input: ['Once upon a time in a world far far away', 15]
      }
    ]
  },
  quote: {
    examples:
    [
      {
        input: ['foo bar baz']
      },
      {
        input: ['foo bar baz', 'pl']
      }
    ]
  },
  underscore: {
    examples:
    [
      {
        input: ['fooBar']
      }
    ]
  },
  unquote: {
    examples:
    [
      {
        input: ['„foo bar baz”']
      },
      {
        input: ['"foo bar baz"']
      }
    ]
  },
  uid: {
    examples:
    [
      {
        input: [10]
      }
    ]
  },
  unwrap: {
    examples:
    [
      {
        input: ['"foo bar baz ban"', '"']
      },
      {
        input: ['„foo bar baz”', '„', '”']
      }
    ]
  },
  uppercase: {
    examples:
    [
      {
        input: ['foo']
      }
    ]
  },
  unescape: {
    examples:
    [
      {
        input: ['&amp;']
      }
    ]
  },
  whitespacestrip: {
    examples:
    [
      {
        input: [' f o  o']
      }
    ]
  },
  wrap: {
    examples:
    [
      {
        input: ['foo bar baz ban', '„', '”']
      }
    ]
  },
  ltrim: {
    examples:
    [
      {
        input: ['   foo']
      }
    ]
  },
  rtrim: {
    examples:
    [
      {
        input: ['foo   ']
      }
    ]
  }
}
module.exports = string
