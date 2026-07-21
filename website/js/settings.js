(() => {
  "use strict";

  const STORAGE_KEY = "sitePreferences";
  const NAME_PATTERN = /^[\p{L} '-]+$/u;

  const form = document.getElementById("settings-form");
  const status = document.getElementById("form-status");
  const nameInput = document.getElementById("display-name");
  const nameError = document.getElementById("display-name-error");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const themeInputs = Array.from(form.elements.theme);
  const themeError = document.getElementById("theme-error");

  function setFieldError(input, errorEl, message) {
    if (message) {
      input.setAttribute("aria-invalid", "true");
      errorEl.textContent = message;
    } else {
      input.removeAttribute("aria-invalid");
      errorEl.textContent = "";
    }
  }

  function validateName() {
    const value = nameInput.value.trim();
    if (value === "") {
      setFieldError(nameInput, nameError, "Enter your display name.");
      return null;
    }
    if (value.length < 2 || value.length > 50) {
      setFieldError(nameInput, nameError, "Display name must be 2–50 characters.");
      return null;
    }
    if (!NAME_PATTERN.test(value)) {
      setFieldError(
        nameInput,
        nameError,
        "Display name can only contain letters, spaces, hyphens, and apostrophes."
      );
      return null;
    }
    setFieldError(nameInput, nameError, "");
    return value;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (value === "") {
      setFieldError(emailInput, emailError, "Enter your email address.");
      return null;
    }
    if (!emailInput.checkValidity()) {
      setFieldError(emailInput, emailError, "Enter a valid email address.");
      return null;
    }
    setFieldError(emailInput, emailError, "");
    return value;
  }

  function validateTheme() {
    const selected = themeInputs.find((input) => input.checked);
    if (!selected) {
      themeInputs.forEach((input) => input.setAttribute("aria-invalid", "true"));
      themeError.textContent = "Choose a theme.";
      return null;
    }
    themeInputs.forEach((input) => input.removeAttribute("aria-invalid"));
    themeError.textContent = "";
    return selected.value;
  }

  function setStatus(message, state) {
    status.textContent = message;
    if (state) {
      status.setAttribute("data-state", state);
    } else {
      status.removeAttribute("data-state");
    }
  }

  function loadSavedPreferences() {
    let saved;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      return;
    }
    if (!saved) return;

    if (saved.displayName) nameInput.value = saved.displayName;
    if (saved.email) emailInput.value = saved.email;
    if (saved.theme) {
      const match = themeInputs.find((input) => input.value === saved.theme);
      if (match) match.checked = true;
    }
    form.elements.notifyProduct.checked = Boolean(saved.notifyProduct);
    form.elements.notifySecurity.checked = Boolean(saved.notifySecurity);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const displayName = validateName();
    const email = validateEmail();
    const theme = validateTheme();

    const firstInvalid = [
      [displayName, nameInput],
      [email, emailInput],
      [theme, themeInputs[0]],
    ].find(([value]) => value === null);

    if (firstInvalid) {
      setStatus("Please fix the errors below.", "error");
      firstInvalid[1].focus();
      return;
    }

    const preferences = {
      displayName,
      email,
      theme,
      notifyProduct: form.elements.notifyProduct.checked,
      notifySecurity: form.elements.notifySecurity.checked,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    setStatus("Preferences saved.", "success");
  });

  loadSavedPreferences();
})();
