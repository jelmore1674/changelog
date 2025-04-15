import Handlebars from "handlebars";
import { parseChangelog } from "../parser/parseChangelog";
import { change } from "./templates/change";
import { changes } from "./templates/changes";
import { notice } from "./templates/notice";
import { releaseNotes } from "./templates/releaseNotes";

function setupHandlebars() {
  Handlebars.registerPartial("version", changes);
  Handlebars.registerPartial("change", change);
  Handlebars.registerPartial("notice", notice);
  return Handlebars.compile(releaseNotes);
}

/**
 * Get the release notes for the latest entry in the changelog.
 *
 * @param changelog - utf8 encoded Changelog file.
 * @param version - Optionally, get notes for a specific version.
 *
 * @example
 * ```js
 * const changelog = readFileSync("CHANGELOG.md", { encoding: "utf8" });
 * const releaseNotes = getReleaseNotes(changelog);
 * ```
 */
function getReleaseNotes(changelog: string, version?: string) {
  const parsedChangelog = parseChangelog(changelog);
  const template = setupHandlebars();

  return template(parsedChangelog.versions.find(v => v.version === version) || parsedChangelog.versions[0]);
}

export { getReleaseNotes };
