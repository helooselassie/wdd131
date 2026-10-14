const STORAGE_KEY = "accraGrooveGuidePreferences";

// Safely read and parse the saved preference object.
function readPreferences() {
    try {
        const savedValue = localStorage.getItem(STORAGE_KEY);

        if (!savedValue) {
            return null;
        }

        const parsedValue = JSON.parse(savedValue);

        if (
            typeof parsedValue !== "object" ||
            parsedValue === null ||
            !Array.isArray(parsedValue.genres)
        ) {
            return null;
        }

        return parsedValue;
    } catch (error) {
        console.warn("Saved preferences could not be read.", error);
        return null;
    }
}

// Convert checkbox selections into an array of genre names.
function getSelectedGenres() {
    return [...document.querySelectorAll('input[name="genre"]:checked')].map(
        (checkbox) => checkbox.value
    );
}

// Validate the form and update the inline error messages.
function validateAlertForm() {
    const nameInput = document.querySelector("#full-name");
    const emailInput = document.querySelector("#email");
    const nameError = document.querySelector("#name-error");
    const emailError = document.querySelector("#email-error");
    const genreError = document.querySelector("#genre-error");

    const selectedGenres = getSelectedGenres();
    const trimmedName = nameInput.value.trim();
    const trimmedEmail = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    if (trimmedName.length < 2) {
        nameError.textContent = "Please enter at least 2 characters.";
        nameInput.setAttribute("aria-invalid", "true");
        isValid = false;
    } else {
        nameError.textContent = "";
        nameInput.removeAttribute("aria-invalid");
    }

    if (!emailPattern.test(trimmedEmail)) {
        emailError.textContent = "Please enter a valid email address.";
        emailInput.setAttribute("aria-invalid", "true");
        isValid = false;
    } else {
        emailError.textContent = "";
        emailInput.removeAttribute("aria-invalid");
    }

    if (selectedGenres.length < 1) {
        genreError.textContent = "Please choose at least one genre.";
        isValid = false;
    } else {
        genreError.textContent = "";
    }

    return isValid;
}

// Show or hide the personalization greeting and clear button.
function showPersonalization(preferences) {
    const panel = document.querySelector("#preference-panel");
    const greeting = document.querySelector("#greeting");

    if (!panel || !greeting) {
        return;
    }

    if (preferences && preferences.genres.length > 0) {
        const genreText = preferences.genres.join(", ");
        greeting.textContent = `Welcome back, ${preferences.name}! Your picks: ${genreText}.`;
        panel.hidden = false;
    } else {
        greeting.textContent = "";
        panel.hidden = true;
    }
}

// Refresh event cards after preferences are added or removed.
function refreshPersonalizedContent() {
    const preferences = readPreferences();

    renderNextUp(preferences);
    renderFilteredEvents(preferences);
    showPersonalization(preferences);
}

// Save the form values and prevent the browser from reloading.
function setupAlertForm() {
    const form = document.querySelector("#alert-form");

    if (!form) {
        return;
    }

    const confirmation = document.querySelector("#form-confirmation");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!validateAlertForm()) {
            confirmation.textContent = "";
            return;
        }

        const name = document.querySelector("#full-name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const genres = getSelectedGenres();

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ name, email, genres })
            );
        } catch (error) {
            console.warn("Preferences could not be saved.", error);
        }

        confirmation.textContent =
            `Thanks, ${name}! Alerts for ${genres.join(", ")} will go to ${email}.`;

        refreshPersonalizedContent();
    });
}

// Remove saved preferences when the clear button is clicked.
function setupClearPreferences() {
    document.querySelector("#clear-preferences")?.addEventListener("click", () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.warn("Preferences could not be cleared.", error);
        }

        refreshPersonalizedContent();
    });
}

setupAlertForm();
setupClearPreferences();