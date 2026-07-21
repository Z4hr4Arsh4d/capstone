import { validateDisplayName, validateEmail, validatePlaylistSize } from "./validation.js";

const form = document.getElementById("settings-form");
const submitButton = document.getElementById("submit-button");

const fields = {
  displayName: {
    input: document.getElementById("display-name"),
    error: document.getElementById("display-name-error"),
    validate: validateDisplayName,
  },
  email: {
    input: document.getElementById("email"),
    error: document.getElementById("email-error"),
    validate: validateEmail,
  },
  playlistSize: {
    input: document.getElementById("playlist-size"),
    error: document.getElementById("playlist-size-error"),
    validate: validatePlaylistSize,
  },
};

function applyResult(field, result) {
  field.error.textContent = result.valid ? "" : result.message;
  field.input.setAttribute("aria-invalid", result.valid ? "false" : "true");
  return result.valid;
}

function validateField(key) {
  const field = fields[key];
  return applyResult(field, field.validate(field.input.value));
}

function allValid() {
  return Object.keys(fields).every((key) => fields[key].validate(fields[key].input.value).valid);
}

function updateSubmitState() {
  submitButton.disabled = !allValid();
}

Object.keys(fields).forEach((key) => {
  const field = fields[key];
  field.input.addEventListener("blur", () => {
    validateField(key);
  });
  field.input.addEventListener("input", () => {
    if (field.input.getAttribute("aria-invalid") === "true") {
      validateField(key);
    }
    updateSubmitState();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const results = Object.keys(fields).map((key) => validateField(key));
  const formValid = results.every(Boolean);
  updateSubmitState();
  if (!formValid) {
    const firstInvalidKey = Object.keys(fields).find(
      (key) => fields[key].input.getAttribute("aria-invalid") === "true"
    );
    if (firstInvalidKey) {
      fields[firstInvalidKey].input.focus();
    }
    return;
  }
  form.reset();
  Object.keys(fields).forEach((key) => applyResult(fields[key], { valid: true, message: "" }));
  updateSubmitState();
});
