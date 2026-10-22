/**
 * Dynamic Travel Photography Service
 * Integrates with Unsplash API (using VITE_UNSPLASH_ACCESS_KEY if present)
 * and resolves high-definition editorial travel photography dynamically.
 */

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';

// Fallback curated photography pool keyed by destination theme
const THEME_PHOTO_FALLBACKS = {
  rajasthan: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
  kashmir: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
  ladakh: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
  kerala: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
  'himachal-pradesh': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
  sikkim: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
  'madhya-pradesh': 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
  'uttar-pradesh': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
  uttarakhand: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
  'south-india': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
  'andaman-islands': 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
  odisha: 'https://images.unsplash.com/photo-1629813366051-b58137b2792c?auto=format&fit=crop&w=1200&q=80',
  'north-east-india': 'https://images.unsplash.com/photo-1616489953149-8049ecadab93?auto=format&fit=crop&w=1200&q=80',
  namakkal: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
};

/**
 * Dynamically retrieves an editorial image for any destination or landmark query
 */
export async function getDynamicDestinationImage(query, fallbackTheme = 'rajasthan') {
  if (UNSPLASH_KEY) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' India travel')}&per_page=1&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_KEY}`
          }
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          return {
            url: data.results[0].urls.regular,
            credit: data.results[0].user?.name || 'Unsplash Photographer',
            source: 'Unsplash API'
          };
        }
      }
    } catch (e) {
      console.warn('Unsplash API fetch failed, using curated source:', e);
    }
  }

  // Curated high-res imagery fallback
  const defaultUrl = THEME_PHOTO_FALLBACKS[fallbackTheme.toLowerCase()] || THEME_PHOTO_FALLBACKS.rajasthan;
  return {
    url: defaultUrl,
    credit: 'Plan My Trip Atelier Archival Collection',
    source: 'Curated Photography'
  };
}
