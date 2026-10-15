// Sample data for Accra Groove Guide (sample content, verify before real use).

// Genres used by filters and the alert form
const GENRES = ["Highlife", "Afrobeats", "Jazz", "Gospel", "Reggae", "Hip-Hop"];

// Venues in Accra (some details are illustrative)
const venues = [
    {
        id: 1,
        name: "National Theatre of Ghana",
        address: "Liberia Road, Cantonments, Accra",
        capacity: 1500,
        description: "The iconic sail-shaped theatre hosts big concerts, orchestral nights and gospel celebrations.",
        genres: ["Highlife", "Gospel", "Jazz"]
    },
    {
        id: 2,
        name: "Alliance Française Accra",
        address: "Ridge, Accra",
        capacity: 350,
        description: "An intimate cultural center with a garden stage, loved for acoustic and jazz evenings.",
        genres: ["Jazz", "Highlife"]
    },
    {
        id: 3,
        name: "Republic Bar & Grill",
        address: "Oxford Street, Osu, Accra",
        capacity: 400,
        description: "A lively Osu spot with live bands most weekends and a dancing crowd that stays late.",
        genres: ["Afrobeats", "Reggae", "Hip-Hop"]
    },
    {
        id: 4,
        name: "Labadi Beach Hotel",
        address: "La Road, Labadi, Accra",
        capacity: 800,
        description: "Beachfront shows with the Atlantic as your backdrop, perfect for reggae and festival days.",
        genres: ["Reggae", "Afrobeats", "Highlife"]
    },
    {
        id: 5,
        name: "Black Star Square",
        address: "Independence Avenue, Accra",
        capacity: 30000,
        description: "Accra's grand open-air square, home to the biggest festivals and national celebrations.",
        genres: ["Afrobeats", "Gospel", "Hip-Hop"]
    },
    {
        id: 6,
        name: "The Gramophone Lounge",
        address: "East Legon, Accra",
        capacity: 250,
        description: "A cozy lounge with vinyl-lined walls, late-night sets and open-mic nights for new talent.",
        genres: ["Jazz", "Hip-Hop", "Afrobeats"]
    }
];

// Events (dates are ISO format: YYYY-MM-DD; time is 24-hour HH:MM; price in GH₵, 0 = free)
const events = [
    {
        id: 1,
        name: "Highlife Heritage Night",
        date: "2026-11-06",
        time: "19:00",
        venue: "National Theatre of Ghana",
        genre: "Highlife",
        price: 120,
        description: "A live band revisits golden-era highlife classics with horns, guitars and a full dance floor."
    },
    {
        id: 2,
        name: "Afrobeats Block Party",
        date: "2026-11-08",
        time: "20:00",
        venue: "Republic Bar & Grill",
        genre: "Afrobeats",
        price: 80,
        description: "Resident DJs and a live drummer keep the energy high with the hottest Afrobeats sounds."
    },
    {
        id: 3,
        name: "Sunday Jazz in the Garden",
        date: "2026-11-15",
        time: "17:00",
        venue: "Alliance Française Accra",
        genre: "Jazz",
        price: 100,
        description: "A relaxed outdoor session of smooth jazz quartets and Ghanaian jazz fusion."
    },
    {
        id: 4,
        name: "Praise & Worship Live",
        date: "2026-11-22",
        time: "16:00",
        venue: "National Theatre of Ghana",
        genre: "Gospel",
        price: 0,
        description: "A free evening of choirs, gospel soloists and congregational singing open to everyone."
    },
    {
        id: 5,
        name: "Reggae by the Sea",
        date: "2026-11-28",
        time: "18:30",
        venue: "Labadi Beach Hotel",
        genre: "Reggae",
        price: 150,
        description: "Roots and dancehall on the beachfront, with sunset sets and island-style food stalls."
    },
    {
        id: 6,
        name: "Cypher Sessions Vol. 7",
        date: "2026-12-03",
        time: "20:00",
        venue: "The Gramophone Lounge",
        genre: "Hip-Hop",
        price: 50,
        description: "Rappers from across Accra trade bars over live beats, plus an open cypher for newcomers."
    },
    {
        id: 7,
        name: "Accra Highlife Jam",
        date: "2026-12-06",
        time: "19:30",
        venue: "Labadi Beach Hotel",
        genre: "Highlife",
        price: 130,
        description: "Veteran and young highlife bands share the stage for a night of guitar-led grooves."
    },
    {
        id: 8,
        name: "Afrobeats Festival of Lights",
        date: "2026-12-12",
        time: "15:00",
        venue: "Black Star Square",
        genre: "Afrobeats",
        price: 250,
        description: "A full-day open-air festival with top Afrobeats acts, food vendors and a light show finale."
    },
    {
        id: 9,
        name: "Midnight Jazz & Poetry",
        date: "2026-12-18",
        time: "21:00",
        venue: "The Gramophone Lounge",
        genre: "Jazz",
        price: 90,
        description: "Spoken word meets live saxophone and piano in an intimate late-night lounge setting."
    },
    {
        id: 10,
        name: "Christmas Gospel Concert",
        date: "2026-12-20",
        time: "17:00",
        venue: "Black Star Square",
        genre: "Gospel",
        price: 0,
        description: "Massed choirs and gospel stars celebrate the season in a free community concert."
    },
    {
        id: 11,
        name: "Reggae Roots Reunion",
        date: "2027-01-09",
        time: "19:00",
        venue: "Republic Bar & Grill",
        genre: "Reggae",
        price: 70,
        description: "A band tribute to one-love reggae anthems with special guest vocalists."
    },
    {
        id: 12,
        name: "Hip-Hop Homecoming",
        date: "2027-01-16",
        time: "20:00",
        venue: "Republic Bar & Grill",
        genre: "Hip-Hop",
        price: 100,
        description: "Accra hip-hop artists return for a homecoming showcase with DJ battles and live sets."
    }
];