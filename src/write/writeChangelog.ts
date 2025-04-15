import Handlebars from "handlebars";
import type { Changelog } from "../types";
import { change } from "./templates/change";
import { dynamicVersions } from "./templates/dynamicVersions";
import { heading } from "./templates/heading";
import { links } from "./templates/links";
import { notice } from "./templates/notice";
import { versions } from "./templates/versions";

/**
 * List of keys to exclude from change headings.
 */
const EXCLUDE = ["version", "release_date", "notice"];

/**
 * Setup handlebars and it's templates.
 *
 * @param options.dynamic - Optionally set if you want dynamic change headings.
 */
function setupHandlebars(options?: WriteChangelogOptions) {
  /*
   * Register Partials
   */
  if (options?.dynamic) {
    Handlebars.registerPartial("versions", dynamicVersions);
  } else {
    Handlebars.registerPartial("versions", versions);
  }
  Handlebars.registerPartial("change", change);
  Handlebars.registerPartial("notice", notice);
  Handlebars.registerPartial("links", links);

  /**
   * Register Helpers
   */
  Handlebars.registerHelper("changeKey", (value) => {
    return !EXCLUDE.includes(value);
  });

  Handlebars.registerHelper("capitalize", (value) => {
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
  });

  return Handlebars.compile(heading);
}

/**
 * Optional options to pass configure when writing the changelog.
 */
interface WriteChangelogOptions {
  /**
   * If you do not enforce keep a changelog headings and want to keep the change
   * headings dynamic.
   *
   * @default false
   */
  dynamic?: boolean;
}

/**
 * Write the changelog object to the Changelog string.
 *
 * @param changelog - The changelog object.
 * @param options - The options to write the changelog.
 *
 * @example
 * ```js
 * const changelog = writeChangelog(changelogObject);
 * ```
 */
function writeChangelog<T>(changelog: Changelog<T>, options?: WriteChangelogOptions) {
  const template = setupHandlebars(options);
  return template(changelog);
}

export { writeChangelog };
