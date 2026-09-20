// ---------- Footer ----------
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;

// ---------- Weather ----------
// Static values that match the content displayed in the Weather section.
const temperature = 29; // °C
const windSpeed = 12;   // km/h

// Metric wind chill formula (Environment Canada), one line of code.
function calculateWindChill(t, s) {
    return 13.12 + 0.6215 * t - 11.37 * Math.pow(s, 0.16) + 0.3965 * t * Math.pow(s, 0.16);
}

// Only call the function when the conditions are viable:
// temperature <= 10 °C and wind speed > 4.8 km/h.
const windChillElement = document.querySelector("#windchill");

if (temperature <= 10 && windSpeed > 4.8) {
    windChillElement.textContent = `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`;
} else {
    windChillElement.textContent = "N/A";
}