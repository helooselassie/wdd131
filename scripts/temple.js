// ---------- Temple Data ----------
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
    },
    // ---- Added by student ----
    {
        templeName: "St. George Utah",
        location: "St. George, Utah, United States",
        dedicated: "1877, April, 6",
        area: 78582,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/st.-george-utah-temple/st.-george-utah-temple-40435-main.jpg",
    },
    {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 53997,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-26340-main.jpg",
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg",
    },
];

// ---------- Rendering ----------
const gallery = document.getElementById("templeGallery");

function formatArea(area) {
    return area.toLocaleString("en-US") + " sq ft";
}

function createTempleCard(temple) {
    const card = document.createElement("article");
    card.className = "temple-card";

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";
    img.width = 400;
    img.height = 250;

    const body = document.createElement("div");
    body.className = "temple-card-body";
    body.innerHTML = `
    <h3>${temple.templeName}</h3>
    <p><span class="label">Location:</span> ${temple.location}</p>
    <p><span class="label">Dedicated:</span> ${temple.dedicated}</p>
    <p><span class="label">Area:</span> ${formatArea(temple.area)}</p>
  `;

    card.appendChild(img);
    card.appendChild(body);
    return card;
}

function renderTemples(list) {
    gallery.innerHTML = "";
    const fragment = document.createDocumentFragment();
    list.forEach((temple) => fragment.appendChild(createTempleCard(temple)));
    gallery.appendChild(fragment);
}

// ---------- Filtering ----------
function getDedicatedYear(temple) {
    return parseInt(temple.dedicated.split(",")[0], 10);
}

function filterTemples(filter) {
    switch (filter) {
        case "old":
            return temples.filter((t) => getDedicatedYear(t) < 1900);
        case "new":
            return temples.filter((t) => getDedicatedYear(t) > 2000);
        case "large":
            return temples.filter((t) => t.area > 90000);
        case "small":
            return temples.filter((t) => t.area < 10000);
        case "home":
        default:
            return temples;
    }
}

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        renderTemples(filterTemples(button.dataset.filter));

        // Collapse mobile nav after a selection
        const nav = document.getElementById("mainNav");
        if (nav.classList.contains("open")) {
            nav.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
});

// ---------- Mobile Nav Toggle ----------
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

// ---------- Footer Info ----------
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ---------- Initial Render ----------
renderTemples(temples);