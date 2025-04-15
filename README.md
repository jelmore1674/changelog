# changelog

This is a project used to be able to parse changelogs into usable
object to do things with.

## Parse

This package can take a changelog file and convert it to a changelog object.

### Example

```js
import { parseChangelog } from '@jelmore1674/changelog';

const rawChangelog = readFileSync('CHANGELOG.md', { encoding: 'utf8' });
const changelog = parseChangelog(rawChangelog);
```
