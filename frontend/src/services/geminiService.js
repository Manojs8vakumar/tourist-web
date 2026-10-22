/**
 * Google Gemini AI Travel Assistant Service
 * Connects to Google Gemini API (v1beta/gemini-1.5-flash) using VITE_GEMINI_API_KEY.
 * Includes an intelligent local knowledge engine for seamless offline execution.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

/**
 * Ask Gemini a travel question about an Indian destination
 */
export async function askGeminiTravelAssistant(userPrompt, destinationName = 'India') {
  if (GEMINI_API_KEY) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are the Senior Travel AI Concierge at Plan My Trip Agency.
You specialize in Indian luxury, culture, logistics, and bespoke trips.
Destination in focus: ${destinationName}.
User Query: "${userPrompt}".
Answer in a warm, refined, concise manner (2 to 4 paragraphs or bullet points). Provide exact insights: duration recommendations, best seasons, top sights, and local dining tips.`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            source: 'Google Gemini 1.5 Flash',
            response: text
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, switching to local knowledge engine:', err);
    }
  }

  // Intelligent Local Knowledge Engine Fallback
  return {
    source: 'Plan My Trip AI Knowledge Engine',
    response: generateLocalAIResponse(userPrompt, destinationName)
  };
}

/**
 * Generates a structured Day-by-Day itinerary object (NOT a block of chat text)
 */
export async function generateStructuredItineraryPlan({
  destination = 'Rajasthan',
  days = 4,
  budget = 50000,
  travelStyle = 'Royal Heritage & Luxury'
}) {
  const numDays = Math.min(Math.max(parseInt(days) || 4, 3), 10);
  const totalBudget = parseInt(budget) || 50000;

  // Real-time calculated budget split
  const budgetBreakdown = {
    stays: Math.round(totalBudget * 0.42),
    transport: Math.round(totalBudget * 0.22),
    experiences: Math.round(totalBudget * 0.18),
    dining: Math.round(totalBudget * 0.12),
    reserve: Math.round(totalBudget * 0.06)
  };

  const itineraryDays = [];
  const milestones = getDestinationMilestones(destination);

  for (let i = 1; i <= numDays; i++) {
    const step = milestones[(i - 1) % milestones.length];
    itineraryDays.push({
      dayNumber: i,
      title: `Day 0${i} — ${step.theme}`,
      morning: step.morning,
      afternoon: step.afternoon,
      evening: step.evening,
      stay: step.stay,
      dining: step.dining,
      transitTip: step.transit
    });
  }

  return {
    destination,
    durationDays: numDays,
    durationNights: numDays - 1,
    travelStyle,
    totalBudget,
    budgetBreakdown,
    summary: `A calibrated ${numDays}-day bespoke journey across ${destination}, engineered for zero-backtrack routing, premier living heritage residences, and seamless chauffeured logistics.`,
    curatorContact: 'Manoj Sivakumar (+91 93446 83958)',
    days: itineraryDays
  };
}

function getDestinationMilestones(destName) {
  const lower = destName.toLowerCase();

  if (lower.includes('tamil') || lower.includes('south') || lower.includes('namakkal')) {
    return [
      {
        theme: 'Arrival & Namakkal Monolithic Rock Fort',
        morning: 'Chauffeured arrival and orientation at Namakkal. Ascend the monolithic 9th-century Rock Fort offering panoramic vistas.',
        afternoon: 'VIP darshan at the 18-foot monolithic Sri Anjaneyar Temple and rock-cut Narasimha cave shrines.',
        evening: 'Sunset over Kolli Hills foothill tea gardens, followed by traditional Chettinad royal thali dinner.',
        stay: 'Heritage Garden Manor or Royal Corridor Suite',
        dining: 'Authentic Chettinad pepper delicacies & fresh coconut payasam',
        transit: 'Private chauffeur on standby throughout the day'
      },
      {
        theme: 'Sacred Gopurams of Thanjavur & Madurai',
        morning: 'Morning transit to the 1000-year-old Brihadisvara UNESCO World Heritage Temple; study Chola stone carvings.',
        afternoon: 'Private access to bronze casting artisan guilds in Swamimalai; meet master sculptors.',
        evening: 'Witness the evocative night ceremony at Madurai Meenakshi Amman Temple with camphor aarti.',
        stay: 'The Gateway Hotel Pasumalai / Heritage Madurai',
        dining: 'Traditional banana-leaf feast with Madurai jigarthanda',
        transit: 'Highway express corridor: 2 hours 45 minutes'
      },
      {
        theme: 'Chettinad Aristocratic Mansions',
        morning: 'Walking tour among the 10000-square-foot teak and Belgian glass mansions of Kanadukathan.',
        afternoon: 'Private handloom weaving workshop and antique market exploration in Karaikudi.',
        evening: 'Courtyard candlelit dinner hosted by a local heritage conservationist.',
        stay: 'Visalam - CGH Earth / The Bangala Chettinad',
        dining: 'Curated 7-course spice culinary degustation',
        transit: 'Local heritage country lanes'
      },
      {
        theme: 'Nilgiri Tea Slopes & Ooty Steam Train',
        morning: 'Board the historic UNESCO Nilgiri Mountain Railway toy steam train as it climbs misty eucalyptus forests.',
        afternoon: 'High-altitude organic tea tasting session at an artisanal Glenmorgan tea estate.',
        evening: 'Fireplace dinner with artisanal local Nilgiri cheeses and hot spiced cocoa.',
        stay: 'Savoy - IHCL SeleQtions, Ooty',
        dining: 'Colonial Anglo-Indian roasts & Nilgiri berry tarts',
        transit: 'Scenic mountain ghat pass: smooth scenic drive'
      }
    ];
  }

  if (lower.includes('kashmir') || lower.includes('ladakh')) {
    return [
      {
        theme: 'Dal Lake Cedarwood Shikaras',
        morning: 'Private dawn Shikara ride gliding past the floating vegetable markets and lotus blossoms of Dal Lake.',
        afternoon: 'Wander terraced Mughal pleasure gardens (Nishat & Shalimar Bagh) framed by Zabarwan peaks.',
        evening: 'Sunset cedarwood deck dinner aboard a private heritage houseboat with singing samovars.',
        stay: 'The Sukoon Houseboat / Vivanta Dal View, Srinagar',
        dining: 'Traditional 36-course Kashmiri Wazwan feast',
        transit: 'Airport private luxury transfer: 30 minutes'
      },
      {
        theme: 'Gulmarg Alpine Gondola & Pine Valleys',
        morning: 'Board the Gulmarg Gondola rising to Phase 2 (Kongdoori & Apharwat Peak at 13,780 ft).',
        afternoon: 'Alpine meadow trek or pony ride through pine-scented forests overlooking Nanga Parbat.',
        evening: 'Hot saffron Kahwa by the fireplace at a luxury ski chalet.',
        stay: 'The Khyber Himalayan Resort & Spa, Gulmarg',
        dining: 'Rogan josh, dum aloo, and saffron walnut pulao',
        transit: 'Scenic mountain road: 1 hour 45 minutes'
      },
      {
        theme: 'Pahalgam & Betaab Valley River Walks',
        morning: 'Scenic drive along the Lidder River toward Pahalgam with stops at saffron fields in Pampore.',
        afternoon: 'Private riverside walk in Betaab Valley and Aru alpine biosphere reserve.',
        evening: 'Trout fishing demonstration followed by riverside bonfire.',
        stay: 'Pahalgam Hotel / Pine N Peak',
        dining: 'Wood-fired fresh river trout with walnut chutney',
        transit: 'Lidder valley corridor: 2 hours'
      }
    ];
  }

  // Default: Royal Rajasthan & Golden Triangle
  return [
    {
      theme: 'Sandstone Citadels & Old City Bazaars',
      morning: 'Private sunrise ascent to Amber Fort; admire Sheesh Mahal mirror mosaics before morning crowds arrive.',
      afternoon: 'Guided walk through City Palace museums and the Jantar Mantar UNESCO astronomical observatory.',
      evening: 'Twilight sundowner cocktails overlooking Jal Mahal water palace with live sitar music.',
      stay: 'Rambagh Palace / Samode Haveli, Jaipur',
      dining: 'Royal Laal Maas & Dal Baati Churma',
      transit: 'Climate-controlled chauffeur throughout'
    },
    {
      theme: 'Blue City of Jodhpur & Mehrangarh',
      morning: 'Scenic journey to Jodhpur; private curator-led tour of the colossal Mehrangarh Fort towering on cliffs.',
      afternoon: 'Wander the cobalt-blue alleyways of Navchokiya; photograph indigo houses with local heritage guide.',
      evening: 'Rooftop dinner overlooking the illuminated fortress ramparts under star-filled desert skies.',
      stay: 'Umaid Bhawan Palace / Raas Jodhpur',
      dining: 'Jodhpuri mirchi vada & gatte ki sabzi',
      transit: 'Highway transit: 4 hours 30 mins'
    },
    {
      theme: 'Romantic Lake Pichola & Udaipur Palaces',
      morning: 'Arrival in Udaipur, City of Lakes. Private motor launch cruise across Lake Pichola.',
      afternoon: 'Explore the monumental City Palace courtyards, crystal gallery, and Zenana Mahal chambers.',
      evening: 'Candlelight dinner on the open-air marble promenade of Jagmandir Island palace.',
      stay: 'Taj Lake Palace / The Leela Palace Udaipur',
      dining: 'Royal Mewari kebabs and rose petal kulfi',
      transit: 'Private speedboat boat transfers on lake'
    },
    {
      theme: 'Thar Desert Dune Sanctuary',
      morning: 'Desert drive past wild gazelle reserves and desert hamlets toward private luxury dune encampment.',
      afternoon: 'Private camel safari into serene untouched dunes far from commercial tourist hubs.',
      evening: 'Kalbelia folk music and fire dance performance under crystal-clear desert constellations.',
      stay: 'The Serai, Luxury Desert Camp, Jaisalmer',
      dining: 'Ker sangri, bajra rotis, and smoked lamb',
      transit: 'Private 4x4 desert transit'
    }
  ];
}

function generateLocalAIResponse(query, destination) {
  const q = query.toLowerCase();

  if (q.includes('how long') || q.includes('days') || q.includes('time to spend')) {
    return `For **${destination}**, we recommend a minimum of **4 to 6 days** to immerse in its heritage and landscapes without transit exhaustion. 
- **3 Days**: Gives you an express highlights tour (top 2 monuments and iconic living quarters).
- **5 Days**: Ideal sweet spot. Allows leisure stays in palace residences, private boat cruises, and slow village walks.
- **7+ Days**: Deep discovery covering neighboring sanctuaries, private charters, and culinary masterclasses.`;
  }

  if (q.includes('best time') || q.includes('when to visit') || q.includes('weather') || q.includes('season')) {
    return `The optimal travel window for **${destination}** is **October through March**, when daytime temperatures are mild (20°C to 27°C) and skies are clear blue.
- If exploring high Himalayan zones like Ladakh or Kashmir, **May through September** offers sublime alpine weather.
- For temple and backwater corridors in South India (Tamil Nadu/Kerala), **November to February** brings cool coastal breezes and temple festivals.`;
  }

  if (q.includes('what to see') || q.includes('must visit') || q.includes('places') || q.includes('attractions')) {
    return `Notable places you must experience in **${destination}**:
1. **Historic Living Forts & UNESCO Sanctuaries**: Marvel at ancient monolithic rock-cut shrines, lakeside palaces, and sandstone bastions.
2. **Private Sunrise Charters**: Access iconic monuments (like the Taj Mahal or Amber Fort) at dawn before general tourist gates open.
3. **Living Craft & Cultural Guilds**: Private demonstrations with master weavers, stone carvers, and royal culinary custodians.
4. **Natural Landscapes**: Sunset boat cruises, tranquil backwaters, or quiet desert dune sanctuaries under star-lit skies.`;
  }

  if (q.includes('cost') || q.includes('budget') || q.includes('price')) {
    return `Bespoke journeys in **${destination}** typically range from:
- **Heritage Classic**: ₹12,000 to ₹18,000 per person/day (includes verified private AC chauffeur, 4-star boutique havelis, and guided tours).
- **Royal Sovereign Luxury**: ₹25,000 to ₹45,000 per person/day (5-star palace suites such as Taj/Oberoi, private boat charters, all permits, and 24/7 dedicated concierge).
- Use our **AI Trip Planner** below to calibrate an itinerary to your exact custom budget!`;
  }

  return `**Plan My Trip Agency Advisory for ${destination}**:
${destination} offers an exceptional tapestry of subcontinental culture, storied architecture, and world-class hospitality.
To make your journey effortless:
- We provide vetted private chauffeurs with luxury climate-controlled sedans or SUVs.
- All monument tickets and fast-track entries are pre-arranged.
- You have direct 1-click access to lead curator **Manoj Sivakumar (+91 93446 83958)** on WhatsApp throughout your trip.`;
}
