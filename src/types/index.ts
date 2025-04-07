/** Initial list of supported keywords */
const KEEP_A_CHANGELOG_CHANGES = {
  added: "added",
  changed: "changed",
  deprecated: "deprecated",
  removed: "removed",
  fixed: "fixed",
  security: "security",
} as const;

interface Reference {
  type: "commit" | "issue" | "pull_request";
  reference: string;
}

interface Release {
  version: string;
  release_date?: string;
  notice?: string;
  author?: string;
  references?: Reference[];
}

/**
 * The keywords used to make up the sections of the changelog.
 */
type Keywords = keyof typeof KEEP_A_CHANGELOG_CHANGES;

/**
 * The Section that is used to make the Version.
 */
type Version = Release & Partial<Record<Keywords, string[]>> & Record<string, string | string[]>;

export type { Keywords, Reference, Version };
