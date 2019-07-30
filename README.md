# react-beautiful-dnd-test-utils

Test utils for [`react-beautiful-dnd`](https://github.com/atlassian/react-beautiful-dnd) buit with [`react-testing-library`](https://github.com/testing-library/react-testing-library).

## Installation

This module is distributed via [`npm`](https://www.npmjs.com/), which is bundled with [`node`](https://nodejs.org/en/), and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev react-beautiful-dnd-test-utils
```

`jest`, `@testing-library/jest-dom/extend-expect` and `@testing-library/react` must also be installed.

## Usage

Currently supports moving a [`<Draggable />`](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md) _n_ positions up or down inside a [`<Droppable />`](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md).

See an [example test](https://github.com/colinrcummings/react-beautiful-dnd-test-utils-example/blob/master/src/App.test.js) in the [`react-beautiful-dnd-test-utils-example`](https://github.com/colinrcummings/react-beautiful-dnd-test-utils-example) repo.

## License

MIT
