// events.js: shared helpers plus rendering for Next Up, Events and Venues.

const STORAGE_KEY = `accraGrooveAlerts`;

/* ---------- Small helpers ---------- */

// Escape text before it goes into an HTML template
function escapeHTML(text) {
    return String(text)
        .replace(/&/g, `&amp;`)
        .replace(/</g, `&lt;`)
        .replace(/>/g, `&gt;`)
        .replace(/"/g, `&quot;`);
}

// Read saved preferences; returns null if none or if the data is broken
function getPrefs() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const prefs = JSON.parse(raw);
        const valid = prefs && typeof prefs.name === `string` && Array.isArray(prefs.genres);
        return valid ? prefs : null;
    } catch (error) {
        return null;
    }
}

// Today's date as YYYY-MM-DD (local time) for comparing with event dates
function todayISO() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, `0`);
    const day = String(now.getDate()).padStart(2, `0`);
    return `${now.getFullYear()}-${month}-${day}`;
}

// "2026-11-06" becomes "Fri, 6 Nov 2026"
function formatDate(isoDate) {
    const date = new Date(`${isoDate}T00:00:00`);
    return date.toLocaleDateString(`en-GB`, {
        weekday: `short`, day: `numeric`, month: `short`, year: `numeric`
    });
}

// "19:00" becomes "7:00 PM"
function formatTime(time24) {
    const [hours, minutes] = time24.split(`:`).map(Number);
    const suffix = hours >= 12 ? `PM` : `AM`;
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${hour12}:${String(minutes).padStart(2, `0`)} ${suffix}`;
}

// 0 becomes "Free", 120 becomes "GH₵ 120"
function formatPrice(price) {
    return price === 0 ? `Free` : `GH₵ ${price}`;
}

/* ---------- Sorting and filtering ---------- */

// Does this event match the saved genres?
function isPicked(event, prefs) {
    return Boolean(prefs) && prefs.genres.includes(event.genre);
}

// Sort by date/time, with "picked for you" events first when prefs exist
function sortEvents(list, prefs) {
    return [...list].sort((a, b) => {
        const pickedDiff = Number(isPicked(b, prefs)) - Number(isPicked(a, prefs));
        if (pickedDiff !== 0) return pickedDiff;
        return `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`);
    });
}

// Filter by genre and venue ("All" means no filter for that field)
function filterEvents(list, genre, venue) {
    return list.filter((event) => {
        const genreOk = genre === `All` || event.genre === genre;
        const venueOk = venue === `All` || event.venue === venue;
        return genreOk && venueOk;
    });
}

/* ---------- Card templates ---------- */

// Lazy-loaded genre illustration with explicit size to avoid layout shift
function genreImage(genre, altText) {
    return `<img class="card-img" src="images/${genre.toLowerCase()}.svg" alt="${altText}" width="600" height="300" loading="lazy" decoding="async">`;
}

// Build the HTML for one event card
function eventCard(event, prefs) {
    const picked = isPicked(event, prefs);
    return `
    <article class="card${picked ? ` picked` : ``}">
      ${genreImage(event.genre, `${event.genre} music artwork for ${event.name}`)}
      ${picked ? `<span class="badge">Picked for you</span>` : ``}
      <h3>${event.name}</h3>
      <p class="meta"><time datetime="${event.date}">${formatDate(event.date)}</time> at ${formatTime(event.time)}</p>
      <p class="meta">${event.venue}</p>
      <p><span class="tag">${event.genre}</span> <span class="price">${formatPrice(event.price)}</span></p>
      <p>${event.description}</p>
    </article>`;
}

// Build the HTML for one venue card
function venueCard(venue) {
    const tags = venue.genres.map((genre) => `<li class="tag">${genre}</li>`).join(``);
    return `
    <article class="card">
      ${genreImage(venue.genres[0], `Artwork representing ${venue.genres[0]} music at ${venue.name}`)}
      <h3>${venue.name}</h3>
      <p class="meta">${venue.address}</p>
      <p><strong>Capacity:</strong> ${venue.capacity.toLocaleString(`en-GB`)}</p>
      <p>${venue.description}</p>
      <ul class="tag-list" aria-label="Genres at ${venue.name}">${tags}</ul>
    </article>`;
}

/* ---------- Page renderers ---------- */

// Home page: the next 3 events (upcoming only, falling back to all if few remain)
function renderNextUp() {
    const container = document.querySelector(`#next-up-list`);
    if (!container) return;

    const prefs = getPrefs();
    const upcoming = events.filter((event) => event.date >= todayISO());
    const pool = upcoming.length >= 3 ? upcoming : events;
    const nextThree = sortEvents(pool, prefs).slice(0, 3);

    container.innerHTML = nextThree.map((event) => eventCard(event, prefs)).join(``);
}

// Events page: apply the current filters and show results or the empty message
function renderEventsPage() {
    const container = document.querySelector(`#events-list`);
    if (!container) return;

    const genre = document.querySelector(`#genre-filter`).value;
    const venue = document.querySelector(`#venue-filter`).value;
    const prefs = getPrefs();

    const results = sortEvents(filterEvents(events, genre, venue), prefs);
    const noEvents = document.querySelector(`#no-events`);
    const count = document.querySelector(`#results-count`);

    container.innerHTML = results.map((event) => eventCard(event, prefs)).join(``);
    noEvents.hidden = results.length > 0;
    count.textContent = results.length > 0
        ? `Showing ${results.length} of ${events.length} events`
        : ``;
}

// Venues page: one card per venue
function renderVenues() {
    const container = document.querySelector(`#venues-list`);
    if (!container) return;
    container.innerHTML = venues.map(venueCard).join(``);
}

// Re-render anything event-related (called after prefs change)
function refreshEvents() {
    renderNextUp();
    renderEventsPage();
}

/* ---------- Setup ---------- */

// Fill a <select> with an "All" option plus the given values
function fillSelect(select, label, values) {
    const options = [`All`, ...values].map((value) =>
        `<option value="${value}">${value === `All` ? `All ${label}` : value}</option>`
    );
    select.innerHTML = options.join(``);
}

// Wire up the events page filters
function setupFilters() {
    const genreSelect = document.querySelector(`#genre-filter`);
    const venueSelect = document.querySelector(`#venue-filter`);
    if (!genreSelect || !venueSelect) return;

    fillSelect(genreSelect, `genres`, GENRES);
    fillSelect(venueSelect, `venues`, venues.map((venue) => venue.name));

    genreSelect.addEventListener(`change`, renderEventsPage);
    venueSelect.addEventListener(`change`, renderEventsPage);
}

setupFilters();
refreshEvents();
renderVenues();