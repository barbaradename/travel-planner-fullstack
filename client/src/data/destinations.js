export const DESTINATIONS = [
  // EUROPE
  {
    name: "Portugal",
    slug: "portugal",
    tagline: "Coastline, food, and charming cities.",
    tags: {
      climate: ["mild", "warm"],
      vibe: ["culture", "city"],
      landscape: ["beach", "countryside"],
      time: ["day", "night"],
      budget: ["low", "medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Lisbon viewpoints + tram streets",
          tip: "Go early for the best light.",
        },
        afternoon: {
          title: "Pastéis + river walk",
          tip: "Try a bakery in Belém.",
        },
        evening: {
          title: "Fado or sunset by the water",
          tip: "Book ahead for Fado.",
        },
      },
    ],
    highlights: ["Lisbon", "Porto", "Algarve", "Sintra"],
  },
  {
    name: "Malta",
    slug: "malta",
    tagline: "Mediterranean islands and blue waters.",
    tags: {
      climate: ["warm"],
      vibe: ["culture", "city"],
      landscape: ["beach", "countryside"],
      time: ["day", "night"],
      budget: ["medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Valletta old streets + viewpoints",
          tip: "Wear comfy shoes—lots of steps.",
        },
        afternoon: {
          title: "Blue water swim or boat (seasonal)",
          tip: "Check sea conditions.",
        },
        evening: {
          title: "Harbor dinner in Sliema/St Julian’s",
          tip: "Sunset tables are perfect.",
        },
      },
    ],
    highlights: ["Valletta", "Mdina", "Gozo", "Blue Lagoon"],
  },
  {
    name: "Italy",
    slug: "italy",
    tagline: "History, art and unforgettable food.",
    tags: {
      climate: ["mild", "warm"],
      vibe: ["culture", "city"],
      landscape: ["countryside", "mountains"],
      time: ["day", "night"],
      budget: ["medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Historic center walk + espresso",
          tip: "Start near a main piazza.",
        },
        afternoon: {
          title: "Museum/landmark + gelato",
          tip: "Book tickets online if needed.",
        },
        evening: {
          title: "Aperitivo + local dinner",
          tip: "Try a neighborhood trattoria.",
        },
      },
    ],
    highlights: ["Rome", "Florence", "Venice", "Amalfi Coast"],
  },
  {
    name: "Germany",
    slug: "germany",
    tagline: "Cities, castles and culture.",
    tags: {
      climate: ["cold", "mild"],
      vibe: ["city", "culture"],
      landscape: ["countryside", "mountains"],
      time: ["day", "night"],
      budget: ["medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Old town / historic district",
          tip: "Look for a walking tour.",
        },
        afternoon: {
          title: "Museum + local bakery stop",
          tip: "Try a regional specialty.",
        },
        evening: {
          title: "Beer garden or cozy dinner",
          tip: "Perfect for a relaxed night.",
        },
      },
    ],
    highlights: ["Berlin", "Munich", "Cologne", "Bavarian castles"],
  },
  {
    name: "France",
    slug: "france",
    tagline: "Museums, romance and wine regions.",
    tags: {
      climate: ["cold", "mild", "warm"],
      vibe: ["culture", "city"],
      landscape: ["countryside", "mountains"],
      time: ["day", "night"],
      budget: ["medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Iconic neighborhood stroll",
          tip: "Pick one area and go slow.",
        },
        afternoon: {
          title: "Museum + café break",
          tip: "Reserve tickets to skip lines.",
        },
        evening: {
          title: "Dinner + river/old town walk",
          tip: "Sunset walks are magic.",
        },
      },
    ],
    highlights: ["Paris", "Nice", "Loire Valley", "Alsace"],
  },
  {
    name: "Spain",
    slug: "spain",
    tagline: "Sun, tapas and vibrant cities.",
    tags: {
      climate: ["mild", "warm"],
      vibe: ["city", "culture"],
      landscape: ["beach", "countryside", "mountains"],
      time: ["day", "night"],
      budget: ["low", "medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Old town + market snacks",
          tip: "Start with a famous market.",
        },
        afternoon: {
          title: "Beach or landmark visit",
          tip: "Do the big sight after lunch.",
        },
        evening: {
          title: "Tapas crawl + night walk",
          tip: "Late dinner is normal here.",
        },
      },
    ],
    highlights: ["Barcelona", "Madrid", "Seville", "Valencia"],
  },
  {
    name: "Andorra",
    slug: "andorra",
    tagline: "Mountains, hikes and cozy winter vibes.",
    tags: {
      climate: ["cold", "mild"],
      vibe: ["nature"],
      landscape: ["mountains", "countryside"],
      time: ["day", "night"],
      budget: ["medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Mountain viewpoint + short hike",
          tip: "Dress in layers.",
        },
        afternoon: {
          title: "Spa / thermal relax",
          tip: "Perfect after the cold.",
        },
        evening: {
          title: "Cozy dinner in the village",
          tip: "Try local mountain food.",
        },
      },
    ],
    highlights: ["Grandvalira", "Caldea spa", "Hiking trails"],
  },
  {
    name: "Sweden",
    slug: "sweden",
    tagline: "Nordic cities, winter adventures and aurora vibes.",
    tags: {
      climate: ["cold"],
      vibe: ["nature", "culture"],
      landscape: ["mountains", "countryside"],
      time: ["night"],
      budget: ["medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Old town + fika",
          tip: "Gamla Stan is great to start.",
        },
        afternoon: {
          title: "Museum + waterfront walk",
          tip: "Vasa Museum is a classic.",
        },
        evening: {
          title: "Cozy Nordic dinner",
          tip: "Reserve if it’s weekend.",
        },
      },
    ],
    highlights: ["Stockholm", "Abisko", "Kiruna", "Saunas"],
  },

  // SOUTH AMERICA
  {
    name: "Peru",
    slug: "peru",
    tagline: "Ancient history and epic landscapes.",
    tags: {
      climate: ["mild", "warm"],
      vibe: ["culture", "nature"],
      landscape: ["mountains", "waterfalls"],
      time: ["day"],
      budget: ["low", "medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Historic center + markets",
          tip: "Try a local breakfast.",
        },
        afternoon: {
          title: "Ruins / viewpoints",
          tip: "Hydrate if at altitude.",
        },
        evening: { title: "Peruvian dinner", tip: "Ceviche is iconic." },
      },
    ],
    highlights: ["Cusco", "Machu Picchu", "Sacred Valley", "Lima"],
  },
  {
    name: "Bolivia",
    slug: "bolivia",
    tagline: "Salt flats and high-altitude adventures.",
    tags: {
      climate: ["cold", "mild"],
      vibe: ["nature", "culture"],
      landscape: ["mountains", "countryside"],
      time: ["day"],
      budget: ["low", "medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "City viewpoints + local streets",
          tip: "Go slow—altitude matters.",
        },
        afternoon: {
          title: "Salt flats / nature day",
          tip: "Bring sunglasses.",
        },
        evening: {
          title: "Warm soup + early night",
          tip: "Rest helps with altitude.",
        },
      },
    ],
    highlights: ["Uyuni", "La Paz", "Lake Titicaca"],
  },
  {
    name: "Chile",
    slug: "chile",
    tagline: "Deserts, mountains and Patagonia.",
    tags: {
      climate: ["cold", "mild"],
      vibe: ["nature"],
      landscape: ["mountains", "countryside", "waterfalls"],
      time: ["day"],
      budget: ["medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Scenic viewpoint / trail",
          tip: "Pick a famous mirador.",
        },
        afternoon: {
          title: "Local food + relaxed city stroll",
          tip: "Try seafood if coastal.",
        },
        evening: {
          title: "Starry night / calm evening",
          tip: "Great for photos.",
        },
      },
    ],
    highlights: ["Atacama", "Santiago", "Patagonia"],
  },
  {
    name: "Argentina",
    slug: "argentina",
    tagline: "Wine, food and dramatic nature.",
    tags: {
      climate: ["mild", "warm", "cold"],
      vibe: ["culture", "nature", "city"],
      landscape: ["mountains", "countryside", "waterfalls"],
      time: ["night", "day"],
      budget: ["low", "medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Neighborhood walk + coffee",
          tip: "Start in a classic barrio.",
        },
        afternoon: {
          title: "Food market / steak lunch",
          tip: "Try local favorites.",
        },
        evening: {
          title: "Tango / nightlife",
          tip: "Perfect for night-lovers.",
        },
      },
    ],
    highlights: ["Buenos Aires", "Mendoza", "Iguazú Falls", "Patagonia"],
  },
  {
    name: "Paraguay",
    slug: "paraguay",
    tagline: "A hidden gem in South America.",
    tags: {
      climate: ["warm"],
      vibe: ["culture", "city"],
      landscape: ["countryside", "waterfalls"],
      time: ["day"],
      budget: ["low", "medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "City center + local markets",
          tip: "Great for cultural vibes.",
        },
        afternoon: {
          title: "Nature park / day trip",
          tip: "Plan transport early.",
        },
        evening: { title: "Local dinner", tip: "Ask for a regional dish." },
      },
    ],
    highlights: ["Asunción", "Areguá", "Countryside escapes"],
  },
  {
    name: "Colombia",
    slug: "colombia",
    tagline: "Colorful cities and Caribbean vibes.",
    tags: {
      climate: ["warm", "mild"],
      vibe: ["culture", "city"],
      landscape: ["beach", "waterfalls", "countryside"],
      time: ["night", "day"],
      budget: ["low", "medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Historic center + street art",
          tip: "Take a guided walk.",
        },
        afternoon: {
          title: "Coffee + viewpoints",
          tip: "Try a coffee experience.",
        },
        evening: {
          title: "Salsa / nightlife",
          tip: "Perfect for night vibes.",
        },
      },
    ],
    highlights: ["Cartagena", "Medellín", "Bogotá", "Tayrona"],
  },
  {
    name: "Brazil",
    slug: "brazil",
    tagline: "Beaches, waterfalls and vibrant culture.",
    tags: {
      climate: ["warm"],
      vibe: ["culture", "city", "nature"],
      landscape: ["beach", "waterfalls", "countryside"],
      time: ["night", "day"],
      budget: ["low", "medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Beach morning + fresh coconut",
          tip: "Go early for calmer sands.",
        },
        afternoon: {
          title: "Local food + landmark",
          tip: "Try a regional lunch.",
        },
        evening: {
          title: "Nightlife / live music",
          tip: "Brazil shines at night.",
        },
      },
    ],
    highlights: ["Rio", "São Paulo", "Iguaçu Falls", "Bahia"],
  },

  // NORTH/CENTRAL AMERICA + CARIBBEAN
  {
    name: "United States",
    slug: "united-states",
    tagline: "Big cities and iconic road trips.",
    tags: {
      climate: ["cold", "mild", "warm"],
      vibe: ["city", "nature", "culture"],
      landscape: ["mountains", "countryside", "waterfalls", "beach"],
      time: ["day", "night"],
      budget: ["medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Iconic neighborhood + coffee",
          tip: "Start with a walking route.",
        },
        afternoon: {
          title: "Museum / landmark",
          tip: "Book tickets where needed.",
        },
        evening: { title: "Food + city lights", tip: "Best views at night." },
      },
    ],
    highlights: ["NYC", "California", "National Parks", "Miami"],
  },
  {
    name: "Costa Rica",
    slug: "costa-rica",
    tagline: "Rainforests, beaches and wildlife.",
    tags: {
      climate: ["warm"],
      vibe: ["nature"],
      landscape: ["beach", "waterfalls", "countryside"],
      time: ["day"],
      budget: ["medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Rainforest walk + wildlife",
          tip: "Bring rain protection.",
        },
        afternoon: {
          title: "Waterfall swim",
          tip: "Go with a local guide if needed.",
        },
        evening: {
          title: "Relaxed beach sunset",
          tip: "Golden hour is perfect.",
        },
      },
    ],
    highlights: ["Arenal", "Manuel Antonio", "Monteverde"],
  },
  {
    name: "Jamaica",
    slug: "jamaica",
    tagline: "Reggae, beaches and waterfalls.",
    tags: {
      climate: ["warm"],
      vibe: ["culture", "nature"],
      landscape: ["beach", "waterfalls"],
      time: ["night", "day"],
      budget: ["medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: { title: "Beach morning", tip: "Pick a calm bay early." },
        afternoon: {
          title: "Waterfalls + local food",
          tip: "Try jerk chicken.",
        },
        evening: { title: "Reggae night", tip: "Look for live music spots." },
      },
    ],
    highlights: ["Negril", "Ocho Rios", "Blue Mountains"],
  },
  {
    name: "Panama",
    slug: "panama",
    tagline: "City energy plus tropical escapes.",
    tags: {
      climate: ["warm"],
      vibe: ["city", "culture"],
      landscape: ["beach", "countryside"],
      time: ["day", "night"],
      budget: ["medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: { title: "Old town + coffee", tip: "Start in Casco Viejo." },
        afternoon: {
          title: "Canal visit / viewpoint",
          tip: "Best during daytime.",
        },
        evening: { title: "Rooftop sunset", tip: "Great city-night vibe." },
      },
    ],
    highlights: ["Panama City", "San Blas", "Bocas del Toro"],
  },
  {
    name: "Cayman Islands",
    slug: "cayman-islands",
    tagline: "Crystal waters and relaxed luxury beaches.",
    tags: {
      climate: ["warm"],
      vibe: ["nature"],
      landscape: ["beach"],
      time: ["day"],
      budget: ["any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Beach + snorkeling",
          tip: "Morning waters are calmer.",
        },
        afternoon: {
          title: "Boat tour / marine life",
          tip: "Book in advance.",
        },
        evening: { title: "Sunset dinner", tip: "Choose a seaside table." },
      },
    ],
    highlights: ["Seven Mile Beach", "Snorkeling spots"],
  },

  // OCEANIA
  {
    name: "Australia",
    slug: "australia",
    tagline: "Cities, beaches and road-trip freedom.",
    tags: {
      climate: ["warm", "mild"],
      vibe: ["city", "nature"],
      landscape: ["beach", "countryside", "waterfalls"],
      time: ["day", "night"],
      budget: ["any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Coastal walk + coffee",
          tip: "Start with a beach promenade.",
        },
        afternoon: {
          title: "Iconic spot / viewpoint",
          tip: "Perfect for photos.",
        },
        evening: { title: "Dinner + city night", tip: "Try local seafood." },
      },
    ],
    highlights: ["Sydney", "Melbourne", "Gold Coast", "Great Ocean Road"],
  },
  {
    name: "New Caledonia",
    slug: "new-caledonia",
    tagline: "Lagoon blues and island calm.",
    tags: {
      climate: ["warm"],
      vibe: ["nature"],
      landscape: ["beach"],
      time: ["day"],
      budget: ["any"],
    },
    plan: [
      {
        day: 1,
        morning: { title: "Lagoon swim", tip: "Bring snorkeling gear." },
        afternoon: {
          title: "Island boat trip",
          tip: "Check weather before booking.",
        },
        evening: { title: "Relaxed seaside dinner", tip: "Keep it slow." },
      },
    ],
    highlights: ["Nouméa", "Lagoon islands"],
  },
  {
    name: "New Zealand",
    slug: "new-zealand",
    tagline: "Mountains, lakes and cinematic nature.",
    tags: {
      climate: ["mild", "cold"],
      vibe: ["nature"],
      landscape: ["mountains", "waterfalls", "countryside"],
      time: ["day"],
      budget: ["any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Lake walk + viewpoints",
          tip: "Start at sunrise if you can.",
        },
        afternoon: { title: "Hike or nature trail", tip: "Pack layers." },
        evening: { title: "Cozy dinner", tip: "Perfect after outdoor day." },
      },
    ],
    highlights: ["Queenstown", "Rotorua", "Milford Sound"],
  },

  // ASIA
  {
    name: "Thailand",
    slug: "thailand",
    tagline: "Beaches, street food and island hopping.",
    tags: {
      climate: ["warm"],
      vibe: ["culture", "nature"],
      landscape: ["beach", "waterfalls", "countryside"],
      time: ["night", "day"],
      budget: ["low", "medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Temple / old town walk",
          tip: "Go early to avoid heat.",
        },
        afternoon: {
          title: "Beach or island boat",
          tip: "Hydrate and use sunscreen.",
        },
        evening: {
          title: "Night market + street food",
          tip: "Try a food tour.",
        },
      },
    ],
    highlights: ["Bangkok", "Chiang Mai", "Phuket", "Krabi"],
  },
  {
    name: "Indonesia",
    slug: "indonesia",
    tagline: "Islands, volcanoes and tropical culture.",
    tags: {
      climate: ["warm"],
      vibe: ["culture", "nature"],
      landscape: ["beach", "mountains", "waterfalls"],
      time: ["day", "night"],
      budget: ["low", "medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Rice fields / scenic walk",
          tip: "Best light in the morning.",
        },
        afternoon: { title: "Waterfall swim", tip: "Wear good shoes." },
        evening: { title: "Sunset viewpoint", tip: "Arrive early for spots." },
      },
    ],
    highlights: ["Bali", "Lombok", "Java volcanoes"],
  },
  {
    name: "Singapore",
    slug: "singapore",
    tagline: "Modern city, food courts and night lights.",
    tags: {
      climate: ["warm"],
      vibe: ["city", "culture"],
      landscape: ["countryside"], // parks/gardens vibe
      time: ["night"],
      budget: ["any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "City walk + coffee",
          tip: "Start in a central district.",
        },
        afternoon: {
          title: "Gardens / iconic architecture",
          tip: "Gardens by the Bay is stunning.",
        },
        evening: {
          title: "Night skyline + hawker food",
          tip: "Perfect for night lovers.",
        },
      },
    ],
    highlights: ["Marina Bay", "Gardens by the Bay", "Hawker centers"],
  },
  {
    name: "Philippines",
    slug: "philippines",
    tagline: "Dream beaches and island adventures.",
    tags: {
      climate: ["warm"],
      vibe: ["nature"],
      landscape: ["beach", "waterfalls"],
      time: ["day"],
      budget: ["low", "medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: { title: "Island beach morning", tip: "Early swim is best." },
        afternoon: {
          title: "Boat tour + lagoons",
          tip: "Bring waterproof bag.",
        },
        evening: { title: "Sunset on the beach", tip: "Keep it relaxed." },
      },
    ],
    highlights: ["Palawan", "Cebu", "Boracay"],
  },
  {
    name: "Cambodia",
    slug: "cambodia",
    tagline: "Temples, history and warm sunsets.",
    tags: {
      climate: ["warm"],
      vibe: ["culture"],
      landscape: ["countryside"],
      time: ["day"],
      budget: ["low", "medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Sunrise temples",
          tip: "Go very early for sunrise.",
        },
        afternoon: {
          title: "Markets + local lunch",
          tip: "Try a street food spot.",
        },
        evening: { title: "Calm sunset walk", tip: "Perfect end to the day." },
      },
    ],
    highlights: ["Angkor", "Siem Reap", "Phnom Penh"],
  },
  {
    name: "Malaysia",
    slug: "malaysia",
    tagline: "Food, cities and tropical islands.",
    tags: {
      climate: ["warm"],
      vibe: ["culture", "city"],
      landscape: ["beach", "countryside"],
      time: ["night", "day"],
      budget: ["low", "medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "City highlights + coffee",
          tip: "Start in the center.",
        },
        afternoon: {
          title: "Food markets",
          tip: "Malaysia is incredible for food.",
        },
        evening: {
          title: "Night street food",
          tip: "Perfect for night vibes.",
        },
      },
    ],
    highlights: ["Kuala Lumpur", "Penang", "Langkawi"],
  },
  {
    name: "Sri Lanka",
    slug: "sri-lanka",
    tagline: "Tea hills, beaches and wildlife.",
    tags: {
      climate: ["warm", "mild"],
      vibe: ["nature", "culture"],
      landscape: ["beach", "mountains", "waterfalls"],
      time: ["day"],
      budget: ["low", "medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Tea hills viewpoint",
          tip: "Early light is beautiful.",
        },
        afternoon: {
          title: "Waterfall stop",
          tip: "Combine with a scenic train ride.",
        },
        evening: { title: "Local dinner", tip: "Try curry + roti." },
      },
    ],
    highlights: ["Ella", "Kandy", "South coast beaches"],
  },

  // Extra: to reach exactly 30 with your list
  {
    name: "Ireland",
    slug: "ireland",
    tagline: "Green countryside and cozy cities.",
    tags: {
      climate: ["cold", "mild"],
      vibe: ["culture", "nature"],
      landscape: ["countryside", "waterfalls"],
      time: ["day", "night"],
      budget: ["medium", "any"],
    },
    plan: [
      {
        day: 1,
        morning: {
          title: "Old town walk + coffee",
          tip: "Start in the city center.",
        },
        afternoon: {
          title: "Cliffs / coastal scenery",
          tip: "Check wind and weather.",
        },
        evening: {
          title: "Pub night + live music",
          tip: "Perfect for a cozy night.",
        },
      },
    ],
    highlights: ["Dublin", "Cliffs of Moher", "Galway"],
  },
];
