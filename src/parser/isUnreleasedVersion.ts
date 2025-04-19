/**
 * Checks if version is `Unreleased`
 *
 * @param version - the version to check if unreleased
 * @returns - if the current version is unreleased.
 *
 * @example
 * ```js
 * const isUnreleased = isUnreleasedVersion(version)
 * ```
 */
function isUnreleasedVersion(version: string) {
  return version.toLowerCase() === "unreleased";
}

export { isUnreleasedVersion };
