const events = [
    {
        id: 1,
        name: "Highlife Heritage Night",
        image: "images/events/highlife-heritage-night.svg",
        date: "2026-10-09",
        time: "7:00 PM",
        venue: "National Theatre of Ghana",
        genre: "Highlife",
        price: "GHS 150",
        description:
            "A polished big-band tribute to the guitar-driven classics that helped define Ghanaian Highlife."
    },
    {
        id: 2,
        name: "Afrobeats After Sunset",
        image: "images/events/afrobeats-after-sunset.svg",
        date: "2026-10-10",
        time: "9:00 PM",
        venue: "Bloom Bar",
        genre: "Afrobeats",
        price: "GHS 100",
        description:
            "An energetic open-air set featuring rising Accra vocalists and percussion-heavy Afrobeats production."
    },
    {
        id: 3,
        name: "Osu Jazz Social",
        image: "images/events/osu-jazz-social.svg",
        date: "2026-10-16",
        time: "8:00 PM",
        venue: "+233 Jazz Bar & Grill",
        genre: "Jazz",
        price: "GHS 120",
        description:
            "A relaxed evening of contemporary jazz, soul standards, and improvised solos in the heart of Osu."
    },
    {
        id: 4,
        name: "Sundown Praise Festival",
        image: "images/events/sundown-praise-festival.svg",
        date: "2026-10-18",
        time: "4:00 PM",
        venue: "Accra International Conference Centre",
        genre: "Gospel",
        price: "GHS 80",
        description:
            "A family-friendly celebration led by acclaimed choirs, worship leaders, and live gospel bands."
    },
    {
        id: 5,
        name: "Roots by the Beach",
        image: "images/events/roots-by-the-beach.svg",
        date: "2026-10-24",
        time: "6:30 PM",
        venue: "Labadi Beach Hotel",
        genre: "Reggae",
        price: "GHS 140",
        description:
            "Ocean breezes and conscious roots reggae meet for a laid-back Saturday show near the shore."
    },
    {
        id: 6,
        name: "Accra Mic Check",
        image: "images/events/accra-mic-check.svg",
        date: "2026-10-30",
        time: "8:30 PM",
        venue: "The Gold Coast Bar & Grill",
        genre: "Hip-Hop",
        price: "GHS 90",
        description:
            "A showcase for sharp lyricists, DJs, and beatmakers shaping Accra's independent Hip-Hop scene."
    },
    {
        id: 7,
        name: "Palm Wine Serenade",
        image: "images/events/palm-wine-serenade.svg",
        date: "2026-11-06",
        time: "7:30 PM",
        venue: "Alliance Française d'Accra",
        genre: "Highlife",
        price: "GHS 70",
        description:
            "Intimate acoustic Highlife inspired by palm-wine music traditions and warm storytelling."
    },
    {
        id: 8,
        name: "Golden Hour Afrobeats",
        image: "images/events/golden-hour-afrobeats.svg",
        date: "2026-11-13",
        time: "6:00 PM",
        venue: "Skybar 25",
        genre: "Afrobeats",
        price: "GHS 110",
        description:
            "Dance-ready Afrobeats and Amapiano-influenced selections beside panoramic rooftop views."
    },
    {
        id: 9,
        name: "Blue Notes & Brass",
        image: "images/events/blue-notes-brass.svg",
        date: "2026-11-20",
        time: "8:00 PM",
        venue: "+233 Jazz Bar & Grill",
        genre: "Jazz",
        price: "GHS 130",
        description:
            "A sophisticated night of brass arrangements, blues rhythms, and modern Ghanaian jazz compositions."
    },
    {
        id: 10,
        name: "Victory Gospel Live",
        image: "images/events/victory-gospel-live.svg",
        date: "2026-11-28",
        time: "5:00 PM",
        venue: "National Theatre of Ghana",
        genre: "Gospel",
        price: "GHS 100",
        description:
            "Uplifting contemporary Gospel performances with mass choir vocals and powerful live instrumentation."
    },
    {
        id: 11,
        name: "Dubplate Culture Night",
        image: "images/events/dubplate-culture-night.svg",
        date: "2026-12-05",
        time: "9:00 PM",
        venue: "The Gold Coast Bar & Grill",
        genre: "Reggae",
        price: "GHS 85",
        description:
            "A sound-system night connecting vintage dancehall energy with Accra's present-day selectors."
    },
    {
        id: 12,
        name: "New School Accra Cypher",
        image: "images/events/new-school-accra-cypher.svg",
        date: "2026-12-12",
        time: "8:00 PM",
        venue: "Bloom Bar",
        genre: "Hip-Hop",
        price: "GHS 95",
        description:
            "Fast flows, friendly competition, and DJ battles featuring some of Accra's newest rap voices."
    }
];

const venues = [
    {
        id: 1,
        name: "National Theatre of Ghana",
        address: "South Liberia Road, Accra",
        capacity: 1_500,
        description:
            "A landmark performing-arts complex known for major concerts, theatre productions, and national celebrations.",
        genres: ["Highlife", "Gospel", "Theatre"]
    },
    {
        id: 2,
        name: "+233 Jazz Bar & Grill",
        address: "21 Soula Lane, North Labone, Accra",
        capacity: 250,
        description:
            "An intimate Osu venue and restaurant dedicated to jazz, soul, and thoughtfully curated live sets.",
        genres: ["Jazz", "Soul", "Blues"]
    },
    {
        id: 3,
        name: "Bloom Bar",
        address: "Osu, Accra",
        capacity: 400,
        description:
            "A stylish open-air nightlife venue popular for DJ-led events, contemporary concerts, and social gatherings.",
        genres: ["Afrobeats", "Hip-Hop", "Dancehall"]
    },
    {
        id: 4,
        name: "Alliance Française d'Accra",
        address: "Liberation Link, Airport Residential Area, Accra",
        capacity: 300,
        description:
            "A cultural center presenting music, film, theatre, exhibitions, and community arts programming.",
        genres: ["Highlife", "Jazz", "World Music"]
    },
    {
        id: 5,
        name: "Labadi Beach Hotel",
        address: "No. 1 La Bypass, Accra",
        capacity: 600,
        description:
            "A beachfront resort hotel hosting live entertainment, cultural performances, and special-event concerts.",
        genres: ["Reggae", "Highlife", "Afrobeats"]
    },
    {
        id: 6,
        name: "Accra International Conference Centre",
        address: "Castle Road, Accra",
        capacity: 2_000,
        description:
            "A large multi-purpose conference and events venue suited to festivals, expos, and major headline performances.",
        genres: ["Gospel", "Afrobeats", "Conferences"]
    },
    {
        id: 7,
        name: "The Gold Coast Bar & Grill",
        address: "Switchback Lane, Cantonments, Accra",
        capacity: 220,
        description:
            "A welcoming restaurant and nightlife venue with regular DJ sets, showcases, and up-close live performances.",
        genres: ["Hip-Hop", "Reggae", "R&B"]
    },
    {
        id: 8,
        name: "Skybar 25",
        address: "Villaggio Alto, Airport West, Accra",
        capacity: 350,
        description:
            "A panoramic rooftop lounge known for sunset views, cocktails, DJ nights, and contemporary dance music.",
        genres: ["Afrobeats", "House", "Amapiano"]
    }
];