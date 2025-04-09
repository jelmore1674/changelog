/**
 * Initial list of supported keywords
 *
 * @todo Update jsdocs.
 */
const KEEP_A_CHANGELOG_CHANGES = {
  added: "added",
  changed: "changed",
  deprecated: "deprecated",
  removed: "removed",
  fixed: "fixed",
  security: "security",
} as const;

interface Release {
  /**
   * The version of the current release.
   */
  version: string;

  /**
   * The release date of the current release.
   */
  // biome-ignore lint/style/useNamingConvention: leave this for yaml/toml usage
  release_date?: string;

  /**
   * A notice if this release has a notice.
   *
   * @example
   * ```md
   * ## [1.0.0] - 2025-04-08
   *
   * _Initial Release_
   * ```
   */
  notice?: string;
}

/**
 * The keywords used to make up the sections of the changelog.
 */
// biome-ignore lint/style/useNamingConvention: leave this for yaml/toml usage
type KeepAChangelogKeywords = keyof typeof KEEP_A_CHANGELOG_CHANGES;

// biome-ignore lint/style/useNamingConvention: leave this for yaml/toml usage
type KeepAChangelogSemantics = Partial<Record<KeepAChangelogKeywords, string[]>>;

/**
 * The Section that is used to make the Version.
 */
type Version<T = Record<string, string | string[]>> = Release & T;

/**
 * The Changelog once it has been parsed.
 */
type Changelog<T = Record<string, string | string[]>> = Version<T>[];

export type { Changelog, KeepAChangelogKeywords, KeepAChangelogSemantics, Version };
