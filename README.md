# changelog

This is a project used to be able to parse changelogs into usable
object to do things with.

## Parse

This package can take a changelog file and convert it to a changelog object.

### Parse Example

```js
import { parseChangelog } from "@jelmore1674/changelog";

const rawChangelog = readFileSync("CHANGELOG.md", { encoding: "utf8" });
const changelog = parseChangelog(rawChangelog);
```

## Write

This can take the changelog object and parse it into a changelog.

### Write Example

```js
import { writeChangelog } from "@jelmore1674/changelog";


const changelogObject = {
    versions: [
        {
            version: "1.0.0",
            release_date: "2025-01-01",
            added: ["This cool feature."]
        }
    ]
    links: [
        {
            url: "https://release.url",
            reference: "1.0.0"
        }
    ]
}

const changelog = writeChangelog(changelogObject);
```
