/**
 * Regex is from [semver](https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string)
 * The only change from semver is added check for unreleased.
 */
const versionRegex =
  /((0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?|unreleased)/gism;

/**
 * Regex used to find the start of a new version.
 *
 * @example
 * ```md
 * ## [1.0.0] - 2025-01-01
 * ```
 *
 * @link [regex101](https://regex101.com/r/B9zeiH/1)
 */
const versionSectionRegex = /(?=^#{2} .*?$)/gism;

/**
 * Regex used to get the date of the release.
 *
 * This will match the date if it is formatted:
 * yyyy-mm-dd
 *
 * @link [regex101](https://regex101.com/r/IP7HY7/2)
 */
const dateRegex = /\d{4}(-|\/)\d{2}(-|\/)\d{2}/g;

/**
 * Regex is used to find the start each change section.
 *
 *  @example
 * ```md
 * ### Changed
 * ```
 *
 * @link [regex101](https://regex101.com/r/MBcWiF/1)
 */
const changeSectionRegex = /(?=^#{3} .*?$)/gism;

/**
 * Regex used to get the heading of the change section.
 *
 * It selects the first word after the `###`.
 *
 * @example
 * ```md
 * ### Added
 * ```
 *
 * @link [regex101](https://regex101.com/r/yw7BaO/3)
 */
const keywordRegex = /(?:^#{3} )(\S+)/ism;

/**
 * Regex used to get the notice out of the change section
 *
 * @example
 *
 * ```md
 * ## [1.0.0] - 2025-01-01
 *
 * _This is a notice._
 * ```
 *
 * @link [regex101](https://regex101.com/r/lBG1DW/1)
 */
const noticeRegex = /(?<=^_)((.*)(?=_$))/gism;

/**
 * Regex used to match the line.
 *
 * @link [regex101]()
 */
const lineRegex = /^(.*)$/m;

/**
 * Regex used to remove the markdown reference links at the bottom of the file.
 *
 * @link [regex101](https://regex101.com/r/CIsbje/1)
 */
const markdownReferenceLinkRegex = /^(\[.*\]: .*)$/gism;

/**
 * Regex used to get the change from the changelog.
 *
 * @link [regex101](https://regex101.com/r/CIsbje/1)
 */
const changeLineRegex = /^- /gm;

export {
  changeLineRegex,
  changeSectionRegex,
  dateRegex,
  keywordRegex,
  lineRegex,
  markdownReferenceLinkRegex,
  noticeRegex,
  versionRegex,
  versionSectionRegex,
};
