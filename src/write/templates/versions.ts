const versions = `## [{{version}}] - {{release_date}}

{{#notice}}{{> notice}}
{{/notice}}
{{#if changed.length}}### Changed

{{#changed}}
{{> change}}
{{/changed}}

{{/if}}
{{#if added.length}}### Added

{{#added}}
{{> change}}
{{/added}}

{{/if}}
{{#if removed.length}}### Removed

{{#removed}}
{{> change}}
{{/removed}}

{{/if}}
{{#if deprecated.length}}### Deprecated

{{#deprecated}}
{{> change}}
{{/deprecated}}

{{/if}}
{{#if fixed.length}}### Fixed

{{#fixed}}
{{> change}}
{{/fixed}}

{{/if}}
{{#if security.length}}### Security

{{#security}}
{{> change}}
{{/security}}

{{/if}}
`;

export { versions };
