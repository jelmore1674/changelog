# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - TBD

### Fixed

- Fixed code formatting issues in the readme. ([Justin Elmore](https://github.com/jelmore1674))

## [1.1.0] - 2025-04-19

### Added

- Configuration option to pass in a custom heading. ([`647f362`](https://github.com/jelmore1674/changelog/commit/647f3624be95f9e27a9caa1b8eaf7861500677c9)) ([#8](https://github.com/jelmore1674/changelog/pull/8)) ([Justin Elmore](https://github.com/jelmore1674))
- Configuration options in `writeChangelog` to set the changelog style to `common-changelog`, `keep-a-changelog`, or `custom`. ([`647f362`](https://github.com/jelmore1674/changelog/commit/647f3624be95f9e27a9caa1b8eaf7861500677c9)) ([#8](https://github.com/jelmore1674/changelog/pull/8)) ([Justin Elmore](https://github.com/jelmore1674))
- New template for `common-changelog` style of changelog. ([`647f362`](https://github.com/jelmore1674/changelog/commit/647f3624be95f9e27a9caa1b8eaf7861500677c9)) ([#8](https://github.com/jelmore1674/changelog/pull/8)) ([Justin Elmore](https://github.com/jelmore1674))
- New template for `custom` style of changelog. ([`647f362`](https://github.com/jelmore1674/changelog/commit/647f3624be95f9e27a9caa1b8eaf7861500677c9)) ([#8](https://github.com/jelmore1674/changelog/pull/8)) ([Justin Elmore](https://github.com/jelmore1674))
- New template for `keep-a-changelog` style of changelog. ([`647f362`](https://github.com/jelmore1674/changelog/commit/647f3624be95f9e27a9caa1b8eaf7861500677c9)) ([#8](https://github.com/jelmore1674/changelog/pull/8)) ([Justin Elmore](https://github.com/jelmore1674))

### Security

- Updates `vite` from 6.2.5 to 6.3.2 ([`6094f23`](https://github.com/jelmore1674/changelog/commit/6094f234b0af939ca4d4fcc2cdde58af471afb3c)) ([#9](https://github.com/jelmore1674/changelog/pull/9)) ([dependabot](https://github.com/apps/dependabot))

## [1.0.0] - 2025-04-15

### Changed

- [Breaking 🧨] - Versions are now accessed using the `versions` property. ([#6](https://github.com/jelmore1674/changelog/pull/6)) ([jelmore1674](https://github.com/jelmore1674))

### Added

- Ability to parse markdown reference links. ([#6](https://github.com/jelmore1674/changelog/pull/6)) ([jelmore1674](https://github.com/jelmore1674))
- Functionality to be able to write changelog files. ([#7](https://github.com/jelmore1674/changelog/pull/7)) ([jelmore1674](https://github.com/jelmore1674))

## [0.3.0] - 2025-04-12

### Fixed

- Fix regex for detecting notices in changelogs. ([jelmore1674](https://github.com/jelmore1674))

## [0.2.8] - 2025-04-09

### Removed

- Replace `isUnreleasedVersion` with hard string check. ([jelmore1674](https://github.com/jelmore1674))

## [0.2.7] - 2025-04-09

### Fixed

- Set the main to `dist/index.js`. ([jelmore1674](https://github.com/jelmore1674))

## [0.2.6] - 2025-04-09

### Fixed

- Filed default module file in package.json. ([jelmore1674](https://github.com/jelmore1674))

## [0.2.5] - 2025-04-09

### Fixed

- Add `index.ts` to export all files to get type declarations. ([jelmore1674](https://github.com/jelmore1674))

## [0.2.4] - 2025-04-09

### Fixed

- Fixed the output files in the package.json. ([jelmore1674](https://github.com/jelmore1674))

## [0.2.3] - 2025-04-09

_Intial Release of App_

### Added

- This adds a `parseChangelog` function to convert changelogs into an object. ([#1](https://github.com/jelmore1674/changelog/pull/1)) ([jelmore1674](https://github.com/jelmore1674))

[1.1.0]: https://github.com/jelmore1674/changelog/releases/tag/v1.1.0
[1.0.0]: https://github.com/jelmore1674/changelog/releases/tag/v1.0.0
[0.3.0]: https://github.com/jelmore1674/changelog/releases/tag/v0.3.0
[0.2.8]: https://github.com/jelmore1674/changelog/releases/tag/v0.2.8
[0.2.7]: https://github.com/jelmore1674/changelog/releases/tag/v0.2.7
[0.2.6]: https://github.com/jelmore1674/changelog/releases/tag/v0.2.6
[0.2.5]: https://github.com/jelmore1674/changelog/releases/tag/v0.2.5
[0.2.4]: https://github.com/jelmore1674/changelog/releases/tag/v0.2.4
[0.2.3]: https://github.com/jelmore1674/changelog/releases/tag/v0.2.3
