<div align="center">
  <h1>react-beautiful-dnd-test-utils</h1>
  <a href="https://emojipedia.org/gloves/">
    <img height="80" width="80" alt="gloves" src="https://raw.githubusercontent.com/colinrcummings/react-beautiful-dnd-test-utils/master/other/gloves.png" />
  </a>

  <p>Test utils for <a href="https://github.com/atlassian/react-beautiful-dnd">react-beautiful-dnd (rbd)</a> built with <a href="https://github.com/testing-library/react-testing-library">react-testing-library</a>.</p>

  <br />
</div>

<hr />

[![npm version](https://badge.fury.io/js/react-beautiful-dnd-test-utils.svg)](https://badge.fury.io/js/react-beautiful-dnd-test-utils)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

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

Version 3 of this library supports testing `rbd` version 12+. Use version 2 of this library for testing `rbd` version 11.

## Usage

Currently supports moving a [`<Draggable />`](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md) _n_ positions up or down inside a [`<Droppable />`](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md).

See an [example test](./example/src/App.test.js).

## License

MIT
