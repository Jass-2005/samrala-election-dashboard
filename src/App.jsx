import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import { CONSTITUENCIES } from './data/constituencies';
import { t } from './utils/translations';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KPIBanner from './components/KPIBanner';
import PartyHub from './components/PartyHub';
import BoothGrid from './components/BoothGrid';
import BoothModal from './components/BoothModal';
import CustomDropdown from './components/CustomDropdown';
import RenumberingAuditModal from './components/RenumberingAuditModal';
import { 
  Search, 
  RotateCcw, 
  Printer, 
  FileSpreadsheet, 
  Compass, 
  Activity, 
  Award,
  Download,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('samrala_theme') || 'light';
  });
  const [constituencyId, setConstituencyId] = useState('SAMRALA');
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('samrala_lang') || 'en';
  });
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [selectedParty, setSelectedParty] = useState('ALL'); // 'ALL', 'AAP', 'INC', 'SAD', 'BJP'
  const [partyFilter, setPartyFilter] = useState('ALL'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('BOOTH_ASC');
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active Constituency Dataset
  const currentConst = CONSTITUENCIES[constituencyId] || CONSTITUENCIES.SAMRALA;
  const { summary, booths } = currentConst.data;

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('samrala_theme', theme);
  }, [theme]);

  // Sync language with localStorage
  useEffect(() => {
    localStorage.setItem('samrala_lang', language);
  }, [language]);

  // Reset filters when constituency changes
  useEffect(() => {
    setSelectedParty('ALL');
    setPartyFilter('ALL');
    setSearchQuery('');
    setSortBy('BOOTH_ASC');
    setSelectedBooth(null);
  }, [constituencyId]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (tab === 'DASHBOARD') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'PARTY_HUB') {
      const el = document.querySelector('.dsidein-registry-card');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'BOOTHS') {
      const el = document.querySelector('.booth-container');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-calculated stats for all 4 parties (AAP, INC, SAD, BJP)
  const partyStats = useMemo(() => {
    const calcParty = (pCode) => {
      const pKey = pCode.toLowerCase();
      const sorted = [...booths].sort((a, b) => (b.data_2024[pKey] || 0) - (a.data_2024[pKey] || 0));
      
      let v22 = summary?.votes_2022?.[pKey];
      let sh22 = summary?.votes_2022?.[`${pKey}_pct`];
      let v24 = summary?.votes_2024?.[pKey];
      let sh24 = summary?.votes_2024?.[`${pKey}_pct`];

      if (v22 === undefined) {
        v22 = booths.reduce((acc, b) => acc + (b.data_2022[pKey] || 0), 0);
        const tot22 = summary?.total_votes_2022 || booths.reduce((acc, b) => acc + (b.data_2022.total || 0), 0);
        sh22 = tot22 > 0 ? Number(((v22 / tot22) * 100).toFixed(2)) : 0;
      }
      if (v24 === undefined) {
        v24 = booths.reduce((acc, b) => acc + (b.data_2024[pKey] || 0), 0);
        const tot24 = summary?.total_votes_2024 || booths.reduce((acc, b) => acc + (b.data_2024.total || 0), 0);
        sh24 = tot24 > 0 ? Number(((v24 / tot24) * 100).toFixed(2)) : 0;
      }

      const diff = v24 - v22;

      let won_both = 0, gained = 0, lost_24 = 0, weak = 0, lost_both = 0;
      booths.forEach(b => {
        const w22 = b.data_2022.winner_party || b.data_2022.winner;
        const w24 = b.data_2024.winner_party || b.data_2024.winner;
        const pct24 = b.data_2024[`${pKey}_pct`] || (b.data_2024.total > 0 ? ((b.data_2024[pKey] || 0) / b.data_2024.total * 100) : 0);
        if (w22 === pCode && w24 === pCode) won_both++;
        else if (w22 !== pCode && w24 === pCode) gained++;
        else if (w22 === pCode && w24 !== pCode) lost_24++;
        if (pct24 < 20.0) weak++;
        if (w22 !== pCode && w24 !== pCode) lost_both++;
      });

      const bw24Count = summary?.votes_2024?.booths_won?.[pCode] ?? summary?.booths_won_2024?.[pCode] ?? (won_both + gained);
      const bw22Count = summary?.votes_2022?.booths_won?.[pCode] ?? summary?.booths_won_2022?.[pCode] ?? (won_both + lost_24);

      return {
        votes_2022: v22,
        share_2022: sh22,
        votes_2024: v24,
        share_2024: sh24,
        vote_diff: diff,
        won_both_count: won_both,
        gained_count: gained,
        lost_24_count: lost_24,
        weak_count: weak,
        lost_both_count: lost_both,
        booths_won_24: bw24Count,
        booths_won_22: bw22Count,
        top_booth: {
          no: sorted[0]?.booth_no,
          name: language === 'pa' ? (sorted[0]?.village_punjabi || sorted[0]?.exact_name_punjabi) : sorted[0]?.village_english,
          votes: sorted[0]?.data_2024?.[pKey] || 0
        }
      };
    };

    return {
      AAP: calcParty('AAP'),
      INC: calcParty('INC'),
      SAD: calcParty('SAD'),
      BJP: calcParty('BJP')
    };
  }, [booths, summary, language]);

  // Filtering & Sorting
  const filteredBooths = useMemo(() => {
    let result = [...booths];

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(b => 
        b.booth_no.toString() === q ||
        (b.village_english && b.village_english.toLowerCase().includes(q)) ||
        (b.village_punjabi && b.village_punjabi.includes(q)) ||
        (b.exact_name_punjabi && b.exact_name_punjabi.includes(q))
      );
    }

    // 2. Filter logic based on mode
    if (selectedParty === 'ALL') {
      if (partyFilter === 'INC_WINS') {
        result = result.filter(b => (b.data_2024.winner_party || b.data_2024.winner) === 'INC');
      } else if (partyFilter === 'AAP_WINS') {
        result = result.filter(b => (b.data_2024.winner_party || b.data_2024.winner) === 'AAP');
      } else if (partyFilter === 'SAD_WINS') {
        result = result.filter(b => (b.data_2024.winner_party || b.data_2024.winner) === 'SAD');
      } else if (partyFilter === 'BJP_WINS') {
        result = result.filter(b => (b.data_2024.winner_party || b.data_2024.winner) === 'BJP');
      } else if (partyFilter === 'FLIPPED') {
        result = result.filter(b => b.is_flip || b.comparison?.is_flip);
      }
    } else {
      // Party-specific mode (AAP, INC, SAD, BJP)
      const pKey = selectedParty.toLowerCase();
      if (partyFilter !== 'ALL') {
        result = result.filter(b => {
          const w22 = b.data_2022.winner_party || b.data_2022.winner;
          const w24 = b.data_2024.winner_party || b.data_2024.winner;
          const pct24 = b.data_2024[`${pKey}_pct`] || (b.data_2024.total > 0 ? ((b.data_2024[pKey] || 0) / b.data_2024.total * 100) : 0);

          if (partyFilter === 'WON_BOTH') {
            return w22 === selectedParty && w24 === selectedParty;
          }
          if (partyFilter === 'GAINED') {
            return w22 !== selectedParty && w24 === selectedParty;
          }
          if (partyFilter === 'LOST_24') {
            return w22 === selectedParty && w24 !== selectedParty;
          }
          if (partyFilter === 'WEAK') {
            return pct24 < 20.0 && b.data_2024.total > 0;
          }
          if (partyFilter === 'LOST_BOTH') {
            return w22 !== selectedParty && w24 !== selectedParty;
          }
          return true;
        });
      }
    }

    // 3. Sorting
    result.sort((a, b) => {
      const pKey = selectedParty === 'ALL' ? 'inc' : selectedParty.toLowerCase();
      switch (sortBy) {
        case 'BOOTH_DESC':
          return b.booth_no - a.booth_no;
        case 'VOTES_DESC':
          return (b.data_2024[pKey] || 0) - (a.data_2024[pKey] || 0);
        case 'VOTES_ASC':
          return (a.data_2024[pKey] || 0) - (b.data_2024[pKey] || 0);
        case 'TURNOUT_DESC':
          return b.data_2024.total - a.data_2024.total;
        case 'MARGIN_DESC':
          return b.data_2024.margin - a.data_2024.margin;
        case 'BOOTH_ASC':
        default:
          return a.booth_no - b.booth_no;
      }
    });

    return result;
  }, [booths, selectedParty, partyFilter, searchQuery, sortBy]);

  // Sort options for CustomDropdown
  const sortOptions = useMemo(() => {
    const total = currentConst.total_booths;
    const opts = [
      { value: 'BOOTH_ASC', label: language === 'pa' ? `ਬੂਥ ਨੰ. (1 → ${total})` : `Booth No. (1 → ${total})` },
      { value: 'BOOTH_DESC', label: language === 'pa' ? `ਬੂਥ ਨੰ. (${total} → 1)` : `Booth No. (${total} → 1)` },
      { value: 'TURNOUT_DESC', label: language === 'pa' ? 'ਸਭ ਤੋਂ ਵੱਧ 2024 ਵੋਟਿੰਗ' : 'Highest 2024 Turnout' },
      { value: 'MARGIN_DESC', label: language === 'pa' ? 'ਸਭ ਤੋਂ ਵੱਧ 2024 ਜਿੱਤ ਦਾ ਫ਼ਰਕ' : 'Highest 2024 Margin' },
    ];
    if (selectedParty !== 'ALL') {
      opts.push(
        { value: 'VOTES_DESC', label: language === 'pa' ? `ਸਭ ਤੋਂ ਵੱਧ ${selectedParty} ਵੋਟਾਂ` : `Highest ${selectedParty} Votes` },
        { value: 'VOTES_ASC', label: language === 'pa' ? `ਸਭ ਤੋਂ ਘੱਟ ${selectedParty} ਵੋਟਾਂ` : `Lowest ${selectedParty} Votes` }
      );
    }
    return opts;
  }, [selectedParty, currentConst.total_booths, language]);

  // Reset all filters
  const handleResetToCompleteList = () => {
    setSelectedParty('ALL');
    setPartyFilter('ALL');
    setSearchQuery('');
    setSortBy('BOOTH_ASC');
  };

  // Export Single Booth to PDF
  const handleExportBoothPdf = (booth) => {
    setSelectedBooth(booth);
    setTimeout(() => {
      document.body.classList.add('printing-single-booth');
      window.print();
      setTimeout(() => {
        document.body.classList.remove('printing-single-booth');
      }, 1000);
    }, 150);
  };

  // Export Filtered View / Master List to PDF
  const handlePrintMasterReport = () => {
    document.body.classList.remove('printing-single-booth');
    window.print();
  };

  return (
    <div className="dsidein-app-root">
      {/* 1. Left Slim Navigation Rail */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        constituencyId={constituencyId}
        language={language}
      />

      {/* 2. Main Content Frame */}
      <div className="dsidein-content-frame">
        {/* Top Navigation Bar with Constituency Switcher & Language Toggle */}
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          onMenuClick={() => setMobileMenuOpen(prev => !prev)} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          constituencyId={constituencyId}
          setConstituencyId={setConstituencyId}
          language={language}
          setLanguage={setLanguage}
        />

        {/* Dsidein Official PDF Watermark */}
        <div className="dsidein-print-watermark" aria-hidden="true">
          <img src="./dsidein_logo_transparent.png" alt="Dsidein" className="watermark-logo-img" />
          <div className="watermark-brand-name">DSIDEIN</div>
          <div className="watermark-sub-name">{currentConst.name_en} BOOTH INTELLIGENCE</div>
          <div className="watermark-url">https://dsidein.com/samrala-2022-2024</div>
        </div>

        {/* Print Master Report Header */}
        <div className="print-report-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '15pt', fontWeight: 800, color: '#002b49' }}>
                {currentConst.name_en.toUpperCase()} ASSEMBLY SEGMENT ({currentConst.district_en.toUpperCase()})
              </div>
              <div style={{ fontSize: '10pt', color: '#475569', marginTop: '2px' }}>
                Comparative Booth Intelligence: 2022 Assembly vs 2024 Lok Sabha Polling
              </div>
              <div style={{ fontSize: '8.5pt', color: '#64748b', marginTop: '4px' }}>
                Active Filter: {selectedParty === 'ALL' ? 'Complete Master List' : `${selectedParty} Segment`} | Total Booths: {filteredBooths.length} of {currentConst.total_booths}
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '8.5pt', color: '#334155' }}>
              <span style={{ fontWeight: 800, color: '#002b49' }}>DSIDEIN COMMAND CENTER</span><br />
              <span>https://dsidein.com/samrala-2022-2024</span>
            </div>
          </div>
        </div>

        {/* Scrollable Main Dashboard Area */}
        <main className="dsidein-main-body">
          {/* Dashboard Title Bar */}
          <section className="dashboard-title-bar">
            <div className="title-text-group">
              <div className="constituency-tag">
                {language === 'pa' ? currentConst.name_pa : currentConst.name_en}
              </div>
              <h1 className="main-title">
                {language === 'pa' ? 'ਬੂਥ-ਵਾਰ ਚੋਣ ਤੁਲਨਾ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ' : 'Comparative Booth Intelligence'}
              </h1>
              <p className="main-subtitle">
                {language === 'pa'
                  ? `2022 ਵਿਧਾਨ ਸਭਾ ਬਨਾਮ 2024 ਲੋਕ ਸਭਾ ਚੋਣ ਨਤੀਜੇ — ਸਮੂਹ ${currentConst.total_booths} ਪੋਲਿੰਗ ਸਟੇਸ਼ਨ (${currentConst.district_pa})`
                  : `2022 Vidhan Sabha vs 2024 Lok Sabha Polling Telemetry across all ${currentConst.total_booths} Polling Stations (${currentConst.district_en})`
                }
              </p>
            </div>

            {/* Direct Excel & CSV Download Actions */}
            <div className="title-action-buttons">
              {/* Renumbering & Booth Alignment Audit Button */}
              <button
                onClick={() => setAuditModalOpen(true)}
                className="pill-action-btn outline"
                style={{ borderColor: 'var(--brand-teal, #00a896)', color: 'var(--brand-teal, #00a896)' }}
                title="100% Booth Alignment & Renumbering Audit"
              >
                <span className="pill-btn-icon"><ShieldCheck size={14} /></span>
                <span className="pill-btn-label">
                  {language === 'pa' ? '100% ਬੂਥ ਤਸਦੀਕ ਆਡਿਟ' : '100% Booth Alignment Audit'}
                </span>
              </button>

              <a 
                href={currentConst.excelFile} 
                download={currentConst.excelName}
                className="pill-action-btn green"
                title={language === 'pa' ? 'ਮਾਸਟਰ ਐਕਸਲ ਸ਼ੀਟ ਡਾਊਨਲੋਡ ਕਰੋ (.xlsx)' : 'Download Master Analysis Spreadsheet (Excel .xlsx with AAP/INC Colors)'}
              >
                <span className="pill-btn-icon"><FileSpreadsheet size={14} /></span>
                <span className="pill-btn-label">
                  {language === 'pa' ? 'ਮਾਸਟਰ ਐਕਸਲ ਸ਼ੀਟ (.xlsx)' : 'Master Excel (.xlsx)'}
                </span>
              </a>

              <a 
                href={currentConst.csvFile} 
                download={currentConst.csvName}
                className="pill-action-btn purple"
                title={language === 'pa' ? 'ਸਾਰੇ ਬੂਥਾਂ ਦਾ ਡਾਟਾ ਡਾਊਨਲੋਡ ਕਰੋ (.csv)' : 'Download Complete Booth Data in CSV'}
              >
                <span className="pill-btn-icon"><Download size={14} /></span>
                <span className="pill-btn-label">
                  {language === 'pa' ? 'ਬੂਥ ਡਾਟਾ (CSV)' : 'All Booths CSV'}
                </span>
              </a>

              <button 
                onClick={handlePrintMasterReport}
                className="pill-action-btn outline"
                title="Export Current View as PDF with Dsidein Watermark"
              >
                <span className="pill-btn-icon"><Printer size={14} /></span>
                <span className="pill-btn-label">{t('print_pdf', language)}</span>
              </button>
            </div>
          </section>

          {/* Dsidein 4 Minimal KPI Metric Cards */}
          <KPIBanner 
            summary={summary} 
            constituencyId={constituencyId} 
            language={language} 
          />

          {/* Master Booth Registry Card */}
          <section className="dsidein-registry-card">
            <div className="registry-card-header">
              <div className="registry-title-group">
                <div className="registry-title-row">
                  <h2 className="registry-title">
                    {language === 'pa' ? 'ਬੂਥ ਕਾਰਗੁਜ਼ਾਰੀ ਰਜਿਸਟਰੀ' : 'Booth Performance Registry'}
                  </h2>
                  <span className="registry-booth-count">
                    {filteredBooths.length} {language === 'pa' ? 'ਬੂਥ' : 'Booths'}
                  </span>
                </div>
                <p className="registry-subtitle">
                  {language === 'pa' 
                    ? `ਹਲਕਾ ${currentConst.name_pa} ਦੇ ਹਰੇਕ ਬੂਥ ਦੀ ਵੋਟ ਗਿਣਤੀ, ਵੋਟਿੰਗ ਫ਼ਰਕ, ਜੇਤੂ ਅਤੇ ਲੀਡ`
                    : `Detailed booth-by-booth vote tally, turnout, winners, and margin shifts across ${currentConst.name_en}`
                  }
                </p>
              </div>

              <div className="registry-header-actions">
                {/* Master Excel Download in Toolbar */}
                <a
                  href={currentConst.excelFile}
                  download={currentConst.excelName}
                  className="btn-toolbar-pdf"
                  style={{ textDecoration: 'none', background: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0' }}
                  title="Download Master Excel Spreadsheet"
                >
                  <FileSpreadsheet size={14} />
                  <span>{language === 'pa' ? 'ਐਕਸਲ ਸ਼ੀਟ (.xlsx)' : 'Download Excel'}</span>
                </a>

                <button 
                  className="btn-registry-reset"
                  onClick={handleResetToCompleteList}
                  title="Reset all filters to complete view"
                >
                  <RotateCcw size={14} />
                  <span>{t('reset_filters', language)}</span>
                </button>
              </div>
            </div>

            {/* Party Selector & Category Filter Pills (AAP, INC, SAD, BJP) */}
            <PartyHub 
              selectedParty={selectedParty}
              setSelectedParty={setSelectedParty}
              partyFilter={partyFilter}
              setPartyFilter={setPartyFilter}
              partyStats={partyStats}
              summary={summary}
              constituencyId={constituencyId}
              language={language}
            />

            {/* Search & Sort Sub-Toolbar */}
            <div className="registry-toolbar">
              <div className="toolbar-search-wrap">
                <Search size={15} />
                <input
                  type="text"
                  className="toolbar-search-input"
                  placeholder={
                    language === 'pa'
                      ? `ਬੂਥ ਨੰਬਰ ਜਾਂ ਪਿੰਡ ਦੇ ਨਾਮ ਨਾਲ ਖੋਜੋ (${currentConst.total_booths} ਬੂਥ)...`
                      : `Search all ${currentConst.total_booths} booths by number or village...`
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Filter booths"
                />
              </div>

              <div className="toolbar-controls">
                <button
                  onClick={handlePrintMasterReport}
                  className="btn-toolbar-pdf"
                  title="Export Current Table View as PDF with Dsidein Watermark"
                >
                  <Printer size={14} />
                  <span>{t('print_pdf', language)}</span>
                </button>

                <CustomDropdown
                  value={sortBy}
                  onChange={setSortBy}
                  options={sortOptions}
                  label="Sort order"
                />
              </div>
            </div>

            {/* Booth Table / Grid */}
            <BoothGrid 
              booths={filteredBooths}
              selectedParty={selectedParty}
              partyFilter={partyFilter}
              onSelectBooth={(b) => setSelectedBooth(b)}
              onExportBoothPdf={handleExportBoothPdf}
              language={language}
            />
          </section>
        </main>
      </div>

      {/* Booth Inspector Modal */}
      {selectedBooth && (
        <BoothModal 
          booth={selectedBooth}
          onClose={() => setSelectedBooth(null)}
          constituencyId={constituencyId}
          language={language}
        />
      )}

      {/* Renumbering & Alignment Audit Modal */}
      {auditModalOpen && (
        <RenumberingAuditModal
          isOpen={auditModalOpen}
          onClose={() => setAuditModalOpen(false)}
          booths={booths}
          language={language}
        />
      )}
    </div>
  );
}
