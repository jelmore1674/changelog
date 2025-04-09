/**
 * Checks if version is `Unreleased`
 *
 * @param version - the version to check if unreleased
 */
function isUnreleasedVersion(version: string) {
  return version.toLowerCase() === "unreleased";
}

export { isUnreleasedVersion };
