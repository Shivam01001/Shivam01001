import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");

test("README identifies Shivam's cybersecurity portfolio", () => {
  assert.match(readme, /Cybersecurity · VAPT · Security Research/);
  assert.match(readme, /https:\/\/github\.com\/Shivam01001/);
  assert.match(readme, /https:\/\/www\.linkedin\.com\/in\/pandit-shivam/);
});

test("README keeps the authorization boundary visible", () => {
  assert.match(readme, /authorized scopes/);
});
