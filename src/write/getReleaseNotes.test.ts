import { describe, expect, test } from "vitest";
import { getReleaseNotes } from "./getReleaseNotes";

describe("getReleaseNotes", () => {
  test("can get the latest version", () => {
    const rawChangelog = `# Changelog

## [1.0.1] - 2025-04-14

_This is a notice_

### Added

- This cool change.
- This cool change.
- This cool change.

### Changed

- This cool change.
- This cool change.
- This cool change.


## [1.0.0] - 2025-04-14

_Initial Release_
`;

    const notes = getReleaseNotes(rawChangelog);
    expect(notes).toBe(`# What's Changed

_This is a notice_

## Changed

- This cool change.
- This cool change.
- This cool change.

## Added

- This cool change.
- This cool change.
- This cool change.

`);
  });

  test("can get release notes for a specific version", () => {
    const rawChangelog = `# Changelog

## [1.1.0] - 2025-04-14

### Added

- This cool change.
- This cool change.

### Removed

- This one change..

### Changed

- How this works.
- And this thing.

## [1.0.1] - 2025-04-14

_This is a notice_

### Added

- This cool change.
- This cool change.
- This cool change.

### Changed

- This cool change.
- This cool change.
- This cool change.


## [1.0.0] - 2025-04-14

_Initial Release_
`;

    const notes = getReleaseNotes(rawChangelog, "1.0.1");
    expect(notes).toBe(`# What's Changed

_This is a notice_

## Changed

- This cool change.
- This cool change.
- This cool change.

## Added

- This cool change.
- This cool change.
- This cool change.

`);
  });
});
