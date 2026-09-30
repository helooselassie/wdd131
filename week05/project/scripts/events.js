/* =========================================================
   events.js — rendering, filtering, and personalization.
   Every page loads this file; each block guards for the
   elements it needs, so nothing errors on the wrong page.
   ========================================================= */

const $ = (selector) => document.querySelector(selector);

/* ---------- small helpers ---------- */

// Turn "2026-10-03" into a friendly date like "Sat, 3 Oct 2026"
function formatDate(isoDate) {
    const d = new Date(isoDate + "T00:00:00");
    return d.toLocaleDateString("en-GH", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

// Sort events chronologically (soonest first)
function sortByDate(list) {
    return [...list].sort((a, b) => a.date.localeCompare(b.date));
}

// Safely read saved alert preferences from localStorage
function getPreferences() {
    try {
        const raw = localStorage.getItem("accraLivePrefs");
        return raw ? JSON.parse(raw) : null; // JSON.parse wrapped in try/catch per spec
    } catch (err) {
        console.warn("Could not parse saved preferences:", err);
        return null;
    }
}

/* ---------- card template (template literal) ---------- */

function eventCardHTML(event, picked = false) {
    return `
    <article class="event-card" data-id="${event.id}">
      <div class="card-top">
        <span class="badge badge-genre">${event.genre}</span>
        ${picked ? `<span class="badge badge-picked">★ Picked for you</span>` : ""}
      </div>
      <p class="event-date">${formatDate(event.date)} · ${event.time}</p>
      <h3>${event.name}</h3>
      <p class="event-meta">📍 ${event.venue}</p>
      <p class="event-desc">${event.description}</p>
      <p class="event-price">GHS ${event.price}</p>
    </article>
  `;
}

// Render an array of events into a container element
function renderEvents(container, events, pickedGenres = []) {
    container.innerHTML = events
        .map((e) => eventCardHTML(e, pickedGenres.includes(e.genre)))
        .join("");
}

/* =========================================================
   Mobile nav toggle (shared across all pages)
   ========================================================= */
(function initNav() {
    const toggle = $("#nav-toggle");
    const links = $("#nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
        const isOpen = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });
})();

/* =========================================================
   index.html — "Next Up" (3 soonest events)
   ========================================================= */
(function initNextUp() {
    const grid = $("#next-up");
    if (!grid) return;

    const nextThree = sortByDate(EVENTS).slice(0, 3);
    renderEvents(grid, nextThree);
})();

/* =========================================================
   Personalization (index.html — greeting, picked-first list)
   ========================================================= */
(function initPersonalization() {
    const section = $("#personalized");
    if (!section) return;

    const grid = $("#picked-grid");
    const greeting = $("#greeting");
    const clearBtn = $("#clear-prefs");
    const prefs = getPreferences();

    // No saved preferences? Stay hidden and let the normal "Next Up" list shine.
    if (!prefs || !prefs.genres || prefs.genres.length === 0) return;

    section.hidden = false;
    greeting.textContent = `Welcome back, ${prefs.name}! 👋`;

    // Partition: picked genres first, everything else after — both sorted by date
    const picked = sortByDate(EVENTS.filter((e) => prefs.genres.includes(e.genre)));
    const rest = sortByDate(EVENTS.filter((e) => !prefs.genres.includes(e.genre)));
    renderEvents(grid, [...picked, ...rest], prefs.genres);

    // Clear preferences and reload to the clean state
    clearBtn.addEventListener("click", () => {
        localStorage.removeItem("accraLivePrefs");
        location.reload();
    });
})();

/* =========================================================
   events.html — combined genre + venue filters
   ========================================================= */
(function initEventFilters() {
    const list = $("#events-list");
    if (!list) return;

    const genreSelect = $("#filter-genre");
    const venueSelect = $("#filter-venue");
    const resetBtn = $("#filter-reset");
    const noMatch = $("#no-match");
    const countLabel = $("#result-count");

    // Populate dropdowns with the unique values found in the data
    const genres = [...new Set(EVENTS.map((e) => e.genre))].sort();
    const venues = [...new Set(EVENTS.map((e) => e.venue))].sort();

    genres.forEach((g) => genreSelect.append(new Option(g, g)));
    venues.forEach((v) => venueSelect.append(new Option(v, v)));

    // Combined filter: an event must match BOTH dropdowns ("all" passes everything)
    function applyFilters() {
        const genre = genreSelect.value;
        const venue = venueSelect.value;

        const matches = EVENTS.filter((e) => {
            const genreOK = genre === "all" || e.genre === genre;
            const venueOK = venue === "all" || e.venue === venue;
            return genreOK && venueOK;
        });

        const sorted = sortByDate(matches);

        if (sorted.length > 0) {
            renderEvents(list, sorted);
            noMatch.hidden = true;
        } else {
            list.innerHTML = "";
            noMatch.hidden = false; // show the "No events match" message
        }

        countLabel.textContent = sorted.length === 1
            ? "Showing 1 event."
            : `Showing ${sorted.length} of ${EVENTS.length} events.`;
    }

    genreSelect.addEventListener("change", applyFilters);
    venueSelect.addEventListener("change", applyFilters);

    resetBtn.addEventListener("click", () => {
        // Let the browser reset the form first, then re-render
        setTimeout(applyFilters, 0);
    });

    const noMatchReset = $("#no-match-reset");
    if (noMatchReset) {
        noMatchReset.addEventListener("click", () => {
            genreSelect.value = "all";
            venueSelect.value = "all";
            applyFilters();
        });
    }

    applyFilters(); // initial render
})();

/* =========================================================
   venues.html — venue cards
   ========================================================= */
(function initVenues() {
    const grid = $("#venue-list");
    if (!grid) return;

    grid.innerHTML = VENUES.map((v) => `
    <article class="venue-card">
      <h2>${v.name}</h2>
      <p class="venue-address">📍 ${v.address}</p>
      <p class="venue-capacity">Capacity: <strong>${v.capacity.toLocaleString()}</strong></p>
      <p class="venue-desc">${v.description}</p>
      <div class="tag-row">
        ${v.genres.map((g) => `<span class="badge badge-genre">${g}</span>`).join("")}
      </div>
    </article>
  `).join("");
})();