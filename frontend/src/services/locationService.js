/**
 * Location Awareness & Geolocation Service
 * Computes visitor coordinates, distance to destinations (Haversine formula),
 * and provides manual city fallback if browser permissions are denied.
 */

export const DESTINATION_COORDINATES = {
  rajasthan: { lat: 26.9124, lon: 75.7873, name: 'Rajasthan (Jaipur/Udaipur)' },
  kashmir: { lat: 34.0837, lon: 74.7973, name: 'Kashmir (Srinagar/Gulmarg)' },
  ladakh: { lat: 34.1526, lon: 77.5771, name: 'Ladakh (Leh/Pangong)' },
  kerala: { lat: 9.9312, lon: 76.2673, name: 'Kerala (Kochi/Alleppey)' },
  'himachal-pradesh': { lat: 31.1048, lon: 77.1734, name: 'Himachal Pradesh (Shimla/Manali)' },
  sikkim: { lat: 27.3389, lon: 88.6065, name: 'Sikkim & Darjeeling' },
  'madhya-pradesh': { lat: 23.2599, lon: 77.4126, name: 'Madhya Pradesh (Bandhavgarh)' },
  'uttar-pradesh': { lat: 27.1767, lon: 78.0081, name: 'Uttar Pradesh (Agra/Varanasi)' },
  uttarakhand: { lat: 30.0869, lon: 78.2676, name: 'Uttarakhand (Rishikesh/Nainital)' },
  'south-india': { lat: 11.2189, lon: 78.1674, name: 'South India (Namakkal & Tamil Nadu)' },
  'andaman-islands': { lat: 11.6234, lon: 92.7265, name: 'Andaman Islands (Havelock)' },
  odisha: { lat: 20.2961, lon: 85.8245, name: 'Odisha (Konark/Puri)' },
  'north-east-india': { lat: 25.5788, lon: 91.8933, name: 'North-East India (Meghalaya/Assam)' }
};

export const POPULAR_ORIGIN_CITIES = [
  { name: 'Namakkal, Tamil Nadu', lat: 11.2189, lon: 78.1674, country: 'India' },
  { name: 'Chennai, Tamil Nadu', lat: 13.0827, lon: 80.2707, country: 'India' },
  { name: 'Coimbatore, Tamil Nadu', lat: 11.0168, lon: 76.9558, country: 'India' },
  { name: 'Madurai, Tamil Nadu', lat: 9.9252, lon: 78.1198, country: 'India' },
  { name: 'Tiruchirappalli, Tamil Nadu', lat: 10.7905, lon: 78.7047, country: 'India' },
  { name: 'Bengaluru, Karnataka', lat: 12.9716, lon: 77.5946, country: 'India' },
  { name: 'Mumbai, Maharashtra', lat: 19.0760, lon: 72.8777, country: 'India' },
  { name: 'New Delhi, Delhi', lat: 28.6139, lon: 77.2090, country: 'India' },
  { name: 'Kolkata, West Bengal', lat: 22.5726, lon: 88.3639, country: 'India' },
  { name: 'Hyderabad, Telangana', lat: 17.3850, lon: 78.4867, country: 'India' },
  { name: 'Kochi, Kerala', lat: 9.9312, lon: 76.2673, country: 'India' },
  { name: 'Jaipur, Rajasthan', lat: 26.9124, lon: 75.7873, country: 'India' },
  { name: 'Ahmedabad, Gujarat', lat: 23.0225, lon: 72.5714, country: 'India' },
  { name: 'Pune, Maharashtra', lat: 18.5204, lon: 73.8567, country: 'India' },
  { name: 'Lucknow, Uttar Pradesh', lat: 26.8467, lon: 80.9462, country: 'India' },
  { name: 'Chandigarh, Punjab/Haryana', lat: 30.7333, lon: 76.7794, country: 'India' },
  { name: 'Panaji, Goa', lat: 15.4909, lon: 73.8278, country: 'India' }
];

/**
 * Calculates distance in Kilometers between two lat/lon pairs using Haversine formula
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Request visitor geolocation with graceful fallback
 */
export function requestUserLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        status: 'unsupported',
        message: 'Browser does not support automatic geolocation.',
        location: POPULAR_ORIGIN_CITIES[0]
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          status: 'granted',
          message: 'Location detected successfully.',
          location: {
            name: 'Your Current Device Location',
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            accuracy: Math.round(position.coords.accuracy)
          }
        });
      },
      (error) => {
        let msg = 'Location access was not shared.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission was denied. You can select your starting city manually.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is currently unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location detection timed out.';
        }
        resolve({
          status: 'denied',
          message: msg,
          location: POPULAR_ORIGIN_CITIES[0] // Namakkal fallback
        });
      },
      { timeout: 7000, enableHighAccuracy: true }
    );
  });
}
