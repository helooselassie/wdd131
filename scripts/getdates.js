// getdates.js - Dynamic Date Functions for WDD 131

// Populate the current year in the footer
const currentYearElement = document.getElementById('currentyear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Populate the last modified date in the footer
const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) {
    lastModifiedElement.innerHTML = `Last Modification: ${document.lastModified}`;
}