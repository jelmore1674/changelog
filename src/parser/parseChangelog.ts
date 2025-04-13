import {
  changeSectionRegex,
  dateRegex,
  keywordRegex,
  lineRegex,
  markdownReferenceLinkRegex,
  noticeRegex,
  referenceLinkRegex,
  referenceLinkUrlRegex,
  versionRegex,
  versionSectionRegex,
} from "../regex";
import type { Changelog, Reference, Version } from "../types";

/**
 * parse an existing changelog file and convert to an object.
 *
 * @param changelog - the changelog file.
 * @param [releaseVersion] - the releaseVersion if we are not parsing `Unreleased`.
 */
function parseChangelog<T = Record<string, string | string[]>>(
  changelog: string,
  releaseVersion?: string,
): Changelog<T> {
  const parsedVersions = changelog.split(versionSectionRegex).map(section => {
    if (section.toLowerCase().includes("# changelog")) {
      return;
    }

    // Pull the version and release_date from the section.
    const [version] = section.match(versionRegex) || ["Unreleased"];
    // biome-ignore lint/style/useNamingConvention: leave this for yaml/toml usage
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
      releaseVersion && releaseVersion.toLowerCase() !== "unreleased"
      && release.version.toLowerCase() === "unreleased"
    ) {
      const today = new Date().toISOString().split("T")[0];
      release.version = releaseVersion;
      release.release_date = today;
    }

    if (notice) {
      // Only define notice if there is one.
      release.notice = notice;
    }

    section.split(changeSectionRegex).map(changeKeyword => {
      if (changeKeyword.match(versionSectionRegex)) {
        return;
      }

      const [, keyword] = changeKeyword.match(keywordRegex) as string[];

      if (keyword) {
        release[keyword.toLowerCase()] = changeKeyword.replace(
          lineRegex,
          "",
        ).replaceAll(markdownReferenceLinkRegex, "").trim().split(/^- /gm)
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
  }).filter(Boolean) as Version<T>[];

  const links: Reference[] = [];

  const linkSection = changelog.match(markdownReferenceLinkRegex);

  if (linkSection && linkSection.length > 0) {
    linkSection.map(link => {
      const referenceMatch = link.match(referenceLinkRegex);
      const urlMatch = link.match(referenceLinkUrlRegex);

      if (referenceMatch && urlMatch) {
        links.push({
          reference: referenceMatch[1],
          url: urlMatch[1],
        });
      }
    });
  }

  return {
    versions: parsedVersions || [],
    links,
  };
}

export { parseChangelog };
