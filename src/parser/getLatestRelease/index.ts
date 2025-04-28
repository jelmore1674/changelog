import latestSemver from "latest-semver";
import { parseChangelog } from "../parseChangelog";

/**
 * Get the latest release
 *
 * @param changelog - The changelog to get the latest release from.
 * @returns the latest release from your changelog.
 *
 * @example
 * ```js
 * const changelog = readFileSync("CHANGELOG.md","utf8");
 * const latestRelease = getLatestRelease(changelog);
 * ```
 */
function getLatestRelease(changelog: string) {
  const versions = parseChangelog(changelog).versions.map(({ version }) => version).filter(Boolean);
  return latestSemver(versions);
}

export { getLatestRelease };
