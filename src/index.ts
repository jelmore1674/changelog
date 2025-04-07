import latestSemver from "latest-semver";
import {
  changeSectionRegex,
  dateRegex,
  keywordRegex,
  lineRegex,
  markdownReferenceLinkRegex,
  noticeRegex,
  versionRegex,
  versionSectionRegex,
} from "./regex";
import type { Version } from "./types";

/**
 * Checks if version is `Unreleased`
 *
 * @param version - the version to check if unreleased
 */
function isUnreleasedVersion(version: string) {
  return version.toLowerCase() === "unreleased";
}

function getReleaseSection(section: string, releaseVersion?: string) {
  // Pull the version and release_date from the section.
  const [version] = section.match(versionRegex) || ["Unreleased"];
  const [release_date] = section.match(dateRegex) || ["TBD"];
  // Get the notice if there is a notice.
  const [notice] = section.match(noticeRegex) || [undefined];

  // Initialize the release version..
  const release: Version = {
    version,
    release_date,
  };

  // Overwrite the release version if there is one set.
  if (
    releaseVersion && isUnreleasedVersion(releaseVersion) && isUnreleasedVersion(release.version)
  ) {
    const today = new Date().toISOString().split("T")[0];
    release.version = releaseVersion;
    release.release_date = today;
  }

  if (notice) {
    // Only define notice if there is one.
    release.notice = notice;
  }

  return release;
}

/**
 * parse an existing changelog file and convert to an object.
 */
function parseChangelog(rawChangelog: string, releaseVersion?: string) {
  const changelog = rawChangelog.split(versionSectionRegex).map(section => {
    if (section.toLowerCase().includes("# changelog")) {
      return;
    }

    const release = getReleaseSection(section, releaseVersion);

    section.split(changeSectionRegex).map(changeKeyword => {
      if (changeKeyword.match(versionSectionRegex)) {
        return;
      }

      const [, keyword] = changeKeyword.match(keywordRegex) as string[];

      if (keyword) {
        release[keyword.toLowerCase()] = changeKeyword.replace(
          lineRegex,
          "",
        ).replace(markdownReferenceLinkRegex, "").trim().split(/^- /gm)
          .map((change: string) =>
            change
              .replace(/(^-|\n) /g, "")
              .trim()
          )
          .filter(i => i);
      }
    }).filter(changes => {
      return changes;
    });

    return release;
  }).filter(Boolean) as Version[];

  return changelog || [];
}

/**
 * Get the latest release
 */
function getLatestRelease(changelogPath: string) {
  const versions = parseChangelog(changelogPath).map(({ version }) => version).filter(v => v);
  return latestSemver(versions);
}

export { getLatestRelease, parseChangelog };
