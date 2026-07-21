import test from "node:test";
import assert from "node:assert/strict";
import {
  validateDisplayName,
  validateEmail,
  validatePlaylistSize,
  validateSettingsForm,
} from "../js/validation.js";

test("validateDisplayName: valid name passes", () => {
  const result = validateDisplayName("Zahra");
  assert.equal(result.valid, true);
  assert.equal(result.message, "");
});

test("validateDisplayName: empty string is required error", () => {
  const result = validateDisplayName("");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Display name is required");
});

test("validateDisplayName: whitespace-only is required error", () => {
  const result = validateDisplayName("   ");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Display name is required");
});

test("validateDisplayName: 'a' is too short with exact message", () => {
  const result = validateDisplayName("a");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Must be at least 2 characters");
});

test("validateDisplayName: leading/trailing whitespace trimmed before length check", () => {
  const result = validateDisplayName("  a  ");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Must be at least 2 characters");
});

test("validateDisplayName: exactly 40 chars is valid (upper boundary)", () => {
  const result = validateDisplayName("a".repeat(40));
  assert.equal(result.valid, true);
});

test("validateDisplayName: 41 chars is too long", () => {
  const result = validateDisplayName("a".repeat(41));
  assert.equal(result.valid, false);
  assert.equal(result.message, "Must be 40 characters or fewer");
});

test("validateEmail: valid email passes", () => {
  const result = validateEmail("zahra@example.com");
  assert.equal(result.valid, true);
  assert.equal(result.message, "");
});

test("validateEmail: empty is required error", () => {
  const result = validateEmail("");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Email is required");
});

test("validateEmail: missing @ is invalid", () => {
  const result = validateEmail("zahra.example.com");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Enter a valid email address");
});

test("validateEmail: missing TLD is invalid", () => {
  const result = validateEmail("zahra@example");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Enter a valid email address");
});

test("validateEmail: short but valid domain 'a@b.c' passes", () => {
  const result = validateEmail("a@b.c");
  assert.equal(result.valid, true);
});

test("validateEmail: whitespace inside address is invalid", () => {
  const result = validateEmail("zahra @example.com");
  assert.equal(result.valid, false);
});

test("validatePlaylistSize: valid value in range passes", () => {
  const result = validatePlaylistSize("25");
  assert.equal(result.valid, true);
  assert.equal(result.message, "");
});

test("validatePlaylistSize: empty is required error", () => {
  const result = validatePlaylistSize("");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Default playlist size is required");
});

test("validatePlaylistSize: 99 is above max with exact message", () => {
  const result = validatePlaylistSize("99");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Must be between 5 and 50");
});

test("validatePlaylistSize: 51 is above max (just past boundary)", () => {
  const result = validatePlaylistSize("51");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Must be between 5 and 50");
});

test("validatePlaylistSize: 4 is below min (just under boundary)", () => {
  const result = validatePlaylistSize("4");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Must be between 5 and 50");
});

test("validatePlaylistSize: 5 is valid (inclusive lower boundary)", () => {
  const result = validatePlaylistSize("5");
  assert.equal(result.valid, true);
  assert.equal(result.message, "");
});

test("validatePlaylistSize: 50 is valid (inclusive upper boundary)", () => {
  const result = validatePlaylistSize("50");
  assert.equal(result.valid, true);
  assert.equal(result.message, "");
});

test("validatePlaylistSize: non-integer '5.5' is rejected", () => {
  const result = validatePlaylistSize("5.5");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Must be a whole number");
});

test("validatePlaylistSize: non-numeric 'abc' is rejected", () => {
  const result = validatePlaylistSize("abc");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Must be a whole number");
});

test("validatePlaylistSize: negative number is rejected as out of range", () => {
  const result = validatePlaylistSize("-5");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Must be between 5 and 50");
});

test("validateSettingsForm: all valid inputs -> valid true", () => {
  const { valid } = validateSettingsForm({
    displayName: "Zahra",
    email: "zahra@example.com",
    playlistSize: "20",
  });
  assert.equal(valid, true);
});

test("validateSettingsForm: any one invalid field -> valid false", () => {
  const { valid, results } = validateSettingsForm({
    displayName: "a",
    email: "zahra@example.com",
    playlistSize: "20",
  });
  assert.equal(valid, false);
  assert.equal(results.displayName.valid, false);
});
