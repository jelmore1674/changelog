import { describe, expect, test } from "vitest";
import { Changelog } from "../types";
import { writeChangelog } from "./writeChangelog";

describe("writeChangelog", () => {
  test("Change write the changelog in the correct format", () => {
    const changes: Changelog = {
      versions: [{
        version: "Unreleased",
        release_date: "TBD",
        added: ["This change here.", "This change here."],
        deprecated: ["This is now gone."],
        changed: [
          "[Breaking 🧨] - This is a breaking change.",
        ],
      }, {
        version: "1.0.0",
        release_date: "2025-04-14",
        notice: "Initial Release",
        added: ["This change here.", "This change here."],
        deprecated: ["This is now gone."],
        changed: [
          "[Breaking 🧨] - This is a breaking change.",
        ],
      }],
      links: [
        { reference: "1", url: "https://test.com" },
        { reference: "2", url: "https://test.com" },
        { reference: "3", url: "https://test.com" },
      ],
    };

    const changelog = writeChangelog(changes);

    expect(changelog).toBe(`# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - TBD

### Changed

- [Breaking 🧨] - This is a breaking change.

### Added

- This change here.
- This change here.

### Deprecated

- This is now gone.

## [1.0.0] - 2025-04-14

_Initial Release_

### Changed

- [Breaking 🧨] - This is a breaking change.

### Added

- This change here.
- This change here.

### Deprecated

- This is now gone.

[1]: https://test.com
[2]: https://test.com
[3]: https://test.com
`);
  });

  test("Updates using the common-changelog heading.", () => {
    const changes: Changelog = {
      versions: [{
        version: "Unreleased",
        release_date: "TBD",
        added: ["This change here."],
      }],
      links: [],
    };

    const changelog = writeChangelog(changes, { changelogStyle: "common-changelog" });

    expect(changelog).toBe(`# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Common Changelog](https://common-changelog.org),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - TBD

### Added

- This change here.

`);
  });

  test("Can handle dynamic headings.", () => {
    const changes: Changelog = {
      versions: [{
        version: "Unreleased",
        release_date: "TBD",
        test: ["This change here."],
        testing: ["This change here."],
      }],
      links: [],
    };

    const changelog = writeChangelog(changes, { dynamic: true });

    expect(changelog).toBe(`# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - TBD

### Test

- This change here.

### Testing

- This change here.

`);
  });

  test("Can handle custom heading.", () => {
    const changes: Changelog = {
      versions: [{
        version: "Unreleased",
        release_date: "TBD",
        test: ["This change here."],
        testing: ["This change here."],
      }],
      links: [],
    };

    const changelog = writeChangelog(changes, {
      dynamic: true,
      changelogStyle: "custom",
      customHeading: "This is a custom heading.",
    });

    expect(changelog).toBe(`# Changelog

This is a custom heading.

## [Unreleased] - TBD

### Test

- This change here.

### Testing

- This change here.

`);
  });
});
