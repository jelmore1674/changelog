const dynamicVersions = `## [{{version}}] - {{release_date}}

{{#notice}}{{> notice}}{{/notice}}{{#each this}}{{#if (changeKey @key)}}### {{capitalize @key}}

{{#each this}}{{> change}}{{/each}}
{{/if}}{{/each}}`;

export { dynamicVersions };
