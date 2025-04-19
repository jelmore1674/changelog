import { describe, expect, test } from "vitest";
import { getLatestRelease } from "./getLatestRelease";

describe("getLatestRelease", () => {
  test("Can get the latest release", () => {
    const changelog = `# Changelog
## [1.1.0]

### Added

- This cool feature

## [1.0.0]

_Initial Release_

`;

    const latestRelease = getLatestRelease(changelog);

    expect(latestRelease).toBe("1.1.0");
  });

  test("Can get the latest release even when out of order.", () => {
    const changelog = `# Changelog
## [1.0.0]

_Initial Release_

## [1.1.0]

### Added

- This cool feature

`;

    const latestRelease = getLatestRelease(changelog);

    expect(latestRelease).toBe("1.1.0");
  });
});
