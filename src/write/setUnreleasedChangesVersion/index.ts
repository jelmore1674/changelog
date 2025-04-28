import { parseChangelog } from "@/parser/parseChangelog";
import { readFileSync, writeFileSync } from "node:fs";
import { writeChangelog } from "../writeChangelog";

interface Options {
  showGitTagPrefix?: boolean;
  gitTagPrefix?: string;
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
 */
function setUnreleasedChangesVersion(
  changelogFile: string,
  version: string,
  url: string,
  { showGitTagPrefix = false, gitTagPrefix = "v" }: Options,
) {
  const formattedVersion = showGitTagPrefix ? `${gitTagPrefix}${version}` : version;
  const rawCl = readFileSync(changelogFile, "utf8");
  const changelog = parseChangelog(rawCl);

  const bumped = changelog.versions.map(v => {
    if (v.version.toLowerCase() === "unreleased") {
      v.version = formattedVersion;
      v.release_date = new Date().toISOString().split("T")[0];

      changelog.links.unshift({
        reference: formattedVersion,
        url,
      });

      return v;
    }

    v.version = showGitTagPrefix ? `${gitTagPrefix}${v.version}` : v.version;

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
