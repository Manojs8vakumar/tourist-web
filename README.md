# Plan My Trip Agency — Luxury Indian Travel Portal

> **"Every Journey Has a Story."**

A premium, editorial-style travel website inspired by high-end luxury travel magazines and bespoke travel concierges (reference: *Tibro Luxury Holidays*). Built with **React (Vite)**, **Java Spring Boot**, **Hibernate / Spring Data JPA**, and **MySQL**.

---

## 🌟 Technology Stack

- **Frontend**: React 19, Vite, React Router 7, Lucide Icons, Custom Editorial CSS
- **Backend**: Java 21, Spring Boot, Spring Data JPA, Hibernate ORM, Spring Security, Maven
- **Database**: MySQL 8.0 (Database: `tourist_db`)
- **Typography**: Cormorant Garamond (Editorial Serif) & Plus Jakarta Sans

---

## 🚀 Live Application URLs

- **Frontend Client**: [http://localhost:5173](http://localhost:5173)
  - **India Master Experience**: [http://localhost:5173/destinations/india](http://localhost:5173/destinations/india)
  - **Tour Packages Catalog**: [http://localhost:5173/packages](http://localhost:5173/packages)
  - **Exceptional Places to Stay**: [http://localhost:5173/accommodations](http://localhost:5173/accommodations)
  - **The Travel Journal**: [http://localhost:5173/journal](http://localhost:5173/journal)
  - **Customer Portal**: [http://localhost:5173/dashboard](http://localhost:5173/dashboard)
  - **Executive Curator Admin Desk**: [http://localhost:5173/admin](http://localhost:5173/admin)
- **Backend REST API**: [http://localhost:8085](http://localhost:8085)

---

## 🔑 Authentication & Demo Credentials

| Role | Username | Email | Password | Access |
|---|---|---|---|---|
| **Executive Curator (Admin)** | `admin` | `admin@planmytrip.agency` | `Admin@123` | Admin Dashboard, Enquiry Status Management, Live Metrics |
| **Private Guest (Customer)** | `guest` | `guest@planmytrip.agency` | `Guest@123` | Customer Dashboard, Saved Enquiries with Reference Numbers |

*(Quick 1-click test buttons are provided directly on the Login page!)*

---

## 🏛️ Implemented India Destination Landing Page Sections

1. **Section 1 — Navigation**: Sticky/compact header with logo, links (*About Us*, *India Holidays*, *Tour Packages*, *Where to Stay*, *Travel Journal*, *Contact*), instant search dialog, and *Begin a Journey* modal trigger.
2. **Section 2 — India Destination Hero**: Immersive cinematic photography, breadcrumbs, oversized typography, subcontinental stats bar (28 States, 40+ UNESCO Sites, 100+ National Parks, 5000+ Years), and a horizontal numbered destination selector (01 Rajasthan through 13 North-East India).
3. **Section 3 — Interactive Trip Finder**: "Begin by mood, then by month" with dynamic filtering by 8 moods (*Romance*, *Wildlife*, *Heritage*, *Family*, *Backwaters*, *Himalaya*, *Adventure*, *Beach*) and 12 months with live card previews and count badges.
4. **Section 4 — Explore the Regions of India**: Asymmetric editorial layout with large photography cards covering 13 provinces with travel seasons, highlights, and direct detail links.
5. **Section 5 — Signature Journeys**: Curated flagship itineraries (*Himalayan Escape*, *Best of Kashmir*, *Rajasthan Heritage Trail*, *Kerala Backwater Retreat*, *Madhya Pradesh Wildlife Expedition*, *South India Temple Journey*) with tariffs in INR and day counts.
6. **Section 6 — States and Travel Themes**: 6 editorial categories (*Northern India*, *Himalayan Escapes*, *Heritage and Palaces*, *Southern India*, *Wildlife and Nature*, *Islands and Beaches*) with interactive tabs and regional links.
7. **Section 7 — Where to Stay**: Luxury accommodations showcase (Palace hotels, boutique resorts, private villas, nature lodges, backwater stays) with amenities and inquiry buttons.
8. **Section 8 — Best Time to Travel (Seasonal Calendar)**: Matrix calendar mapping 5 regions against Jan–Dec with color-coded seasons (*Peak*, *Recommended*, *Shoulder*, *Quiet*) and clickable month spotlight banner.
9. **Section 9 — Journeys by Traveller Type**: 4 editorial panels (*First-time travellers*, *Couples and honeymooners*, *Families with children*, *Wildlife and adventure enthusiasts*) with custom imagery and recommended itineraries.
10. **Section 10 — Explore Beyond India**: 3-card layout highlighting *Europe*, *Africa & The Indian Ocean*, and *Southeast Asia & Japan*.
11. **Section 11 — Customer Stories**: Testimonial carousel with guest reflections, verified demo indicator, star ratings, and itinerary tags.
12. **Section 12 — Begin a Journey (Enquiry Engine)**: Complete bespoke form generating unique reference numbers (e.g. `PMT-2026-XXXX`) and persisting directly to MySQL.
13. **Section 13 — The Private Dispatch & Footer**: Fortnightly newsletter subscription, contact information placeholders, and navigation directory.

---

## 📂 Additional Pages Built

- `/` — Brand Portal Homepage
- `/destinations/india` — Flagship India Master Experience
- `/destinations/:slug` — Dynamic Destination Detail (e.g. `/destinations/rajasthan`, `/destinations/kashmir`, `/destinations/kerala`)
- `/packages` — Multi-facet Tour Packages Catalog with sorting and filters
- `/packages/:slug` — Package Detail with Day-by-Day Itineraries, hotels, meal plans, inclusions, and exclusions
- `/accommodations` — Dedicated Luxury Hotels & Sanctuaries Showcase
- `/journal` — The Travel Journal with essays and dispatches
- `/about` — Atelier Philosophy, values, and curation ethics
- `/contact` — Office addresses (New Delhi, London, Tamil Nadu) & direct concierge desk
- `/login` & `/register` — Authentication with demo autofill
- `/dashboard` — Guest dossier tracking with live status pills
- `/admin` — Curator Admin Portal with live metrics and status updates

---

## 🚀 Cloud Deployment Guide (Vercel & Render)

### 1. Frontend Deployment on Vercel
Your Vercel dashboard: [https://vercel.com/manoj-5a47](https://vercel.com/manoj-5a47)

1. Open [https://vercel.com/new](https://vercel.com/new).
2. Choose **Import Git Repository** and select **`Manojs8vakumar/tourist-web`**.
3. In Project Configuration:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (or leave default root, our [`vercel.json`](file:///d:/pr2/vercel.json) handles both!)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. *(Optional)* Under **Environment Variables**, add:
   - `VITE_GEMINI_API_KEY`: *(your Gemini key if you want live AI outside mock fallback)*
   - `VITE_OPENWEATHER_API_KEY`: *(your OpenWeather key)*
5. Click **Deploy**. Vercel will build and assign your live link (e.g. `https://tourist-web.vercel.app`) in ~60 seconds!

---

### 2. Backend Deployment on Render
Your Render dashboard: [https://dashboard.render.com](https://dashboard.render.com)

1. Open Render Dashboard and click **New +** → **Web Service**.
2. Connect your GitHub repository **`Manojs8vakumar/tourist-web`**.
3. Choose **Docker** runtime:
   - **Root Directory**: `backend`
   - **Dockerfile Path**: `Dockerfile`
4. Set Environment Variables for your database (MySQL / PlanetScale / Aiven / Neon):
   - `DB_USERNAME`: your remote DB user
   - `DB_PASSWORD`: your remote DB password
5. Click **Create Web Service**. Render builds and deploys your Java 21 Spring Boot REST API live!

---

## 🛠️ How to Run Locally (VS Code, Eclipse, or 1-Click Scripts)

The project can be run completely independently without Antigravity using any of the following methods:

### Method A: 1-Click Windows Batch Scripts (Easiest)
1. **Start the Application**: Double-click `run-project.bat` in the root folder (`d:\pr2\run-project.bat`).
   - Automatically cleans ports 8085 and 5173.
   - Starts Spring Boot Backend in one dedicated command window.
   - Starts React Vite Frontend in a second command window.
   - Automatically opens `http://localhost:5173` in your default browser.
2. **Stop the Application**: Double-click `stop-project.bat` in the root folder, or simply close the command windows.

---

### Method B: Running in Visual Studio Code (VS Code)
1. Open the project folder (`d:\pr2`) in **VS Code** (`File -> Open Folder... -> select pr2`).
2. **One-Shortcut Launch**:
   - Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> (Run Build Task).
   - This triggers the configured `Start Full Application (Backend + Frontend)` task which boots both Spring Boot and React Vite in parallel inside VS Code's integrated terminal tabs.
3. **Alternative via Menu**:
   - Go to top menu: `Terminal` -> `Run Task...` -> choose `Start Full Application (Backend + Frontend)`.
4. **To Stop in VS Code**:
   - Go to `Terminal` -> `Run Task...` -> select `Stop Running Servers (Port 8085 & 5173)`.

---

### Method C: Running in Eclipse IDE
1. Open Eclipse IDE.
2. Go to `File` -> `Import...` -> select `Maven` -> `Existing Maven Projects` -> Click `Next`.
3. Set **Root Directory** to `d:\pr2\backend` and click `Finish`.
4. Once imported, locate `src/main/java/com/tourist/planner/TravelPlannerApplication.java`.
5. Right-click `TravelPlannerApplication.java` -> `Run As` -> `Spring Boot App` (or `Java Application`).
   - The Spring Boot backend starts at `http://localhost:8085`.
6. For the React frontend:
   - Open a terminal/CMD, go to `d:\pr2\frontend` and run:
     ```bash
     npm.cmd run dev
     ```
   - Open your browser at `http://localhost:5173`.

---

### Method D: Manual Command Line
#### 1. Backend (Spring Boot + MySQL)
```bash
cd d:\pr2\backend
.\mvnw.cmd spring-boot:run
```
*Backend runs at `http://localhost:8085`.*

#### 2. Frontend (React + Vite)
```bash
cd d:\pr2\frontend
npm.cmd run dev
```
*Frontend runs at `http://localhost:5173`.*
