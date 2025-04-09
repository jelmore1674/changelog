import latestSemver from "latest-semver";
import { parseChangelog } from "./parseChangelog";

/**
 * Get the latest release
 *
 * @param changelog - The changelog to get the latest release from.
 */
function getLatestRelease(changelog: string) {
  const versions = parseChangelog(changelog).map(({ version }) => version).filter(v => v);
  return latestSemver(versions);
}

export { getLatestRelease };
