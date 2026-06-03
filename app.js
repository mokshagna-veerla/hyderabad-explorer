/**
 * Hyderabad 360 - Full-Stack Asynchronous Engine
 * REST API Integrations, Traffic Canvas & Live Weather Feeds
 */

// ==========================================================================
// 1. Mock Data Sets (Local static templates)
// ==========================================================================

const NEWS_BULLETIN = [
  {
    title: "Metro Late Operations",
    content: "Hyderabad Metro announces late night operations up to 12:30 AM for the upcoming cricket match at Rajiv Gandhi Stadium, Uppal.",
    category: "Transit",
    time: "2 hrs ago"
  },
  {
    title: "T-Hub Phase 3 Launch",
    content: "Telangana IT Minister announces the master blueprint of T-Hub Phase 3 in Madhapur, focusing heavily on DeepTech and SpaceTech start-ups.",
    category: "Cyberabad",
    time: "5 hrs ago"
  },
  {
    title: "Heritage Fort Restorations",
    content: "Archaeological Survey of India approves a grand corpus of ₹15 Crores for restoring structural contours of Golconda Fort and Qutb Shahi Tombs.",
    category: "Heritage",
    time: "1 day ago"
  },
  {
    title: "Monsoon Preparedness Drive",
    content: "GHMC deploys 142 emergency monsoon safety squads across low-lying lakes and Musi river basins ahead of expected Deccan rain forecasts.",
    category: "Civic",
    time: "1 day ago"
  }
];

const HERITAGE_TIMELINE = [
  {
    year: "1591 CE",
    title: "Foundation by Qutb Shahis",
    desc: "Sultan Muhammad Quli Qutb Shah founds Hyderabad at the banks of the Musi River, building the iconic Charminar monument as the center focal point of the new metropolitan kingdom."
  },
  {
    year: "1687 CE",
    title: "The Siege of Golconda Fort",
    desc: "Mughal Emperor Aurangzeb wages an intense 8-month battle against the Qutb Shahis, seizing the massive Golconda fortress after a historic betrayal of the citadel gates."
  },
  {
    year: "1724 CE",
    title: "Asaf Jahi Dynasty (The Nizams)",
    desc: "Mir Qamar-ud-din Khan establishes the sovereign Nizami rule under the title Asaf Jah I, initiating centuries of cultural enrichment, rich architectures, and massive jewels collections."
  },
  {
    year: "1948 CE",
    title: "Operation Polo & Union Integration",
    desc: "Following India's Independence, Major General J.N. Chaudhuri leads the Indian Armed Forces under Operation Polo, merging Hyderabad State into the Indian Union."
  },
  {
    year: "1998 CE",
    title: "Cyberabad & Silicon Revolution",
    desc: "The inauguration of HITEC City and T-Hub marks the birth of Cyberabad, immediately drawing major tech corporate giants like Microsoft, Google, and Amazon to make Hyderabad their largest global campuses."
  }
];

const TOURIST_LANDMARKS = [
  {
    id: "charminar",
    name: "Charminar Monument",
    category: "Historic Mosque",
    desc: "The absolute signature monument of Hyderabad, built in 1591 to commemorate the end of a catastrophic plague.",
    price: 40,
    image: "charminar.png"
  },
  {
    id: "golconda",
    name: "Golconda Fortress",
    category: "Royal Citadel",
    desc: "Famed acoustic royal chambers, giant rock battlements, and the birthplace of legendary diamonds like the Koh-i-Noor.",
    price: 50,
    image: "golconda.png"
  },
  {
    id: "salarjung",
    name: "Salar Jung Museum",
    category: "Royal Antiques",
    desc: "One of the three National Museums in India, containing the massive private heritage collection of the Salar Jung family.",
    price: 100,
    image: "salarjung.png"
  },
  {
    id: "chowmahalla",
    name: "Chowmahalla Palace",
    category: "Nizam Palace",
    desc: "The seat of the Asaf Jahi dynasty, styled elegantly after Tehran's Shah Palaces, featuring Grand Durbar halls and vintage cars.",
    price: 80,
    image: "chowmahalla.png"
  },
  {
    id: "ramoji",
    name: "Ramoji Film City",
    category: "Mega Entertainment",
    desc: "The world's largest integrated film studio complex, featuring dynamic cinematic sets, theme parks, and majestic shows.",
    price: 1200,
    image: "ramoji.png"
  },
  {
    id: "birlamandir",
    name: "Birla Mandir Temple",
    category: "Hilltop Temple",
    desc: "Constructed entirely of 2000 tons of pure white Rajasthani marble, overlooking the pristine Hussain Sagar Lake landscape.",
    price: 0,
    image: "birlamandir.png"
  }
];

const METRO_LINES = [
  {
    name: "Miyapur to L.B. Nagar Corridor",
    line: "Red Line",
    class: "red-line",
    stations: "27 Stations (29.2 km)",
    status: "Active (Interval: 4.5 mins)"
  },
  {
    name: "Nagole to Raidurg Corridor",
    line: "Blue Line",
    class: "blue-line",
    stations: "23 Stations (27.0 km)",
    status: "Active (Interval: 4.5 mins)"
  },
  {
    name: "JBS Parade Ground to MGBS Corridor",
    line: "Green Line",
    class: "green-line",
    stations: "9 Stations (9.6 km)",
    status: "Active (Interval: 7.0 mins)"
  }
];

const DINING_SPOTS = [
  {
    id: "paradise",
    name: "Paradise Biryani",
    category: "Legendary Biryani Cafe",
    rating: "4.8",
    price: 100,
    desc: "Secunderabad's iconic world-famed landmark. Known for authentic Nizami Dum Biryani, spices, and double-ka-meetha.",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "niloufer",
    name: "Cafe Niloufer",
    category: "Historic Tea & Bakery",
    rating: "4.9",
    price: 50,
    desc: "Lakdikapul's finest vintage Irani Chai cafe. Indulge in classic Bun Maska, osmania biscuits, and royal zafrani tea.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "tajfalaknuma",
    name: "Taj Falaknuma Palace",
    category: "Luxury Dining & Tour",
    rating: "4.9",
    price: 2500,
    desc: "The grand hilltop palace of the Nizam. Experience world-class 101-chair royal dining halls and high-tea packages.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "shadab",
    name: "Hotel Shadab",
    category: "Heritage Old City Hub",
    rating: "4.7",
    price: 80,
    desc: "Situated near High Court. Famous for rich, thick Mutton Haleem (seasonal), sheermal, and heavy spiced Biryani.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "inorbit",
    name: "Inorbit Mall Cyberabad",
    category: "Lifestyle & Malls",
    rating: "4.6",
    price: 0,
    desc: "Overlooking Durgam Cheruvu secret lake in Madhapur. Premier shopping corridors, cinemas, and expansive food courts.",
    image: "https://images.unsplash.com/photo-1519642918688-7e43b19245d8?q=80&w=600&auto=format&fit=crop"
  }
];

const MOVIE_SHOWS = [
  {
    id: "nizamlegacy",
    title: "Major: Nizam's Legacy",
    theater: "Prasad's IMAX (Screen 6)",
    format: "3D IMAX",
    price: 250,
    times: ["11:30 AM", "03:00 PM", "06:45 PM", "10:15 PM"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "cybercrisis",
    title: "Cyberabad Crisis",
    theater: "AMB Cinemas (Screen 1 - VIP)",
    format: "Dolby Atmos 4K",
    price: 450,
    times: ["10:15 AM", "02:00 PM", "05:30 PM", "08:45 PM"],
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "deccanrains",
    title: "Rains of the Deccan",
    theater: "GVK One Inox",
    format: "2D Digital",
    price: 200,
    times: ["01:15 PM", "05:00 PM", "09:30 PM"],
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop"
  }
];

// ==========================================================================
// 1.5 Enhanced Smart City Datasets & Localization
// ==========================================================================

const UPCOMING_EVENTS = [
  {
    id: "sufifest",
    name: "Deccan Sufi & Qawwali Night",
    category: "Festivals & Art",
    desc: "A celestial evening of traditional Sufi music under the stars in Chowmahalla Palace durbar gardens.",
    price: 350,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
    date: "2026-06-06",
    time: "Evening (06:00 PM)"
  },
  {
    id: "uppalipl",
    name: "Hyderabad vs Bengaluru Cricket Match",
    category: "Mega Entertainment",
    desc: "Experience the electrifying stadium roar at Rajiv Gandhi International Stadium, Uppal corridor.",
    price: 800,
    image: "https://images.unsplash.com/photo-1540747737956-378724044592?q=80&w=600&auto=format&fit=crop",
    date: "2026-06-10",
    time: "Night (07:30 PM)"
  },
  {
    id: "biryanicrawl",
    name: "Legendary Biryani & Haleem Trail",
    category: "Food Trails",
    desc: "A guided taste crawl through iconic Charminar old-city food stalls including Niloufer, Shadab, and royal tea rooms.",
    price: 150,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600&auto=format&fit=crop",
    date: "2026-06-07",
    time: "Evening (04:00 PM)"
  },
  {
    id: "techsummit",
    name: "Cyberabad Tech Summit & Expo",
    category: "Weekend Events",
    desc: "Explore DeepTech start-ups, AI keynotes, and next-gen space projects at the T-Hub Cyberabad exhibition rooms.",
    price: 100,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
    date: "2026-06-15",
    time: "Morning (10:00 AM)"
  }
];

const LOCAL_EXPERIENCES = [
  {
    id: "charminarwalk",
    name: "Laad Bazaar & Charminar Heritage Walk",
    category: "Heritage",
    desc: "Walk through centuries-old alleys, see pearl crafters, and climb the steep minarets of Charminar with royal guides.",
    price: 200,
    image: "charminar.png",
    duration: "3 hrs"
  },
  {
    id: "khajagudarocks",
    name: "Khajaguda Rock Ridge Sunset Trek",
    category: "Nature",
    desc: "Breathe in fresh Deccan winds on a standard rock climbing trek through 2.5 billion year old granite rock cliffs.",
    price: 0,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
    duration: "2 hrs"
  },
  {
    id: "niloufertea",
    name: "Irani Chai & Osmania Biscuit Baking Trail",
    category: "Food",
    desc: "Get an exclusive kitchen tour of Cafe Niloufer, learn tea brewing methods, and hot-baked osmania biscuits.",
    price: 120,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop",
    duration: "1.5 hrs"
  },
  {
    id: "paigahtombs",
    name: "Classified Paigah Tombs Explorer",
    category: "Nature",
    desc: "Explore stunning, intricate stucco layouts and quiet Mughal heritage tombs hidden away near central Hyderabad.",
    price: 0,
    image: "salarjung.png",
    duration: "2 hrs"
  }
];

const SMART_ALERTS = [
  { id: 1, type: "traffic", title: "Traffic Diversion Active", desc: "Avoid Gachibowli Outer Ring link roads due to smart flyover maintenance. Expect 15 mins delays.", time: "10 mins ago" },
  { id: 2, type: "metro", title: "Metro Green Line Speed Notice", desc: "Green Line operating at slightly longer intervals (8 mins) due to corridor checks at Musheerabad.", time: "25 mins ago" },
  { id: 3, type: "weather", title: "Thunderstorm Warning Alert", desc: "Deccan Met office issues thunder/rain warning over Cyberabad IT sectors by early evening.", time: "1 hr ago" }
];

const MAP_LOCATIONS = [
  { name: "Charminar Monument", x: 280, y: 280, category: "Attractions", rating: 4.8, desc: "A stunning 1591 mosque with four minarets.", price: 40, query: "Charminar, Hyderabad" },
  { name: "Golconda Fortress", x: 80, y: 150, category: "Attractions", rating: 4.7, desc: "A historic fort with acoustic dome properties.", price: 50, query: "Golconda Fort, Hyderabad" },
  { name: "Salar Jung Museum", x: 250, y: 220, category: "Attractions", rating: 4.6, desc: "National museum featuring antique artifacts.", price: 100, query: "Salar Jung Museum, Hyderabad" },
  { name: "Chowmahalla Palace", x: 270, y: 310, category: "Attractions", rating: 4.9, desc: "Grand palace showcasing Nizam collections.", price: 80, query: "Chowmahalla Palace, Hyderabad" },
  { name: "Birla Mandir Temple", x: 210, y: 140, category: "Attractions", rating: 4.8, desc: "White marble temple on Naubat Pahad hill.", price: 0, query: "Birla Mandir, Hyderabad" },
  
  { name: "HITEC City Metro Hub", x: 70, y: 100, category: "Metro", desc: "A vital junction for the Blue Line smart rail.", price: 10, query: "HITEC City Metro Station, Hyderabad" },
  { name: "Secunderabad Station Hub", x: 380, y: 80, category: "Metro", desc: "Active transit connection linking trains and Red Line.", price: 10, query: "Secunderabad Junction, Hyderabad" },
  { name: "MGBS Transit Hub", x: 290, y: 210, category: "Metro", desc: "One of Asia's largest bus and metro interchanges.", price: 10, query: "MGBS Metro Station, Hyderabad" },
  
  { name: "Paradise Biryani Hub", x: 350, y: 90, category: "Dining", rating: 4.8, desc: "The legendary home of authentic Dum Biryani.", price: 150, query: "Paradise Biryani Secunderabad, Hyderabad" },
  { name: "Cafe Niloufer Lakdikapul", x: 200, y: 170, category: "Dining", rating: 4.9, desc: "Famous vintage tea rooms serving Irani Chai.", price: 50, query: "Cafe Niloufer Lakdikapul, Hyderabad" },
  { name: "Taj Falaknuma Hilltop", x: 310, y: 360, category: "Dining", rating: 4.9, desc: "Nizam palace converted into luxury dining.", price: 2500, query: "Taj Falaknuma Palace, Hyderabad" },
  
  { name: "Cyberabad Police Station", x: 90, y: 80, category: "Safety", desc: "24/7 security dispatch, She Teams patrol unit.", price: 0, query: "Cyberabad Police Commissionerate, Gachibowli, Hyderabad" },
  { name: "NIMS Medical Emergency", x: 200, y: 120, category: "Safety", desc: "Major government hospital with trauma unit.", price: 0, query: "Nizam's Institute Of Medical Sciences, Hyderabad" },
  { name: "Apollo Hospital Trauma", x: 130, y: 180, category: "Safety", desc: "Premium private emergency response care.", price: 0, query: "Apollo Hospitals Jubilee Hills, Hyderabad" }
];

const LOCALIZATION_DICTIONARY = {
  en: {
    welcome: "Welcome to Hyderabad",
    exploreLandmarks: "Explore Landmarks",
    planMyDay: "Plan My Day",
    discoverHyd: "Discover Hyderabad",
    metroBoard: "Metro Rail Service Board",
    sosPanel: "Emergency Safety Panel",
    cartTitle: "Unified Booking Cart",
    bulletinTitle: "Today's Local Bulletin",
    trafficPulse: "Traffic Pulse",
    deccanClimate: "Deccan Climate",
    airQuality: "Air Quality Index",
    myCart: "My Cart"
  },
  te: {
    welcome: "హైదరాబాద్‌కు స్వాగతం",
    exploreLandmarks: "చారిత్రక ప్రదేశాలు",
    planMyDay: "నా రోజు ప్రణాళిక",
    discoverHyd: "హైదరాబాద్ ఆవిష్కరణ",
    metroBoard: "మెట్రో రైల్ సర్వీస్ బోర్డు",
    sosPanel: "అత్యవసర రక్షణ ప్యానెల్",
    cartTitle: "కార్ట్ బుకింగ్ ప్యానెల్",
    bulletinTitle: "నేటి స్థానిక వార్తలు",
    trafficPulse: "ట్రాఫిక్ వేగం",
    deccanClimate: "వాతావరణం",
    airQuality: "గాలి నాణ్యత సూచిక",
    myCart: "నా కార్ట్"
  },
  hi: {
    welcome: "हैदराबाद में आपका स्वागत है",
    exploreLandmarks: "दर्शनीय स्थल खोजें",
    planMyDay: "मेरा दिन प्लान करें",
    discoverHyd: "हैदराबाद की खोज",
    metroBoard: "मेट्रो रेल सेवा बोर्ड",
    sosPanel: "आपातकालीन सुरक्षा पैनल",
    cartTitle: "बुकिंग कार्ट पैनल",
    bulletinTitle: "आज का समाचार बुलेटिन",
    trafficPulse: "यातायात की स्थिति",
    deccanClimate: "दक्कन जलवायु",
    airQuality: "वायु गुणवत्ता सूचकांक",
    myCart: "मेरी कार्ट"
  },
  ur: {
    welcome: "حیدرآباد में आपका स्वागत है",
    exploreLandmarks: "تفریحی مقامات",
    planMyDay: "میرا دن پلان کریں",
    discoverHyd: "حیدرآباد دریافت کریں۔",
    metroBoard: "میٹرو ریل سروس بورڈ",
    sosPanel: "ایمرجنسی سیفٹی پینل",
    cartTitle: "بکنگ کارٹ پینل",
    bulletinTitle: "آج کا لوکل بلیٹن",
    trafficPulse: "ٹریفک کی رفتار",
    deccanClimate: "دکن آب و ہوا",
    airQuality: "ہوا کا معیار",
    myCart: "میری کارٹ"
  }
};

// ==========================================================================
// 2. Global State Variables
// ==========================================================================

let activeTab = "dashboard";
let currentTemperature = 33;
let currentHumidity = 48;
let currentWind = 12;
let reservationsList = [];
let selectedCinemaSeats = [];
let activeCinemaShow = null;

let shoppingCart = [];
let activeLanguage = "en";
let lightMode = localStorage.getItem("lightMode") === "true";
let highContrastMode = false;
let largeTextMode = false;
let readAloudSpeech = null;
let activeNotificationCount = 3;
let userReviewsDatabase = [];
let localLostFoundLogs = [];
let activeExperienceFilter = "all";

// Traffic Monitor Nodes
const TRAFFIC_JUNCTIONS = [
  { name: "HITEC Junction", x: 70, y: 100, size: 8, baseSpeed: 1.5, textPos: "top" },
  { name: "Gachibowli Circle", x: 60, y: 220, size: 8, baseSpeed: 1.2, textPos: "bottom" },
  { name: "Begumpet Flyover", x: 230, y: 90, size: 8, baseSpeed: 2.0, textPos: "top" },
  { name: "Secunderabad", x: 380, y: 80, size: 8, baseSpeed: 1.6, textPos: "right" },
  { name: "Charminar Heritage Lane", x: 280, y: 280, size: 8, baseSpeed: 0.8, textPos: "bottom" },
  { name: "Mehdipatnam", x: 180, y: 210, size: 8, baseSpeed: 1.4, textPos: "left" }
];

const TRAFFIC_LINKS = [
  { from: 0, to: 1, name: "HITEC - Gachibowli Outer Ring", baseDelay: 8, state: "clear" },
  { from: 0, to: 2, name: "Madhapur - Begumpet Corridor", baseDelay: 25, state: "heavy" },
  { from: 2, to: 3, name: "Begumpet - Secunderabad Link", baseDelay: 14, state: "moderate" },
  { from: 2, to: 5, name: "Panjagutta - Mehdipatnam Road", baseDelay: 18, state: "moderate" },
  { from: 5, to: 4, name: "Mehdipatnam - Old City Route", baseDelay: 22, state: "heavy" },
  { from: 3, to: 4, name: "Musheerabad - Charminar Highway", baseDelay: 10, state: "clear" }
];

// ==========================================================================
// 3. Initialization & Asynchronous Fetch Actions
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Apply saved accessibility states
  if (lightMode) {
    document.body.classList.add("light-mode");
  }

  // Fetch Persistent Reservations & Extra Databases on Startup
  syncBookingsFromServer();
  syncReviewsFromServer();
  syncLostFoundFromServer();

  // Fetch Live Weather API
  syncWeatherFromServer();

  // Start Clock Ticker
  startClock();

  // Initialize User Authentication System
  initAuthSystem();

  // Fluctuate Traffic
  initTrafficMonitor();

  // Populate templates
  loadNewsBulletin();
  loadHistoryTimeline();
  loadTouristGrid();
  loadMetroTransit();
  loadGastronomyGrid();
  loadMoviesGrid();

  // Smart City Initializations
  loadDashboardEvents();
  loadDashboardMetroUpdates();
  loadExperiencesGrid();
  loadSmartNotifications();
  initGlobalSearch();

  // Collapsible Sidebar Navigation Actions
  const sidebar = document.querySelector(".sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  
  const openSidebarNav = () => {
    sidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
  };
  
  const closeSidebarNav = () => {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
  };

  document.getElementById("sidebarToggleBtn").addEventListener("click", openSidebarNav);
  document.getElementById("sidebarCloseBtn").addEventListener("click", closeSidebarNav);
  sidebarOverlay.addEventListener("click", closeSidebarNav);

  // Attach Navigation Listeners
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
      const tabId = item.getAttribute("data-tab");
      switchTab(tabId);
      closeSidebarNav(); // Automatically collapse sidebar after clicking item
    });
  });

  // Attach sliding panel triggers
  document.getElementById("openBookingsPanelBtn").addEventListener("click", toggleBookingsPanel);
  document.getElementById("closeBookingsPanelBtn").addEventListener("click", toggleBookingsPanel);
  document.getElementById("triggerDashboardSOS").addEventListener("click", triggerRapidSOS);

  // Shopping Cart sliding panel triggers
  document.getElementById("cartToggleBtn").addEventListener("click", toggleCartPanel);
  document.getElementById("closeCartPanelBtn").addEventListener("click", toggleCartPanel);

  // Notification sliding panel triggers
  document.getElementById("notificationBellBtn").addEventListener("click", toggleNotificationsPanel);
  document.getElementById("closeNotificationsPanelBtn").addEventListener("click", toggleNotificationsPanel);

  // Chatbot Assistant Toggles
  document.getElementById("chatbotToggleBtn").addEventListener("click", toggleChatbotWindow);
  document.getElementById("closeChatbotBtn").addEventListener("click", toggleChatbotWindow);
  document.getElementById("chatbotSendBtn").addEventListener("click", sendChatbotMsg);
  document.getElementById("chatbotInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendChatbotMsg();
  });

  // Voice Search Toggles
  document.getElementById("voiceSearchBtn").addEventListener("click", startVoiceSearch);

  // Localization Language selection
  document.getElementById("languageSelect").addEventListener("change", (e) => {
    changeAppLanguage(e.target.value);
  });

  // Accessibility Panel Toggles
  document.getElementById("lightModeToggle").addEventListener("click", toggleLightMode);
  document.getElementById("highContrastToggle").addEventListener("click", toggleHighContrastMode);
  document.getElementById("largeTextToggle").addEventListener("click", toggleLargeTextMode);
  document.getElementById("readAloudToggle").addEventListener("click", toggleReadAloudSpeech);
});

// Sync bookings database from server
async function syncBookingsFromServer() {
  try {
    const response = await fetch("/api/bookings");
    if (response.ok) {
      reservationsList = await response.json();
      updateDashboardStats();
    }
  } catch (error) {
    showToast("Server offline. Running in sandbox backup mode.", "error");
  }
}

async function syncReviewsFromServer() {
  try {
    const response = await fetch("/api/reviews");
    if (response.ok) {
      userReviewsDatabase = await response.json();
    }
  } catch (error) {
    // Local fallback
  }
}

async function syncLostFoundFromServer() {
  try {
    const response = await fetch("/api/lostfound");
    if (response.ok) {
      localLostFoundLogs = await response.json();
    }
  } catch (error) {
    // Local fallback
  }
}

// Fetch WTTR.in live weather through server proxy
async function syncWeatherFromServer() {
  try {
    const response = await fetch("/api/weather");
    if (response.ok) {
      const weather = await response.json();
      currentTemperature = weather.temp;
      currentHumidity = weather.humidity;
      currentWind = weather.wind;
      
      // Update DOM elements
      document.getElementById("headerTemp").textContent = `${Math.round(currentTemperature)}°C`;
      
      const fullTemp = document.getElementById("weatherFullTemp");
      if (fullTemp) fullTemp.textContent = `${currentTemperature.toFixed(1)}°C`;
      
      const statusNode = document.getElementById("weatherStatusTxt");
      if (statusNode) statusNode.textContent = weather.description;
      
      const aqiNode = document.getElementById("weatherAqi");
      if (aqiNode) aqiNode.textContent = `${weather.aqi} (Good)`;
      
      const humNode = document.getElementById("weatherHumidity");
      if (humNode) humNode.textContent = `${currentHumidity}%`;
      
      const windNode = document.getElementById("weatherWind");
      if (windNode) windNode.textContent = `${currentWind} km/h`;

      document.getElementById("dashStatWeather").textContent = `${Math.round(currentTemperature)}°C / ${weather.description.split(" ")[0]}`;
    }
  } catch (error) {
    // Falls back gracefully
  }
}

// Real-Time System Clock
function startClock() {
  const clockElement = document.getElementById("headerClock");
  setInterval(() => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');
    clockElement.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
  }, 1000);
}

// Switch between dashboard panes
function switchTab(tabId) {
  activeTab = tabId;
  
  document.querySelectorAll(".nav-menu .nav-item").forEach(item => {
    if (item.getAttribute("data-tab") === tabId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  document.querySelectorAll(".tab-pane").forEach(pane => {
    if (pane.getAttribute("id") === `pane-${tabId}`) {
      pane.classList.add("active");
    } else {
      pane.classList.remove("active");
    }
  });

  if (tabId === "traffic") {
    setTimeout(drawTrafficCanvas, 100);
  }
}

// Toast Alert Utility
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "toast-error" : ""}`;
  
  const svgMarkup = type === "error" 
    ? `<svg class="toast-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
    : `<svg class="toast-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`;

  toast.innerHTML = `
    ${svgMarkup}
    <div style="font-size: 13px; font-weight:600; font-family:var(--font-title);">${message}</div>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = "slideInRight 0.3s reverse forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Sliding My Bookings Panel drawer
function toggleBookingsPanel() {
  const panel = document.getElementById("myBookingsPanel");
  panel.classList.toggle("open");
  if (panel.classList.contains("open")) {
    renderMyBookingsList();
  }
}

// ==========================================================================
// 4. Content Dynamic Rendering Engines
// ==========================================================================

function loadNewsBulletin() {
  const container = document.getElementById("dashboardNewsContainer");
  if (!container) return;
  container.innerHTML = "";
  NEWS_BULLETIN.forEach(news => {
    const card = document.createElement("div");
    card.className = "glass-card";
    card.style.padding = "16px";
    card.style.background = "rgba(255,255,255,0.01)";
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span class="timeline-year" style="font-size:10px; padding:1px 6px;">${news.category}</span>
        <span style="font-size:11px; color:var(--text-muted);">${news.time}</span>
      </div>
      <h4 style="font-family:var(--font-title); font-size:15px; margin-bottom:6px; color:var(--light-gold);">${news.title}</h4>
      <p style="font-size:12.5px; color:var(--text-secondary); line-height:1.5;">${news.content}</p>
    `;
    container.appendChild(card);
  });
}

function loadHistoryTimeline() {
  const container = document.getElementById("heritageTimelineContainer");
  if (!container) return;
  container.innerHTML = "";
  HERITAGE_TIMELINE.forEach((event, idx) => {
    const isLeft = idx % 2 === 0;
    const item = document.createElement("div");
    item.className = `timeline-card-wrapper ${isLeft ? 'left-side' : 'right-side'}`;
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="glass-card timeline-card">
        <span class="timeline-year">${event.year}</span>
        <h4>${event.title}</h4>
        <p>${event.desc}</p>
      </div>
    `;
    container.appendChild(item);
  });
}

function loadTouristGrid() {
  const container = document.getElementById("touristGridContainer");
  if (!container) return;
  container.innerHTML = "";
  TOURIST_LANDMARKS.forEach(place => {
    const card = document.createElement("div");
    card.className = "glass-card tourist-grid-card";
    card.innerHTML = `
      <img src="${place.image}" alt="${place.name}" class="tourist-card-img">
      <div class="tourist-card-overlay"></div>
      <div class="tourist-card-info">
        <span class="tourist-card-tag">${place.category}</span>
        <h4>${place.name}</h4>
        <p>${place.desc}</p>
        <div class="tourist-card-meta">
          <span class="tourist-card-price">${place.price === 0 ? 'Free Entry' : `₹${place.price}`}</span>
          <div style="display:flex; gap:6px;">
            <button class="btn-primary" style="padding:6px 12px; font-size:11px;" onclick="openQuickBooking('${place.name}', ${place.price})">
              ${place.price === 0 ? 'Reserve' : 'Book'}
            </button>
            <button class="btn-secondary" style="padding:6px 12px; font-size:11px;" onclick="addToCart('${place.name}', ${place.price}, 'Heritage Ticket')" title="Add to Cart">
              🛒
            </button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function loadMetroTransit() {
  const container = document.getElementById("metroLinesContainer");
  if (!container) return;
  container.innerHTML = "";
  METRO_LINES.forEach(line => {
    const bar = document.createElement("div");
    bar.className = `metro-route-bar ${line.class}`;
    bar.innerHTML = `
      <div>
        <span style="font-size:11px; text-transform:uppercase; font-weight:700; color:var(--text-muted); display:block;">${line.line}</span>
        <strong style="font-size:14px; font-family:var(--font-title); color:var(--text-primary);">${line.name}</strong>
        <p style="font-size:12px; color:var(--text-secondary); margin-top:2px;">${line.stations}</p>
      </div>
      <span style="font-size:11.5px; font-weight:700; color:var(--accent-emerald);">${line.status}</span>
    `;
    container.appendChild(bar);
  });

  // Populate TSavaari Station dropdowns dynamically
  const fromSelect = document.getElementById("tsavaariFromStation");
  const toSelect = document.getElementById("tsavaariToStation");
  if (fromSelect && toSelect) {
    const stations = [
      { id: "miyapur", name: "Miyapur (Red Line)" },
      { id: "kukatpally", name: "Kukatpally (Red Line)" },
      { id: "ameerpet", name: "Ameerpet (Red/Blue Interchange)" },
      { id: "khairatabad", name: "Khairatabad (Red Line)" },
      { id: "mgbs", name: "MGBS (Red/Green Interchange)" },
      { id: "lbnagar", name: "L.B. Nagar (Red Line)" },
      { id: "raidurg", name: "Raidurg (Blue Line)" },
      { id: "hiteccity", name: "HITEC City (Blue Line)" },
      { id: "begumpet", name: "Begumpet (Blue Line)" },
      { id: "paradeground", name: "Parade Ground (Blue/Green Interchange)" },
      { id: "uppal", name: "Uppal (Blue Line)" },
      { id: "nagole", name: "Nagole (Blue Line)" },
      { id: "jbs", name: "JBS Parade Ground (Green Line)" },
      { id: "musheerabad", name: "Musheerabad (Green Line)" },
      { id: "rtcxroads", name: "RTC X Roads (Green Line)" }
    ];
    
    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";
    stations.forEach((st) => {
      const optFrom = document.createElement("option");
      optFrom.value = st.id;
      optFrom.textContent = st.name;
      fromSelect.appendChild(optFrom);
      
      const optTo = document.createElement("option");
      optTo.value = st.id;
      optTo.textContent = st.name;
      if (st.id === "nagole") optTo.selected = true;
      toSelect.appendChild(optTo);
    });
  }
}

function loadGastronomyGrid() {
  const container = document.getElementById("diningGridContainer");
  if (!container) return;
  container.innerHTML = "";
  DINING_SPOTS.forEach(spot => {
    const card = document.createElement("div");
    card.className = "glass-card dining-card";
    card.innerHTML = `
      <img src="${spot.image}" alt="${spot.name}" class="dining-card-img">
      <div class="dining-meta-row">
        <span class="timeline-year" style="font-size:9px; padding:1px 6px; margin-bottom:0;">${spot.category}</span>
        <span class="dining-rating">★ ${spot.rating}</span>
      </div>
      <h4 style="font-family:var(--font-title); font-size:16px; margin-bottom:6px; color:var(--light-gold);">${spot.name}</h4>
      <p style="font-size:12.5px; color:var(--text-secondary); line-height:1.5; flex-grow:1; margin-bottom:14px;">${spot.desc}</p>
      <div class="tourist-card-meta">
        <span class="tourist-card-price">${spot.price === 0 ? 'No Fee' : `Fee: ₹${spot.price}`}</span>
        <div style="display:flex; gap:6px;">
          <button class="btn-primary" style="padding:6px 12px; font-size:11px;" onclick="openQuickBooking('${spot.name}', ${spot.price})">
            Reserve
          </button>
          <button class="btn-secondary" style="padding:6px 12px; font-size:11px;" onclick="addToCart('${spot.name}', ${spot.price}, 'Gastronomy Reservation')" title="Add to Cart">
            🛒
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function loadMoviesGrid() {
  const container = document.getElementById("moviesGridContainer");
  if (!container) return;
  container.innerHTML = "";
  MOVIE_SHOWS.forEach(movie => {
    const card = document.createElement("div");
    card.className = "glass-card movie-show-card";
    
    let timeButtonsHTML = "";
    movie.times.forEach(time => {
      timeButtonsHTML += `<span class="showtime-pill" onclick="openCinemaSeatBooking('${movie.id}', '${time}')">${time}</span>`;
    });

    card.innerHTML = `
      <div class="movie-poster-box">
        <img src="${movie.image}" alt="${movie.title}">
        <span class="movie-tech-tag">${movie.format}</span>
      </div>
      <h4 style="font-family:var(--font-title); font-size:16px; color:var(--text-primary);">${movie.title}</h4>
      <p style="font-size:12px; color:var(--text-secondary); margin-top:2px;">${movie.theater}</p>
      <div class="showtimes-row">
        ${timeButtonsHTML}
      </div>
    `;
    container.appendChild(card);
  });
}

function updateDashboardStats() {
  const bookingCount = reservationsList.length;
  document.getElementById("dashStatBookings").textContent = `${bookingCount} ${bookingCount === 1 ? 'Booking' : 'Bookings'}`;
  
  const indexNode = document.getElementById("trafficCongestionIndex");
  if (indexNode) {
    const index = Math.floor(30 + Math.random() * 20);
    indexNode.textContent = `${index}% (Moderate)`;
    document.getElementById("dashStatTraffic").textContent = index < 35 ? "Clear" : "Moderate";
  }
}

// ==========================================================================
// 5. Checkout & Booking Core REST integrations
// ==========================================================================

function openQuickBooking(itemName, itemPrice) {
  document.getElementById("checkoutModalTitle").textContent = `Book Entry: ${itemName}`;
  document.getElementById("checkoutPassItem").value = itemName;
  document.getElementById("checkoutPassPrice").value = itemPrice;
  document.getElementById("checkoutVisitorQty").value = 1;
  document.getElementById("checkoutVisitorName").value = "";
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById("checkoutVisitDate").value = tomorrow.toISOString().substring(0, 10);
  
  const qtyBlock = document.getElementById("checkoutQtyBlock");
  if (itemName.includes("Transit") || itemName.includes("Smart")) {
    qtyBlock.style.display = "none";
  } else {
    qtyBlock.style.display = "block";
  }

  updateCheckoutPrice();
  document.getElementById("checkoutModalOverlay").style.display = "flex";
}

function updateCheckoutPrice() {
  const price = +document.getElementById("checkoutPassPrice").value;
  const qty = +document.getElementById("checkoutVisitorQty").value;
  const total = price * qty;
  
  document.getElementById("checkoutBreakdownTxt").textContent = `Reservation cost: ₹${price} x ${qty}`;
  document.getElementById("checkoutTotalPrice").textContent = `₹${total}`;
}

function closeCheckoutModal() {
  document.getElementById("checkoutModalOverlay").style.display = "none";
}

// REST POST request to add booking
async function processPassBooking(e) {
  e.preventDefault();
  const itemName = document.getElementById("checkoutPassItem").value;
  const itemPrice = +document.getElementById("checkoutPassPrice").value;
  const qty = +document.getElementById("checkoutVisitorQty").value;
  const visitorName = document.getElementById("checkoutVisitorName").value;
  const visitDate = document.getElementById("checkoutVisitDate").value;
  const timeSlot = document.getElementById("checkoutTimeSlot").value;
  const totalCost = itemPrice * qty;

  const bookingId = `HYD-${Math.floor(1000 + Math.random() * 9000)}-${visitDate.split("-")[2]}`;
  const newBooking = {
    id: bookingId,
    item: itemName,
    visitor: visitorName,
    date: visitDate,
    time: timeSlot,
    qty: qty,
    cost: totalCost,
    type: itemName.includes("Pass") ? "Smart Card" : "Heritage Ticket"
  };

  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking)
    });

    if (response.ok) {
      reservationsList.push(newBooking);
      updateDashboardStats();
      closeCheckoutModal();
      displayIssuedTicket(newBooking);
      showToast(`Booking Successful: ticket saved on server!`);
    } else {
      showToast("Server rejected booking. Please try again.", "error");
    }
  } catch (error) {
    showToast("Connection failed. Saved to local queue.", "error");
  }
}

function displayIssuedTicket(booking) {
  document.getElementById("resTicketType").textContent = booking.type;
  document.getElementById("resTicketName").textContent = booking.visitor;
  document.getElementById("resTicketId").textContent = booking.id;
  document.getElementById("resTicketItem").textContent = booking.item;
  document.getElementById("resTicketDateTime").textContent = `${booking.date} | ${booking.time}`;
  document.getElementById("resTicketQty").textContent = `${booking.qty} ${booking.qty === 1 ? 'Spot' : 'Spots'}`;
  document.getElementById("resTicketCost").textContent = `₹${booking.cost}`;

  const qrCanvas = document.getElementById("ticketQrCanvas");
  const ctx = qrCanvas.getContext("2d");
  ctx.clearRect(0, 0, qrCanvas.width, qrCanvas.height);
  
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, qrCanvas.width, qrCanvas.height);
  ctx.fillStyle = "#111827";
  
  drawQRCorner(ctx, 4, 4, 18);
  drawQRCorner(ctx, 50, 4, 18);
  drawQRCorner(ctx, 4, 50, 18);
  
  for (let r = 24; r < 48; r += 4) {
    for (let c = 4; c < 68; c += 4) {
      if (Math.random() > 0.4) {
        ctx.fillRect(c, r, 3, 3);
      }
    }
  }

  if (booking.item.includes("Transit")) {
    document.getElementById("metroCardHolder").textContent = booking.visitor;
    document.getElementById("metroCardNumber").textContent = `4820 ${Math.floor(1000 + Math.random()*9000)} ${Math.floor(1000 + Math.random()*9000)} 0943`;
  }

  document.getElementById("ticketResultModalOverlay").style.display = "flex";
}

function drawQRCorner(ctx, x, y, size) {
  ctx.fillStyle = "#111827";
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x + 3, y + 3, size - 6, size - 6);
  ctx.fillStyle = "#111827";
  ctx.fillRect(x + 6, y + 6, size - 12, size - 12);
}

function closeTicketResultModal() {
  document.getElementById("ticketResultModalOverlay").style.display = "none";
}

function printIssuedTicket() {
  window.print();
}

function renderMyBookingsList() {
  const container = document.getElementById("myBookingsListContainer");
  if (!container) return;
  container.innerHTML = "";

  if (reservationsList.length === 0) {
    container.innerHTML = `
      <p style="color:var(--text-muted); font-size:13px; text-align:center; margin-top:40px;">
        No bookings or reservations made yet. Go to Landmarks or Hotels to reserve your slots!
      </p>
    `;
    return;
  }

  const sortedBookings = [...reservationsList].reverse();
  sortedBookings.forEach(booking => {
    const card = document.createElement("div");
    const isSafety = booking.type === "SOS Emergency" || booking.type === "Security Complaint";
    card.className = `booking-ticket-mini ${isSafety ? 'safety-complaint' : ''}`;
    
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span class="timeline-year" style="font-size:9px; padding:1px 6px; border-color:${isSafety ? 'var(--safety-crimson)' : 'var(--heritage-gold)'}; color:${isSafety ? 'var(--safety-crimson)' : 'var(--heritage-gold)'};">${booking.type}</span>
        <span style="font-size:11px; font-family:monospace; color:var(--text-secondary);">${booking.id}</span>
      </div>
      <h4 style="font-family:var(--font-title); font-size:14px; color:var(--text-primary);">${booking.item}</h4>
      <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary); margin-top:8px;">
        <span>Date: <strong>${booking.date}</strong></span>
        <span>Cost: <strong style="color:var(--light-gold);">₹${booking.cost}</strong></span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary); margin-top:2px;">
        <span>Passes: <strong>${booking.qty}</strong></span>
        <span>Time: <strong>${booking.time}</strong></span>
      </div>
    `;
    container.appendChild(card);
  });
}

// ==========================================================================
// 6. Cinema Seat Booking System
// ==========================================================================

function openCinemaSeatBooking(movieId, showTime) {
  const movie = MOVIE_SHOWS.find(m => m.id === movieId);
  if (!movie) return;

  activeCinemaShow = {
    movie: movie,
    time: showTime,
    selectedSeats: []
  };

  selectedCinemaSeats = [];

  document.getElementById("cinemaModalTitle").textContent = `${movie.theater} - Seating Layout`;
  document.getElementById("cinemaSelectedShow").textContent = movie.title;
  document.getElementById("cinemaSelectedTime").textContent = `Today | ${showTime}`;
  document.getElementById("cinemaSelectedSeatsTxt").textContent = "None Selected";
  document.getElementById("cinemaTotalPrice").textContent = "₹0";

  const seatGrid = document.getElementById("cinemaSeatGrid");
  seatGrid.innerHTML = "";
  const rows = ["A", "B", "C", "D", "E", "F"];

  for (let r = 0; r < 6; r++) {
    for (let c = 1; c <= 10; c++) {
      const seatCode = `${rows[r]}${c}`;
      const seat = document.createElement("div");
      seat.className = "cinema-seat";
      
      const isOccupied = Math.random() < 0.35;
      if (isOccupied) {
        seat.classList.add("occupied");
      }

      seat.setAttribute("data-seat", seatCode);
      seat.addEventListener("click", () => handleSeatSelect(seat, seatCode));
      seatGrid.appendChild(seat);
    }
  }

  document.getElementById("cinemaModalOverlay").style.display = "flex";
}

function handleSeatSelect(seatNode, seatCode) {
  if (seatNode.classList.contains("occupied")) return;

  seatNode.classList.toggle("selected");
  if (seatNode.classList.contains("selected")) {
    selectedCinemaSeats.push(seatCode);
  } else {
    selectedCinemaSeats = selectedCinemaSeats.filter(s => s !== seatCode);
  }

  const price = activeCinemaShow.movie.price;
  const total = price * selectedCinemaSeats.length;

  document.getElementById("cinemaSelectedSeatsTxt").textContent = selectedCinemaSeats.length > 0
    ? selectedCinemaSeats.join(", ")
    : "None Selected";

  document.getElementById("cinemaTotalPrice").textContent = `₹${total}`;
}

function closeCinemaModal() {
  document.getElementById("cinemaModalOverlay").style.display = "none";
}

async function confirmCinemaSeatsBooking() {
  if (selectedCinemaSeats.length === 0) {
    showToast("Please select at least one seat to proceed.", "error");
    return;
  }

  const bookingId = `HYD-IMAX-${Math.floor(1000 + Math.random()*9000)}`;
  const cost = activeCinemaShow.movie.price * selectedCinemaSeats.length;
  
  const booking = {
    id: bookingId,
    item: `${activeCinemaShow.movie.title} (${selectedCinemaSeats.join(', ')})`,
    visitor: "Nagarik Cinegoer",
    date: "Today's Show",
    time: activeCinemaShow.time,
    qty: selectedCinemaSeats.length,
    cost: cost,
    type: "Cinema Pass"
  };

  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    });

    if (response.ok) {
      reservationsList.push(booking);
      updateDashboardStats();
      closeCinemaModal();
      displayIssuedTicket(booking);
      showToast("Cinema Tickets Issued and saved on server!");
    }
  } catch (error) {
    showToast("Connection failed.", "error");
  }
}

// ==========================================================================
// 7. Live Traffic Pulse Monitor Map Rendering
// ==========================================================================

let canvas, ctx_traffic;

function initTrafficMonitor() {
  setInterval(() => {
    TRAFFIC_LINKS.forEach(link => {
      const chance = Math.random();
      if (chance > 0.8) {
        link.state = link.state === "clear" ? "moderate" : (link.state === "moderate" ? "heavy" : "clear");
      }
    });
    if (activeTab === "traffic") {
      drawTrafficCanvas();
    }
  }, 8000);
}

function loadCorridorsJunctions() {
  const container = document.getElementById("trafficCorridorsContainer");
  if (!container) return;
  container.innerHTML = "";

  TRAFFIC_LINKS.forEach(link => {
    const fromName = TRAFFIC_JUNCTIONS[link.from].name;
    const toName = TRAFFIC_JUNCTIONS[link.to].name;
    
    let tagClass = "tag-clear";
    let tagLabel = "Clear Speed";
    if (link.state === "moderate") {
      tagClass = "tag-moderate";
      tagLabel = "Slow Speed";
    } else if (link.state === "heavy") {
      tagClass = "tag-heavy";
      tagLabel = "Congested";
    }

    const item = document.createElement("div");
    item.className = "corridor-bar";
    item.innerHTML = `
      <div>
        <strong style="font-size:12.5px; color:var(--text-primary); display:block;">${link.name}</strong>
        <span style="font-size:11px; color:var(--text-secondary);">${fromName} ↔ ${toName}</span>
      </div>
      <span class="corridor-status-tag ${tagClass}">${tagLabel}</span>
    `;
    container.appendChild(item);
  });
}

function drawTrafficCanvas() {
  canvas = document.getElementById("trafficCanvas");
  if (!canvas) return;
  ctx_traffic = canvas.getContext("2d");
  
  ctx_traffic.fillStyle = "#070a13";
  ctx_traffic.fillRect(0, 0, canvas.width, canvas.height);

  ctx_traffic.strokeStyle = "rgba(13, 92, 117, 0.08)";
  ctx_traffic.lineWidth = 1.5;
  for (let x = 0; x < canvas.width; x += 30) {
    ctx_traffic.beginPath();
    ctx_traffic.moveTo(x, 0);
    ctx_traffic.lineTo(x, canvas.height);
    ctx_traffic.stroke();
  }
  for (let y = 0; y < canvas.height; y += 30) {
    ctx_traffic.beginPath();
    ctx_traffic.moveTo(0, y);
    ctx_traffic.lineTo(canvas.width, y);
    ctx_traffic.stroke();
  }

  TRAFFIC_LINKS.forEach(link => {
    const fromNode = TRAFFIC_JUNCTIONS[link.from];
    const toNode = TRAFFIC_JUNCTIONS[link.to];
    
    ctx_traffic.beginPath();
    ctx_traffic.moveTo(fromNode.x, fromNode.y);
    ctx_traffic.lineTo(toNode.x, toNode.y);
    
    let strokeCol = "#10b981";
    if (link.state === "moderate") strokeCol = "#d4af37";
    else if (link.state === "heavy") strokeCol = "#ef4444";

    ctx_traffic.strokeStyle = strokeCol;
    ctx_traffic.lineWidth = link.state === "heavy" ? 4.5 : 3.0;
    ctx_traffic.stroke();
  });

  TRAFFIC_JUNCTIONS.forEach(node => {
    ctx_traffic.beginPath();
    ctx_traffic.arc(node.x, node.y, node.size, 0, 2 * Math.PI);
    ctx_traffic.fillStyle = "var(--light-gold)";
    ctx_traffic.shadowColor = "var(--heritage-gold)";
    ctx_traffic.shadowBlur = 8;
    ctx_traffic.fill();
    ctx_traffic.shadowBlur = 0;

    ctx_traffic.beginPath();
    ctx_traffic.arc(node.x, node.y, node.size + 4, 0, 2 * Math.PI);
    ctx_traffic.strokeStyle = "rgba(212, 175, 55, 0.3)";
    ctx_traffic.lineWidth = 1.0;
    ctx_traffic.stroke();

    ctx_traffic.fillStyle = "var(--text-primary)";
    ctx_traffic.font = "bold 9.5px Outfit";
    ctx_traffic.textAlign = node.textPos === "right" ? "left" : (node.textPos === "left" ? "right" : "center");
    
    let textY = node.y;
    let textX = node.x;
    if (node.textPos === "top") textY -= 15;
    else if (node.textPos === "bottom") textY += 20;
    else if (node.textPos === "right") textX += 14;
    else if (node.textPos === "left") textX -= 14;

    ctx_traffic.fillText(node.name, textX, textY);
  });

  loadCorridorsJunctions();
}

// ==========================================================================
// 8. Nagarik Safety Emergency SOS & Redirection Terminal Sim
// ==========================================================================

async function triggerRapidSOS() {
  showToast("SOS Beacon alerted! Broad-casting live coordinates to dispatcher...", "error");
  
  const bookingId = `SOS-${Math.floor(1000 + Math.random()*9000)}`;
  const booking = {
    id: bookingId,
    item: "Urgent Location SOS Beacon Active",
    visitor: "Active System GPS",
    date: new Date().toISOString().substring(0, 10),
    time: "Immediate Dispatch",
    qty: 1,
    cost: 0,
    type: "SOS Emergency"
  };

  try {
    const response = await fetch("/api/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    });

    if (response.ok) {
      reservationsList.push(booking);
      updateDashboardStats();
      setTimeout(() => toggleBookingsPanel(), 1000);
    }
  } catch (error) {
    // Graceful offline append
    reservationsList.push(booking);
    updateDashboardStats();
  }
}

let terminalTimer;
function submitPoliceComplaint(e) {
  e.preventDefault();
  const category = document.getElementById("complaintType").value;
  const name = document.getElementById("complaintReporter").value;
  const location = document.getElementById("complaintLocation").value;
  const details = document.getElementById("complaintDetails").value;

  const overlay = document.getElementById("policeRedirectionOverlay");
  const outputNode = document.getElementById("policeTerminalOutput");
  const terminateBtn = document.getElementById("terminateTerminalBtn");

  overlay.style.display = "flex";
  outputNode.innerHTML = "";
  terminateBtn.style.display = "none";

  const lines = [
    `[NAGARIK SECURE SYSTEM CHANNELS CONNECTING...]`,
    `>> PINGING COMMISSIONERATE CENTRAL GATEWAY AT: hyd.hyderabadpolice.gov.in`,
    `>> ESTABLISHING 256-BIT ENCRYPTED TUNNEL PROTOCOL...`,
    `>> STATUS: ENCRYPTION SECURED ✔`,
    `>> SUBMITTING CLASSIFIED DISPATCH ENVELOPE:`,
    `   - REPORTER NAME   : ${name}`,
    `   - CATEGORY        : ${category}`,
    `   - JUNCTION HUB    : ${location}`,
    `   - INCIDENT DETAILS: ${details.substring(0, 30)}...`,
    `>> CONTACTING LOCAL COMMISSIONER REGIONAL BASE STATIONS...`,
    `>> DISPATCHING SHE TEAMS patrol bikes if required...`,
    `>> INCIDENT CLASSIFIED AND LOGGED. CASE ID: TG-COMP-${Math.floor(10000 + Math.random()*90000)}`,
    `>> REDIRECTING TERMINAL LINK SECURELY TO PORTAL GATEWAY IN 5 SECONDS...`
  ];

  let currentLineIdx = 0;
  
  function printTerminalLine() {
    if (currentLineIdx < lines.length) {
      const p = document.createElement("div");
      p.textContent = lines[currentLineIdx];
      
      if (currentLineIdx === 0) p.style.color = "var(--heritage-gold)";
      if (lines[currentLineIdx].includes("CASE ID")) p.style.color = "var(--accent-emerald)";
      
      outputNode.appendChild(p);
      outputNode.scrollTop = outputNode.scrollHeight;
      currentLineIdx++;
      
      terminalTimer = setTimeout(printTerminalLine, 400);
    } else {
      startRedirectionCountdown();
    }
  }

  printTerminalLine();
}

function startRedirectionCountdown() {
  const outputNode = document.getElementById("policeTerminalOutput");
  const terminateBtn = document.getElementById("terminateTerminalBtn");
  
  let countdown = 5;
  const p = document.createElement("div");
  p.style.color = "var(--safety-crimson)";
  p.style.fontWeight = "bold";
  outputNode.appendChild(p);
  terminateBtn.style.display = "inline-block";

  function countTick() {
    if (countdown > 0) {
      p.textContent = `>> REDIRECTING DETAILED REPORT DISPATCH IN: ${countdown} SECONDS...`;
      countdown--;
      terminalTimer = setTimeout(countTick, 1000);
    } else {
      p.textContent = ">> GATEWAY SUCCESSFUL. TRANSFERRED TO hyd.hyderabadpolice.gov.in";
      
      const bookingId = `CASE-${Math.floor(1000 + Math.random()*9000)}`;
      const booking = {
        id: bookingId,
        item: `Redirection Dispatch Token: ${document.getElementById("complaintType").value}`,
        visitor: document.getElementById("complaintReporter").value,
        date: new Date().toISOString().substring(0, 10),
        time: document.getElementById("complaintLocation").value,
        qty: 1,
        cost: 0,
        type: "Security Complaint"
      };

      // POST complaint to server database
      saveComplaintToServer(booking);
    }
  }

  countTick();
}

async function saveComplaintToServer(booking) {
  try {
    const response = await fetch("/api/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    });

    if (response.ok) {
      reservationsList.push(booking);
      updateDashboardStats();
      showToast("Security Dispatch logged successfully on server!");
      
      setTimeout(() => {
        closePoliceTerminalSim();
        document.getElementById("policeComplaintForm").reset();
        toggleBookingsPanel();
      }, 1200);
    }
  } catch (error) {
    showToast("Incident logged locally.", "error");
  }
}

function closePoliceTerminalSim() {
  clearTimeout(terminalTimer);
  document.getElementById("policeRedirectionOverlay").style.display = "none";
}

// ==========================================================================
// 9. Smart City Enhanced Engines
// ==========================================================================

/* 9.1 Unified Booking Cart Logic */
function toggleCartPanel() {
  const panel = document.getElementById("cartPanel");
  panel.classList.toggle("open");
  if (panel.classList.contains("open")) {
    renderCartItemsList();
  }
}

function addToCart(itemName, itemPrice, type = "Heritage Ticket", customData = {}) {
  const cartItem = {
    id: `CART-${Math.floor(1000 + Math.random() * 9000)}`,
    item: itemName,
    price: itemPrice,
    qty: customData.qty || 1,
    type: type,
    date: customData.date || new Date().toISOString().substring(0, 10),
    time: customData.time || "Evening (03:00 PM)",
    visitor: customData.visitor || "Nagarik Guest"
  };
  
  shoppingCart.push(cartItem);
  updateCartBadge();
  showToast(`Added ${itemName} to Cart!`);
}

function updateCartBadge() {
  const badge = document.getElementById("cartCount");
  badge.textContent = shoppingCart.length;
  badge.style.display = shoppingCart.length > 0 ? "flex" : "none";
  
  const statCount = document.getElementById("dashStatCartCount");
  if (statCount) {
    statCount.textContent = `${shoppingCart.length} ${shoppingCart.length === 1 ? 'Item' : 'Items'}`;
  }
}

function removeFromCart(itemId) {
  shoppingCart = shoppingCart.filter(item => item.id !== itemId);
  updateCartBadge();
  renderCartItemsList();
  showToast("Removed item from cart.", "error");
}

function renderCartItemsList() {
  const container = document.getElementById("cartItemsListContainer");
  const summaryBlock = document.getElementById("cartSummaryBlock");
  
  if (!container) return;
  container.innerHTML = "";
  
  if (shoppingCart.length === 0) {
    container.innerHTML = `
      <p style="color: var(--text-muted); font-size: 13px; text-align: center; margin-top: 40px;">
        Your cart is empty. Explore tourist landmarks or dining spots to add booking items!
      </p>
    `;
    summaryBlock.style.display = "none";
    return;
  }
  
  let subtotal = 0;
  shoppingCart.forEach(item => {
    subtotal += item.price * item.qty;
    const card = document.createElement("div");
    card.className = "booking-ticket-mini";
    card.style.position = "relative";
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span class="timeline-year" style="font-size:9px; padding:1px 6px;">${item.type}</span>
        <button onclick="removeFromCart('${item.id}')" style="background:transparent; border:none; color:var(--safety-crimson); font-size:16px; cursor:pointer; position:absolute; top:12px; right:12px;">&times;</button>
      </div>
      <h4 style="font-family:var(--font-title); font-size:14px; color:var(--text-primary); margin-right:20px;">${item.item}</h4>
      <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary); margin-top:8px;">
        <span>Qty: <strong>${item.qty}</strong></span>
        <span>Cost: <strong style="color:var(--light-gold);">₹${item.price * item.qty}</strong></span>
      </div>
      <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">
        <span>Sched: <strong>${item.date} | ${item.time}</strong></span>
      </div>
    `;
    container.appendChild(card);
  });
  
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;
  
  document.getElementById("cartSubtotalVal").textContent = `₹${subtotal}`;
  document.getElementById("cartCessVal").textContent = `₹${tax}`;
  document.getElementById("cartTotalVal").textContent = `₹${total}`;
  summaryBlock.style.display = "block";
}

async function checkoutUnifiedCart() {
  if (shoppingCart.length === 0) return;
  
  let successCount = 0;
  for (const item of shoppingCart) {
    const bookingId = `HYD-${Math.floor(1000 + Math.random() * 9000)}-CHECKOUT`;
    const newBooking = {
      id: bookingId,
      item: item.item,
      visitor: item.visitor,
      date: item.date,
      time: item.time,
      qty: item.qty,
      cost: item.price * item.qty,
      type: item.type
    };
    
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking)
      });
      if (response.ok) {
        reservationsList.push(newBooking);
        successCount++;
      }
    } catch (e) {
      reservationsList.push(newBooking);
      successCount++;
    }
  }
  
  shoppingCart = [];
  updateCartBadge();
  toggleCartPanel();
  updateDashboardStats();
  showToast(`Successfully processed checkout! Issued ${successCount} booking tokens.`);
  setTimeout(() => toggleBookingsPanel(), 1000);
}

/* 9.2 AI Chatbot Assistant ("Hyderabad Guide") */
function toggleChatbotWindow() {
  const win = document.getElementById("chatbotWindow");
  win.classList.toggle("open");
}

function sendChatbotMsg() {
  const input = document.getElementById("chatbotInput");
  const msgText = input.value.trim();
  if (!msgText) return;
  
  appendChatMsg(msgText, "user");
  input.value = "";
  
  setTimeout(() => {
    const reply = getChatbotResponse(msgText);
    appendChatMsg(reply, "bot");
  }, 600);
}

function handleChatPrompt(promptText) {
  toggleChatbotWindow();
  appendChatMsg(promptText, "user");
  setTimeout(() => {
    const reply = getChatbotResponse(promptText);
    appendChatMsg(reply, "bot");
  }, 600);
}

function appendChatMsg(text, sender) {
  const container = document.getElementById("chatbotMessages");
  const msg = document.createElement("div");
  msg.className = `chat-msg ${sender}`;
  msg.innerHTML = formatMarkdownLikeText(text);
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
  
  if (sender === "bot") {
    triggerTTSRead(text);
  }
}

function formatMarkdownLikeText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

function getChatbotResponse(msg) {
  const text = msg.toLowerCase();
  
  if (text.includes("biryani") || text.includes("food") || text.includes("eat") || text.includes("chai")) {
    return "For an authentic taste of Hyderabad, I highly recommend: \n1. **Paradise Biryani** in Secunderabad for Nizami Dum Biryani.\n2. **Cafe Niloufer** at Lakdikapul for vintage *Irani Chai* and hot *Osmania biscuits*.\n3. **Hotel Shadab** near the High Court for rich seasonal *Mutton Haleem*.\nWould you like me to book a table reservation for one of these spots?";
  }
  
  if (text.includes("tourist") || text.includes("sight") || text.includes("palace") || text.includes("monument") || text.includes("landmark")) {
    return "Hyderabad is rich with history! Must-visit places are:\n1. **Charminar**: Our signature 1591 monument built by Sultan Muhammad Quli Qutb Shah.\n2. **Golconda Fort**: Famed for acoustic chambers and the birthplace of the Koh-i-Noor diamond.\n3. **Chowmahalla Palace**: The glorious durbar seat of the Nizams styled after Tehran's Shah palaces.\nYou can book entries for these directly under the **Tourist Landmarks** tab!";
  }
  
  if (text.includes("metro") || text.includes("transit") || text.includes("route") || text.includes("bus")) {
    return "Hyderabad Metro operates three smart corridors:\n- **Red Line** (Miyapur to L.B. Nagar)\n- **Blue Line** (Nagole to Raidurg)\n- **Green Line** (JBS Parade Ground to MGBS)\nYou can purchase a **Smart card pass (₹250)** directly on our **Public Transit Hub** tab for unlimited travel across the metro and TSRTC bus fleets!";
  }
  
  if (text.includes("itinerary") || text.includes("plan") || text.includes("day")) {
    return "I can help you build an incredible custom plan! Please switch to the **Plan My Day** tab in the sidebar navigation. You can input your budget, starting hub, and interest themes, and I will instantly optimize a chronological timeline route for you.";
  }
  
  if (text.includes("gem") || text.includes("hidden") || text.includes("walk")) {
    return "Looking for offbeat adventures? Try these hidden gems:\n1. **Khajaguda Rock Ridge**: Standard rock climbing path with 2.5 billion year old granite rocks.\n2. **Paigah Tombs**: Stunning stucco layouts and silent heritage tombs.\n3. **Laad Bazaar Heritage Walk**: Walk through pearl bazaars near Charminar.\nYou can find details and trail timings in our **Discover Hyderabad** tab!";
  }

  if (text.includes("shopping") || text.includes("mall") || text.includes("bazaar")) {
    return "For shopping in Hyderabad:\n1. **Laad Bazaar**: Famous pearl and bangle shopping near Charminar.\n2. **Inorbit Mall Cyberabad**: Modern shopping corridor overlooking Durgam Cheruvu lake.\n3. **Jubilee Hills Ridge**: High-end fashion boutiques and luxury outlets.";
  }
  
  return "I'm the **Hyderabad Guide**, a smart assistant programmed with local Nizam insights. I can guide you to our legendary Biryani cafes, historic monuments, metro services, or build you a personalized day itinerary! \n\nTry asking: *'Where can I get the best Irani Chai?'* or *'Tell me about Golconda Fort'*.";
}

/* 9.3 Interactive City Map canvas rendering */
function drawInteractiveMap() {
  const canvas = document.getElementById("interactiveCityMapCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  ctx.fillStyle = "#070a13";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Grid Lines
  ctx.strokeStyle = "rgba(13, 92, 117, 0.08)";
  ctx.lineWidth = 1.5;
  for (let x = 0; x < canvas.width; x += 30) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 30) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }
  
  // Outer Ring Road loop simulation
  ctx.beginPath();
  ctx.ellipse(275, 200, 230, 160, 0, 0, 2 * Math.PI);
  ctx.strokeStyle = "rgba(212, 175, 55, 0.12)";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = "rgba(212, 175, 55, 0.03)";
  ctx.fill();

  // Musi River flowing across map
  ctx.beginPath();
  ctx.moveTo(30, 270);
  ctx.bezierCurveTo(150, 240, 280, 290, 520, 250);
  ctx.strokeStyle = "rgba(37, 99, 235, 0.25)";
  ctx.lineWidth = 8;
  ctx.stroke();
  
  // Labels for major hubs
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.font = "800 11px Outfit";
  ctx.fillText("CYBERABAD (TECH HUB)", 40, 60);
  ctx.fillText("OLD CITY (HERITAGE HUB)", 270, 380);
  ctx.fillText("SECUNDERABAD (TRANSIT HUB)", 320, 50);

  // Filters state
  const filterAtt = document.getElementById("filterAttractions").checked;
  const filterMet = document.getElementById("filterMetro").checked;
  const filterDin = document.getElementById("filterDining").checked;
  const filterSaf = document.getElementById("filterSafety").checked;

  MAP_LOCATIONS.forEach(loc => {
    let show = false;
    let pinColor = "#ffe79a"; // Light Gold
    
    if (loc.category === "Attractions" && filterAtt) { show = true; pinColor = "var(--heritage-gold)"; }
    else if (loc.category === "Metro" && filterMet) { show = true; pinColor = "#3b82f6"; } // Blue
    else if (loc.category === "Dining" && filterDin) { show = true; pinColor = "var(--accent-emerald)"; } // Emerald
    else if (loc.category === "Safety" && filterSaf) { show = true; pinColor = "var(--safety-crimson)"; } // Crimson
    
    if (!show) return;
    
    // Draw pulsing base
    ctx.beginPath();
    ctx.arc(loc.x, loc.y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = pinColor;
    ctx.shadowColor = pinColor;
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Draw core
    ctx.beginPath();
    ctx.arc(loc.x, loc.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    
    // Label text
    ctx.fillStyle = "var(--text-secondary)";
    ctx.font = "bold 9px Inter";
    ctx.fillText(loc.name.split(" ")[0], loc.x - 15, loc.y - 12);
  });
}

function handleMapCanvasClick(event) {
  const canvas = document.getElementById("interactiveCityMapCanvas");
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;
  
  // Find closest point
  let closestLoc = null;
  let minDist = 25; // Click radius
  
  MAP_LOCATIONS.forEach(loc => {
    const dist = Math.sqrt((loc.x - clickX)**2 + (loc.y - clickY)**2);
    if (dist < minDist) {
      minDist = dist;
      closestLoc = loc;
    }
  });
  
  if (closestLoc) {
    displayMapLocationCard(closestLoc);
  }
}

function displayMapLocationCard(loc) {
  const sidebar = document.getElementById("mapLocationDetailCard");
  if (!sidebar) return;
  
  // Dynamically update Google Map iframe source if available
  const gmapIframe = document.getElementById("googleMapIframe");
  if (gmapIframe && loc.query) {
    gmapIframe.src = `https://maps.google.com/maps?q=${encodeURIComponent(loc.query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  }
  
  const priceLabel = loc.price === 0 ? "Free Entry" : (loc.price === 10 ? "Transit Pass Required" : `₹${loc.price}`);
  const ratingRow = loc.rating 
    ? `<div class="review-stars-row"><span>★ ${loc.rating}</span> <span style="color:var(--text-muted); font-size:11px;">(Avg User Rating)</span></div>`
    : "";
    
  // Render active reviews scroller
  const reviews = userReviewsDatabase.filter(r => r.location === loc.name);
  let reviewsHTML = "";
  if (reviews.length > 0) {
    reviews.forEach(r => {
      reviewsHTML += `
        <div class="review-comment-node">
          <div style="display:flex; justify-content:space-between; font-weight:bold; margin-bottom:2px;">
            <span>${r.author}</span>
            <span style="color:var(--heritage-gold);">★ ${r.rating}</span>
          </div>
          <p style="color:var(--text-secondary); line-height:1.4;">${r.comment}</p>
        </div>
      `;
    });
  } else {
    reviewsHTML = `<p style="color:var(--text-muted); font-size:11px; text-align:center; padding:10px;">No reviews left yet. Be the first to share your experience!</p>`;
  }

  sidebar.style.textAlign = "left";
  sidebar.style.alignItems = "stretch";
  sidebar.style.justifyContent = "flex-start";
  
  sidebar.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
      <span class="timeline-year" style="font-size:9px; padding:1px 6px; margin:0;">${loc.category}</span>
      <span style="font-size:12px; font-weight:700; color:var(--light-gold);">${priceLabel}</span>
    </div>
    <h3 style="font-family:var(--font-title); font-size:18px; color:var(--text-primary); margin-bottom:6px;">${loc.name}</h3>
    ${ratingRow}
    <p style="font-size:12.5px; color:var(--text-secondary); line-height:1.5; margin:12px 0 16px 0;">${loc.desc || 'A signature smart destination situated on the high-fidelity Deccan coordinates.'}</p>
    
    <div style="display:flex; gap:8px; margin-bottom:18px;">
      <button class="btn-primary" style="flex-grow:1; justify-content:center; padding:6px 12px; font-size:11.5px;" onclick="addToCart('${loc.name}', ${loc.price === 10 ? 250 : loc.price}, '${loc.category === 'Dining' ? 'Gastronomy Reservation' : 'Heritage Ticket'}')">
        Add to Cart
      </button>
      <button class="btn-secondary" style="flex-grow:1; justify-content:center; padding:6px 12px; font-size:11.5px;" onclick="openQuickBooking('${loc.name}', ${loc.price === 10 ? 250 : loc.price})">
        Book Spot
      </button>
    </div>

    <!-- Review System -->
    <div class="reviews-accordion-section">
      <h4 style="font-family:var(--font-title); font-size:13px; color:var(--light-gold); margin-bottom:8px; display:flex; justify-content:space-between;">
        <span>Nagarik Reviews Feed</span>
        <button class="showtime-pill" style="font-size:9.5px; padding:1px 6px; height:auto; margin:0;" onclick="toggleWriteReviewForm('${loc.name}')">Write</button>
      </h4>
      <div class="reviews-scroller" id="reviewsScrollerContainer">
        ${reviewsHTML}
      </div>
      
      <!-- Hidden Review Form -->
      <form id="writeReviewFormBlock" style="display:none; border-top:1px dashed rgba(255,255,255,0.06); padding-top:10px;" onsubmit="submitUserReview(event, '${loc.name}')">
        <div class="grid-2" style="gap:10px; margin-bottom:8px;">
          <input type="text" id="reviewAuthor" class="form-control" placeholder="Your Name" style="padding:6px 8px; font-size:11.5px; height:28px;" required>
          <select id="reviewRating" class="form-control" style="padding:4px 8px; font-size:11.5px; height:28px;" required>
            <option value="5">★ 5 Stars</option>
            <option value="4">★ 4 Stars</option>
            <option value="3">★ 3 Stars</option>
            <option value="2">★ 2 Stars</option>
            <option value="1">★ 1 Star</option>
          </select>
        </div>
        <textarea id="reviewComment" class="form-control" rows="2" placeholder="Share your experience details..." style="padding:6px 8px; font-size:11.5px; margin-bottom:8px;" required></textarea>
        
        <!-- Photo upload simulation UI -->
        <div style="margin-bottom:8px; display:flex; align-items:center; gap:8px;">
          <input type="file" id="reviewPhoto" style="display:none;" onchange="handleSimulatedPhotoUpload(this)">
          <button type="button" class="btn-secondary" style="padding:4px 8px; font-size:10px;" onclick="document.getElementById('reviewPhoto').click()">📷 Add Photo</button>
          <span id="reviewPhotoName" style="font-size:10px; color:var(--text-muted);">No photo selected</span>
        </div>

        <button type="submit" class="btn-primary" style="width:100%; justify-content:center; padding:4px 8px; font-size:11px;">Submit Review</button>
      </form>
    </div>
  `;
  
  // Attach Canvas Click Handler dynamically if not done
  const canvas = document.getElementById("interactiveCityMapCanvas");
  if (canvas && !canvas.getAttribute("data-clicked-bound")) {
    canvas.setAttribute("data-clicked-bound", "true");
    canvas.addEventListener("click", handleMapCanvasClick);
  }
}

function toggleWriteReviewForm(locName) {
  const form = document.getElementById("writeReviewFormBlock");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function handleSimulatedPhotoUpload(input) {
  const label = document.getElementById("reviewPhotoName");
  if (input.files && input.files[0]) {
    label.textContent = `Attached: ${input.files[0].name.substring(0, 15)}...`;
    label.style.color = "var(--accent-emerald)";
  }
}

async function submitUserReview(e, locationName) {
  e.preventDefault();
  const author = document.getElementById("reviewAuthor").value;
  const rating = +document.getElementById("reviewRating").value;
  const comment = document.getElementById("reviewComment").value;
  
  const newReview = {
    id: `REV-${Math.floor(1000 + Math.random()*9000)}`,
    location: locationName,
    author: author,
    rating: rating,
    comment: comment,
    date: new Date().toISOString().substring(0, 10)
  };
  
  try {
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview)
    });
    if (response.ok) {
      userReviewsDatabase.push(newReview);
      showToast("Review submitted successfully!");
      // Reload card
      const loc = MAP_LOCATIONS.find(l => l.name === locationName);
      if (loc) displayMapLocationCard(loc);
    }
  } catch (err) {
    userReviewsDatabase.push(newReview);
    showToast("Review saved locally!");
    const loc = MAP_LOCATIONS.find(l => l.name === locationName);
    if (loc) displayMapLocationCard(loc);
  }
}

/* 9.4 Itinerary Day Planner ("Plan My Hyderabad Day") */
let generatedPlannerItinerary = [];

function generateItinerary(e) {
  e.preventDefault();
  const start = document.getElementById("plannerStart").value;
  const budget = +document.getElementById("plannerBudget").value;
  const duration = +document.getElementById("plannerHours").value;
  
  const checkBoxes = document.getElementsByName("plannerInterests");
  const interests = [];
  checkBoxes.forEach(cb => {
    if (cb.checked) interests.push(cb.value);
  });
  
  if (interests.length === 0) {
    showToast("Please select at least one interest.", "error");
    return;
  }

  showToast("Computing optimized route path...");
  
  // Filter attractions matching budget and interests
  let places = [];
  
  // Charminar
  if (interests.includes("History")) {
    places.push({ name: "Charminar Monument", price: 40, time: "1.5 hours", desc: "Climb minarets and explore the historical arches.", id: "charminar" });
    places.push({ name: "Golconda Fortress", price: 50, time: "2.5 hours", desc: "Climb battlements and check acoustic echoes.", id: "golconda" });
    places.push({ name: "Chowmahalla Palace", price: 80, time: "2 hours", desc: "Inspect royal Nizam vintage cars and chandeliers.", id: "chowmahalla" });
  }
  if (interests.includes("Food")) {
    places.push({ name: "Cafe Niloufer Lakdikapul", price: 50, time: "1 hour", desc: "Take vintage tea and Osmania biscuits.", id: "niloufer" });
    places.push({ name: "Paradise Biryani Hub", price: 150, time: "1.5 hours", desc: "Relish authentic Nizami Dum Biryani.", id: "paradise" });
  }
  if (interests.includes("Shopping")) {
    places.push({ name: "Laad Bazaar Pearls Shopping", price: 200, time: "2 hours", desc: "Shop pearls and heritage bangles near old city lanes.", id: "laadbazaar" });
  }
  if (interests.includes("Nature")) {
    places.push({ name: "Khajaguda Rocks Sunset Hike", price: 0, time: "2 hours", desc: "Experience gorgeous views on 2.5B year old cliffs.", id: "khajaguda" });
  }
  if (interests.includes("Entertainment")) {
    places.push({ name: "Prasad's IMAX Screen Movie", price: 250, time: "3 hours", desc: "Catch high-action blockbusters on mega IMAX projection.", id: "prasad" });
  }
  
  // Cap by duration & budget
  let totalCost = 0;
  let totalHours = 0;
  let timeline = [];
  
  // Add Start Node
  timeline.push({
    timeText: "09:00 AM",
    title: `Starting Point: ${start}`,
    desc: "Commence your customized day trail from your regional location.",
    cost: 0,
    transit: "Metro Ride / TSRTC local transit"
  });
  
  let currentHour = 10;
  places.forEach((p, idx) => {
    // Check constraints
    const hoursNeeded = parseFloat(p.time);
    if (totalHours + hoursNeeded + 1.0 > duration) return; // Cap by hours (leaves transit margin)
    
    if (budget === 0 && p.price > 100) return; // budget tier
    if (budget === 1 && p.price > 300) return;
    
    totalCost += p.price;
    totalHours += hoursNeeded + 1.0; // include transit time
    
    timeline.push({
      timeText: `${currentHour}:00 ${currentHour >= 12 ? 'PM' : 'AM'}`,
      title: p.name,
      desc: p.desc,
      cost: p.price,
      transit: `Transit to next point (Auto-rickshaw / Metro)`
    });
    
    currentHour = (currentHour + Math.ceil(hoursNeeded + 1)) % 12;
    if (currentHour === 0) currentHour = 12;
  });

  // End Node
  timeline.push({
    timeText: `${currentHour}:30 ${currentHour >= 12 ? 'PM' : 'AM'}`,
    title: "Trail Completed",
    desc: "Optimized route loops back. Passes saved on unified checkout cart.",
    cost: 0,
    transit: "Return Metro corridor ride"
  });

  generatedPlannerItinerary = timeline;

  // Render Sidebar Summary
  const resultsSidebar = document.getElementById("plannerResultsSidebar");
  resultsSidebar.innerHTML = `
    <div class="glass-card-header">
      <h3>Itinerary Summary</h3>
    </div>
    <div style="font-size:13px; color:var(--text-secondary); display:flex; flex-direction:column; gap:10px;">
      <p>🎯 Starting: <strong>${start}</strong></p>
      <p>🕒 Sched Duration: <strong>${duration} Hours</strong></p>
      <p>💰 Est total ticket cost: <strong style="color:var(--heritage-gold);">₹${totalCost}</strong></p>
      <p>🚇 Recommended Transit: <strong>HydraPass Metro Transit</strong></p>
    </div>
  `;
  document.getElementById("plannerAddAllBlock").style.display = totalCost > 0 ? "block" : "none";

  // Render Timeline Flow
  const timelineContainer = document.getElementById("itineraryTimelineFlowContainer");
  timelineContainer.innerHTML = "";
  timeline.forEach(node => {
    const nodeBlock = document.createElement("div");
    nodeBlock.className = "timeline-flow-node";
    nodeBlock.innerHTML = `
      <span class="timeline-year" style="font-size:10px; margin-bottom:4px;">${node.timeText}</span>
      <h4 style="font-family:var(--font-title); font-size:15px; color:var(--light-gold); margin-bottom:4px;">${node.title}</h4>
      <p style="font-size:12.5px; color:var(--text-secondary); line-height:1.5;">${node.desc}</p>
      <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-muted); margin-top:8px; border-top:1px solid rgba(255,255,255,0.03); padding-top:6px;">
        <span>Est Cost: <strong>₹${node.cost}</strong></span>
        <span>Route Transit: <strong>${node.transit}</strong></span>
      </div>
    `;
    timelineContainer.appendChild(nodeBlock);
  });

  document.getElementById("itineraryTimelineSection").style.display = "block";
}

function addAllItineraryToCart() {
  if (generatedPlannerItinerary.length === 0) return;
  
  let addedCount = 0;
  generatedPlannerItinerary.forEach(node => {
    if (node.cost > 0) {
      addToCart(node.title, node.cost, "Itinerary Pass");
      addedCount++;
    }
  });
  
  showToast(`Added ${addedCount} optimized itinerary passes to Cart!`);
  setTimeout(() => toggleCartPanel(), 1000);
}

/* 9.5 Local Experiences & Curations */
function loadDashboardEvents() {
  const container = document.getElementById("dashboardEventsContainer");
  if (!container) return;
  container.innerHTML = "";
  
  UPCOMING_EVENTS.slice(0, 2).forEach(evt => {
    const card = document.createElement("div");
    card.className = "glass-card";
    card.style.padding = "16px";
    card.style.background = "rgba(255,255,255,0.01)";
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span class="timeline-year" style="font-size:10px; padding:1px 6px;">${evt.category}</span>
        <span style="font-size:11px; color:var(--text-secondary);">${evt.time}</span>
      </div>
      <h4 style="font-family:var(--font-title); font-size:14px; margin-bottom:6px; color:var(--light-gold);">${evt.name}</h4>
      <p style="font-size:12px; color:var(--text-secondary); line-height:1.5; margin-bottom:10px;">${evt.desc}</p>
      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.03); padding-top:8px;">
        <span style="font-size:12px; font-weight:bold; color:var(--light-gold);">₹${evt.price}</span>
        <button class="btn-primary" style="padding:4px 8px; font-size:10px;" onclick="addToCart('${evt.name}', ${evt.price}, 'Event Ticket')">🛒 Add</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function loadDashboardMetroUpdates() {
  const container = document.getElementById("dashboardMetroUpdatesContainer");
  if (!container) return;
  container.innerHTML = "";
  
  METRO_LINES.forEach(line => {
    const bar = document.createElement("div");
    bar.className = `metro-route-bar ${line.class}`;
    bar.style.padding = "8px 12px";
    bar.innerHTML = `
      <div>
        <strong style="font-size:12.5px; color:var(--text-primary);">${line.line} Corridor</strong>
        <span style="font-size:11px; color:var(--text-secondary); display:block;">Interval: ${line.stations.split(" ")[0]} Stations</span>
      </div>
      <span style="font-size:11px; font-weight:700; color:var(--accent-emerald);">● Normal</span>
    `;
    container.appendChild(bar);
  });
}

function loadExperiencesGrid() {
  const container = document.getElementById("experiencesGridContainer");
  if (!container) return;
  container.innerHTML = "";
  
  LOCAL_EXPERIENCES.forEach(exp => {
    if (activeExperienceFilter !== "all" && exp.category !== activeExperienceFilter) return;
    
    const card = document.createElement("div");
    card.className = "glass-card dining-card";
    card.style.height = "100%";
    card.innerHTML = `
      <img src="${exp.image}" alt="${exp.name}" class="dining-card-img" style="height:150px;">
      <div class="dining-meta-row">
        <span class="timeline-year" style="font-size:9px; padding:1px 6px; margin-bottom:0;">${exp.category} Trail</span>
        <span style="font-size:11.5px; color:var(--text-secondary);">🕒 ${exp.duration}</span>
      </div>
      <h4 style="font-family:var(--font-title); font-size:15px; margin-bottom:6px; color:var(--light-gold);">${exp.name}</h4>
      <p style="font-size:12px; color:var(--text-secondary); line-height:1.5; flex-grow:1; margin-bottom:12px;">${exp.desc}</p>
      <div class="tourist-card-meta">
        <span class="tourist-card-price">${exp.price === 0 ? 'Free Slot' : `₹${exp.price}`}</span>
        <div style="display:flex; gap:6px;">
          <button class="btn-primary" style="padding:4px 8px; font-size:10.5px;" onclick="openQuickBooking('${exp.name}', ${exp.price})">Book</button>
          <button class="btn-secondary" style="padding:4px 8px; font-size:10.5px;" onclick="addToCart('${exp.name}', ${exp.price}, 'Experiences Ticket')">🛒</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterExperiences(category) {
  activeExperienceFilter = category;
  
  const buttons = document.querySelectorAll(".experiences-category-row button");
  buttons.forEach(btn => {
    if (btn.textContent.includes(category) || (category === "all" && btn.textContent.includes("All"))) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  
  loadExperiencesGrid();
}

async function submitLostFoundReport(e) {
  e.preventDefault();
  const name = document.getElementById("lostItemName").value;
  const location = document.getElementById("lostLocation").value;
  const contact = document.getElementById("lostContact").value;
  
  const reportId = `LOST-${Math.floor(1000 + Math.random()*9000)}`;
  const newReport = {
    id: reportId,
    item: `Reported Lost/Found: ${name}`,
    visitor: `Contact: ${contact}`,
    date: new Date().toISOString().substring(0, 10),
    time: `Location: ${location}`,
    qty: 1,
    cost: 0,
    type: "SOS Emergency"
  };
  
  try {
    const response = await fetch("/api/lostfound", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReport)
    });
    if (response.ok) {
      localLostFoundLogs.push(newReport);
      reservationsList.push(newReport);
      updateDashboardStats();
      showToast("Lost & Found report logged successfully!");
      document.getElementById("lostFoundForm").reset();
      setTimeout(() => toggleBookingsPanel(), 1000);
    }
  } catch (err) {
    localLostFoundLogs.push(newReport);
    reservationsList.push(newReport);
    updateDashboardStats();
    showToast("Report logged locally!");
    document.getElementById("lostFoundForm").reset();
    setTimeout(() => toggleBookingsPanel(), 1000);
  }
}

function toggleNotificationsPanel() {
  const panel = document.getElementById("notificationsPanel");
  panel.classList.toggle("open");
  if (panel.classList.contains("open")) {
    loadSmartNotifications();
    activeNotificationCount = 0;
    document.getElementById("notificationCount").style.display = "none";
  }
}

function loadSmartNotifications() {
  const container = document.getElementById("notificationsListContainer");
  if (!container) return;
  container.innerHTML = "";
  
  SMART_ALERTS.forEach(alert => {
    const card = document.createElement("div");
    card.className = "booking-ticket-mini safety-complaint";
    card.style.borderLeftColor = alert.type === "weather" ? "var(--heritage-gold)" : (alert.type === "traffic" ? "#ef4444" : "#3b82f6");
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
        <span class="timeline-year" style="font-size:9px; padding:1px 6px;">${alert.type.toUpperCase()} ALERT</span>
        <span style="font-size:11px; color:var(--text-muted);">${alert.time}</span>
      </div>
      <h4 style="font-family:var(--font-title); font-size:13.5px; color:var(--light-gold);">${alert.title}</h4>
      <p style="font-size:12px; color:var(--text-secondary); line-height:1.4; margin-top:4px;">${alert.desc}</p>
    `;
    container.appendChild(card);
  });
}

/* 9.6 Voice Command, Language, and Accessibility Features */
function startVoiceSearch() {
  const modal = document.getElementById("voiceSearchModalOverlay");
  const text = document.getElementById("voiceSearchStatusText");
  modal.style.display = "flex";
  text.textContent = "Listening for smart voice commands...";
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = activeLanguage === "te" ? "te-IN" : (activeLanguage === "hi" ? "hi-IN" : "en-US");
    recognition.start();
    
    recognition.onresult = function(event) {
      const command = event.results[0][0].transcript;
      text.textContent = `Heard: "${command}"`;
      setTimeout(() => {
        modal.style.display = "none";
        processVoiceCommand(command);
      }, 1200);
    };
    recognition.onerror = function() {
      simulateListeningFallback();
    };
  } else {
    simulateListeningFallback();
  }
}

function simulateListeningFallback() {
  const text = document.getElementById("voiceSearchStatusText");
  setTimeout(() => {
    text.textContent = 'Analyzing voice coordinates...';
    setTimeout(() => {
      const mockCommands = [
        "Find historic monuments",
        "Book Paradise Dum Biryani",
        "Plan a 6 hour historical day route",
        "Alert safety She Teams units"
      ];
      const randomCmd = mockCommands[Math.floor(Math.random() * mockCommands.length)];
      text.textContent = `Interpreted: "${randomCmd}"`;
      setTimeout(() => {
        document.getElementById("voiceSearchModalOverlay").style.display = "none";
        processVoiceCommand(randomCmd);
      }, 1500);
    }, 1500);
  }, 1000);
}

function closeVoiceSearch() {
  document.getElementById("voiceSearchModalOverlay").style.display = "none";
}

function processVoiceCommand(cmd) {
  const text = cmd.toLowerCase();
  showToast(`Voice Command: "${cmd}"`);
  
  if (text.includes("monument") || text.includes("sight") || text.includes("landmark")) {
    switchTab("tourist");
  } else if (text.includes("biryani") || text.includes("food") || text.includes("dining")) {
    switchTab("dining");
  } else if (text.includes("plan") || text.includes("day") || text.includes("itinerary")) {
    switchTab("planner");
    toggleChatbotWindow();
    handleChatPrompt("Can you help me plan a custom day?");
  } else if (text.includes("alert") || text.includes("safety") || text.includes("police")) {
    switchTab("safety");
  } else {
    toggleChatbotWindow();
    handleChatPrompt(cmd);
  }
}

function changeAppLanguage(lang) {
  activeLanguage = lang;
  showToast(`Language re-mapped: ${lang === 'te' ? 'Telugu' : (lang === 'hi' ? 'Hindi' : (lang === 'ur' ? 'Urdu' : 'English'))}`);
  
  const dict = LOCALIZATION_DICTIONARY[lang] || LOCALIZATION_DICTIONARY.en;
  
  document.getElementById("dashWelcomeTitle").textContent = dict.welcome;
  document.getElementById("bulletinTitle").textContent = dict.bulletinTitle;
  document.getElementById("eventsTitle").textContent = lang === 'te' ? 'రాబోయే సాంస్కృతిక ఉత్సవాలు' : (lang === 'hi' ? 'आगामी सांस्कृतिक कार्यक्रम' : (lang === 'ur' ? 'آنے والے ثقافتی پروگرام' : 'Upcoming Cultural & Tech Festivals'));
  document.getElementById("metroBoardTitle").textContent = dict.metroBoard;
  document.getElementById("emergencyTitle").textContent = dict.sosPanel;
  
  const elTraffic = document.getElementById("labelStatTraffic");
  if (elTraffic) elTraffic.textContent = dict.trafficPulse;
  const elClimate = document.getElementById("labelStatClimate");
  if (elClimate) elClimate.textContent = dict.deccanClimate;
  const elAqi = document.getElementById("labelStatAqi");
  if (elAqi) elAqi.textContent = dict.airQuality;
  const elCart = document.getElementById("labelStatCart");
  if (elCart) elCart.textContent = dict.myCart;


  // Let's translate global navigation elements
  const tabTitles = {
    en: ["Dashboard", "Interactive Map", "Plan My Day", "Discover Hyderabad", "Heritage & History", "Weather & Topography", "Tourist Landmarks", "Public Transit", "Gastronomy & Hotels", "Traffic Tracker", "Cinemas & Shows", "Nagarik Safety Portal", "City Administration"],
    te: ["డ్యాష్‌బోర్డ్", "ఇంటరాక్టివ్ మ్యాప్", "నా రోజు ప్లాన్", "హైదరాబాద్ శోధన", "చరిత్ర & వారసత్వం", "వాతావరణం", "పర్యాటక ప్రదేశాలు", "రవాణా వ్యవస్థ", "హోటల్స్ & బిర్యానీ", "ట్రాఫిక్ వేగం", "సినిమాలు & ప్రదర్శనలు", "రక్షణ పోర్టల్", "నగర పరిపాలన"],
    hi: ["डैशबोर्ड", "मानचित्र", "मेरा दिन योजना", "हैदराबाद यात्रा", "इतिहास और विरासत", "मौसम और भूगोल", "पर्यटन स्थल", "सार्वजनिक परिवहन", "होटल और भोजन", "यातायात ट्रैकर", "सिनेमा और शो", "सुरक्षा पोर्टल", "नगर प्रशासन"],
    ur: ["ڈیش بورڈ", "نقشہ", "میرا دن پلان", "حیدرآباد دریافت", "تاریخ و ثقافت", "موسم", "تفریحی مقامات", "پبلک ٹرانزٹ", "ہوٹل اور کھانے", "ٹریفک ٹریکر", "سنیما اور شو", "محفوظ پورٹل", "شہری انتظامیہ"]
  };


  const currentTitlesList = tabTitles[lang] || tabTitles.en;
  const navButtons = document.querySelectorAll(".nav-item button");
  navButtons.forEach((btn, idx) => {
    if (currentTitlesList[idx]) {
      const svg = btn.querySelector("svg");
      btn.innerHTML = "";
      if (svg) btn.appendChild(svg);
      btn.appendChild(document.createTextNode(" " + currentTitlesList[idx]));
    }
  });
}

function toggleHighContrastMode() {
  highContrastMode = !highContrastMode;
  document.body.classList.toggle("accessibility-high-contrast", highContrastMode);
  showToast(highContrastMode ? "High Contrast Mode Active" : "Standard contrast theme restored");
}

function toggleLargeTextMode() {
  largeTextMode = !largeTextMode;
  document.body.classList.toggle("accessibility-large-text", largeTextMode);
  showToast(largeTextMode ? "Large text scaling (A+) active" : "Standard text scaling restored");
}

function toggleReadAloudSpeech() {
  if (readAloudSpeech) {
    window.speechSynthesis.cancel();
    readAloudSpeech = null;
    showToast("Read aloud reader paused.", "error");
    return;
  }
  
  const activePane = document.querySelector(".tab-pane.active");
  if (!activePane) return;
  
  const textContent = activePane.innerText || activePane.textContent;
  const cleanText = textContent.replace(/\s+/g, ' ').substring(0, 300) + "...";
  
  showToast("Reading aloud page contents...");
  readAloudSpeech = new SpeechSynthesisUtterance(cleanText);
  readAloudSpeech.onend = () => { readAloudSpeech = null; };
  window.speechSynthesis.speak(readAloudSpeech);
}

function triggerTTSRead(text) {
  if (readAloudSpeech) {
    window.speechSynthesis.cancel();
    const clean = text.replace(/\*\*/g, "").replace(/\*/g, "");
    readAloudSpeech = new SpeechSynthesisUtterance(clean);
    window.speechSynthesis.speak(readAloudSpeech);
  }
}

function toggleLightMode() {
  lightMode = !lightMode;
  document.body.classList.toggle("light-mode", lightMode);
  localStorage.setItem("lightMode", lightMode);
  showToast(lightMode ? "Light Mode Active" : "Dark Mode Active");
}

// ==========================================================================
// 10. TSavaari Journey Planner & Fare Calculation Logic
// ==========================================================================
let currentTSavaariJourneyResult = null;

function calculateTSavaariJourney() {
  const fromSelect = document.getElementById("tsavaariFromStation");
  const toSelect = document.getElementById("tsavaariToStation");
  const resultsContainer = document.getElementById("tsavaariResultsContainer");
  const buyBtn = document.getElementById("tsavaariAddAllToCartBtn");
  
  if (!fromSelect || !toSelect || !resultsContainer) return;
  
  const fromName = fromSelect.value;
  const toName = toSelect.value;
  
  if (fromName === toName) {
    resultsContainer.innerHTML = `
      <div class="tsavaari-placeholder-text" style="color:var(--safety-crimson); font-weight:600;">
        Origin and Destination stations cannot be identical. Please select separate locations.
      </div>
    `;
    if (buyBtn) buyBtn.style.display = "none";
    return;
  }
  
  // Station relative index nodes on each corridor
  const RED_STATIONS = { miyapur: 0, kukatpally: 1, ameerpet: 2, khairatabad: 3, mgbs: 4, lbnagar: 5 };
  const BLUE_STATIONS = { raidurg: 0, hiteccity: 1, ameerpet: 2, begumpet: 3, paradeground: 4, uppal: 5, nagole: 6 };
  const GREEN_STATIONS = { jbs: 0, paradeground: 0, musheerabad: 1, rtcxroads: 2, mgbs: 3 };
  
  const stationDetails = {
    miyapur: { name: "Miyapur", lines: ["Red Line"] },
    kukatpally: { name: "Kukatpally", lines: ["Red Line"] },
    ameerpet: { name: "Ameerpet", lines: ["Red Line", "Blue Line"] },
    khairatabad: { name: "Khairatabad", lines: ["Red Line"] },
    mgbs: { name: "MGBS", lines: ["Red Line", "Green Line"] },
    lbnagar: { name: "L.B. Nagar", lines: ["Red Line"] },
    raidurg: { name: "Raidurg", lines: ["Blue Line"] },
    hiteccity: { name: "HITEC City", lines: ["Blue Line"] },
    begumpet: { name: "Begumpet", lines: ["Blue Line"] },
    paradeground: { name: "Parade Ground", lines: ["Blue Line", "Green Line"] },
    uppal: { name: "Uppal", lines: ["Blue Line"] },
    nagole: { name: "Nagole", lines: ["Blue Line"] },
    jbs: { name: "JBS Parade Ground", lines: ["Green Line"] },
    musheerabad: { name: "Musheerabad", lines: ["Green Line"] },
    rtcxroads: { name: "RTC X Roads", lines: ["Green Line"] }
  };
  
  const fromObj = stationDetails[fromName];
  const toObj = stationDetails[toName];
  
  let routeStops = 0;
  let interchange = null;
  let primaryLine = "";
  
  const commonLines = fromObj.lines.filter(l => toObj.lines.includes(l));
  
  if (commonLines.length > 0) {
    primaryLine = commonLines[0];
    if (primaryLine === "Red Line") {
      routeStops = Math.abs(RED_STATIONS[fromName] - RED_STATIONS[toName]);
    } else if (primaryLine === "Blue Line") {
      routeStops = Math.abs(BLUE_STATIONS[fromName] - BLUE_STATIONS[toName]);
    } else {
      routeStops = Math.abs(GREEN_STATIONS[fromName] - GREEN_STATIONS[toName]);
    }
  } else {
    const isFromRed = fromObj.lines.includes("Red Line");
    const isToRed = toObj.lines.includes("Red Line");
    const isFromBlue = fromObj.lines.includes("Blue Line");
    const isToBlue = toObj.lines.includes("Blue Line");
    const isFromGreen = fromObj.lines.includes("Green Line");
    const isToGreen = toObj.lines.includes("Green Line");
    
    if ((isFromRed && isToBlue) || (isFromBlue && isToRed)) {
      interchange = "Ameerpet";
      const redIdx = isFromRed ? RED_STATIONS[fromName] : RED_STATIONS[toName];
      const blueIdx = isFromBlue ? BLUE_STATIONS[fromName] : BLUE_STATIONS[toName];
      routeStops = Math.abs(redIdx - RED_STATIONS.ameerpet) + Math.abs(blueIdx - BLUE_STATIONS.ameerpet);
    } else if ((isFromRed && isToGreen) || (isFromGreen && isToRed)) {
      interchange = "MGBS";
      const redIdx = isFromRed ? RED_STATIONS[fromName] : RED_STATIONS[toName];
      const greenIdx = isFromGreen ? GREEN_STATIONS[fromName] : GREEN_STATIONS[toName];
      routeStops = Math.abs(redIdx - RED_STATIONS.mgbs) + Math.abs(greenIdx - GREEN_STATIONS.mgbs);
    } else if ((isFromBlue && isToGreen) || (isFromGreen && isToBlue)) {
      interchange = "Parade Ground";
      const blueIdx = isFromBlue ? BLUE_STATIONS[fromName] : BLUE_STATIONS[toName];
      const greenIdx = isFromGreen ? GREEN_STATIONS[fromName] : GREEN_STATIONS[toName];
      routeStops = Math.abs(blueIdx - BLUE_STATIONS.paradeground) + Math.abs(greenIdx - GREEN_STATIONS.paradeground);
    }
  }
  
  const distance = parseFloat((routeStops * 1.3).toFixed(1));
  const fare = Math.min(60, 10 + routeStops * 4);
  const duration = routeStops * 2 + (interchange ? 4 : 0);
  
  const nextArrivalMin = Math.floor(1 + Math.random() * 4);
  const nextArrivalSec = Math.floor(Math.random() * 60);
  
  currentTSavaariJourneyResult = {
    from: fromObj.name,
    to: toObj.name,
    stops: routeStops,
    distance: distance,
    price: fare,
    duration: duration,
    interchange: interchange
  };
  
  resultsContainer.innerHTML = `
    <div class="tsavaari-route-card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px;">
        <span style="font-family:var(--font-title); font-size:14px; font-weight:700; color:var(--light-gold);">Journey Overview</span>
        <span class="tsavaari-arrival-countdown">
          ⏳ Next train: ${nextArrivalMin}m ${nextArrivalSec}s
        </span>
      </div>
      
      <div class="tsavaari-detail-row">
        <span class="tsavaari-detail-label">Transit Path</span>
        <span class="tsavaari-detail-val">${fromObj.name} → ${toObj.name}</span>
      </div>
      
      <div class="tsavaari-detail-row">
        <span class="tsavaari-detail-label">Corridor Traversed</span>
        <span class="tsavaari-detail-val">${routeStops} stations (${distance} km)</span>
      </div>
      
      <div class="tsavaari-detail-row">
        <span class="tsavaari-detail-label">Transit Duration</span>
        <span class="tsavaari-detail-val">~${duration} mins</span>
      </div>
      
      <div class="tsavaari-detail-row">
        <span class="tsavaari-detail-label">Interchange Node</span>
        <span class="tsavaari-detail-val">
          ${interchange ? `<span class="tsavaari-interchange-badge">Switch at ${interchange}</span>` : `<span style="color:var(--accent-emerald); font-weight:600;">Direct Ride</span>`}
        </span>
      </div>
      
      <div class="tsavaari-detail-row" style="margin-top:10px; border-top:1px dashed rgba(255,255,255,0.1); padding-top:12px;">
        <span class="tsavaari-detail-label" style="font-size:14px; font-weight:700; color:var(--heritage-gold);">TSavaari Single Fare</span>
        <span class="tsavaari-detail-val" style="font-size:18px; font-weight:800; color:var(--heritage-gold);">₹${fare}</span>
      </div>
    </div>
  `;
  
  if (buyBtn) buyBtn.style.display = "block";
}

function addTSavaariTicketToCart() {
  if (!currentTSavaariJourneyResult) return;
  
  const ticketItem = {
    id: `tsavaari_${Date.now()}`,
    name: `Metro QR Fare: ${currentTSavaariJourneyResult.from} to ${currentTSavaariJourneyResult.to}`,
    price: currentTSavaariJourneyResult.price,
    quantity: 1,
    category: "Metro ticket",
    details: `${currentTSavaariJourneyResult.stops} stops, ~${currentTSavaariJourneyResult.duration} mins duration`
  };
  
  shoppingCart.push(ticketItem);
  updateCartBadge();
  showToast(`TSavaari QR Fare to ${currentTSavaariJourneyResult.to} added to cart!`);
}

/* ==========================================================================
   11. Map View Switching & Google Maps Interactive Guide
   ========================================================================== */

function switchMapView(viewType) {
  const btnVector = document.getElementById("mapToggleVector");
  const btnGoogle = document.getElementById("mapToggleGoogle");
  const wrapperVector = document.getElementById("vectorMapWrapper");
  const wrapperGoogle = document.getElementById("googleMapIframeWrapper");
  
  if (!btnVector || !btnGoogle) return;
  
  if (viewType === 'vector') {
    btnVector.classList.add("active");
    btnGoogle.classList.remove("active");
    wrapperVector.style.display = "flex";
    wrapperGoogle.style.display = "none";
    drawInteractiveMap();
  } else {
    btnVector.classList.remove("active");
    btnGoogle.classList.add("active");
    wrapperVector.style.display = "none";
    wrapperGoogle.style.display = "block";
  }
}

/* ==========================================================================
   12. Persistent Authentication & Google Sign-In Routines
   ========================================================================== */

let currentUser = null;
let currentAuthTab = 'login';

function initAuthSystem() {
  const authBtn = document.getElementById("headerAuthBtn");
  const closeAuthBtn = document.getElementById("closeAuthModalBtn");
  const authModal = document.getElementById("authModalOverlay");
  const tabLogin = document.getElementById("authTabLogin");
  const tabSignup = document.getElementById("authTabSignup");
  const googleBtn = document.getElementById("authGoogleBtn");
  const logoutBtn = document.getElementById("authLogoutBtn");
  const userDropdown = document.getElementById("headerUserDropdown");
  const userMenu = document.getElementById("headerUserMenu");
  const openBookingsMenuBtn = document.getElementById("openBookingsFromMenuBtn");
  
  if (authBtn) authBtn.addEventListener("click", () => showAuthModal('login'));
  if (closeAuthBtn) closeAuthBtn.addEventListener("click", hideAuthModal);
  if (authModal) {
    authModal.addEventListener("click", (e) => {
      if (e.target === authModal) hideAuthModal();
    });
  }
  
  if (tabLogin) tabLogin.addEventListener("click", () => toggleAuthTab('login'));
  if (tabSignup) tabSignup.addEventListener("click", () => toggleAuthTab('signup'));
  if (googleBtn) googleBtn.addEventListener("click", openGoogleAuthPopup);
  if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
  
  if (userDropdown) {
    userDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
      userMenu.style.display = userMenu.style.display === "none" ? "block" : "none";
    });
  }
  
  document.addEventListener("click", () => {
    if (userMenu) userMenu.style.display = "none";
  });
  
  if (openBookingsMenuBtn) {
    openBookingsMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleBookingsPanel();
    });
  }

  // Restore cached session if present
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      applyLoginSession(user);
    } catch (e) {
      localStorage.removeItem("currentUser");
    }
  }
}

function showAuthModal(tab = 'login') {
  const modal = document.getElementById("authModalOverlay");
  if (modal) modal.style.display = "flex";
  toggleAuthTab(tab);
}

function hideAuthModal() {
  const modal = document.getElementById("authModalOverlay");
  if (modal) modal.style.display = "none";
  
  document.getElementById("authErrorAlert").style.display = "none";
  document.getElementById("authForm").reset();
}

function toggleAuthTab(tab) {
  currentAuthTab = tab;
  const tabLogin = document.getElementById("authTabLogin");
  const tabSignup = document.getElementById("authTabSignup");
  const emailGroup = document.getElementById("authEmailGroup");
  const title = document.getElementById("authModalTitle");
  const submitBtn = document.getElementById("authSubmitBtn");
  
  document.getElementById("authErrorAlert").style.display = "none";
  
  if (tab === 'login') {
    if (tabLogin) tabLogin.classList.add("active");
    if (tabSignup) tabSignup.classList.remove("active");
    if (emailGroup) emailGroup.style.display = "none";
    if (title) title.textContent = "Access Hyderabad 360";
    if (submitBtn) submitBtn.textContent = "Sign In to City Portal";
    document.getElementById("authEmail").required = false;
  } else {
    if (tabLogin) tabLogin.classList.remove("active");
    if (tabSignup) tabSignup.classList.add("active");
    if (emailGroup) emailGroup.style.display = "block";
    if (title) title.textContent = "Join Hyderabad 360";
    if (submitBtn) submitBtn.textContent = "Create Account";
    document.getElementById("authEmail").required = true;
  }
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  const usernameInput = document.getElementById("authUsername").value;
  const username = usernameInput.trim ? usernameInput.trim() : usernameInput;
  const password = document.getElementById("authPassword").value;
  const email = document.getElementById("authEmail").value;
  const errorAlert = document.getElementById("authErrorAlert");
  
  errorAlert.style.display = "none";
  
  const endpoint = currentAuthTab === 'login' ? '/api/login' : '/api/signup';
  const payload = currentAuthTab === 'login' 
    ? { username, password } 
    : { username, email, password };
    
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      errorAlert.textContent = data.error || "Authentication failed.";
      errorAlert.style.display = "block";
      return;
    }
    
    applyLoginSession(data.user);
    hideAuthModal();
    showToast(currentAuthTab === 'login' ? `Welcome back, ${data.user.username}!` : `Account created! Welcome, ${data.user.username}!`);
  } catch (err) {
    console.error("Auth error:", err);
    errorAlert.textContent = "Unable to connect to the authenticating server.";
    errorAlert.style.display = "block";
  }
}

function applyLoginSession(user) {
  currentUser = user;
  localStorage.setItem("currentUser", JSON.stringify(user));
  
  document.getElementById("headerAuthBtn").style.display = "none";
  const userDropdown = document.getElementById("headerUserDropdown");
  userDropdown.style.display = "flex";
  
  document.getElementById("headerUserName").textContent = user.username;
  
  const avatar = document.getElementById("userAvatarCircle");
  if (user.avatarUrl) {
    avatar.style.backgroundImage = `url('${user.avatarUrl}')`;
    avatar.textContent = "";
  } else {
    avatar.style.backgroundImage = "none";
    avatar.textContent = user.username.charAt(0).toUpperCase();
  }
  
  updateWelcomeGreeting();
}

function updateWelcomeGreeting() {
  const welcomeTitle = document.getElementById("dashWelcomeTitle");
  if (!welcomeTitle) return;
  
  if (currentUser) {
    const lang = activeLanguage || 'en';
    const greetings = {
      en: `Welcome, ${currentUser.username}!`,
      te: `నమస్కారం, ${currentUser.username}!`,
      hi: `स्वागत है, ${currentUser.username}!`,
      ur: `خوش آمدید، ${currentUser.username}!`
    };
    welcomeTitle.textContent = greetings[lang] || greetings.en;
  } else {
    const dict = LOCALIZATION_DICTIONARY[activeLanguage || 'en'] || LOCALIZATION_DICTIONARY.en;
    welcomeTitle.textContent = dict.welcome;
  }
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  
  document.getElementById("headerAuthBtn").style.display = "flex";
  document.getElementById("headerUserDropdown").style.display = "none";
  
  updateWelcomeGreeting();
  showToast("Successfully signed out.", "error");
}

/* Simulated Google Popup Handlers */
function openGoogleAuthPopup() {
  hideAuthModal();
  const overlay = document.getElementById("googleAuthPopupOverlay");
  if (overlay) overlay.style.display = "flex";
}

function closeGoogleAuthPopup() {
  const overlay = document.getElementById("googleAuthPopupOverlay");
  if (overlay) overlay.style.display = "none";
}

async function selectGoogleAccount(name, email, avatarUrl) {
  closeGoogleAuthPopup();
  
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: name,
        email: email,
        isGoogle: true,
        avatarUrl: avatarUrl
      })
    });
    
    const data = await res.json();
    if (res.ok) {
      applyLoginSession(data.user);
      showToast(`Connected with Google! Welcome, ${data.user.username}!`);
    } else {
      showToast("Google connection failed.", "error");
    }
  } catch (err) {
    console.error("Google Auth error:", err);
    showToast("Server connection error during Google auth.", "error");
  }
}

function selectGoogleCustomAccount() {
  document.getElementById("googleAccountsList").style.display = "none";
  document.getElementById("googleCustomAccountInputBlock").style.display = "block";
}

function cancelGoogleCustomAccount() {
  document.getElementById("googleAccountsList").style.display = "flex";
  document.getElementById("googleCustomAccountInputBlock").style.display = "none";
  document.getElementById("googleCustomName").value = "";
  document.getElementById("googleCustomEmail").value = "";
}

function submitGoogleCustomAccount() {
  const name = document.getElementById("googleCustomName").value.trim();
  const email = document.getElementById("googleCustomEmail").value.trim();
  
  if (!name || !email) {
    showToast("Please fill out all fields.", "error");
    return;
  }
  
  const mockAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=d4af37&color=070a13&bold=true`;
  selectGoogleAccount(name, email, mockAvatar);
}

/* 13. Hyderabad Metro Map Expanded View Modal helper functions */
window.openMetroMapModal = function() {
  const overlay = document.getElementById("metroMapModalOverlay");
  if (overlay) overlay.style.display = "flex";
};

window.closeMetroMapModal = function() {
  const overlay = document.getElementById("metroMapModalOverlay");
  if (overlay) overlay.style.display = "none";
};

/* 14. Interactive Global Search Logic */
function initGlobalSearch() {
  const searchInput = document.getElementById("globalSearchInput");
  const suggestionsBox = document.getElementById("globalSearchSuggestions");
  if (!searchInput || !suggestionsBox) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      suggestionsBox.style.display = "none";
      suggestionsBox.innerHTML = "";
      return;
    }

    const matches = MAP_LOCATIONS.filter(loc => 
      loc.name.toLowerCase().includes(query) || 
      (loc.desc && loc.desc.toLowerCase().includes(query))
    ).slice(0, 5);

    if (matches.length === 0) {
      suggestionsBox.innerHTML = `
        <div style="padding: 12px 16px; font-size: 12.5px; color: var(--text-secondary); text-align: center;">
          No matches found for "${e.target.value}"
        </div>
      `;
      suggestionsBox.style.display = "flex";
      return;
    }

    suggestionsBox.innerHTML = matches.map(loc => {
      const catClass = loc.category.toLowerCase();
      return `
        <div class="search-suggestion-item" data-name="${loc.name}" data-category="${loc.category}">
          <div class="suggestion-header">
            <span class="suggestion-name">${loc.name}</span>
            <span class="suggestion-category ${catClass}">${loc.category}</span>
          </div>
          <p class="suggestion-desc">${loc.desc || ''}</p>
        </div>
      `;
    }).join('');

    suggestionsBox.style.display = "flex";

    suggestionsBox.querySelectorAll(".search-suggestion-item").forEach(item => {
      item.addEventListener("click", () => {
        const name = item.getAttribute("data-name");
        const category = item.getAttribute("data-category");
        navigateToSearchSelection(name, category);
        
        searchInput.value = "";
        suggestionsBox.style.display = "none";
        suggestionsBox.innerHTML = "";
      });
    });
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;

      const firstMatch = MAP_LOCATIONS.find(loc => 
        loc.name.toLowerCase().includes(query) || 
        (loc.desc && loc.desc.toLowerCase().includes(query))
      );

      if (firstMatch) {
        navigateToSearchSelection(firstMatch.name, firstMatch.category);
        searchInput.value = "";
        suggestionsBox.style.display = "none";
      } else {
        showToast(`No matches found for "${searchInput.value}"`, "error");
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target !== searchInput && e.target !== suggestionsBox && !suggestionsBox.contains(e.target)) {
      suggestionsBox.style.display = "none";
    }
  });
}

function navigateToSearchSelection(name, category) {
  if (category === "Attractions") {
    switchTab("tourist");
    setTimeout(() => {
      const cards = document.querySelectorAll(".tourist-grid-card");
      cards.forEach(card => {
        const h4 = card.querySelector("h4");
        if (h4 && h4.textContent.toLowerCase().includes(name.toLowerCase().replace(" monument", "").replace(" fortress", "").replace(" temple", "").replace(" museum", ""))) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.style.borderColor = 'var(--heritage-gold)';
          card.style.boxShadow = '0 0 25px var(--heritage-gold)';
          setTimeout(() => {
            card.style.borderColor = '';
            card.style.boxShadow = '';
          }, 3000);
        }
      });
    }, 250);
  } else if (category === "Metro") {
    switchTab("transit");
    setTimeout(() => {
      const select = document.getElementById("tsavaariFromStation");
      if (select) {
        for (let opt of select.options) {
          const normOpt = opt.text.toLowerCase().replace(" station", "").replace(" junction", "");
          const normName = name.toLowerCase().replace(" hub", "").replace(" metro", "").replace(" transit", "");
          if (normName.includes(normOpt) || normOpt.includes(normName)) {
            select.value = opt.value;
            select.dispatchEvent(new Event('change'));
            break;
          }
        }
      }
      const portalCard = document.getElementById("tsavaariPortalCard");
      if (portalCard) {
        portalCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        portalCard.style.borderColor = 'var(--accent-emerald)';
        portalCard.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.3)';
        setTimeout(() => {
          portalCard.style.borderColor = '';
          portalCard.style.boxShadow = '';
        }, 3000);
      }
    }, 250);
  } else if (category === "Dining") {
    switchTab("dining");
    setTimeout(() => {
      const diningCards = document.querySelectorAll(".dining-card");
      diningCards.forEach(card => {
        const h4 = card.querySelector("h4");
        if (h4 && h4.textContent.toLowerCase().includes(name.toLowerCase().replace(" hub", "").replace(" hilltop", "").replace(" lakdikapul", ""))) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.style.borderColor = 'var(--heritage-gold)';
          card.style.boxShadow = '0 0 25px var(--heritage-gold)';
          setTimeout(() => {
            card.style.borderColor = '';
            card.style.boxShadow = '';
          }, 3000);
        }
      });
    }, 250);
  } else if (category === "Safety") {
    switchTab("safety");
    setTimeout(() => {
      const form = document.getElementById("policeComplaintForm");
      if (form) {
        const card = form.closest(".glass-card");
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.style.borderColor = 'var(--safety-crimson)';
          card.style.boxShadow = '0 0 25px rgba(239, 68, 68, 0.4)';
          setTimeout(() => {
            card.style.borderColor = '';
            card.style.boxShadow = '';
          }, 3000);
        }
      }
    }, 250);
  }
}

/* 15. TGSRTC Gamyam and Where is my Train API Feed Simulation */
window.trackGamyamBus = function() {
  const route = document.getElementById("gamyamBusRoute").value;
  const container = document.getElementById("gamyamResultsContainer");
  if (!route || !container) return;

  container.innerHTML = `
    <div style="text-align:center; padding:20px; font-size:12.5px; color:var(--text-secondary); display:flex; flex-direction:column; align-items:center; gap:8px;">
      <svg viewBox="0 0 100 100" class="logo-icon" style="width:24px; height:24px; animation: float 3s ease-in-out infinite;">
        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--heritage-gold)" stroke-width="6"/>
        <path d="M35 50 L65 50 M50 35 L50 65" stroke="var(--heritage-gold)" stroke-width="10"/>
      </svg>
      Connecting to TGSRTC live bus locator network...
    </div>
  `;

  const BUS_DATA = {
    "127K": {
      no: "127K",
      type: "Metro AC Luxury",
      coach: "TS 09 Z 4812",
      status: "running",
      delay: "On Time",
      current: "Ameerpet Junction",
      stops: [
        { name: "Koti Bus Terminal", time: "Passed" },
        { name: "Lakdikapul", time: "Passed" },
        { name: "Ameerpet Junction", time: "Arrived" },
        { name: "Madhapur PS", time: "14 Mins" },
        { name: "HITEC City Hub", time: "20 Mins" },
        { name: "Kondapur Terminal", time: "26 Mins" }
      ]
    },
    "218": {
      no: "218",
      type: "Metro Express",
      coach: "TS 12 Y 7721",
      status: "running",
      delay: "On Time",
      current: "Kukatpally",
      stops: [
        { name: "Koti Bus Terminal", time: "Passed" },
        { name: "Lakdikapul", time: "Passed" },
        { name: "Ameerpet Junction", time: "Passed" },
        { name: "Kukatpally", time: "Arrived" },
        { name: "Miyapur X Roads", time: "10 Mins" },
        { name: "Patancheru Terminus", time: "29 Mins" }
      ]
    },
    "10H": {
      no: "10H",
      type: "Metro Express",
      coach: "TS 07 Z 1904",
      status: "delayed",
      delay: "+6 Mins Late",
      current: "Begumpet Flyover",
      stops: [
        { name: "Secunderabad Station", time: "Passed" },
        { name: "Begumpet Flyover", time: "Arrived" },
        { name: "Ameerpet Junction", time: "12 Mins" },
        { name: "Madhapur PS", time: "26 Mins" },
        { name: "HITEC City Hub", time: "32 Mins" },
        { name: "Kondapur Terminal", time: "39 Mins" }
      ]
    },
    "9F": {
      no: "9F",
      type: "City Ordinary",
      coach: "TS 11 X 2309",
      status: "running",
      delay: "On Time",
      current: "RTC X Roads",
      stops: [
        { name: "Secunderabad Station", time: "Passed" },
        { name: "Musheerabad", time: "Passed" },
        { name: "RTC X Roads", time: "Arrived" },
        { name: "Koti Bus Terminal", time: "15 Mins" }
      ]
    },
    "229": {
      no: "229",
      type: "Metro Express",
      coach: "TS 08 Z 5510",
      status: "delayed",
      delay: "+12 Mins Late",
      current: "Suchitra Circle",
      stops: [
        { name: "Secunderabad Station", time: "Passed" },
        { name: "Patny Circle", time: "Passed" },
        { name: "Suchitra Circle", time: "Arrived" },
        { name: "Kompally Junction", time: "22 Mins" },
        { name: "Medchal Terminal", time: "38 Mins" }
      ]
    }
  };

  setTimeout(() => {
    const data = BUS_DATA[route];
    if (!data) return;

    const statusText = data.status === "running" ? "Running" : "Delayed";
    const statusClass = data.status;

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;">
        <div>
          <strong style="font-family:var(--font-title); font-size:14.5px; color:var(--light-gold);">${data.type} #${data.no}</strong>
          <span style="font-size:11px; color:var(--text-muted); display:block; margin-top:2px;">Coach: ${data.coach}</span>
        </div>
        <div style="text-align:right;">
          <span class="transit-status-badge ${statusClass}">${statusText}</span>
          <span style="font-size:11px; display:block; margin-top:4px; font-weight:600; color:${data.status === 'running' ? 'var(--accent-emerald)' : 'var(--safety-crimson)'};">${data.delay}</span>
        </div>
      </div>
      
      <div style="font-size:12.5px; color:var(--text-secondary); margin-bottom:12px;">
        📍 Current Active Node: <strong style="color:var(--text-primary);">${data.current}</strong>
      </div>

      <div class="transit-timeline">
        ${data.stops.map(stop => {
          let nodeClass = "";
          if (stop.time === "Passed") nodeClass = "passed";
          else if (stop.time === "Arrived") nodeClass = "active";
          return `
            <div class="transit-timeline-node ${nodeClass}">
              <span class="node-station">${stop.name}</span>
              <span class="node-eta">${stop.time}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }, 1000);
};

window.trackMmtsTrain = function() {
  const route = document.getElementById("mmtsRoute").value;
  const container = document.getElementById("mmtsResultsContainer");
  if (!route || !container) return;

  container.innerHTML = `
    <div style="text-align:center; padding:20px; font-size:12.5px; color:var(--text-secondary); display:flex; flex-direction:column; align-items:center; gap:8px;">
      <svg viewBox="0 0 100 100" class="logo-icon" style="width:24px; height:24px; animation: float 3s ease-in-out infinite;">
        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--accent-emerald)" stroke-width="6"/>
        <path d="M35 50 L65 50 M50 35 L50 65" stroke="var(--accent-emerald)" stroke-width="10"/>
      </svg>
      Connecting to live South Central Railway network...
    </div>
  `;

  const MMTS_DATA = {
    "hyd_lpi": {
      no: "47108",
      name: "HYD-LPI Red Line Local",
      status: "delayed",
      delay: "+4 Mins Late",
      current: "Khairatabad",
      stops: [
        { name: "Hyderabad Nampally", time: "10:00 AM (Passed)" },
        { name: "Lakdikapul", time: "10:04 AM (Passed)" },
        { name: "Khairatabad", time: "10:12 AM (Arrived)" },
        { name: "Begumpet", time: "10:21 AM (ETA)" },
        { name: "Hafizpet", time: "10:36 AM (ETA)" },
        { name: "Lingampalli", time: "10:49 AM (ETA)" }
      ]
    },
    "sec_lpi": {
      no: "47120",
      name: "SC-LPI Blue Line Local",
      status: "running",
      delay: "On Time",
      current: "Begumpet",
      stops: [
        { name: "Secunderabad Jn", time: "11:15 AM (Passed)" },
        { name: "James Street", time: "11:20 AM (Passed)" },
        { name: "Begumpet", time: "11:28 AM (Arrived)" },
        { name: "Sanathnagar", time: "11:35 AM (ETA)" },
        { name: "Hafizpet", time: "11:47 AM (ETA)" },
        { name: "Lingampalli", time: "12:02 PM (ETA)" }
      ]
    },
    "fal_sec": {
      no: "47155",
      name: "FM-SC Green Line Local",
      status: "delayed",
      delay: "+1 Min Late",
      current: "Yakutpura",
      stops: [
        { name: "Falaknuma", time: "02:30 PM (Passed)" },
        { name: "Yakutpura", time: "02:36 PM (Arrived)" },
        { name: "Malakpet", time: "02:43 PM (ETA)" },
        { name: "Kacheguda", time: "02:49 PM (ETA)" },
        { name: "Vidyanagar", time: "02:54 PM (ETA)" },
        { name: "Secunderabad Jn", time: "03:11 PM (ETA)" }
      ]
    }
  };

  setTimeout(() => {
    const data = MMTS_DATA[route];
    if (!data) return;

    const statusText = data.status === "running" ? "Running" : "Delayed";
    const statusClass = data.status;

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;">
        <div>
          <strong style="font-family:var(--font-title); font-size:14.5px; color:var(--light-gold);">MMTS #${data.no}</strong>
          <span style="font-size:11px; color:var(--text-muted); display:block; margin-top:2px;">${data.name}</span>
        </div>
        <div style="text-align:right;">
          <span class="transit-status-badge ${statusClass}">${statusText}</span>
          <span style="font-size:11px; display:block; margin-top:4px; font-weight:600; color:${data.status === 'running' ? 'var(--accent-emerald)' : 'var(--safety-crimson)'};">${data.delay}</span>
        </div>
      </div>
      
      <div style="font-size:12.5px; color:var(--text-secondary); margin-bottom:12px;">
        📍 Current Active Node: <strong style="color:var(--text-primary);">${data.current}</strong>
      </div>

      <div class="transit-timeline">
        ${data.stops.map(stop => {
          let nodeClass = "";
          if (stop.time.includes("(Passed)")) nodeClass = "passed";
          else if (stop.time.includes("(Arrived)")) nodeClass = "active";
          return `
            <div class="transit-timeline-node ${nodeClass}">
              <span class="node-station">${stop.name}</span>
              <span class="node-eta">${stop.time.split(" ")[0]} ${stop.time.split(" ")[1]}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }, 1000);
};

