/**
 * Notable / Famous Places Dataset for Destination Explorer
 * Presented properly with rich imagery, historical context, why to visit,
 * optimal visiting hours, and visitor guidance — NOT a bare list of names!
 */

export const FAMOUS_PLACES_DIRECTORY = {
  rajasthan: [
    {
      id: 'amber-fort',
      name: 'Amber Palace & Fortress',
      tag: 'UNESCO World Heritage',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
      description: 'Perched on the rugged Aravali cliffs of Amer, this 16th-century sandstone fortress blends Rajput and Mughal architectural opulence with intricate mirror-inlaid halls.',
      whyVisit: 'The Sheesh Mahal (Hall of Mirrors) illuminates entirely from a single candlelight reflected in thousands of Belgian convex mirrors.',
      idealTime: 'Dawn (07:30 - 09:30) to beat the desert heat',
      duration: '3 Hours',
      tips: 'Ascend via private vintage Jeep through the ancient Sun Gate.'
    },
    {
      id: 'city-palace-udaipur',
      name: 'City Palace & Lake Pichola',
      tag: 'Living Royal Residence',
      image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1000&q=80',
      description: 'The grandest palace complex in Rajasthan, built over 400 years on the eastern banks of Lake Pichola by successive Maharanas of Mewar.',
      whyVisit: 'Breathtaking panoramic lake vistas from the Mor Chowk peacock courtyard and private motor launch cruises to Jagmandir Island.',
      idealTime: 'Late Afternoon leading into Sunset (16:00 - 18:30)',
      duration: '3.5 Hours',
      tips: 'Reserve sunset boat charter before dining on the marble island pavilion.'
    },
    {
      id: 'mehrangarh-fort',
      name: 'Mehrangarh Citadel',
      tag: 'Colossal Cliff Fortress',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
      description: 'Towering 400 feet above the indigo-blue roofs of Jodhpur, this impenetrable citadel houses one of the finest royal palanquin and armoury museums in Asia.',
      whyVisit: 'Stand on the battlements where cannonballs from centuries of sieges remain embedded in the yellow sandstone bastions.',
      idealTime: 'Morning (09:00 - 11:30)',
      duration: '2.5 Hours',
      tips: 'Take the elevator to the topmost terrace for panoramic views over the Blue City.'
    }
  ],

  'south-india': [
    {
      id: 'namakkal-rock-fort',
      name: 'Namakkal Monolithic Rock Fort',
      tag: 'Ancient Monolithic Citadel',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
      description: 'A colossal monolithic rock rising abruptly 75 meters above the Tamil Nadu plains, crowned by a historic 9th-century fortress built by King Ramachandra Nayakar.',
      whyVisit: 'Features ancient rock-cut cave temples dedicated to Ranganatha and Narasimha, with an imposing 18-foot open-air monolithic statue of Sri Anjaneyar.',
      idealTime: 'Sunrise or Late Evening (06:30 - 08:30 & 16:30 - 18:30)',
      duration: '2.5 Hours',
      tips: 'Conducted directly by lead curator Manoj Sivakumar (+91 93446 83958).'
    },
    {
      id: 'brihadisvara-temple',
      name: 'Brihadisvara UNESCO Temple',
      tag: 'Chola Dynasty Masterpiece',
      image: 'https://images.unsplash.com/photo-1629813366051-b58137b2792c?auto=format&fit=crop&w=1000&q=80',
      description: 'Built by Rajaraja Chola I in 1010 CE in Thanjavur, this temple showcases one of the tallest granite temple towers (Vimana) in the world, carved from monolithic granite.',
      whyVisit: 'The 80-tonne single-stone octagonal dome (Kumbam) was hoisted to the 66-meter summit using a 6-kilometer inclined ramp a millennium ago.',
      idealTime: 'Morning twilight (07:00 - 09:00)',
      duration: '2 Hours',
      tips: 'Observe the evening ghee-lamp lighting ceremony at dusk.'
    },
    {
      id: 'meenakshi-amman',
      name: 'Madurai Meenakshi Temple',
      tag: 'Living Temple City',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
      description: 'An ancient theological and architectural marvel featuring 14 monumental gopurams encrusted with thousands of vividly polychromed sculptures.',
      whyVisit: 'The Hall of 1000 Pillars and the night procession where Lord Sundareswarar is carried on a silver palanquin to the chamber of Goddess Meenakshi.',
      idealTime: 'Night Aarti Ceremony (20:30 - 21:30)',
      duration: '3 Hours',
      tips: 'Strict traditional dress code: shoulders and knees must be covered.'
    }
  ],

  'uttar-pradesh': [
    {
      id: 'taj-mahal',
      name: 'The Taj Mahal',
      tag: 'World Wonder & UNESCO Site',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
      description: 'Emperor Shah Jahan’s timeless monument of white Makrana marble, built between 1632 and 1648 in tribute to his beloved queen Mumtaz Mahal on the Yamuna riverbank.',
      whyVisit: 'Private dawn entrance when the rising sun casts a delicate blush-pink glow across the translucent marble domes before crowds arrive.',
      idealTime: 'Sunrise (05:45 - 07:30)',
      duration: '2.5 Hours',
      tips: 'Closed on Fridays. Our guests enjoy fast-track VIP access.'
    },
    {
      id: 'varanasi-ghats',
      name: 'Varanasi Sacred Ghats',
      tag: 'World’s Oldest Living City',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
      description: 'Over 84 stone stairways lining the Ganges river where pilgrims, philosophers, and spiritual seekers have gathered continuously for over 3,000 years.',
      whyVisit: 'Private wooden boat cruise during the spectacular evening Ganga Aarti ceremony at Dashashwamedh Ghat with ringing brass bells and floating earthen diyas.',
      idealTime: 'Dusk Aarti (18:00 - 19:30) & Dawn Boat (05:30 - 07:00)',
      duration: '3 Hours',
      tips: 'Private boat reservation ensures unhindered front-row river views.'
    }
  ],

  kashmir: [
    {
      id: 'dal-lake',
      name: 'Dal Lake & Floating Gardens',
      tag: 'Jewel of Srinagar',
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1000&q=80',
      description: 'A tranquil glacial lake framed by the snow-capped Zabarwan mountain range, dotted with hand-carved cedarwood houseboats and historic Mughal gardens.',
      whyVisit: 'Gliding along mist-laden waters in a private cushioned Shikara past floating saffron markets and lotus beds.',
      idealTime: 'Early Dawn (06:00 - 08:00)',
      duration: '2 Hours',
      tips: 'Sip piping hot saffron Kahwa brewed on board from traditional copper samovars.'
    },
    {
      id: 'gulmarg-gondola',
      name: 'Gulmarg Alpine Gondola',
      tag: 'World’s Highest Cable Car',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
      description: 'Ascends from the pine-covered bowl of Gulmarg to the snowfields of Apharwat Peak at an elevation of 13,780 feet.',
      whyVisit: 'Unrivalled panoramic views stretching toward Nanga Parbat (the ninth-highest peak in the world) across virgin snowfields.',
      idealTime: 'Morning (09:00 - 12:00)',
      duration: '3.5 Hours',
      tips: 'Phase 2 tickets booked in advance through our concierge desk.'
    }
  ],

  kerala: [
    {
      id: 'alleppey-backwaters',
      name: 'Vembanad Backwaters & Alleppey',
      tag: 'National Geographic Paradise',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
      description: 'A labyrinth of emerald lagoons, palm-fringed canals, and tranquil lakes where life moves to the gentle rhythm of water.',
      whyVisit: 'Overnight journey aboard a private Kettuvallam luxury houseboat complete with private chef preparing fresh Karimeen fish.',
      idealTime: 'Late Afternoon to Overnight',
      duration: 'Full Day / Overnight',
      tips: 'Private non-motorized canoe trips explore secluded village canals.'
    },
    {
      id: 'munnar-tea-estates',
      name: 'Munnar High-Altitude Tea Valleys',
      tag: 'Western Ghats Bio-Reserve',
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80',
      description: 'Rolling carpet of manicured green tea hills at 6,000 feet, enveloped in cool mountain mist and fresh cardamom breezes.',
      whyVisit: 'Trek through private organic tea plantations and spot the endangered Nilgiri Tahr mountain goat in Eravikulam National Park.',
      idealTime: 'Morning (08:00 - 11:30)',
      duration: '3 Hours',
      tips: 'Visit the tea museum for a private artisanal leaf-tasting session.'
    }
  ]
};

/**
 * Returns notable places for any destination slug with smart fallback
 */
export function getFamousPlacesForDestination(slug) {
  const normalized = (slug || '').toLowerCase();
  for (const [key, places] of Object.entries(FAMOUS_PLACES_DIRECTORY)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return places;
    }
  }

  // Generic fallback if slug is not matched
  return [
    {
      id: `${slug}-monument-1`,
      name: 'Historic Citadel & Heritage Sanctuaries',
      tag: 'Architectural Wonder',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
      description: 'Centuries-old stone bastion reflecting the aristocratic grandeur and architectural legacy of the region.',
      whyVisit: 'Intricate stone carvings and sweeping panoramic viewpoints over the surrounding provincial landscape.',
      idealTime: 'Morning or Sunset hours',
      duration: '2.5 Hours',
      tips: 'Accompanied by a private scholar guide.'
    },
    {
      id: `${slug}-artisan-guilds`,
      name: 'Living Artisan Guilds & Spice Bazaars',
      tag: 'Cultural Heritage',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
      description: 'Bustling heritage quarters where master craftspeople practice weaving, brass casting, and perfume distilling.',
      whyVisit: 'Direct interaction with generational craft custodians without commercial intermediaries.',
      idealTime: 'Late Afternoon (15:30 - 18:00)',
      duration: '2 Hours',
      tips: 'Pick up authentic handloom textiles directly from master artisans.'
    }
  ];
}
