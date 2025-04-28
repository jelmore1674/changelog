import { expect, test } from "vitest";
import { isUnreleasedVersion } from "./";

test.each([
  { input: "Unreleased", expected: true },
  { input: "1.0.0", expected: false },
  { input: "0.1.1", expected: false },
  { input: "uNRELEASED", expected: true },
  { input: "unreleased", expected: true },
  { input: "UnReleased", expected: true },
])("isUnreleasedVersion($input) -> $expected", ({ input, expected }) => {
  expect(isUnreleasedVersion(input)).toBe(expected);
});
