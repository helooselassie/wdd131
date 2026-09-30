# Accra Live — Local Music Event Calendar

A single-page-free, framework-free website that consolidates live music events
in Accra, Ghana. Built with **HTML, CSS, and vanilla JavaScript only** — no
frameworks, no build step, no backend — and designed to run on GitHub Pages
using relative paths.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Hero, "Next Up" (3 soonest events), and the "Get Event Alerts" form |
| `events.html` | All events with combined Genre + Venue dropdown filters and a "No events match" message |
| `venues.html` | Venue cards (name, address, capacity, description, genres) |

## Data

- `js/data.js` holds 12 sample events and 7 venues with realistic Accra content
  (Highlife, Afrobeats, Jazz, Gospel, Reggae, Hip-Hop).
- Each event: `{ id, name, date, time, venue, genre, price, description }`.

## Alert form

- Fields: name, email, preferred genres (checkboxes generated from the data).
- JavaScript validation: name ≥ 2 chars, valid email format, ≥ 1 genre —
  errors shown inline, cleared as the user types.
- On success the page does **not** reload; a template-literal confirmation is
  shown and `{ name, email, genres }` is saved to `localStorage`
  (`JSON.parse` wrapped in `try/catch`).

## Personalization

On load, `js/events.js` reads saved preferences and, on the home page:
greets the returning visitor, lists genre-matching events first with a
"★ Picked for you" badge, and offers a "Clear preferences" button.

## JavaScript techniques demonstrated

- Array methods: `filter`, `map`, `sort`, `includes` (plus `slice`, `join`, `new Set`)
- Conditionals: `if/else` statements and ternaries
- DOM: `querySelector`, `createElement`, `addEventListener`, `append`, `innerHTML`
- Template literals for every card and message
- Small, commented, immediately-invoked functions per page feature

## Design

- Mobile-first, responsive (1 → 2 → 3 column grids)
- Shared sticky nav (hamburger on mobile) and footer; current page highlighted with `aria-current="page"`
- Semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`),
  labelled inputs, `role="alert"` / `aria-live` for validation feedback
- `viewport` meta tag for mobile rendering

## Run locally

Because everything uses relative paths, simply open `index.html` in a browser,
or serve the folder with any static server (e.g. `npx serve`). To publish,
push the folder to a GitHub repository and enable Pages on the default branch.