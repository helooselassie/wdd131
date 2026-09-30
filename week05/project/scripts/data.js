/* =========================================================
   data.js — sample data for the Accra Live calendar.
   Loaded before the other scripts on every page.
   ========================================================= */

const EVENTS = [
    {
        id: 1,
        name: "Highlife Night: The Maestros Live",
        date: "2026-10-03",
        time: "20:00",
        venue: "+233 Jazz Bar & Grill",
        genre: "Highlife",
        price: 150,
        description: "A full-band tribute to E.T. Mensah and the kings of classic Ghanaian highlife."
    },
    {
        id: 2,
        name: "Afrobeats Block Party",
        date: "2026-10-10",
        time: "18:00",
        venue: "Independence Square",
        genre: "Afrobeats",
        price: 100,
        description: "Open-air DJ sets and live performances with the city's biggest Afrobeats selectors."
    },
    {
        id: 3,
        name: "Accra Jazz Festival: Evening Set",
        date: "2026-10-17",
        time: "19:30",
        venue: "Alliance Française Accra",
        genre: "Jazz",
        price: 200,
        description: "An intimate evening of contemporary Ghanaian jazz featuring horn-led ensembles."
    },
    {
        id: 4,
        name: "Gospel Explosion: Worship Night",
        date: "2026-10-24",
        time: "17:00",
        venue: "Perez Dome",
        genre: "Gospel",
        price: 80,
        description: "A mass-choir worship night with guest ministers from across the capital."
    },
    {
        id: 5,
        name: "Reggae on the Beach",
        date: "2026-10-31",
        time: "16:00",
        venue: "Labadi Beach Hotel",
        genre: "Reggae",
        price: 120,
        description: "Roots reggae all afternoon and into the night, right on the sand at Labadi."
    },
    {
        id: 6,
        name: "Tema Youth Cypher: Hip-Hop Showcase",
        date: "2026-11-07",
        time: "19:00",
        venue: "Republic Bar & Grill",
        genre: "Hip-Hop",
        price: 60,
        description: "Sixteen bars each — up-and-coming MCs from Tema and Accra battle for the crown."
    },
    {
        id: 7,
        name: "Highlife Rewind: Vinyl Session",
        date: "2026-11-14",
        time: "20:00",
        venue: "+233 Jazz Bar & Grill",
        genre: "Highlife",
        price: 90,
        description: "Rare vinyl-only highlife selections from legendary Accra label catalogues."
    },
    {
        id: 8,
        name: "Afro-Fusion Rooftop Sessions",
        date: "2026-11-21",
        time: "18:30",
        venue: "Front/Back",
        genre: "Afrobeats",
        price: 140,
        description: "Sunset rooftop sets blending Afrobeats with highlife guitar lines and live percussion."
    },
    {
        id: 9,
        name: "Smooth Jazz & Soul Sunday",
        date: "2026-11-29",
        time: "16:00",
        venue: "Alliance Française Accra",
        genre: "Jazz",
        price: 170,
        description: "A laid-back Sunday session of jazz standards and Ghanaian soul classics."
    },
    {
        id: 10,
        name: "Kings of Gospel Choir Anniversary",
        date: "2026-12-05",
        time: "17:30",
        venue: "Perez Dome",
        genre: "Gospel",
        price: 100,
        description: "The dome fills with harmony as the choir celebrates 15 years of music ministry."
    },
    {
        id: 11,
        name: "Dancehall & Reggae Jam",
        date: "2026-12-12",
        time: "21:00",
        venue: "Labadi Beach Hotel",
        genre: "Reggae",
        price: 110,
        description: "Dancehall sound systems take over the beach deck for a late-night reggae jam."
    },
    {
        id: 12,
        name: "Accra Hip-Hop Summit: Cypher Finals",
        date: "2026-12-19",
        time: "19:00",
        venue: "Untamed Empire",
        genre: "Hip-Hop",
        price: 90,
        description: "The citywide cypher series concludes with the finals and a surprise headliner."
    }
];

const VENUES = [
    {
        name: "+233 Jazz Bar & Grill",
        address: "Ring Road East, Accra",
        capacity: 300,
        description: "Accra's home of live jazz and highlife since 2004. Intimate room, serious sound, cold Star.",
        genres: ["Jazz", "Highlife"]
    },
    {
        name: "Republic Bar & Grill",
        address: "Asafoatse Tempong St, Osu, Accra",
        capacity: 250,
        description: "Osu's legendary spot for local brews, grilled tilapia and gritty late-night hip-hop cyphers.",
        genres: ["Hip-Hop", "Highlife"]
    },
    {
        name: "Alliance Française Accra",
        address: "Liberation Link, Airport Residential Area, Accra",
        capacity: 500,
        description: "Cultural centre with a lush garden amphitheatre hosting the city's most polished jazz programming.",
        genres: ["Jazz", "Afrobeats"]
    },
    {
        name: "Labadi Beach Hotel",
        address: "Labadi Beach Road, Accra",
        capacity: 1000,
        description: "Beachfront resort whose sand-stage hosts everything from roots reggae festivals to Sunday concerts.",
        genres: ["Reggae", "Afrobeats"]
    },
    {
        name: "Perez Dome",
        address: "Dzorwulu, Accra",
        capacity: 4000,
        description: "One of West Africa's largest auditoriums — the go-to hall for mass gospel concerts and choir nights.",
        genres: ["Gospel"]
    },
    {
        name: "Front/Back",
        address: "4th Lane, Osu, Accra",
        capacity: 400,
        description: "A creative-community clubhouse with a rooftop that has become the heart of Accra's alt and Afrobeats scene.",
        genres: ["Afrobeats", "Hip-Hop"]
    },
    {
        name: "Untamed Empire",
        address: "Spintex Road, Accra",
        capacity: 800,
        description: "An arts-and-events complex in a converted warehouse, built for big-energy hip-hop and street-culture shows.",
        genres: ["Hip-Hop", "Reggae"]
    }
];