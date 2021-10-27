<div align="center">
  <h1>react-beautiful-dnd-test-utils</h1>
  <a href="https://emojipedia.org/gloves/">
    <img height="80" width="80" alt="gloves" src="https://raw.githubusercontent.com/colinrcummings/react-beautiful-dnd-test-utils/master/other/gloves.png" />
  </a>

  <p>Test utils for <a href="https://github.com/atlassian/react-beautiful-dnd">react-beautiful-dnd (rbd)</a> built with <a href="https://github.com/testing-library/react-testing-library">react-testing-library</a>.</p>

  <br />
</div>

<hr />

[![Build Status](https://img.shields.io/github/workflow/status/colinrobertbrooks/react-beautiful-dnd-test-utils/CI?logo=github&style=flat-square)](https://github.com/colinrobertbrooks/react-beautiful-dnd-test-utils/actions/workflows/main.yml)
[![NPM Version](https://img.shields.io/npm/v/react-beautiful-dnd-test-utils.svg?style=flat-square)](https://www.npmjs.com/package/react-beautiful-dnd-test-utils)
[![Downloads](https://img.shields.io/npm/dm/react-beautiful-dnd-test-utils.svg?style=flat-square)](http://www.npmtrends.com/react-beautiful-dnd-test-utils)
[![MIT License](https://img.shields.io/npm/l/react-beautiful-dnd-test-utils.svg?style=flat-square)](https://github.com/colinrobertbrooks/react-beautiful-dnd-test-utils/blob/master/LICENSE)

## Installation

This module is distributed via [`npm`](https://www.npmjs.com/), which is bundled with [`node`](https://nodejs.org/en/), and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev react-beautiful-dnd-test-utils
```

The following packages must also be installed:

- `@testing-library/jest-dom`
- `@testing-library/react`
- `@testing-library/user-event`
- `jest`

## Supported versions of `rbd`

Versions 3+ of this library supports testing `rbd` version 12+. Use version 2 of this library for testing `rbd` version 11.

## Usage

Currently supports moving a [`<Draggable />`](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md) _n_ positions up or down inside a [`<Droppable />`](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md).

See an [example test](./example/src/App.test.tsx).

## License

MIT
