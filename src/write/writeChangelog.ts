import Handlebars from "handlebars";
import type { Changelog } from "../types";
import { change } from "./templates/change";
import { changelog } from "./templates/changelog";
import { commonChangelogHeading } from "./templates/commonChangelogHeading";
import { dynamicVersions } from "./templates/dynamicVersions";
import { keepaChangelogHeading } from "./templates/keepaChangelogHeading";
import { links } from "./templates/links";
import { notice } from "./templates/notice";
import { versions } from "./templates/versions";

/**
 * List of keys to exclude from change headings.
 */
const EXCLUDE = ["version", "release_date", "notice"];

interface DefaultWriteChangelogOptions {
  dynamic: boolean;
  changelogStyle: "keep-a-changelog";
}

const defaultOptions: DefaultWriteChangelogOptions = {
  dynamic: false,
  changelogStyle: "keep-a-changelog",
};

const changelogHeading = {
  "keep-a-changelog": keepaChangelogHeading,
  "common-changelog": commonChangelogHeading,
};

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

  if (options?.changelogStyle && options.changelogStyle === "custom" && options.customHeading) {
    Handlebars.registerPartial("heading", options.customHeading);
  } else if (options?.changelogStyle && options.changelogStyle !== "custom") {
    Handlebars.registerPartial("heading", changelogHeading[options.changelogStyle]);
  } else {
    Handlebars.registerPartial("heading", changelogHeading[defaultOptions.changelogStyle]);
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

  return Handlebars.compile(changelog);
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

  /**
   * The style of the changelog. Whether you prefer to follow the keep-a-changelog or the
   * common-changelog format.
   *
   * @link [keep-a-changelog](https://keepachangelog.com/en/1.1.0/)
   * @link [common-changelog](https://common-changelog.org/)
   *
   * @default "keep-a-changelog"
   */
  changelogStyle?: "keep-a-changelog" | "common-changelog" | "custom";

  /**
   * Custom heading to set for the changelog.
   *
   * To set a custom heading you must set the changelogStyle to `custom`.
   *
   * @example
   * ```js
   * writeChangelog(changelog,{ changelogStyle: "custom", customHeading: "This is a custom heading."})
   * ```
   */
  customHeading?: string;
}

/**
 * Write the changelog object to the Changelog string.
 *
 * @param changelog - The changelog object.
 * @param [options] - The options to write the changelog.
 * @param [options.dynamic] - Use dynamic headings
 * @param [options.changelogStyle] - Use either keep-a-changelog, common-changelog, custom format.
 * @param [options.customHeading] - Optionally set a custom heading for your changelog.
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
