# 58-Samrala Election Intelligence & Booth Analytics
### Comparative Polling Analysis: 2022 Punjab Vidhan Sabha vs 2024 Lok Sabha (Fatehgarh Sahib PC)

An interactive, high-precision election analytics dashboard and intelligence platform for the **58-Samrala Assembly Constituency** (Ludhiana District, Punjab).

🔗 **Live GitHub Pages URL**: [https://jass-2005.github.io/samrala-election-dashboard/](https://jass-2005.github.io/samrala-election-dashboard/)

---

## 🌟 Key Features

1. **Complete 218-Booth Master Directory (100% Form-20 EVM Audit)**:
   - Full bilingual village and polling station nomenclature (English and Punjabi Gurmukhi).
   - Strict 1-to-1 sequential alignment verified between 2022 and 2024 (100% verified, 0 renumbered, $r = 0.8767$ correlation).
   - Verification of exact village names (e.g., Booth #5 = Rurewal in both 2022 and 2024).

2. **Party Intelligence Hubs**:
   - **All Parties Mode**: Complete constituency-wide overview across AAP, INC, SAD, BJP, and Independents.
   - **AAP Analytics**: Real-time classification into:
     - 🟢 **Retained Strongholds**: 39 booths
     - 🔵 **Gained in 2024**: 52 booths
     - 🔴 **Lost in 2024**: 75 booths
     - ⚪ **Deficit (Lost Both)**: 52 booths
   - **INC Analytics**: 92 booths won in 2024 (up from 6 booths in 2022).
   - **SAD Analytics**: 28 booths won in 2024.
   - **BJP & Others Analytics**: Full vote share and booth-level penetration analysis.

3. **Renumbering & Booth Alignment Audit Modal**:
   - In-app interactive audit tool verifying 1-to-1 sequential mapping across all 218 polling stations.
   - Live search by Booth Number, Village Name, or Location.

4. **Multi-Format Export & Reports**:
   - **One-by-One Booth Dossier Export**: Generate print-ready official dossiers for any individual booth.
   - **Master Excel Spreadsheet (`.xlsx`)**: 3-sheet workbook with color-coded status, swings, and cluster rankings.
   - **Master CSV Dataset (`.csv`)**: Instant structured raw data export.

5. **Bilingual Support & Dark/Light Themes**:
   - Instant toggle between English and ਪੰਜਾਬੀ (Punjabi).
   - Daylight Editorial Light Mode & Midnight Obsidian Dark Mode.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer)
- npm or yarn

### Installation
```bash
git clone https://github.com/Jass-2005/samrala-election-dashboard.git
cd samrala-election-dashboard
npm install
```

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

---

## 📊 Data & Electoral Baseline

- **2022 Punjab Vidhan Sabha**:
  - Total EVM Votes Polled: **132,736** across 218 booths.
  - Winner: Jagtar Singh Diyalpura (AAP) — 57,557 votes (43.36%).
  - Runner-up: Amrik Singh Dhillon (Independent) — 26,667 votes (20.09%).
  - INC: Rupinder Singh Raja Gill — 23,491 votes (17.70%).
  - SAD: Paramjit Singh Dhillon — 18,342 votes (13.82%).
  - BJP: Jitender Sharma — 2,056 votes (1.55%).

- **2024 Lok Sabha (Fatehgarh Sahib Parliamentary Constituency - 58-Samrala Segment)**:
  - Total EVM Votes Polled: **109,284** across 218 booths.
  - Winner in Samrala Segment: Amar Singh (INC) — 38,131 votes (34.89%).
  - Runner-up: Gurpreet Singh GP (AAP) — 33,668 votes (30.81%).
  - SAD: Bikramjit Singh Khalsa — 17,975 votes (16.45%).
  - BJP: Gejja Ram Valmiki — 9,996 votes (9.15%).

---

## 📁 Repository Structure

```
samrala-election-dashboard/
├── public/                     # Static assets, Master Excel (.xlsx) and CSV
│   ├── Samrala_Master_Party_Booth_Analysis_2022_2024.xlsx
│   ├── Samrala_All_Booths_Comparison.csv
│   ├── dsidein_logo.png
│   └── dsidein_logo_transparent.png
├── src/
│   ├── components/             # UI Components (Header, PartyHub, BoothGrid, BoothModal, RenumberingAuditModal, etc.)
│   ├── data/
│   │   └── samrala_comparison_data.json  # Consolidated 218-booth comparative dataset
│   ├── App.jsx                 # Main application controller
│   ├── App.css                 # Layout and design styles
│   ├── index.css               # Design system, themes & tokens
│   ├── translations.js         # Full English & Punjabi localization
│   └── main.jsx
├── data-scripts/               # Form-20 extraction, verification & alignment scripts
│   ├── Samrala_2022_Assembly_Booth_Results.csv
│   ├── Samrala_2024_Parliamentary_Booth_Results.csv
│   ├── audit_booth_alignment.py
│   ├── audit_all_villages.py
│   ├── merge_samrala_data.py
│   └── update_master_names.py
├── package.json
└── vite.config.js
```

---

## 📄 License
MIT License.
