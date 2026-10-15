// alerts.js: alert form validation, localStorage saving and personalization UI.

const alertForm = document.querySelector(`#alert-form`);

/* ---------- Helpers ---------- */

// ["A", "B", "C"] becomes "A, B and C"
function formatList(items) {
    if (items.length <= 1) return items.join(``);
    return `${items.slice(0, -1).join(`, `)} and ${items[items.length - 1]}`;
}

// Create the genre checkboxes from the GENRES array
function renderGenreCheckboxes() {
    const box = document.querySelector(`#genre-options`);
    if (!box) return;
    box.innerHTML = GENRES.map((genre) => `
    <label class="check">
      <input type="checkbox" name="genres" value="${genre}">
      <span>${genre}</span>
    </label>`).join(``);
}

// Read the current form values
function getFormValues() {
    const checked = document.querySelectorAll(`input[name="genres"]:checked`);
    return {
        name: document.querySelector(`#name`).value.trim(),
        email: document.querySelector(`#email`).value.trim(),
        genres: Array.from(checked).map((box) => box.value)
    };
}

/* ---------- Validation ---------- */

// Return an object of error messages (empty object means valid)
function validate({ name, email, genres }) {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (name.length < 2) errors.name = `Please enter a name with at least 2 characters.`;
    if (!emailPattern.test(email)) errors.email = `Please enter a valid email address, like name@example.com.`;
    if (genres.length < 1) errors.genres = `Please choose at least one genre.`;

    return errors;
}

// Show or clear the inline error under each field
function showErrors(errors) {
    [`name`, `email`, `genres`].forEach((field) => {
        const message = errors[field] ? errors[field] : ``;
        document.querySelector(`#${field}-error`).textContent = message;

        const input = document.querySelector(`#${field}`);
        if (input) input.setAttribute(`aria-invalid`, message ? `true` : `false`);
    });
}

/* ---------- Storage ---------- */

// Save preferences to localStorage (fails quietly if storage is blocked)
function savePrefs(prefs) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
        return true;
    } catch (error) {
        return false;
    }
}

// Remove saved preferences
function clearPrefs() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        // Nothing to do if storage is unavailable
    }
}

/* ---------- Personalization UI ---------- */

// Show the greeting and "Clear preferences" button when prefs exist
function updatePersonalBar() {
    const bar = document.querySelector(`#personal-bar`);
    if (!bar) return;

    const prefs = getPrefs();
    if (!prefs) {
        bar.hidden = true;
        bar.innerHTML = ``;
        return;
    }

    bar.hidden = false;
    bar.innerHTML = `<p>Welcome back, <strong>${escapeHTML(prefs.name)}</strong>! Events in ${escapeHTML(formatList(prefs.genres))} are listed first.</p>`;

    const clearButton = document.createElement(`button`);
    clearButton.type = `button`;
    clearButton.className = `btn btn-outline`;
    clearButton.textContent = `Clear preferences`;
    clearButton.addEventListener(`click`, handleClear);
    bar.append(clearButton);
}

// Fill the fields and tick the checkboxes from saved prefs
function prefillForm() {
    const prefs = getPrefs();
    if (!alertForm || !prefs) return;

    document.querySelector(`#name`).value = prefs.name;
    document.querySelector(`#email`).value = prefs.email ? prefs.email : ``;
    document.querySelectorAll(`input[name="genres"]`).forEach((box) => {
        box.checked = prefs.genres.includes(box.value);
    });
}

/* ---------- Event handlers ---------- */

// Handle the form submit
function handleSubmit(event) {
    event.preventDefault();

    const values = getFormValues();
    const errors = validate(values);
    const confirmation = document.querySelector(`#form-confirmation`);
    showErrors(errors);

    if (Object.keys(errors).length > 0) {
        confirmation.textContent = ``;
        const firstBad = alertForm.querySelector(`[aria-invalid="true"]`);
        if (firstBad) firstBad.focus();
        return;
    }

    const saved = savePrefs(values);
    confirmation.innerHTML = `
    <p>Thanks, ${escapeHTML(values.name)}! Alerts for ${escapeHTML(formatList(values.genres))} will go to ${escapeHTML(values.email)}.</p>
    ${saved ? `` : `<p>Note: your browser blocked saving, so we can't personalize this device.</p>`}`;

    updatePersonalBar();
    refreshEvents();
}

// Handle "Clear preferences"
function handleClear() {
    clearPrefs();
    if (alertForm) {
        alertForm.reset();
        showErrors({});
        document.querySelector(`#form-confirmation`).textContent = ``;
    }
    updatePersonalBar();
    refreshEvents();
}

/* ---------- Setup ---------- */

renderGenreCheckboxes();
prefillForm();
updatePersonalBar();
if (alertForm) alertForm.addEventListener(`submit`, handleSubmit);