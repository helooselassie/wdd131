# Accra Groove Guide

A Local Music Event Calendar for live music in Accra, Ghana. Built with plain HTML, CSS and vanilla JavaScript: no frameworks, no backend, no templates.

## Pages

- `index.html`: hero, "Next Up" (3 events) and the "Get Event Alerts" form
- `events.html`: all events with combined Genre and Venue filters and a "No events match" message
- `venues.html`: venue cards with image, address, capacity, description and genres
- `references.html`: image, font and content credits (linked in every footer)

## Project structure

    index.html
    events.html
    venues.html
    references.html
    css/styles.css
    js/data.js      (events, venues and genres arrays)
    js/events.js    (helpers, sorting/filtering, card templates, page rendering)
    js/alerts.js    (form validation, localStorage, greeting, clear preferences)
    images/         (six small original SVG illustrations, one per genre)
    README.md

Place this folder as the `project` folder in your `wdd131` repository, next to `siteplan.html`.

## Run locally

Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8000

Then visit http://localhost:8000.

## Deploy to GitHub Pages

1. Put the files in the `project` folder of your `wdd131` repo.
2. Commit and push.
3. In the repo, go to Settings > Pages and publish from the main branch.
4. Submit `https://<username>.github.io/wdd131/project/index.html` in Canvas.

All links and assets use relative paths, so it works inside a repo subfolder.

## How it works

- **Data:** edit `js/data.js` to add events or venues. Dates use `YYYY-MM-DD`, times use 24-hour `HH:MM`, and `price: 0` shows as "Free". An event's `venue` must exactly match a venue `name` for the venue filter to work.
- **Next Up:** shows the first 3 upcoming events (date today or later). If fewer than 3 remain, it falls back to all events, so refresh the sample dates from time to time.
- **Alerts form:** validates in JavaScript (name 2+ characters, valid email, 1+ genre) with inline errors, then saves `{ name, email, genres }` to localStorage under `accraGrooveAlerts`.
- **Personalization:** on load, saved genres move matching events to the top with a "Picked for you" badge, a greeting appears, and "Clear preferences" resets everything. Corrupted saved data is ignored with try/catch.
- **Images:** small SVG files with explicit width and height, `loading="lazy"` and `decoding="async"`.
- **Accessibility:** semantic landmarks, a skip link, labeled inputs, fieldset/legend for the checkboxes, `aria-live` regions for errors and results, `aria-current="page"` on the active nav link, and alt text on every image.

## W06 requirement checklist

- 3+ pages with shared navigation and theme: index, events, venues (plus references)
- Responsive, mobile-first CSS with tablet and desktop breakpoints
- Optimized images with lazy loading
- HTML form with labels, names, required fields and JavaScript validation
- JavaScript: multiple functions, DOM selection/modification/events, conditionals, objects and arrays with `filter`, `map`, `sort`, `includes`, template literals for output strings, localStorage
- References page linked in the footer