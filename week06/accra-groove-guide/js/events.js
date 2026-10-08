// Convert a date string into a readable event date.
function formatDate(dateString) {
    const date = new Date(`${dateString}T12:00:00`);
    const options = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    };

    return date.toLocaleDateString("en-GH", options);
}

// Sort events chronologically without changing the original array.
function getSortedEvents(eventList) {
    return [...eventList].sort((first, second) => {
        const firstDate = new Date(`${first.date}T12:00:00`);
        const secondDate = new Date(`${second.date}T12:00:00`);

        return firstDate - secondDate;
    });
}

// Create the reusable markup for an event card (image slot + details).
function createEventCard(event, preferences = null) {
    const isPicked = preferences
        ? preferences.genres.includes(event.genre)
        : false;

    const badge = isPicked ? `<span class="pick-badge">Picked for you</span>` : "";
    const chipDate = new Date(`${event.date}T12:00:00`).toLocaleDateString("en-GH", {
        month: "short",
        day: "numeric"
    });
    const image = event.image
        ? `<img src="${event.image}" alt="${event.name} poster" loading="lazy">`
        : "";

    return `
    <article class="event-card">
      <div class="event-media" data-initial="${event.genre.charAt(0)}">
        ${image}
        <span class="date-chip">${chipDate}</span>
      </div>
      <div class="event-body">
        <div class="badge-row">
          <span class="pill">${event.genre}</span>
          ${badge}
        </div>
        <h3>${event.name}</h3>
        <p class="event-venue">${event.venue}</p>
        <p class="event-desc">${event.description}</p>
        <div class="event-footer">
          <span>${formatDate(event.date)} · ${event.time}</span>
          <span class="price">${event.price}</span>
        </div>
        <button class="button button-ghost card-button" type="button"
          data-event-id="${event.id}" aria-label="View details for ${event.name}">View details</button>
      </div>
    </article>
  `;
}

// Put events matching saved genres before every other event.
function orderEventsByPreference(eventList, preferences) {
    if (!preferences || preferences.genres.length === 0) {
        return eventList;
    }

    const picked = eventList.filter((event) =>
        preferences.genres.includes(event.genre)
    );
    const others = eventList.filter((event) =>
        !preferences.genres.includes(event.genre)
    );

    return [...picked, ...others];
}

// Render the three soonest events on the home page.
function renderNextUp(preferences) {
    const grid = document.querySelector("#next-up-grid");

    if (!grid) {
        return;
    }

    const upcomingEvents = getSortedEvents(events).slice(0, 3);
    const personalizedEvents = orderEventsByPreference(upcomingEvents, preferences);

    grid.innerHTML = personalizedEvents
        .map((event) => createEventCard(event, preferences))
        .join("");
}

// Fill both filter selects with unique values from the data.
function populateFilters() {
    const genreFilter = document.querySelector("#genre-filter");
    const venueFilter = document.querySelector("#venue-filter");

    if (!genreFilter || !venueFilter) {
        return;
    }

    const genres = [...new Set(events.map((event) => event.genre))].sort();
    const venueNames = [...new Set(events.map((event) => event.venue))].sort();

    genres.forEach((genre) => {
        genreFilter.insertAdjacentHTML(
            "beforeend",
            `<option value="${genre}">${genre}</option>`
        );
    });

    venueNames.forEach((venue) => {
        venueFilter.insertAdjacentHTML(
            "beforeend",
            `<option value="${venue}">${venue}</option>`
        );
    });
}

// Apply the selected genre and venue filters together.
function getFilteredEvents(genreValue, venueValue) {
    return getSortedEvents(events).filter((event) => {
        const matchesGenre = genreValue === "All" || event.genre === genreValue;
        const matchesVenue = venueValue === "All" || event.venue === venueValue;

        return matchesGenre && matchesVenue;
    });
}

// Render the filtered event grid and empty state.
function renderFilteredEvents(preferences) {
    const grid = document.querySelector("#events-grid");
    const emptyState = document.querySelector("#empty-state");
    const resultsCount = document.querySelector("#results-count");

    if (!grid || !emptyState || !resultsCount) {
        return;
    }

    const selectedGenre = document.querySelector("#genre-filter")?.value || "All";
    const selectedVenue = document.querySelector("#venue-filter")?.value || "All";
    const filteredEvents = getFilteredEvents(selectedGenre, selectedVenue);
    const personalizedEvents = orderEventsByPreference(filteredEvents, preferences);

    grid.innerHTML = personalizedEvents
        .map((event) => createEventCard(event, preferences))
        .join("");

    emptyState.hidden = filteredEvents.length > 0;
    grid.hidden = filteredEvents.length === 0;

    resultsCount.textContent = filteredEvents.length === 1
        ? "Showing 1 event."
        : `Showing ${filteredEvents.length} events.`;
}

// Create the card markup for one venue.
function createVenueCard(venue) {
    const genrePills = venue.genres
        .map((genre) => `<span class="pill">${genre}</span>`)
        .join("");

    return `
    <article class="venue-card">
      <div class="venue-art" aria-hidden="true">${venue.name.charAt(0)}</div>
      <div class="venue-body">
        <h3>${venue.name}</h3>
        <div class="venue-detail">
          <p><strong>Address:</strong> ${venue.address}</p>
          <p><strong>Capacity:</strong> ${venue.capacity.toLocaleString("en-GH")} guests</p>
        </div>
        <p>${venue.description}</p>
        <div class="genre-list" aria-label="Featured genres">
          ${genrePills}
        </div>
      </div>
    </article>
  `;
}

// Render all venue cards alphabetically.
function renderVenues() {
    const grid = document.querySelector("#venue-grid");

    if (!grid) {
        return;
    }

    const alphabetizedVenues = [...venues].sort((first, second) =>
        first.name.localeCompare(second.name)
    );

    grid.innerHTML = alphabetizedVenues
        .map((venue) => createVenueCard(venue))
        .join("");
}

// Add the mobile navigation behavior shared by every page.
function setupMobileNavigation() {
    const toggle = document.querySelector(".menu-toggle");
    const links = document.querySelector("#nav-links");

    if (!toggle || !links) {
        return;
    }

    toggle.addEventListener("click", () => {
        const isOpen = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            links.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        }
    });
}

// Render page-specific content after the shared scripts load.
function renderEventPage(preferences) {
    populateFilters();

    const requestedGenre = new URLSearchParams(window.location.search).get("genre");
    const genreSelect = document.querySelector("#genre-filter");

    if (genreSelect && requestedGenre) {
        genreSelect.value = requestedGenre;
    }

    renderFilteredEvents(preferences);

    const filterForm = document.querySelector("#event-filters");

    filterForm?.addEventListener("change", () => {
        renderFilteredEvents(readPreferences());
    });

    filterForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        renderFilteredEvents(readPreferences());
    });
}

// Scroll the genre carousel with the arrow buttons.
function setupGenreCarousel() {
    const track = document.querySelector("#genre-track");

    if (!track) {
        return;
    }

    document.querySelector("#genre-prev")?.addEventListener("click", () => {
        track.scrollBy({ left: -track.clientWidth * 0.8, behavior: "smooth" });
    });
    document.querySelector("#genre-next")?.addEventListener("click", () => {
        track.scrollBy({ left: track.clientWidth * 0.8, behavior: "smooth" });
    });

    document.querySelectorAll("[data-genre-count]").forEach((label) => {
        const total = events.filter((event) => event.genre === label.dataset.genreCount).length;
        label.textContent = total === 1 ? "1 event" : `${total} events`;
    });
}

function initializeEventScripts() {
    const preferences = readPreferences();

    setupMobileNavigation();
    renderNextUp(preferences);
    renderEventPage(preferences);
    renderVenues();
    setupGenreCarousel();
    setupEventDialog();
    showPersonalization(preferences);
}

// Build the full-detail markup for one event, including venue info.
function createEventDetails(event) {
    const venue = venues.find((item) => item.name === event.venue);
    const image = event.image
        ? `<img src="${event.image}" alt="${event.name} poster">`
        : "";
    const venueRows = venue
        ? `<dt>Address</dt><dd>${venue.address}</dd>
           <dt>Capacity</dt><dd>${venue.capacity.toLocaleString("en-GH")} guests</dd>`
        : "";

    return `
    <div class="event-media dialog-media" data-initial="${event.genre.charAt(0)}">${image}</div>
    <div class="dialog-body">
      <span class="pill">${event.genre}</span>
      <h2 id="event-dialog-title">${event.name}</h2>
      <p>${event.description}</p>
      <dl class="detail-list">
        <dt>Date</dt><dd>${formatDate(event.date)}</dd>
        <dt>Time</dt><dd>${event.time}</dd>
        <dt>Venue</dt><dd>${event.venue}</dd>
        ${venueRows}
        <dt>Ticket</dt><dd>${event.price}</dd>
      </dl>
    </div>
  `;
}

// Create one shared dialog and open it when a "View details" button is clicked.
function setupEventDialog() {
    const dialog = document.createElement("dialog");

    dialog.className = "event-dialog";
    dialog.setAttribute("aria-labelledby", "event-dialog-title");
    dialog.innerHTML = `
    <div id="event-dialog-content"></div>
    <form method="dialog" class="dialog-actions">
      <button class="button button-primary" type="submit">Close</button>
    </form>
  `;
    document.body.append(dialog);

    document.addEventListener("click", (clickEvent) => {
        const trigger = clickEvent.target.closest("[data-event-id]");

        if (trigger) {
            const selected = events.find((item) => item.id === Number(trigger.dataset.eventId));

            if (selected) {
                dialog.querySelector("#event-dialog-content").innerHTML = createEventDetails(selected);
                dialog.showModal();
            }
        } else if (clickEvent.target === dialog) {
            dialog.close();
        }
    });
}

// Wait until all scripts have loaded before calling functions from alerts.js.
window.addEventListener("DOMContentLoaded", initializeEventScripts);

// Remove broken event posters so the gradient placeholder shows instead.
// (Image errors don't bubble, so listen in the capture phase; no inline handlers needed.)
document.addEventListener(
    "error",
    (event) => {
        const target = event.target;

        if (target instanceof HTMLImageElement && target.closest(".event-media, .dialog-media")) {
            target.remove();
        }
    },
    true
);
