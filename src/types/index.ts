/**
 * The change headings for Keep A Changelog.
 *
 * @link [keep-a-changelog](https://keepachangelog.com/en/1.1.0/#how)
 */
const KEEP_A_CHANGELOG_CHANGES = {
  added: "added",
  changed: "changed",
  deprecated: "deprecated",
  removed: "removed",
  fixed: "fixed",
  security: "security",
} as const;

/**
 * The change headings for Common Changelog
 *
 * @link [common-changelog](https://common-changelog.org/#24-change-group)
 */
const COMMON_CHANGELOG_CHANGES = {
  added: "added",
  changed: "changed",
  removed: "removed",
  fixed: "fixed",
} as const;

/**
 * Reference links
 */
interface Reference {
  /**
   * The reference that is being linked.
   */
  reference: string;
  /**
   * The url for the reference link.
   */
  url: string;
}

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
 *
 * @link [keep-a-changelog](https://keepachangelog.com/en/1.1.0/#how)
 */
// biome-ignore lint/style/useNamingConvention: leave this for yaml/toml usage
type KeepAChangelogKeywords = keyof typeof KEEP_A_CHANGELOG_CHANGES;

/**
 * The keywords used to make up the section of a changelog in the style of common-changelog.
 *
 * @link [common-changelog](https://common-changelog.org/#24-change-group)
 */
type CommonChangelogKeywords = keyof typeof COMMON_CHANGELOG_CHANGES;

// biome-ignore lint/style/useNamingConvention: leave this for yaml/toml usage
type KeepAChangelogSemantics = Partial<Record<KeepAChangelogKeywords, string[]>>;

type CommonChangelogSemantics = Partial<Record<CommonChangelogKeywords, string[]>>;

/**
 * The Section that is used to make the Version.
 */
type Version<T = Record<string, string | string[]>> = Release & T;

/**
 * The Changelog once it has been parsed.
 */
interface Changelog<T = Record<string, string | string[]>> {
  /**
   * Heading
   */
  heading: string;
  /**
   * The versions of changes in the changelog.
   */
  versions: Version<T>[];

  /**
   * Any reference links.
   */
  links: Reference[];
}

export type {
  Changelog,
  CommonChangelogKeywords,
  CommonChangelogSemantics,
  KeepAChangelogKeywords,
  KeepAChangelogSemantics,
  Reference,
  Version,
};
