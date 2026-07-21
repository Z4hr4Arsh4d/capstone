const DISPLAY_NAME_MIN = 2;
const DISPLAY_NAME_MAX = 40;
const PLAYLIST_MIN = 5;
const PLAYLIST_MAX = 50;

// Reasonable, not overly strict: local@domain.tld, no whitespace, one @, a dot
// in the domain part. Deliberately not RFC 5322-complete.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateDisplayName(value) {
  const trimmed = (value ?? "").trim();
  if (trimmed.length === 0) {
    return { valid: false, message: "Display name is required" };
  }
  if (trimmed.length < DISPLAY_NAME_MIN) {
    return { valid: false, message: `Must be at least ${DISPLAY_NAME_MIN} characters` };
  }
  if (trimmed.length > DISPLAY_NAME_MAX) {
    return { valid: false, message: `Must be ${DISPLAY_NAME_MAX} characters or fewer` };
  }
  return { valid: true, message: "" };
}

export function validateEmail(value) {
  const trimmed = (value ?? "").trim();
  if (trimmed.length === 0) {
    return { valid: false, message: "Email is required" };
  }
  if (!EMAIL_PATTERN.test(trimmed)) {
    return { valid: false, message: "Enter a valid email address" };
  }
  return { valid: true, message: "" };
}

export function validatePlaylistSize(value) {
  const trimmed = typeof value === "string" ? value.trim() : value;
  if (trimmed === "" || trimmed === null || trimmed === undefined) {
    return { valid: false, message: "Default playlist size is required" };
  }
  const num = Number(trimmed);
  if (!Number.isFinite(num) || !Number.isInteger(num)) {
    return { valid: false, message: "Must be a whole number" };
  }
  // Inclusive boundary: >= PLAYLIST_MIN and <= PLAYLIST_MAX both accepted.
  if (num < PLAYLIST_MIN || num > PLAYLIST_MAX) {
    return { valid: false, message: `Must be between ${PLAYLIST_MIN} and ${PLAYLIST_MAX}` };
  }
  return { valid: true, message: "" };
}

export function validateSettingsForm({ displayName, email, playlistSize }) {
  const results = {
    displayName: validateDisplayName(displayName),
    email: validateEmail(email),
    playlistSize: validatePlaylistSize(playlistSize),
  };
  const valid = results.displayName.valid && results.email.valid && results.playlistSize.valid;
  return { valid, results };
}
