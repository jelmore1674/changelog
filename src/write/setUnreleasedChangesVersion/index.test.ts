import { fs, vol } from "memfs";
import { afterEach, describe, expect, test, vi } from "vitest";
import { setUnreleasedChangesVersion } from "./";

vi.mock("node:fs", async () => {
  const memfs: { fs: typeof fs } = await vi.importActual("memfs");

  return memfs.fs;
});

const today = new Date().toISOString().split("T")[0];

describe("setUnreleasedChangesVersion", () => {
  afterEach(() => {
    vi.resetAllMocks();
    vol.reset();
  });

  test("Should update unreleased to a version.", async () => {
    vol.fromJSON({
      "./CHANGELOG.md": `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - TBD

### Added

- This really cool change.

## [0.1.0] - 2025-01-01

### Fixed

- This test issue [\`abcdef3\`](https://github.com/jelmore1674/build-changelog/commit/abcdef3149d) | [bcl-bot](https://github.com/jelmore1674)

[0.1.0]: https://github.com/change\n`,
    }, process.cwd());

    setUnreleasedChangesVersion("CHANGELOG.md", "1.0.0", "https://github.com/change", { showGitTagPrefix: false });

    const changelog = fs.readFileSync("CHANGELOG.md", "utf-8");

    expect(changelog).toBe(`# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - ${today}

### Added

- This really cool change.

## [0.1.0] - 2025-01-01

### Fixed

- This test issue [\`abcdef3\`](https://github.com/jelmore1674/build-changelog/commit/abcdef3149d) | [bcl-bot](https://github.com/jelmore1674)

[1.0.0]: https://github.com/change
[0.1.0]: https://github.com/change\n`);
  });

  test("Should update unreleased to a version with git tag prefix.", async () => {
    vol.fromJSON({
      "./CHANGELOG.md": `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - TBD

### Added

- This really cool change.

## [v0.1.0] - 2025-01-01

### Fixed

- This test issue [\`abcdef3\`](https://github.com/jelmore1674/build-changelog/commit/abcdef3149d) | [bcl-bot](https://github.com/jelmore1674)

[v0.1.0]: https://github.com/change\n`,
    }, process.cwd());

    setUnreleasedChangesVersion("CHANGELOG.md", "1.0.0", "https://github.com/change", { showGitTagPrefix: true });

    const changelog = fs.readFileSync("CHANGELOG.md", "utf-8");

    expect(changelog).toBe(`# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.0.0] - ${today}

### Added

- This really cool change.

## [v0.1.0] - 2025-01-01

### Fixed

- This test issue [\`abcdef3\`](https://github.com/jelmore1674/build-changelog/commit/abcdef3149d) | [bcl-bot](https://github.com/jelmore1674)

[v1.0.0]: https://github.com/change
[v0.1.0]: https://github.com/change\n`);
  });

  test("Should update unreleased to a version and preserve heading.", async () => {
    vol.fromJSON({
      "./CHANGELOG.md": `# Changelog

This is a changelog

## [Unreleased] - TBD

### Added

- This really cool change.

## [v0.1.0] - 2025-01-01

### Fixed

- This test issue [\`abcdef3\`](https://github.com/jelmore1674/build-changelog/commit/abcdef3149d) | [bcl-bot](https://github.com/jelmore1674)

[v0.1.0]: https://github.com/change\n`,
    }, process.cwd());

    setUnreleasedChangesVersion("CHANGELOG.md", "1.0.0", "https://github.com/change", { showGitTagPrefix: true });

    const changelog = fs.readFileSync("CHANGELOG.md", "utf-8");

    expect(changelog).toBe(`# Changelog

This is a changelog

## [v1.0.0] - ${today}

### Added

- This really cool change.

## [v0.1.0] - 2025-01-01

### Fixed

- This test issue [\`abcdef3\`](https://github.com/jelmore1674/build-changelog/commit/abcdef3149d) | [bcl-bot](https://github.com/jelmore1674)

[v1.0.0]: https://github.com/change
[v0.1.0]: https://github.com/change\n`);
  });

  test("Nothing changes with no unreleased version.", async () => {
    vol.fromJSON({
      "./CHANGELOG.md": `# Changelog

This is a changelog

## [v0.1.0] - 2025-01-01

### Fixed

- This test issue [\`abcdef3\`](https://github.com/jelmore1674/build-changelog/commit/abcdef3149d) | [bcl-bot](https://github.com/jelmore1674)

[v0.1.0]: https://github.com/change\n`,
    }, process.cwd());

    setUnreleasedChangesVersion("CHANGELOG.md", "1.0.0", "https://github.com/change", { showGitTagPrefix: true });

    const changelog = fs.readFileSync("CHANGELOG.md", "utf-8");

    expect(changelog).toBe(`# Changelog

This is a changelog

## [v0.1.0] - 2025-01-01

### Fixed

- This test issue [\`abcdef3\`](https://github.com/jelmore1674/build-changelog/commit/abcdef3149d) | [bcl-bot](https://github.com/jelmore1674)

[v0.1.0]: https://github.com/change\n`);
  });
});
