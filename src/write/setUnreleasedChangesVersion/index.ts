import { parseChangelog } from "@/parser/parseChangelog";
import { dateRegex } from "@/regex";
import { readFileSync, writeFileSync } from "node:fs";
import { writeChangelog } from "../writeChangelog";

interface Options {
  /**
   * Whether or not to show the  git tag prefix
   *
   * @default false
   */
  showGitTagPrefix?: boolean;
  /**
   * The git tag prefix
   *
   * @default "v"
   */
  gitTagPrefix?: string;
  /**
   * Auto Semantic Versioning
   *
   * @default false
   */
  autoVersioning?: boolean;
}

/**
 * Set unreleased changes to a version.
 *
 * @param changelogFile - The path to the changelog file.
 * @param version - The version to set.
 * @param url - The url to the version reference.
 * @param options
 * @param [options.showGitTagPrefix=false] - show the git tag prefix in the version.
 * @param [options.gitTagPrefix="v"] - the git tag prefix.
 * @param [options.autoVersioning=false] - Auto handle the semantic version.
 */
function setUnreleasedChangesVersion(
  changelogFile: string,
  version: string,
  url: string,
  { showGitTagPrefix = false, gitTagPrefix = "v", autoVersioning = false }: Options,
) {
  let formattedVersion: string;
  if (version) {
    formattedVersion = showGitTagPrefix ? `${gitTagPrefix}${version}` : version;
  }
  const rawCl = readFileSync(changelogFile, "utf8");
  const changelog = parseChangelog(rawCl);

  const bumped = changelog.versions.map(v => {
    if (!autoVersioning && v.version.toLowerCase() === "unreleased") {
      v.version = formattedVersion;
      v.release_date = new Date().toISOString().split("T")[0];

      changelog.links.unshift({
        reference: formattedVersion,
        url,
      });

      return v;
    }

    v.version = showGitTagPrefix ? `${gitTagPrefix}${v.version}` : v.version;

    if (!dateRegex.test(v.release_date || "")) {
      v.release_date = new Date().toISOString().split("T")[0];

      const link = changelog.links.find(l => l.reference === v.version);

      if (!link) {
        changelog.links.unshift({
          reference: v.version,
          url,
        });
      }
      return v;
    }

    return v;
  });

  const modified = writeChangelog({
    ...changelog,
    versions: bumped,
  }, {
    changelogStyle: "custom",
    customHeading: changelog.heading,
  });

  writeFileSync(changelogFile, modified);
}

export { setUnreleasedChangesVersion };
