/* =========================================================
   alerts.js — the "Get Event Alerts" form:
   validation, inline errors, template-literal confirmation,
   and localStorage persistence.
   ========================================================= */

(function initAlertForm() {
    const form = document.querySelector("#alert-form");
    if (!form) return; // not on this page

    const nameInput = document.querySelector("#alert-name");
    const emailInput = document.querySelector("#alert-email");
    const genreBox = document.querySelector("#genre-checkboxes");
    const successMsg = document.querySelector("#form-success");

    /* ---------- build the genre checkboxes from the data ---------- */
    const genres = [...new Set(EVENTS.map((e) => e.genre))].sort();

    genres.forEach((genre) => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = "genre";
        input.value = genre;
        label.append(input, ` ${genre}`);
        genreBox.append(label);
    });

    /* ---------- validation helpers ---------- */

    function showError(inputEl, errorEl, message) {
        errorEl.textContent = message;
        inputEl.classList.add("invalid");
    }

    function clearError(inputEl, errorEl) {
        errorEl.textContent = "";
        inputEl.classList.remove("invalid");
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    }

    function selectedGenres() {
        return [...genreBox.querySelectorAll("input:checked")].map((cb) => cb.value);
    }

    /* ---------- live error clearing as the user types ---------- */
    [nameInput, emailInput].forEach((input) => {
        input.addEventListener("input", () => {
            const err = document.querySelector(`#error-${input.name}`);
            clearError(input, err);
        });
    });
    genreBox.addEventListener("change", () => {
        document.querySelector("#error-genres").textContent = "";
    });

    /* ---------- submit handler ---------- */
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // never reload the page
        successMsg.classList.remove("show");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const genres = selectedGenres();

        let valid = true;

        // Name: at least 2 characters
        if (name.length < 2) {
            showError(nameInput, document.querySelector("#error-name"), "Please enter your name (at least 2 characters).");
            valid = false;
        } else {
            clearError(nameInput, document.querySelector("#error-name"));
        }

        // Email: basic format check
        if (!isValidEmail(email)) {
            showError(emailInput, document.querySelector("#error-email"), "Please enter a valid email address.");
            valid = false;
        } else {
            clearError(emailInput, document.querySelector("#error-email"));
        }

        // Genres: at least one checkbox ticked
        if (genres.length === 0) {
            document.querySelector("#error-genres").textContent = "Pick at least one genre so we know what to alert you about.";
            valid = false;
        } else {
            document.querySelector("#error-genres").textContent = "";
        }

        // Stop here if anything failed
        if (!valid) return;

        /* ----- success: template-literal confirmation + save ----- */
        successMsg.innerHTML = `Thanks, <strong>${name}</strong>! Alerts for <strong>${genres.join(", ")}</strong> will go to <strong>${email}</strong>.`;
        successMsg.classList.add("show");

        savePreferences({ name, email, genres });

        form.reset();
        successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    /* ---------- localStorage save (parse wrapped in try/catch) ---------- */
    function savePreferences(entry) {
        let list = [];
        try {
            const raw = localStorage.getItem("accraLivePrefs");
            list = raw ? JSON.parse(raw) : []; // JSON.parse in try/catch per spec
        } catch (err) {
            console.warn("Stored preferences were corrupted; starting fresh.", err);
            list = [];
        }

        // Keep the newest signup for this email only
        list = list.filter((p) => p.email !== entry.email);
        list.push(entry);

        try {
            localStorage.setItem("accraLivePrefs", JSON.stringify(list));
        } catch (err) {
            console.warn("Could not save preferences:", err);
        }
    }
})();