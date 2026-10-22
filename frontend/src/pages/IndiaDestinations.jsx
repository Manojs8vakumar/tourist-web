import React, { useState } from 'react';
import IndiaHero from '../components/sections/IndiaHero';
import LocationDetectorBanner from '../components/LocationDetectorBanner';
import InteractiveTripFinder from '../components/sections/InteractiveTripFinder';
import ExploreRegions from '../components/sections/ExploreRegions';
import SignatureJourneys from '../components/sections/SignatureJourneys';
import TravelThemes from '../components/sections/TravelThemes';
import WhereToStay from '../components/sections/WhereToStay';
import SeasonalCalendar from '../components/sections/SeasonalCalendar';
import TravellerTypes from '../components/sections/TravellerTypes';
import CustomerStories from '../components/sections/CustomerStories';
import BeginJourneySection from '../components/sections/BeginJourneySection';
import AITripPlanner from '../components/AITripPlanner';
import VisualDayByDayPlan from '../components/VisualDayByDayPlan';
import LiveWeatherWidget from '../components/LiveWeatherWidget';
import AllIndiaStatesDirectory from '../components/AllIndiaStatesDirectory';
import { POPULAR_ORIGIN_CITIES } from '../services/locationService';

export default function IndiaDestinations({ onOpenEnquiry, onOpenContactDirect }) {
  const [enquiryDestination, setEnquiryDestination] = useState('Namakkal, Tamil Nadu');
  const [selectedAIState, setSelectedAIState] = useState('Rajasthan (Jaipur, Udaipur, Jodhpur)');
  const [userLocation, setUserLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('pmt_user_location');
      return saved ? JSON.parse(saved) : POPULAR_ORIGIN_CITIES[0];
    } catch (e) {
      return POPULAR_ORIGIN_CITIES[0];
    }
  });

  const handleLocationChange = (loc) => {
    setUserLocation(loc);
    try {
      localStorage.setItem('pmt_user_location', JSON.stringify(loc));
    } catch (e) {}
  };

  const handleOpenEnquiryWithDest = (destName) => {
    setEnquiryDestination(destName);
    onOpenEnquiry(destName);
  };

  const handleSelectStateForAI = (stateName) => {
    setSelectedAIState(stateName);
    const element = document.getElementById('ai-planner');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="india-page-wrapper">
      {/* SECTION 1: India Destination Hero */}
      <IndiaHero onOpenEnquiry={() => onOpenEnquiry('India')} />

      {/* SECTION 2: Real-time Location Awareness Detector */}
      <LocationDetectorBanner
        userLocation={userLocation}
        onLocationChange={handleLocationChange}
      />

      {/* SECTION 3: Real-time AI Trip Planner Agent Section */}
      <div id="ai-planner">
        <AITripPlanner
          initialDest={selectedAIState}
          onOpenEnquiry={onOpenEnquiry}
        />
      </div>

      {/* SECTION 4: Live Meteorological Satellite Weather Updates */}
      <LiveWeatherWidget />

      {/* SECTION 5: Comprehensive All India States & Tourist Spots Directory */}
      <AllIndiaStatesDirectory onSelectStateForAI={handleSelectStateForAI} />

      {/* SECTION 6: Interactive Trip Finder */}
      <InteractiveTripFinder />

      {/* SECTION 7: Explore the Regions of India */}
      <ExploreRegions userLocation={userLocation} />

      {/* SECTION 8: Signature Journeys */}
      <SignatureJourneys />

      {/* SECTION 9: States and Travel Themes */}
      <TravelThemes />

      {/* SECTION 10: Where to Stay */}
      <WhereToStay onOpenEnquiry={handleOpenEnquiryWithDest} />

      {/* SECTION 11: Best Time to Travel (Seasonal Calendar) */}
      <SeasonalCalendar />

      {/* SECTION 12: Journeys by Traveller Type */}
      <TravellerTypes />

      {/* SECTION 13: Customer Stories */}
      <CustomerStories />

      {/* SECTION 14: Begin a Journey (Inline Enquiry Form) */}
      <BeginJourneySection defaultDestination={enquiryDestination} />
    </main>
  );
}