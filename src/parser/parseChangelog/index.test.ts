import { readFileSync } from "fs";
import { describe, expect, test } from "vitest";
import { parseChangelog } from "./";

describe("convertChangelogToObject", () => {
  test("reads changelog", () => {
    const raw = "# Changelog\n\n## [1.0.0] - 2024-12-07\n\n### Added\n\n- This cool change";
    const cl = parseChangelog(raw);
    expect(cl.versions).toEqual([{ version: "1.0.0", release_date: "2024-12-07", added: ["This cool change"] }]);
  });

  test("can handle multiple changes", () => {
    const raw =
      "# Changelog\n\n## [1.0.0] - 2024-12-07\n\n### Added\n\n- This cool change\n- Another change\n- And another one";
    const cl = parseChangelog(raw);
    expect(cl.versions).toEqual([{
      version: "1.0.0",
      release_date: "2024-12-07",
      added: ["This cool change", "Another change", "And another one"],
    }]);
  });

  test("can get the version without brackets.", () => {
    const raw =
      "# Changelog\n\n## 1.0.0 - 2024-12-07\n\n### Added\n\n- This cool change\n- Another change\n- And another one";
    const cl = parseChangelog(raw);
    expect(cl.versions).toEqual([{
      version: "1.0.0",
      release_date: "2024-12-07",
      added: ["This cool change", "Another change", "And another one"],
    }]);
  });

  test("if version is not in valid semver it will fallback to unreleased", () => {
    const raw = "# Changelog\n\n##  upcoming \n\n### Added\n\n- This cool change\n- Another change\n- And another one";
    const cl = parseChangelog(raw);
    expect(cl.versions).toEqual([{
      version: "Unreleased",
      release_date: "TBD",
      added: ["This cool change", "Another change", "And another one"],
    }]);
  });

  test("should omit empty changes.", () => {
    const raw = `# changelog

## [1.2.4] - 2017-03-15

Here we would have the update steps for 1.2.4 for people to follow.

### Added

### Changed

- [PROJECTNAME-ZZZZ](http://tickets.projectname.com/browse/PROJECTNAME-ZZZZ)
  PATCH Drupal.org is now used for composer.

### Fixed

- [PROJECTNAME-TTTT](http://tickets.projectname.com/browse/PROJECTNAME-TTTT)
  PATCH Add logic to runsheet teaser delete to delete corresponding
  schedule cards.`;
    const cl = parseChangelog(raw);
    expect(cl.versions).toEqual([{
      version: "1.2.4",
      release_date: "2017-03-15",
      added: [],
      changed: [
        "[PROJECTNAME-ZZZZ](http://tickets.projectname.com/browse/PROJECTNAME-ZZZZ) PATCH Drupal.org is now used for composer.",
      ],
      fixed: [
        "[PROJECTNAME-TTTT](http://tickets.projectname.com/browse/PROJECTNAME-TTTT) PATCH Add logic to runsheet teaser delete to delete corresponding schedule cards.",
      ],
    }]);
  });

  test("all keywords are valid", () => {
    const raw =
      "# Changelog\n\n## [1.0.0] - 2024-12-07\n\n### Added\n\n- This cool change\n\n### Fixed\n\n- this is a fix.\n\n### Changed\n\n- this is a change\n\n### Removed\n\n- this remove a feature\n\n### Deprecated\n\n- this will be deprecated\n\n### Security\n\n- security update";
    const cl = parseChangelog(raw);
    expect(cl.versions).toEqual([{
      version: "1.0.0",
      release_date: "2024-12-07",
      added: ["This cool change"],
      fixed: ["this is a fix."],
      changed: ["this is a change"],
      removed: ["this remove a feature"],
      deprecated: ["this will be deprecated"],
      security: ["security update"],
    }]);
  });

  test("all keywords are valid", () => {
    const raw = "# Changelog\n\n## [1.0.0] - 2024-12-07\n\n### Added\n\n- [Breaking 🧨] - this cool change\n";
    const cl = parseChangelog(raw);
    expect(cl.versions).toEqual([{
      version: "1.0.0",
      release_date: "2024-12-07",
      added: ["[Breaking 🧨] - this cool change"],
    }]);
  });

  test("can get notice out of changelog", () => {
    const raw =
      "# Changelog\n\n## [1.0.0] - 2024-12-07\n\n_Read the [README.md](./README.md#complex-example) how to add changes._\n\n### Added\n\n- Add `name_override` input to give more control on naming convention of contributors. ([#71](https://github.com/jelmore1674/build-changelog/pull/71), [#70](https://github.com/jelmore1674/build-changelog/issues/70)) ([Justin Elmore](https://github.com/jelmore1674))\n";
    const cl = parseChangelog(raw);
    expect(cl.versions).toEqual([{
      version: "1.0.0",
      notice: "Read the [README.md](./README.md#complex-example) how to add changes.",
      release_date: "2024-12-07",
      added: [
        "Add `name_override` input to give more control on naming convention of contributors. ([#71](https://github.com/jelmore1674/build-changelog/pull/71), [#70](https://github.com/jelmore1674/build-changelog/issues/70)) ([Justin Elmore](https://github.com/jelmore1674))",
      ],
    }]);
  });

  test("does not detect notice in change when using _tht_", () => {
    const raw = "# Changelog\n\n## [1.0.0] - 2024-12-07\n\n### Added\n\n- [Breaking 🧨] - this _cool_ change\n";
    const cl = parseChangelog(raw);
    expect(cl.versions).toEqual([{
      version: "1.0.0",
      release_date: "2024-12-07",
      added: ["[Breaking 🧨] - this _cool_ change"],
    }]);
  });

  test("can return multiple prefixes", () => {
    const raw =
      "# Changelog\n\n## [1.0.0] - 2024-12-07\n\n### Added\n\n- [Breaking 🧨] - this cool change.\n- [Breaking 🧨] - this other change here.\n\n[1.0.0]: https://test.com";
    const cl = parseChangelog(raw);
    expect(cl).toEqual({
      heading: "",
      versions: [{
        version: "1.0.0",
        release_date: "2024-12-07",
        added: ["[Breaking 🧨] - this cool change.", "[Breaking 🧨] - this other change here."],
      }],
      links: [{
        reference: "1.0.0",
        url: "https://test.com",
      }],
    });
  });

  test("real changelog", () => {
    const changelogFile = readFileSync(process.cwd() + "/CHANGELOG.md", { encoding: "utf8" });
    const cl = parseChangelog(changelogFile);
    expect(cl.versions.length).toBeGreaterThan(1);
  });

  test("can handle different variations of versions", () => {
    const raw =
      "# Changelog\n\n## [1.0.0-alpha] - 2024-12-07\n\n### Added\n\n- [Breaking 🧨] - this other change here.\n\n## [1.4.30] - 2024-12-07\n\n### Added\n\n- [Breaking 🧨] - this other change here.\n\n## [1.0.0] - 2024-12-07\n\n### Added\n\n- [Breaking 🧨] - this other change here.";
    const cl = parseChangelog(raw);
    expect(cl.versions).toEqual([
      {
        version: "1.0.0-alpha",
        release_date: "2024-12-07",
        added: ["[Breaking 🧨] - this other change here."],
      },
      {
        version: "1.4.30",
        release_date: "2024-12-07",
        added: ["[Breaking 🧨] - this other change here."],
      },
      {
        version: "1.0.0",
        release_date: "2024-12-07",
        added: ["[Breaking 🧨] - this other change here."],
      },
    ]);
  });

  test("can parse markdown reference links", () => {
    const raw =
      "# Changelog\n\n## [1.0.0] - 2024-12-07\n\n### Added\n\n- [Breaking 🧨] - this cool change\n\n[1.0.0]: https://test.com";

    const cl = parseChangelog(raw);

    expect(cl).toEqual({
      heading: "",
      versions: [{
        version: "1.0.0",
        release_date: "2024-12-07",
        added: ["[Breaking 🧨] - this cool change"],
      }],
      links: [{ reference: "1.0.0", url: "https://test.com" }],
    });
  });
});
