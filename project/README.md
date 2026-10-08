# Accra Groove Guide

A responsive three-page website for discovering fictional sample live music
events in Accra, Ghana. The site uses only HTML, CSS, and vanilla JavaScript,
with relative paths so it can be hosted on GitHub Pages.

## Pages

- `index.html` — Hero section, three upcoming events, and a validated event
  alert form.
- `events.html` — Combined genre and venue event-controls, result count, and an empty
  state.
- `venues.html` — Responsive cards for Accra venues with address, capacity,
  description, and featured genres.
- `references.html` — Content reference page linked in the site footer.

## Features

- Mobile-first responsive layout
- Shared navigation with the current page highlighted
- Accessible labels, semantic sections, focus styles, and status messages
- JavaScript form validation with inline errors
- Template literals for generated cards and messages
- `filter`, `map`, `sort`, and `includes` array methods
- Conditional rendering and personalized event ordering
- `localStorage` preferences with safe `JSON.parse` error handling
- Relative asset paths for GitHub Pages

## File Structure

```text
accra-groove-guide/
├── index.html
├── events.html
├── venues.html
├── references.html
├── README.md
├── css/
│   └── styles.css
├── images/
│   └── events/   (event posters, see README.txt inside)
└── js/
    ├── data.js
    ├── events.js
    └── alerts.js