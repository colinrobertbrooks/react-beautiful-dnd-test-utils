# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 4.1.1 - 2021-11-1

### Changes

- Peer dependency versions.

## 4.1.0 - 2021-11-1

### Added

- A `getDragElement` option to `makeDnd`.

## 4.0.1 - 2021-11-1

### Changed

- Peer dependency versions.

## 4.0.0 - 2021-10-27

### Added

- TypeScript type definitions.
- `@testing-library/user-event` as a peer dependency.

### Changed

- `mockGetComputedSpacing` to `mockGetComputedStyle`.
- `mockDndElSpacing(rtlUtils: RenderResult)` to `mockDndSpacing(container: HTMLElement)`.
- `makeDnd({ getDragEl }: { getDragEl: () => Element })` to `makeDnd({ text }: { text: string })`.
- Peer dependency versions.

## 3.2.2 - 2021-10-26

### Added

- Example to the module repo (deprecates [react-beautiful-dnd-test-utils-example](https://github.com/colinrobertbrooks/react-beautiful-dnd-test-utils-example)).

### Changed

- Peer dependency versions.

## 3.2.1 - 2020-07-21

### Added

- `prepare` script to `package.json`.

## 3.2.0 - 2020-07-21

### Changed

- Use RTL's `waitFor` instead of `waitForElement`, which has been deprecated.

## 3.1.0 - 2019-10-31

### Added

- 🧤emoji.

## 3.0.0 - 2019-10-31

### Changed

- Support for react-beautiful-dnd v12.

## 2.0.0 - 2019-07-30

### Changed

- Upgrade to latest jest-dom.

## 1.1.0 - 2019-06-05

### Fixed

- Pin Rollup version to fix build ([issue](https://github.com/rollup/rollup/issues/2894)).

## 1.0.0 - 2019-06-05

### Changed

- Upgrade to latest React Testing Library.

## 0.2.2 - 2019-05-09

### Fixed

- Link in README.

## 0.2.1 - 2019-05-09

### Added

- Link to example test and other details to README.

## 0.2.0 - 2019-05-09

### Fixed:

- `main` entry point.

## 0.1.0 - 2019-05-09

### Added:

- Initial commit.
