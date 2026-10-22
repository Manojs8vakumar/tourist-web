package com.tourist.planner.config;

import com.tourist.planner.model.*;
import com.tourist.planner.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DestinationRepository destinationRepository;
    private final TourPackageRepository tourPackageRepository;
    private final AccommodationRepository accommodationRepository;
    private final TestimonialRepository testimonialRepository;
    private final JournalPostRepository journalPostRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      DestinationRepository destinationRepository,
                      TourPackageRepository tourPackageRepository,
                      AccommodationRepository accommodationRepository,
                      TestimonialRepository testimonialRepository,
                      JournalPostRepository journalPostRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.destinationRepository = destinationRepository;
        this.tourPackageRepository = tourPackageRepository;
        this.accommodationRepository = accommodationRepository;
        this.testimonialRepository = testimonialRepository;
        this.journalPostRepository = journalPostRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        if (destinationRepository.count() == 0) {
            seedDestinationsAndPackages();
        }
        if (accommodationRepository.count() == 0) {
            seedAccommodations();
        }
        if (testimonialRepository.count() == 0) {
            seedTestimonials();
        }
        if (journalPostRepository.count() == 0) {
            seedJournal();
        }
    }

    private void seedUsers() {
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User(
                    "admin",
                    "admin@planmytrip.agency",
                    passwordEncoder.encode("Admin@123"),
                    "Lead Curator",
                    "+91 98765 43210",
                    Role.ROLE_ADMIN
            );
            userRepository.save(admin);
        }
        if (!userRepository.existsByUsername("guest")) {
            User customer = new User(
                    "guest",
                    "guest@planmytrip.agency",
                    passwordEncoder.encode("Guest@123"),
                    "Aditi Sharma",
                    "+91 98111 22334",
                    Role.ROLE_CUSTOMER
            );
            userRepository.save(customer);
        }
    }

    private void seedDestinationsAndPackages() {
        // 1. Rajasthan
        Destination rajasthan = new Destination();
        rajasthan.setSlug("rajasthan");
        rajasthan.setName("Rajasthan");
        rajasthan.setRegionCategory("Heritage and Palaces");
        rajasthan.setTagline("Land of Maharajas, golden dunes and romantic palace lakes");
        rajasthan.setHeroImage("https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80");
        rajasthan.setCardImage("https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80");
        rajasthan.setDescription("A royal canvas where sandstone citadels rise above shimmering deserts and mirrored lake palaces evoke the romantic chivalry of Rajput royalty. Experience private dinners in desert dune camps, elephant sanctuaries, and courtyards bathed in amber twilight.");
        rajasthan.setBestTimeToVisit("October to March");
        rajasthan.setAvailableTourCount(8);
        rajasthan.setHighlights("Amber Fort, Lake Pichola, Mehrangarh Citadel, Thar Desert Dune Camps, Shekhawati Frescoes");
        rajasthan.setBestMonths("Oct,Nov,Dec,Jan,Feb,Mar");
        rajasthan.setOrderIndex(1);
        rajasthan = destinationRepository.save(rajasthan);

        // 2. Kashmir
        Destination kashmir = new Destination();
        kashmir.setSlug("kashmir");
        kashmir.setName("Kashmir");
        kashmir.setRegionCategory("Himalayan Escapes");
        kashmir.setTagline("Paradise on Earth with serene Dal Lake houseboats and snowbound meadows");
        kashmir.setHeroImage("https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1920&q=80");
        kashmir.setCardImage("https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80");
        kashmir.setDescription("Mughal emperors proclaimed Kashmir the paradise on earth. Glide along mist-laden waters in private cedarwood Shikaras, wander terraced saffron gardens, and wake up to the pine-scented breezes of Gulmarg and Pahalgam.");
        kashmir.setBestTimeToVisit("April to October (Spring to Autumn) & Dec-Feb for Snow");
        kashmir.setAvailableTourCount(6);
        kashmir.setHighlights("Dal Lake Cedarwood Houseboats, Gulmarg Gondola & Alpine Meadows, Betaab Valley, Saffron Fields of Pampore");
        kashmir.setBestMonths("Apr,May,Jun,Jul,Aug,Sep,Oct,Dec,Jan,Feb");
        kashmir.setOrderIndex(2);
        kashmir = destinationRepository.save(kashmir);

        // 3. Ladakh
        Destination ladakh = new Destination();
        ladakh.setSlug("ladakh");
        ladakh.setName("Ladakh");
        ladakh.setRegionCategory("Himalayan Escapes");
        ladakh.setTagline("High-altitude moonscapes, cliff-top monasteries and turquoise glacial lakes");
        ladakh.setHeroImage("https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1920&q=80");
        ladakh.setCardImage("https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80");
        ladakh.setDescription("A high-altitude desert kingdom enclosed between the Karakoram and Great Himalayas. Witness monastic morning chants at Thiksey, cross the world's highest motorable passes, and gaze at Pangong Tso's ever-shifting cobalt waters.");
        ladakh.setBestTimeToVisit("May to September");
        ladakh.setAvailableTourCount(5);
        ladakh.setHighlights("Pangong Tso Lake, Nubra Valley Sand Dunes, Thiksey Monastery, Khardung La Pass");
        ladakh.setBestMonths("May,Jun,Jul,Aug,Sep");
        ladakh.setOrderIndex(3);
        ladakh = destinationRepository.save(ladakh);

        // 4. Kerala
        Destination kerala = new Destination();
        kerala.setSlug("kerala");
        kerala.setName("Kerala");
        kerala.setRegionCategory("Southern India");
        kerala.setTagline("God's Own Country of emerald backwaters, spice hills and Ayurvedic wellness");
        kerala.setHeroImage("https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&q=80");
        kerala.setCardImage("https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80");
        kerala.setDescription("A lush coastal sanctuary fringed with swaying palms, quiet lagoons, and cardamom-scented mountains. Cruise on private kettuvallam houseboats through Vembanad Lake and rejuvenate with authentic Ayurvedic wellness rituals.");
        kerala.setBestTimeToVisit("September to March");
        kerala.setAvailableTourCount(7);
        kerala.setHighlights("Alleppey Private Kettuvallam, Munnar High-Altitude Tea Estates, Fort Kochi Colonial Heritage, Periyar Forest");
        kerala.setBestMonths("Sep,Oct,Nov,Dec,Jan,Feb,Mar");
        kerala.setOrderIndex(4);
        kerala = destinationRepository.save(kerala);

        // 5. Himachal Pradesh
        Destination himachal = new Destination();
        himachal.setSlug("himachal-pradesh");
        himachal.setName("Himachal Pradesh");
        himachal.setRegionCategory("Himalayan Escapes");
        himachal.setTagline("Pine valleys, colonial mountain retreats and high-altitude trans-Himalayan valleys");
        himachal.setHeroImage("https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&q=80");
        himachal.setCardImage("https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80");
        himachal.setDescription("From the quiet cedar sanctuaries of Mashobra and Dharamshala's Tibetan spiritual enclaves to the stark dramatic beauty of Spiti Valley, Himachal provides alpine indulgence and pristine mountain calm.");
        himachal.setBestTimeToVisit("March to June (Summer) & October to February (Winter & Snow)");
        himachal.setAvailableTourCount(6);
        himachal.setHighlights("Wildflower Hall Cedar Trails, Spiti Valley Monasteries, Rohtang High Passes, Dharamshala Monastic Peace");
        himachal.setBestMonths("Mar,Apr,May,Jun,Oct,Nov,Dec,Jan,Feb");
        himachal.setOrderIndex(5);
        himachal = destinationRepository.save(himachal);

        // 6. Sikkim & Darjeeling
        Destination sikkim = new Destination();
        sikkim.setSlug("sikkim");
        sikkim.setName("Sikkim & Darjeeling");
        sikkim.setRegionCategory("Himalayan Escapes");
        sikkim.setTagline("Himalayan sunrise over Kanchenjunga, ancient gompas and heritage tea estates");
        sikkim.setHeroImage("https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80");
        sikkim.setCardImage("https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80");
        sikkim.setDescription("Gaze upon the five sacred peaks of Mount Kanchenjunga, walk along colonial planters' bungalows, and discover sacred Buddhist lakes surrounded by fluttering prayer flags and rhododendron valleys.");
        sikkim.setBestTimeToVisit("March to May & October to December");
        sikkim.setAvailableTourCount(4);
        sikkim.setHighlights("Tiger Hill Sunrise, Glenburn Tea Estate Stays, Rumtek Monastery, Gurudongmar High-Altitude Lake");
        sikkim.setBestMonths("Mar,Apr,May,Oct,Nov,Dec");
        sikkim.setOrderIndex(6);
        sikkim = destinationRepository.save(sikkim);

        // 7. Madhya Pradesh
        Destination mp = new Destination();
        mp.setSlug("madhya-pradesh");
        mp.setName("Madhya Pradesh");
        mp.setRegionCategory("Wildlife and Nature");
        mp.setTagline("The Heart of India: Royal Bengal tigers, Khajuraho temples and marble river gorges");
        mp.setHeroImage("https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1920&q=80");
        mp.setCardImage("https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80");
        mp.setDescription("India's premier tiger country where Kipling's jungle lore comes alive. Stay in bespoke wilderness lodges in Bandhavgarh and Kanha, marvel at UNESCO World Heritage temples of Khajuraho, and boat between Jabalpur's moonlit marble rocks.");
        mp.setBestTimeToVisit("October to April");
        mp.setAvailableTourCount(5);
        mp.setHighlights("Bandhavgarh Tiger Tracking, Khajuraho Temple Art, Kanha Sal Forests, Bhedaghat Marble Rocks");
        mp.setBestMonths("Oct,Nov,Dec,Jan,Feb,Mar,Apr");
        mp.setOrderIndex(7);
        mp = destinationRepository.save(mp);

        // 8. Uttar Pradesh
        Destination up = new Destination();
        up.setSlug("uttar-pradesh");
        up.setName("Uttar Pradesh");
        up.setRegionCategory("Northern India");
        up.setTagline("Varanasi's eternal Ganga ghats, Agra's marble marvels and Lucknow's royal Awadhi heritage");
        up.setHeroImage("https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&q=80");
        up.setCardImage("https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80");
        up.setDescription("The sacred crucible of civilization. Experience private dawn boat rides along the ghats of Varanasi while Vedic chanting fills the air, witness the Taj Mahal in the quiet hues of sunrise, and savor centuries-old royal culinary traditions in Lucknow.");
        up.setBestTimeToVisit("October to March");
        up.setAvailableTourCount(6);
        up.setHighlights("Taj Mahal at Dawn, Varanasi Ganga Aarti by Private Boat, Sarnath Buddhist Ruins, Lucknow Awadhi Tastings");
        up.setBestMonths("Oct,Nov,Dec,Jan,Feb,Mar");
        up.setOrderIndex(8);
        up = destinationRepository.save(up);

        // 9. Uttarakhand
        Destination uttarakhand = new Destination();
        uttarakhand.setSlug("uttarakhand");
        uttarakhand.setName("Uttarakhand");
        uttarakhand.setRegionCategory("Northern India");
        uttarakhand.setTagline("Spiritual yoga retreats on the Ganga, alpine meadows and Jim Corbett wilderness");
        uttarakhand.setHeroImage("https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1920&q=80");
        uttarakhand.setCardImage("https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=800&q=80");
        uttarakhand.setDescription("Where the sacred Ganga cascades through the foothills of the Himalayas. Discover world-renowned luxury wellness at Ananda in the Himalayas, explore wild elephant and tiger corridors in Jim Corbett, and find solace in Rishikesh.");
        uttarakhand.setBestTimeToVisit("March to June & September to November");
        uttarakhand.setAvailableTourCount(5);
        uttarakhand.setHighlights("Ananda in the Himalayas Wellness, Jim Corbett Safari, Rishikesh Private Yoga Ghats, Nanda Devi Views");
        uttarakhand.setBestMonths("Mar,Apr,May,Jun,Sep,Oct,Nov");
        uttarakhand.setOrderIndex(9);
        uttarakhand = destinationRepository.save(uttarakhand);

        // 10. South India
        Destination south = new Destination();
        south.setSlug("south-india");
        south.setName("South India");
        south.setRegionCategory("Southern India");
        south.setTagline("Dravidian stone temples, Chettinad heritage mansions and misty Nilgiri tea hills");
        south.setHeroImage("https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1920&q=80");
        south.setCardImage("https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80");
        south.setDescription("Journey through millenia of living heritage across Tamil Nadu and Karnataka. From the monumental gopurams of Madurai and Thanjavur to the spice plantations of Coorg and aristocratic mansions of Chettinad.");
        south.setBestTimeToVisit("October to March");
        south.setAvailableTourCount(6);
        south.setHighlights("Brihadisvara UNESCO Temple, Madurai Meenakshi Temple, Chettinad Culinary Mansions, Nilgiri Mountain Railway");
        south.setBestMonths("Oct,Nov,Dec,Jan,Feb,Mar");
        south.setOrderIndex(10);
        south = destinationRepository.save(south);

        // 11. Andaman Islands
        Destination andaman = new Destination();
        andaman.setSlug("andaman-islands");
        andaman.setName("Andaman Islands");
        andaman.setRegionCategory("Islands and Beaches");
        andaman.setTagline("Turquoise lagoons, private island seclusion and untouched coral archipelagos");
        andaman.setHeroImage("https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1920&q=80");
        andaman.setCardImage("https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80");
        andaman.setDescription("An archipelago of crystalline waters and virgin white sands set deep in the Bay of Bengal. Unwind in ultra-luxury beachfront villas, dive with marine life in private coral reefs, and experience unmatched ocean tranquility.");
        andaman.setBestTimeToVisit("October to May");
        andaman.setAvailableTourCount(4);
        andaman.setHighlights("Radhanagar Beach Sunsets, Private Yacht Charters to Neil Island, Coral Reef Snorkeling, Mangrove Kayaking");
        andaman.setBestMonths("Oct,Nov,Dec,Jan,Feb,Mar,Apr,May");
        andaman.setOrderIndex(11);
        andaman = destinationRepository.save(andaman);

        // 12. Odisha
        Destination odisha = new Destination();
        odisha.setSlug("odisha");
        odisha.setName("Odisha");
        odisha.setRegionCategory("Heritage and Palaces");
        odisha.setTagline("Monumental sun temples, sacred Chilika flamingo waters and ancient textile artisan guilds");
        odisha.setHeroImage("https://images.unsplash.com/photo-1629813366051-b58137b2792c?auto=format&fit=crop&w=1920&q=80");
        odisha.setCardImage("https://images.unsplash.com/photo-1629813366051-b58137b2792c?auto=format&fit=crop&w=800&q=80");
        odisha.setDescription("A land of architectural wonder where stone poetry was carved into the monumental chariot wheels of the Konark Sun Temple. Sail across Chilika lagoon among migrating flamingos and meet master Ikat silk weavers.");
        odisha.setBestTimeToVisit("November to February");
        odisha.setAvailableTourCount(3);
        odisha.setHighlights("Konark Sun Temple UNESCO Wonder, Chilika Lake Irrawaddy Dolphin Sanctuary, Raghurajpur Artisan Village, Puri Coast");
        odisha.setBestMonths("Nov,Dec,Jan,Feb");
        odisha.setOrderIndex(12);
        odisha = destinationRepository.save(odisha);

        // 13. North-East India
        Destination northeast = new Destination();
        northeast.setSlug("north-east-india");
        northeast.setName("North-East India");
        northeast.setRegionCategory("Wildlife and Nature");
        northeast.setTagline("Living root bridges, one-horned rhino sanctuaries and cloud-kissed Meghalaya valleys");
        northeast.setHeroImage("https://images.unsplash.com/photo-1616489953149-8049ecadab93?auto=format&fit=crop&w=1920&q=80");
        northeast.setCardImage("https://images.unsplash.com/photo-1616489953149-8049ecadab93?auto=format&fit=crop&w=800&q=80");
        northeast.setDescription("One of the world's greatest biodiversity hot spots. Walk across centuries-old living root bridges woven from fig trees in Cherrapunji, encounter the rare greater one-horned rhinoceros in Kaziranga, and cruise down the mighty Brahmaputra river.");
        northeast.setBestTimeToVisit("October to April");
        northeast.setAvailableTourCount(4);
        northeast.setHighlights("Kaziranga National Park Rhino Safaris, Cherrapunji Living Root Bridges, Dawki Crystal Waters, Majuli Island Culture");
        northeast.setBestMonths("Oct,Nov,Dec,Jan,Feb,Mar,Apr");
        northeast.setOrderIndex(13);
        northeast = destinationRepository.save(northeast);

        // NOW SEED SIGNATURE AND CURATED PACKAGES WITH RICH ITINERARIES

        // P01: Himalayan Escape
        TourPackage p1 = new TourPackage();
        p1.setSlug("himalayan-escape");
        p1.setPackageNumber("01");
        p1.setName("Himalayan Escape");
        p1.setDestination(himachal);
        p1.setDurationNights(7);
        p1.setDurationDays(8);
        p1.setStartingPriceInr(165000.0);
        p1.setMood("Himalaya");
        p1.setBestMonths("Apr,May,Jun,Sep,Oct");
        p1.setHeroImage("https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80");
        p1.setHighlights("Mashobra Private Cedar Chalets, High Mountain Passes, Tibetan Monastery Breakfast, Private Spa Ritual");
        p1.setOverview("A bespoke mountain retreat designed for discerning travellers who seek seclusion amidst ancient cedar forests and towering Himalayan peaks. Combining colonial luxury in Shimla with the serene monastic aura of Dharamshala.");
        p1.setTravellerType("Couples and honeymooners");
        p1.setTravelStyle("Luxury Alpine Sanctuary");
        p1.setInclusions("Private chauffeur throughout, 7 Nights in 5-star mountain suites, All gourmet breakfasts & curated dinners, Private monastery access, Dedicated butler service");
        p1.setExclusions("Domestic airfare, Personal gratuities, Premium alcoholic beverages");
        p1.setIsSignature(true);
        p1.addItinerary(new PackageItinerary(1, "Arrival in Chandigarh & Scenic Ascent to Mashobra", "Private luxury transfer into the pine-clad heights of Mashobra. Evening welcome cocktail with views of snow peaks.", "Wildflower Hall, Shimla", "Dinner Included", "Scenic mountain drive, private check-in"));
        p1.addItinerary(new PackageItinerary(2, "Colonial Trails & Private Forest Picnic", "Guided architectural walk through Shimla's heritage landmarks, followed by an artisanal picnic in a protected cedar sanctuary.", "Wildflower Hall, Shimla", "Breakfast & Gourmet Picnic Lunch", "Viceregal Lodge, heritage bazaar walk"));
        p1.addItinerary(new PackageItinerary(3, "Journey into the Kangra Valley", "Traverse picturesque tea gardens as you enter the sacred spiritual valley of Dharamshala.", "Hyatt Regency Dharamshala Resort", "Breakfast & Dinner", "Tea garden stroll, sunset terrace dining"));
        p1.addItinerary(new PackageItinerary(4, "Private Audience & Monastic Rituals", "Early morning meditation session at Gyuto Tantric Monastery followed by exploration of the Norbulingka Tibetan Cultural Institute.", "Hyatt Regency Dharamshala Resort", "Breakfast & Lunch", "Monastery chants, private thangka painting tour"));
        p1.addItinerary(new PackageItinerary(5, "High Ridge Walks & Tea Tasting", "Leisurely guided trek along cedar ridges overlooking the Dhauladhar range with master tea sommelier session.", "Hyatt Regency Dharamshala Resort", "Breakfast & Dinner", "Ridge walk, tea blending workshop"));
        p1.addItinerary(new PackageItinerary(6, "Descent to Nalagarh Heritage Fort", "Scenic transfer to the 15th-century foothills citadel. Enjoy a royal dinner in the heritage courtyard under candlelight.", "Nalagarh Fort Palace", "Breakfast & Royal Thali Dinner", "Fort ramparts sunset, royal dining"));
        p1.addItinerary(new PackageItinerary(7, "Wellness & Holistic Ayurvedic Treatments", "Full day dedicated to relaxation with signature bespoke herbal therapies and tranquil pool relaxation.", "Nalagarh Fort Palace", "All Meals Included", "Ayurvedic consultation, herb garden walk"));
        p1.addItinerary(new PackageItinerary(8, "Chandigarh Departure", "Chauffeured transfer to Chandigarh airport for your onward journey with fond Himalayan memories.", "Departure", "Breakfast Included", "Private airport transfer"));
        tourPackageRepository.save(p1);

        // P02: Best of Kashmir
        TourPackage p2 = new TourPackage();
        p2.setSlug("best-of-kashmir");
        p2.setPackageNumber("02");
        p2.setName("Best of Kashmir");
        p2.setDestination(kashmir);
        p2.setDurationNights(6);
        p2.setDurationDays(7);
        p2.setStartingPriceInr(145000.0);
        p2.setMood("Romance");
        p2.setBestMonths("Apr,May,Jun,Jul,Aug,Sep,Oct");
        p2.setHeroImage("https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80");
        p2.setHighlights("Private Cedarwood Houseboat, Dal Lake Dawn Floating Flower Market, Gulmarg Gondola Summit, Pahalgam Pine Meadows");
        p2.setOverview("Experience the legendary splendour of the Kashmir Valley. Drift through lotus-strewn lagoons on private shikaras, dine on Wazwan feasts in royal houseboats, and marvel at the Pir Panjal peaks of Gulmarg.");
        p2.setTravellerType("Couples and honeymooners");
        p2.setTravelStyle("Romantic Heritage Retreat");
        p2.setInclusions("Private Shikara journeys, 2 nights in heritage luxury houseboat, 4 nights luxury resort, Chauffeur with 4x4 vehicle, All meals, Private flower market dawn tour");
        p2.setExclusions("Personal purchases, Kashmiri carpet purchases, International flights");
        p2.setIsSignature(true);
        p2.addItinerary(new PackageItinerary(1, "Arrival in Srinagar & Dal Lake Shikara Glide", "Airport greeting with saffron Kahwa. Private transfer to your luxury carved cedar houseboat. Sunset cruise through Dal Lake.", "The Sukoon Luxury Houseboat", "Dinner Included", "Private sunset shikara ride, traditional Kahwa"));
        p2.addItinerary(new PackageItinerary(2, "Dawn Floating Markets & Mughal Garden Splendour", "Witness the mystical dawn vegetable & flower floating market. Afternoon visit to Shalimar Bagh and Nishat Bagh with royal horticulturist.", "The Sukoon Luxury Houseboat", "Breakfast & Wazwan Lunch", "Dawn floating market, Mughal garden architecture"));
        p2.addItinerary(new PackageItinerary(3, "Ascent to Gulmarg Alpine Meadows", "Drive through apple orchards to Gulmarg. Check in to the famed Khyber Himalayan Resort. Afternoon meadow walk.", "The Khyber Himalayan Resort & Spa", "Breakfast & Dinner", "Orchard drive, alpine lounge evening"));
        p2.addItinerary(new PackageItinerary(4, "Gulmarg Gondola & Apharwat Peak", "Priority VIP boarding on the world's second highest cable car to Phase 2 at 13,780 ft. Spectacular panoramic views of Nanga Parbat.", "The Khyber Himalayan Resort & Spa", "Breakfast & Dinner", "VIP Gondola summit, snow activities"));
        p2.addItinerary(new PackageItinerary(5, "Pahalgam Valley of the Shepherds", "Scenic journey along the Lidder River to Pahalgam. Stroll through pine forests and visit the serene Betaab and Aru Valleys.", "Pahalgam Pine N Peak Resort", "Breakfast & Dinner", "Lidder riverbanks, Betaab valley photography"));
        p2.addItinerary(new PackageItinerary(6, "Baisaran Pine Valley & Saffron Trails of Pampore", "Morning horseback ride to Baisaran meadow. Afternoon drive back towards Srinagar with a stop at Pampore saffron cooperatives.", "Vivanta Dal View Srinagar", "Breakfast & Farewell Dinner", "Pampore saffron tasting, farewell lakeview dinner"));
        p2.addItinerary(new PackageItinerary(7, "Farewell Srinagar", "Leisurely breakfast overlooking Dal Lake before your chauffeured airport transfer.", "Departure", "Breakfast Included", "Private airport escort"));
        tourPackageRepository.save(p2);

        // P03: Rajasthan Heritage Trail
        TourPackage p3 = new TourPackage();
        p3.setSlug("rajasthan-heritage-trail");
        p3.setPackageNumber("03");
        p3.setName("Rajasthan Heritage Trail");
        p3.setDestination(rajasthan);
        p3.setDurationNights(8);
        p3.setDurationDays(9);
        p3.setStartingPriceInr(195000.0);
        p3.setMood("Heritage");
        p3.setBestMonths("Oct,Nov,Dec,Jan,Feb,Mar");
        p3.setHeroImage("https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80");
        p3.setHighlights("Amber Fort Private Elephant Sanctuary, Lake Pichola Sunset Boat, Mehrangarh Fortress Private Access, Thar Dune Candlelit Dinner");
        p3.setOverview("An unhurried passage through India's imperial kingdom: Jaipur's pink facades, Jodhpur's blue alleys, and Udaipur's serene waters. Stay inside legendary living palaces with royal hospitality.");
        p3.setTravellerType("First-time travellers");
        p3.setTravelStyle("Grand Royal Heritage");
        p3.setInclusions("Stay in authentic palace suites (Rambagh, Umaid Bhawan, Lake Palace), Private vintage car transfer, Historian guide throughout, Royal banquets");
        p3.setExclusions("Personal shopping, Optional hot air balloon ride");
        p3.setIsSignature(true);
        p3.addItinerary(new PackageItinerary(1, "Jaipur Royal Welcome", "Arrive in the Pink City. Chauffeur reception with garland and welcome at the historic Rambagh Palace.", "Rambagh Palace, Jaipur", "Dinner Included", "Palace peacocks garden walk, Rajasthani royal dinner"));
        p3.addItinerary(new PackageItinerary(2, "Amber Citadel & City Palace Exclusive", "Private morning visit to Amber Fort. Exclusive access to the Chandra Mahal private apartments inside the City Palace.", "Rambagh Palace, Jaipur", "Breakfast & Lunch", "Amber Fort ramparts, royal jewels gallery"));
        p3.addItinerary(new PackageItinerary(3, "Blue City of Jodhpur", "Drive through the desert landscape to the Sun City. Check in to the monumental Umaid Bhawan Palace.", "Umaid Bhawan Palace, Jodhpur", "Breakfast & Dinner", "Chittar hill views, heritage museum tour"));
        p3.addItinerary(new PackageItinerary(4, "Mehrangarh Fort & Stepwells", "Curator-guided exploration of Mehrangarh Fort. Walk through the blue-washed lanes of the old walled city.", "Umaid Bhawan Palace, Jodhpur", "Breakfast & Lunch", "Mehrangarh private royal collection, Toorji Ka Jhalra"));
        p3.addItinerary(new PackageItinerary(5, "Ranakpur Jain Marble Marvel & Scenic Aravallis", "Scenic journey through the Aravalli hills with a stop at Ranakpur's 1444 intricately hand-carved marble pillars.", "The Leela Palace, Udaipur", "Breakfast & Dinner", "Ranakpur marble marvel, Lake Pichola arrival"));
        p3.addItinerary(new PackageItinerary(6, "Udaipur Romance of the Lakes", "Private solar boat ride on Lake Pichola. Visit the sprawling City Palace complex and Jag Mandir Island.", "The Leela Palace, Udaipur", "Breakfast & Lunch", "City Palace museum, Jag Mandir island dining"));
        p3.addItinerary(new PackageItinerary(7, "Artisan Miniature Painting & Classical Dance", "Hands-on masterclass with a master Mewar miniature artist. Evening classical dance performance at Bagore Ki Haveli.", "The Leela Palace, Udaipur", "Breakfast & Dinner", "Miniature painting, Mewar cultural show"));
        p3.addItinerary(new PackageItinerary(8, "Bespoke Wellness & Sunset Lakeside Dinner", "Relax with an Ayurvedic royal spa ritual. Private candlelit dinner at the edge of the lake with live sitar music.", "The Leela Palace, Udaipur", "All Meals Included", "Royal spa ritual, lakeside candlelit banquet"));
        p3.addItinerary(new PackageItinerary(9, "Farewell Udaipur", "Morning at leisure overlooking the lake. Private transfer to Udaipur airport for your onward flight.", "Departure", "Breakfast Included", "Airport transfer"));
        tourPackageRepository.save(p3);

        // P04: Kerala Backwater Retreat
        TourPackage p4 = new TourPackage();
        p4.setSlug("kerala-backwater-retreat");
        p4.setPackageNumber("04");
        p4.setName("Kerala Backwater Retreat");
        p4.setDestination(kerala);
        p4.setDurationNights(6);
        p4.setDurationDays(7);
        p4.setStartingPriceInr(135000.0);
        p4.setMood("Backwaters");
        p4.setBestMonths("Sep,Oct,Nov,Dec,Jan,Feb,Mar");
        p4.setHeroImage("https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80");
        p4.setHighlights("Private Air-Conditioned Kettuvallam Houseboat, Kumarakom Lake Resort, Munnar Organic Tea Plucking, Fort Kochi Spice Trail");
        p4.setOverview("A tranquil voyage through Kerala's timeless aquatic highways and misty spice hills. Relish traditional Sadya feasts on banana leaves, watch Chinese fishing nets against pink sunsets, and surrender to holistic wellness.");
        p4.setTravellerType("Families with children");
        p4.setTravelStyle("Slow Travel & Wellness");
        p4.setInclusions("Overnight private houseboat cruise with private chef, Luxury heritage resort stays, Fort Kochi guided walking tour, Spice plantation lunch");
        p4.setExclusions("Ayurvedic clinical treatment packages, Personal purchases");
        p4.setIsSignature(true);
        p4.addItinerary(new PackageItinerary(1, "Cochin Arrival & Fort Kochi Colonial Charms", "Chauffeur reception at Cochin International Airport. Stroll by the ancient Chinese fishing nets and Mattancherry Jew Town.", "Brunton Boatyard, Fort Kochi", "Dinner Included", "Chinese fishing nets sunset, seafood feast"));
        p4.addItinerary(new PackageItinerary(2, "Ascent to Munnar Tea Valleys", "Drive through lush tropical waterfalls to Munnar. Afternoon visit to the historic tea museum and organic plantations.", "Spice Tree Munnar", "Breakfast & Dinner", "Cheeyappara waterfalls, tea factory tour"));
        p4.addItinerary(new PackageItinerary(3, "Munnar Mountain Mist & Spice Trails", "Morning soft trek through private spice plantations featuring cardamom, pepper and cinnamon. Evening cooking class.", "Spice Tree Munnar", "Breakfast & Traditional Dinner", "Spice trail walk, Kerala culinary masterclass"));
        p4.addItinerary(new PackageItinerary(4, "Boarding the Private Kettuvallam at Alleppey", "Board your exclusive luxury thatched-roof houseboat. Cruise silently along palm-fringed canals while chef prepares fresh Karimeen fish.", "Private Luxury Houseboat", "All Meals Included", "Canal village life, chef-prepared Karimeen fry"));
        p4.addItinerary(new PackageItinerary(5, "Kumarakom Sanctuary of Serenity", "Disembark at Kumarakom Lake Resort. Indulge in an authentic Abhyanga Ayurvedic oil massage by certified practitioners.", "Kumarakom Lake Resort", "Breakfast & Dinner", "Vembanad lake sunset, Ayurvedic massage"));
        p4.addItinerary(new PackageItinerary(6, "Kumarakom Bird Sanctuary & Village Crafts", "Early morning rowboat ride inside the bird sanctuary with resident naturalist. Afternoon at the meandering infinity pool.", "Kumarakom Lake Resort", "Breakfast & Dinner", "Birdwatching cruise, local pottery & coir craft"));
        p4.addItinerary(new PackageItinerary(7, "Farewell Kochi", "Chauffeured scenic return to Cochin airport for onward departure.", "Departure", "Breakfast Included", "Airport transfer"));
        tourPackageRepository.save(p4);

        // P05: Madhya Pradesh Wildlife Expedition
        TourPackage p5 = new TourPackage();
        p5.setSlug("madhya-pradesh-wildlife-expedition");
        p5.setPackageNumber("05");
        p5.setName("Madhya Pradesh Wildlife Expedition");
        p5.setDestination(mp);
        p5.setDurationNights(5);
        p5.setDurationDays(6);
        p5.setStartingPriceInr(155000.0);
        p5.setMood("Wildlife");
        p5.setBestMonths("Oct,Nov,Dec,Jan,Feb,Mar,Apr,May");
        p5.setHeroImage("https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80");
        p5.setHighlights("6 Exclusive 4x4 Private Jeep Safaris in Bandhavgarh & Kanha, Expert Naturalist Guides, Luxury Tented Jungle Camp, Bush Dinners");
        p5.setOverview("Embark on India's premier tiger tracking adventure. With Bandhavgarh's unmatched predator density and Kanha's majestic sal glades, this journey offers thrilling encounters with tigers, leopards, and barasinghas.");
        p5.setTravellerType("Wildlife and adventure enthusiasts");
        p5.setTravelStyle("Luxury Safari & Wilderness");
        p5.setInclusions("All 6 private gypsy safaris with top-tier naturalist, Forest permits and park entry, All meals and wilderness bush dinners, Luxury cottage stay");
        p5.setExclusions("Camera lens special permit fees (if applicable), Flights to Jabalpur");
        p5.setIsSignature(true);
        p5.addItinerary(new PackageItinerary(1, "Jabalpur to Bandhavgarh Tiger Country", "Transfer from Jabalpur airport through central Indian countryside to your luxury safari lodge.", "Samode Safari Lodge, Bandhavgarh", "Dinner Included", "Jungle lodge briefing, fireside naturalists talk"));
        p5.addItinerary(new PackageItinerary(2, "Bandhavgarh Dawn & Dusk Tiger Safaris", "Two private open 4x4 jeep safaris through Tala and Magadhi zones. High probability of Royal Bengal tiger tracking.", "Samode Safari Lodge, Bandhavgarh", "All Meals Included", "Dawn safari, afternoon safari, bush campfire"));
        p5.addItinerary(new PackageItinerary(3, "Ancient Bandhavgarh Fort Ruins & Birding", "Morning safari exploring ancient caves and monolithic Vishnu statue hidden inside the park. Afternoon birdwatching walk.", "Samode Safari Lodge, Bandhavgarh", "All Meals Included", "Ancient ruins safari, 250+ bird species trail"));
        p5.addItinerary(new PackageItinerary(4, "Transfer to Kanha National Park", "Scenic cross-jungle drive to Kanha, the inspiration for Kipling's Jungle Book. Evening sunset drink by the watering hole.", "Singinawa Jungle Lodge, Kanha", "Breakfast & Dinner", "Cross-park drive, evening wildlife documentary"));
        p5.addItinerary(new PackageItinerary(5, "Kanha Sal Forests & Barasingha Meadow", "Full day safaris in Kanha zone exploring the vast grasslands for the endangered hard-ground barasingha and dhole wild dogs.", "Singinawa Jungle Lodge, Kanha", "All Meals Included", "Full day safari, stargazing with resident astronomer"));
        p5.addItinerary(new PackageItinerary(6, "Bhedaghat Marble Rocks & Departure", "Morning drive to Jabalpur. Boat ride through the dramatic white marble gorge on the Narmada River before airport drop-off.", "Departure", "Breakfast Included", "Bhedaghat marble gorge boat ride, airport transfer"));
        tourPackageRepository.save(p5);

        // P06: South India Temple & Spice Journey
        TourPackage p6 = new TourPackage();
        p6.setSlug("south-india-temple-journey");
        p6.setPackageNumber("06");
        p6.setName("South India Temple & Spice Journey");
        p6.setDestination(south);
        p6.setDurationNights(7);
        p6.setDurationDays(8);
        p6.setStartingPriceInr(148000.0);
        p6.setMood("Heritage");
        p6.setBestMonths("Oct,Nov,Dec,Jan,Feb,Mar");
        p6.setHeroImage("https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80");
        p6.setHighlights("Brihadisvara UNESCO Temple, Madurai Meenakshi Night Ceremony, Chettinad Aristocratic Mansion Feasts, Thanjavur Bronze Foundry");
        p6.setOverview("A masterfully curated cultural pilgrimage through the temple citadels of the Chola and Pandya dynasties, coupled with the lavish culinary heritage of Chettinad merchants.");
        p6.setTravellerType("First-time travellers");
        p6.setTravelStyle("Cultural Expedition");
        p6.setInclusions("Private guide & chauffeur, Luxury heritage hotels (Visalam, Heritage Madurai), Special VIP temple darshan access, Chettinad cooking session");
        p6.setExclusions("Personal donations, Domestic flights");
        p6.setIsSignature(true);
        p6.addItinerary(new PackageItinerary(1, "Chennai to Mahabalipuram Coastal Temples", "Arrival in Chennai. Transfer to the shore temples of Mahabalipuram overlooking the Bay of Bengal.", "Taj Fisherman's Cove Resort & Spa", "Dinner Included", "Shore temple sunset, Arjuna's Penance"));
        p6.addItinerary(new PackageItinerary(2, "French Quarter of Pondicherry", "Drive south along the scenic East Coast Road into the bougainvillea-lined French Quarter of Pondicherry.", "Palais de Mahe, Pondicherry", "Breakfast & French-Creole Dinner", "Auroville visit, colonial promenade walk"));
        p6.addItinerary(new PackageItinerary(3, "Thanjavur & The Great Living Chola Temples", "Visit the awe-inspiring 1,000-year-old Brihadisvara Temple with an archaeologist guide.", "Svatma, Thanjavur", "Breakfast & Dinner", "Brihadisvara UNESCO marvel, Thanjavur bronze casting"));
        p6.addItinerary(new PackageItinerary(4, "Chettinad Mansion Splendour", "Journey into the heart of Chettinad. Marvel at palatial homes built with Burmese teak, Italian marble, and Belgian glass.", "Visalam - CGH Earth, Chettinad", "Breakfast & Authentic Chettinad Feast", "Mansion architecture tour, Athangudi tile workshop"));
        p6.addItinerary(new PackageItinerary(5, "Madurai Meenakshi Amman Citadel", "Travel to Madurai, one of the oldest continuously inhabited cities in the world. Evening VIP temple ceremony.", "Heritage Madurai", "Breakfast & Lunch", "Meenakshi Amman temple night procession"));
        p6.addItinerary(new PackageItinerary(6, "Thirumalai Nayakkar Mahal & Madurai Bazaars", "Morning visit to the Italianate Thirumalai Nayak Palace and the bustling jasmine flower markets.", "Heritage Madurai", "Breakfast & Dinner", "Thirumalai palace, Madurai night bazaar"));
        p6.addItinerary(new PackageItinerary(7, "Scenic Nilgiri Foothills & Tea Country", "Ascend into the cooler climes of the Nilgiri hills for tea estate walks and leisure.", "Savoy - IHCL SeleQtions, Ooty", "Breakfast & High Tea", "Nilgiri toy train ride, colonial high tea"));
        p6.addItinerary(new PackageItinerary(8, "Coimbatore Departure", "Chauffeured descent to Coimbatore airport for onward flight.", "Departure", "Breakfast Included", "Airport transfer"));
        tourPackageRepository.save(p6);

        // P07: Ladakh Monastic & Pangong Odyssey
        TourPackage p7 = new TourPackage();
        p7.setSlug("ladakh-monastic-odyssey");
        p7.setPackageNumber("07");
        p7.setName("Ladakh Monastic & Pangong Odyssey");
        p7.setDestination(ladakh);
        p7.setDurationNights(7);
        p7.setDurationDays(8);
        p7.setStartingPriceInr(175000.0);
        p7.setMood("Adventure");
        p7.setBestMonths("May,Jun,Jul,Aug,Sep");
        p7.setHeroImage("https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80");
        p7.setHighlights("Pangong Tso Cobalt Lake Glamping, Nubra Valley Double-Humped Camels, Khardung La Pass (17,982 ft), Thiksey Monastery Sunrise");
        p7.setOverview("A dramatic high-altitude journey across the roof of the world. Experience luxury yurt camps by cobalt lakes and ancient Buddhist wisdom in remote mountain fortresses.");
        p7.setTravellerType("Wildlife and adventure enthusiasts");
        p7.setTravelStyle("High Altitude Expedition");
        p7.setInclusions("Oxygen-equipped luxury 4x4, 7 nights luxury glamping & heritage boutique hotels, All meals, Inner line permits, Resident doctor on call");
        p7.setExclusions("High-altitude personal gear, Personal gratuities");
        p7.setIsSignature(false);
        p7.addItinerary(new PackageItinerary(1, "Acclimatization in Leh", "Arrive at Kushok Bakula Rimpochee Airport (11,500 ft). Complete rest in your luxury suite for proper acclimatization.", "The Grand Dragon Ladakh", "Dinner Included", "Gentle walk in Leh old town"));
        p7.addItinerary(new PackageItinerary(2, "Thiksey Monastery Sunrise & Shey Palace", "Witness dawn prayer ceremony with monks at Thiksey, resembling Tibet's Potala Palace.", "The Grand Dragon Ladakh", "Breakfast & Lunch", "Morning monastery chants, Shey palace"));
        p7.addItinerary(new PackageItinerary(3, "Crossing Khardung La to Nubra Valley", "Traverse one of the highest motorable passes in the world before descending into the dramatic sand dunes of Hunder.", "Chamba Camp Diskit", "All Meals Included", "Khardung La summit photo, Bactrian camel ride"));
        p7.addItinerary(new PackageItinerary(4, "Diskit Monastery & Turtuk Village", "Visit the colossal Maitreya Buddha in Diskit, followed by a visit to Turtuk, India's northernmost Balti village.", "Chamba Camp Diskit", "All Meals Included", "Maitreya Buddha statue, Balti organic apricot lunch"));
        p7.addItinerary(new PackageItinerary(5, "Shyok River Route to Pangong Tso", "Dramatic drive along the Shyok gorge to the crystalline waters of Pangong Tso. Check into your heated lakeside luxury tent.", "Pangong Sarai Luxury Glamping", "All Meals Included", "Pangong Tso sunset, stargazing"));
        p7.addItinerary(new PackageItinerary(6, "Dawn on Pangong & Return to Leh via Chang La", "Witness the surreal dawn colors shifting across the lake waters before crossing Chang La Pass back to Leh.", "The Grand Dragon Ladakh", "Breakfast & Dinner", "Lakeside sunrise photography, Chang La pass"));
        p7.addItinerary(new PackageItinerary(7, "Alchi & Hemis Heritage Monasteries", "Explore 11th-century Kashmiri-style wall paintings at Alchi and the treasure vault of Hemis Monastery.", "The Grand Dragon Ladakh", "Breakfast & Farewell Dinner", "Alchi wall frescoes, farewell dinner"));
        p7.addItinerary(new PackageItinerary(8, "Departure from Leh", "Chauffeured transfer to Leh airport for breathtaking flight over snow-capped ranges.", "Departure", "Breakfast Included", "Airport transfer"));
        tourPackageRepository.save(p7);

        // P08: Andaman Private Island Seclusion
        TourPackage p8 = new TourPackage();
        p8.setSlug("andaman-private-island-seclusion");
        p8.setPackageNumber("08");
        p8.setName("Andaman Private Island Seclusion");
        p8.setDestination(andaman);
        p8.setDurationNights(5);
        p8.setDurationDays(6);
        p8.setStartingPriceInr(185000.0);
        p8.setMood("Beach");
        p8.setBestMonths("Oct,Nov,Dec,Jan,Feb,Mar,Apr,May");
        p8.setHeroImage("https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80");
        p8.setHighlights("Taj Exotica Havelock Private Villa, Private Catamaran to Neil Island, Bioluminescent Night Kayaking, Coral Reef Snorkel Safari");
        p8.setOverview("Indulge in castaway luxury on Havelock Island. Walk along Radhanagar Beach, ranked among Asia's finest, and kayak through glowing mangrove channels under starlit tropical skies.");
        p8.setTravellerType("Couples and honeymooners");
        p8.setTravelStyle("Tropical Island Luxury");
        p8.setInclusions("Private speed catamaran transfers, 5 nights in luxury villa, All beachfront dining, Private dive/snorkel instructor, Night kayaking excursion");
        p8.setExclusions("Scuba certification fees, International flights");
        p8.setIsSignature(false);
        p8.addItinerary(new PackageItinerary(1, "Port Blair to Havelock Catamaran", "Arrival in Port Blair. VIP transfer to private luxury catamaran to Havelock Island. Check in to beachfront villa.", "Taj Exotica Resort & Spa, Andamans", "Dinner Included", "Beachfront villa arrival, fresh coconut welcome"));
        p8.addItinerary(new PackageItinerary(2, "Radhanagar Beach & Rainforest Trails", "Spend a leisurely day along the powdery white sands of Radhanagar Beach fringed by virgin Mahua rainforests.", "Taj Exotica Resort & Spa, Andamans", "Breakfast & Seafood Dinner", "Radhanagar sunset, private beach cabana"));
        p8.addItinerary(new PackageItinerary(3, "Private Snorkel Safari & Coral Gardens", "Chartered speedboat to Elephant Beach reef for a private guided snorkel session among clownfish and green sea turtles.", "Taj Exotica Resort & Spa, Andamans", "Breakfast & Beach Picnic", "Coral garden snorkeling, mangrove exploration"));
        p8.addItinerary(new PackageItinerary(4, "Bioluminescent Night Kayaking Adventure", "Afternoon spa treatment followed by an evening night kayak through mangroves glowing with blue bioluminescence.", "Taj Exotica Resort & Spa, Andamans", "Breakfast & Dinner", "Luxury spa, bioluminescent night kayak"));
        p8.addItinerary(new PackageItinerary(5, "Kalapathar Beach & Sunset Yacht Cruise", "Visit the turquoise coves of Kalapathar Beach. Private sunset catamaran cruise with champagne and canapés.", "Taj Exotica Resort & Spa, Andamans", "Breakfast & Champagne Cruise", "Kalapathar beach stroll, sunset champagne sail"));
        p8.addItinerary(new PackageItinerary(6, "Return Catamaran & Port Blair Departure", "Morning catamaran return to Port Blair. Historical stop at Cellular Jail memorial before airport departure.", "Departure", "Breakfast Included", "Cellular Jail visit, airport transfer"));
        tourPackageRepository.save(p8);

        // P09: Spiti Valley High-Altitude Circuit
        TourPackage p9 = new TourPackage();
        p9.setSlug("spiti-valley-circuit");
        p9.setPackageNumber("09");
        p9.setName("Spiti Valley High-Altitude Circuit");
        p9.setDestination(himachal);
        p9.setDurationNights(8);
        p9.setDurationDays(9);
        p9.setStartingPriceInr(160000.0);
        p9.setMood("Adventure");
        p9.setBestMonths("Jun,Jul,Aug,Sep");
        p9.setHeroImage("https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80");
        p9.setHighlights("Key Gompa 1000-Year Fortress, Chandratal Crescent Lake, World's Highest Post Office Hikkim, Fossil Village Langza");
        p9.setOverview("For intrepid connoisseurs of the trans-Himalayas. Traverse jagged lunar ravines, send postcards from the highest post office in the world, and sleep beside the crescent waters of Chandratal.");
        p9.setTravellerType("Wildlife and adventure enthusiasts");
        p9.setTravelStyle("Raw Himalayan Expedition");
        p9.setInclusions("Modified 4x4 expedition vehicles, Boutique homestays and luxury glamping, All permits, Expert mountain expedition leader");
        p9.setExclusions("Extreme weather delay costs, Personal sleeping bags");
        p9.setIsSignature(false);
        p9.addItinerary(new PackageItinerary(1, "Shimla to Sangla Valley", "Drive past apple orchards into the Baspa Valley. Overnight in Swiss cottages surrounded by Kinnaur Kailash peaks.", "Banjara Camp, Sangla", "Dinner Included", "Baspa river walk, apple orchard sunset"));
        p9.addItinerary(new PackageItinerary(2, "Chitkul Last Village to Kalpa", "Explore Chitkul, the last inhabited village near the Indo-Tibet border. Continue to Kalpa with views of sacred Kinnaur Kailash.", "The Grand Shambala, Kalpa", "Breakfast & Dinner", "Chitkul border stroll, Kalpa sunset over Kailash"));
        p9.addItinerary(new PackageItinerary(3, "Tabo 1000-Year UNESCO Monastery", "Enter Spiti Valley. Visit Tabo Monastery, often called the Ajanta of the Himalayas for its ancient mud frescoes.", "Deyzor Hotel, Kaza", "Breakfast & Dinner", "Tabo mud monastery, Spiti river confluence"));
        p9.addItinerary(new PackageItinerary(4, "Key Monastery Fortress & Kibber", "Ascend to Key Gompa, standing sentinel over the Spiti river. Visit Kibber, one of the highest motorable villages in the world.", "Deyzor Hotel, Kaza", "Breakfast & Lunch", "Key Monastery private tea with Lama, Kibber wildlife trail"));
        p9.addItinerary(new PackageItinerary(5, "Hikkim & Langza Prehistoric Fossils", "Post a letter from the world's highest post office at Hikkim (14,567 ft). Hunt for prehistoric sea fossils at Langza.", "Deyzor Hotel, Kaza", "Breakfast & Dinner", "World's highest post office, marine fossil walk"));
        p9.addItinerary(new PackageItinerary(6, "Chandratal Lake of the Moon", "Cross Kunzum Pass (15,060 ft) to the ethereal crescent waters of Chandratal. Overnight in heated luxury glamping tents.", "Parasol Luxury Camp, Chandratal", "All Meals Included", "Kunzum pass prayer flags, Chandratal lake hike"));
        p9.addItinerary(new PackageItinerary(7, "Traversing Rohtang Pass to Manali", "Drive along the Chandra River and over Rohtang Pass down into the lush green cedar valleys of Manali.", "The Himalayan Resort, Manali", "Breakfast & Dinner", "Rohtang pass views, Manali log cabin comfort"));
        p9.addItinerary(new PackageItinerary(8, "Old Manali Apple Country Leisure", "Rest and relaxation in Old Manali. Browse Tibetan markets and enjoy a private apple orchard tasting.", "The Himalayan Resort, Manali", "Breakfast & Farewell Dinner", "Hadimba temple forest, farewell banquet"));
        p9.addItinerary(new PackageItinerary(9, "Kullu Departure", "Transfer to Bhuntar (Kullu) airport for onward flight.", "Departure", "Breakfast Included", "Airport transfer"));
        tourPackageRepository.save(p9);

        // P10: Golden Triangle & Royal Ranthambore
        TourPackage p10 = new TourPackage();
        p10.setSlug("golden-triangle-ranthambore");
        p10.setPackageNumber("10");
        p10.setName("Golden Triangle & Royal Ranthambore");
        p10.setDestination(up);
        p10.setDurationNights(7);
        p10.setDurationDays(8);
        p10.setStartingPriceInr(180000.0);
        p10.setMood("Family");
        p10.setBestMonths("Oct,Nov,Dec,Jan,Feb,Mar");
        p10.setHeroImage("https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80");
        p10.setHighlights("Taj Mahal Private Dawn Viewing, 3 Ranthambore Tiger Safaris, Jaipur Amber Fort & Jantar Mantar, Delhi Heritage Rickshaw Tour");
        p10.setOverview("The quintessential introduction to India's timeless wonders, elevated with palace stays and thrilling tiger tracking in Ranthambore National Park. Ideal for multi-generational families.");
        p10.setTravellerType("Families with children");
        p10.setTravelStyle("Family Luxury & Wildlife");
        p10.setInclusions("Private air-conditioned luxury van with Wi-Fi, 5-star Oberoi / Taj properties, 3 private jeep safaris in Ranthambore, Expert family-friendly guides");
        p10.setExclusions("Personal souvenirs, Optional balloon flight in Jaipur");
        p10.setIsSignature(false);
        p10.addItinerary(new PackageItinerary(1, "Delhi Imperial Arrival", "Private airport reception. Luxury transfer to The Imperial Hotel. Evening welcome dinner in the 1930s colonial atrium.", "The Imperial, New Delhi", "Dinner Included", "Old Delhi heritage introduction"));
        p10.addItinerary(new PackageItinerary(2, "Old & New Delhi Contrasts", "Chauffeur and historian guide explore Jama Masjid, private electric rickshaw ride through Chandni Chowk, and Humayun's Tomb.", "The Imperial, New Delhi", "Breakfast & Lunch", "Chandni Chowk spice market, Humayun's tomb gardens"));
        p10.addItinerary(new PackageItinerary(3, "Expressway to Agra & The Taj Mahal", "Short luxury drive to Agra. Check in to The Oberoi Amarvilas with unrestricted views of the Taj Mahal from every room.", "The Oberoi Amarvilas, Agra", "Breakfast & Dinner", "Taj Mahal sunset viewpoint, Agra Fort"));
        p10.addItinerary(new PackageItinerary(4, "Taj Mahal at Sunrise & Drive to Ranthambore", "Experience the quiet majesty of the Taj Mahal at dawn. Scenic drive past Fatehpur Sikri into Ranthambore.", "The Oberoi Vanyavilas Wildlife Resort", "Breakfast & Dinner", "Taj Mahal sunrise walk, luxury tent arrival"));
        p10.addItinerary(new PackageItinerary(5, "Ranthambore Tiger Safaris & Ancient Citadel", "Two private open-top 4x4 safaris inside the tiger reserve. Explore the 10th-century Ranthambore Fort within the park.", "The Oberoi Vanyavilas Wildlife Resort", "All Meals Included", "Morning & afternoon tiger tracking, fort view"));
        p10.addItinerary(new PackageItinerary(6, "Journey to the Pink City of Jaipur", "Scenic drive to Jaipur. Check in to Rambagh Palace. Evening royal high tea on the palace lawns.", "Rambagh Palace, Jaipur", "Breakfast & Royal High Tea", "Jaipur palace arrival, evening puppet & folk show"));
        p10.addItinerary(new PackageItinerary(7, "Amber Fort & Royal Observatory", "Jeep ride to Amber Fort ramparts. Afternoon visit to Jantar Mantar astronomical observatory and textile printing studio.", "Rambagh Palace, Jaipur", "Breakfast & Dinner", "Amber Fort royal chambers, block printing workshop"));
        p10.addItinerary(new PackageItinerary(8, "Return to Delhi & Departure", "Chauffeured return drive to Delhi International Airport for your flight home.", "Departure", "Breakfast Included", "Airport transfer"));
        tourPackageRepository.save(p10);
    }

    private void seedAccommodations() {
        Accommodation a1 = new Accommodation();
        a1.setName("Taj Lake Palace");
        a1.setDestinationName("Udaipur, Rajasthan");
        a1.setAccommodationType("Palace Hotel");
        a1.setImage("https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80");
        a1.setDescription("Floating like a white marble mirage in the azure waters of Lake Pichola, this 18th-century palace of Maharana Jagat Singh II delivers the pinnacle of regal Indian luxury.");
        a1.setLocationDetails("Lake Pichola, Udaipur");
        a1.setPriceCategory("Ultra Luxury");
        a1.setAmenities("Private Butler, Lakeside Dining, Heritage Royal Spa, Vintage Boat Transfers");
        accommodationRepository.save(a1);

        Accommodation a2 = new Accommodation();
        a2.setName("The Oberoi Amarvilas");
        a2.setDestinationName("Agra, Uttar Pradesh");
        a2.setAccommodationType("Palace Hotel");
        a2.setImage("https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80");
        a2.setDescription("Located just 600 metres from the Taj Mahal, every room and suite offers uninterrupted views of the monumental marble icon, framed by tiered pools and Mughal gardens.");
        a2.setLocationDetails("Taj East Gate Road, Agra");
        a2.setPriceCategory("Ultra Luxury");
        a2.setAmenities("Taj Mahal View from Every Room, Moorish Architecture, Tiered Pools, Royal Mughal Spa");
        accommodationRepository.save(a2);

        Accommodation a3 = new Accommodation();
        a3.setName("Kumarakom Lake Resort");
        a3.setDestinationName("Kumarakom, Kerala");
        a3.setAccommodationType("Backwater Stay");
        a3.setImage("https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80");
        a3.setDescription("Nestled on the serene banks of Lake Vembanad, featuring reconstructed 16th-century traditional ancestral Kerala homes with private courtyards and meandering pool villas.");
        a3.setLocationDetails("Vembanad Lake, Kumarakom");
        a3.setPriceCategory("Premium Heritage");
        a3.setAmenities("Ayurmana Ayurvedic Centre, 250m Meandering Pool, Houseboat Dining, Sunset Cruises");
        accommodationRepository.save(a3);

        Accommodation a4 = new Accommodation();
        a4.setName("The Khyber Himalayan Resort & Spa");
        a4.setDestinationName("Gulmarg, Kashmir");
        a4.setAccommodationType("Boutique Resort");
        a4.setImage("https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80");
        a4.setDescription("Clad in indigenous pine and slate, Gulmarg's premier luxury alpine resort sits 8,825 feet high with views of the snow-covered Pir Panjal mountain range.");
        a4.setLocationDetails("Gulmarg Alpine Ridge, Kashmir");
        a4.setPriceCategory("Ultra Luxury");
        a4.setAmenities("L'Occitane Spa, Heated Indoor Glass Pool, Ski-in/Ski-out, Nouf Tea Terrace");
        accommodationRepository.save(a4);

        Accommodation a5 = new Accommodation();
        a5.setName("Samode Safari Lodge");
        a5.setDestinationName("Bandhavgarh, Madhya Pradesh");
        a5.setAccommodationType("Nature Lodge");
        a5.setImage("https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80");
        a5.setDescription("An architecturally stunning wilderness sanctuary adjacent to Bandhavgarh Tiger Reserve, offering private timber villas, open-air bush dinners, and world-class naturalists.");
        a5.setLocationDetails("Bandhavgarh National Park Border");
        a5.setPriceCategory("Luxury Wilderness");
        a5.setAmenities("Private Heated Villas, Open-Air Shower, Private Naturalists, Bush Stargazing Dinners");
        accommodationRepository.save(a5);

        Accommodation a6 = new Accommodation();
        a6.setName("Wildflower Hall, An Oberoi Resort");
        a6.setDestinationName("Shimla, Himachal Pradesh");
        a6.setAccommodationType("Boutique Resort");
        a6.setImage("https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80");
        a6.setDescription("The former residence of Lord Kitchener set amidst 22 acres of virgin cedar and pine forests at 8,250 feet, renowned for its open-air heated whirlpool overlooking snow peaks.");
        a6.setLocationDetails("Mashobra, Shimla Heights");
        a6.setPriceCategory("Ultra Luxury");
        a6.setAmenities("Open-Air Heated Whirlpool, Cedar Forest Trails, Billiards Room, Oberoi Spa");
        accommodationRepository.save(a6);

        Accommodation a7 = new Accommodation();
        a7.setName("Taj Exotica Resort & Spa");
        a7.setDestinationName("Havelock Island, Andamans");
        a7.setAccommodationType("Private Villa");
        a7.setImage("https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80");
        a7.setDescription("Spread across 46 acres of lush mangrove and canopy forest on Radhanagar Beach, featuring sustainable luxury villas inspired by indigenous Jarawa stilt architecture.");
        a7.setLocationDetails("Radhanagar Beach No. 7, Havelock");
        a7.setPriceCategory("Ultra Luxury");
        a7.setAmenities("Direct Beachfront Access, Olympic-sized Infinity Pool, Jiva Spa, Deep-Sea Charters");
        accommodationRepository.save(a7);

        Accommodation a8 = new Accommodation();
        a8.setName("Umaid Bhawan Palace");
        a8.setDestinationName("Jodhpur, Rajasthan");
        a8.setAccommodationType("Palace Hotel");
        a8.setImage("https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80");
        a8.setDescription("Perched on Chittar Hill overlooking Jodhpur, this monumental Art Deco sandstone palace remains the private residence of the Maharaja of Jodhpur, offering unmatched royal splendor.");
        a8.setLocationDetails("Chittar Hill, Jodhpur");
        a8.setPriceCategory("Ultra Luxury");
        a8.setAmenities("64 Royal Palace Suites, Zodiac Indoor Heated Pool, Palace Museum, Peacocks on Lawns");
        accommodationRepository.save(a8);
    }

    private void seedTestimonials() {
        testimonialRepository.save(new Testimonial(
                "Alistair & Evelyn Vance",
                "London, United Kingdom",
                "Rajasthan Heritage Trail",
                5,
                "Plan My Trip Agency crafted the most seamless voyage of our lives. From our private boat on Lake Pichola to dawn over Mehrangarh Fort, every detail felt intimate, deeply authentic and flawlessly executed.",
                "Rajasthan",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
        ));
        testimonialRepository.save(new Testimonial(
                "Rohan & Sneha Singhal",
                "Mumbai, India",
                "Best of Kashmir",
                5,
                "The cedarwood houseboat experience was beyond our dreams. Waking up to the morning mist over Dal Lake with private Kahwa served in vintage silver is a memory we will treasure forever.",
                "Kashmir",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
        ));
        testimonialRepository.save(new Testimonial(
                "Dr. Catherine Moreau",
                "Paris, France",
                "Madhya Pradesh Wildlife Expedition",
                5,
                "Our naturalists in Bandhavgarh were exceptional scholars. We had three distinct tiger encounters without ever feeling rushed or crowded. The tented lodge in Kanha was pure wilderness perfection.",
                "Madhya Pradesh",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
        ));
        testimonialRepository.save(new Testimonial(
                "Marcus Lindholm",
                "Stockholm, Sweden",
                "Kerala Backwater Retreat",
                5,
                "An editorial masterpiece of slow travel. The private kettuvallam cruise through the narrow canals revealed a tranquil side of India few guidebooks describe. Highly recommend their bespoke curation.",
                "Kerala",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
        ));
    }

    private void seedJournal() {
        JournalPost j1 = new JournalPost();
        j1.setSlug("art-of-the-slow-journey-rajasthan");
        j1.setTitle("The Art of the Slow Journey: Traversing Rajasthan's Desert Outposts");
        j1.setCategory("Heritage");
        j1.setReadTime("6 min read");
        j1.setHeroImage("https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80");
        j1.setSummary("Beyond the tourist corridors lies a kingdom of forgotten stepwells, frescoed merchant havelis and night skies untouched by modern light.");
        j1.setContent("To travel through Rajasthan at speed is to miss its most sublime music: the slow clink of silver anklets along village lanes in Shekhawati, the golden glow of sandstone when the desert sun hits Mehrangarh, and the sound of morning waterbirds on Lake Pichola. In this dispatch, our lead curator reveals the secret sanctuaries where royal heritage meets authentic desert silence.");
        j1.setAuthor("Devika Ranawat");
        j1.setPublishDate(LocalDate.now().minusDays(12));
        journalPostRepository.save(j1);

        JournalPost j2 = new JournalPost();
        j2.setSlug("tracking-tigers-in-bandhavgarh");
        j2.setTitle("Tracking the Elusive Royal Bengal: Dawn in Bandhavgarh's Tala Zone");
        j2.setCategory("Wildlife");
        j2.setReadTime("8 min read");
        j2.setHeroImage("https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80");
        j2.setSummary("A naturalist's account of waiting in cold sal fog as the alarm call of a spotted deer echoes across ancient sandstone cliffs.");
        j2.setContent("The morning chill in Madhya Pradesh has a crisp, peppery scent. As our open gypsy glided through the gates of Tala zone, our tracker cut the engine. A solitary langur sent an urgent cough from the canopy. In the silence that followed, a female Royal Bengal tiger stepped onto the forest track, her stripes burning like liquid amber in the early light.");
        j2.setAuthor("Arjun Mathur");
        j2.setPublishDate(LocalDate.now().minusDays(24));
        journalPostRepository.save(j2);

        JournalPost j3 = new JournalPost();
        j3.setSlug("living-on-the-waters-kerala-backwaters");
        j3.setTitle("Living on the Waters: A Chauffeur-Curated Voyage Through Vembanad Lake");
        j3.setCategory("Culinary & Wellness");
        j3.setReadTime("5 min read");
        j3.setHeroImage("https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80");
        j3.setSummary("How a wooden rice barge held together only by coir rope became the ultimate canvas for Ayurvedic relaxation and slow gastronomy.");
        j3.setContent("In Alleppey, life moves with the rhythm of the tide. Onboard a private kettuvallam handcrafted from anjili wood, time softens. Freshly caught Karimeen is rubbed with crushed black pepper, ginger, and curry leaves before being wrapped in banana leaves and roasted over coconut coals. Here, indulgence is found in simplicity.");
        j3.setAuthor("Meera Nambiar");
        j3.setPublishDate(LocalDate.now().minusDays(36));
        journalPostRepository.save(j3);
    }
}
