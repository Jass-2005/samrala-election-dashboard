import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  FileSpreadsheet, 
  FileText, 
  Printer, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award,
  Vote,
  Sparkles,
  Info
} from 'lucide-react';

import samralaData from './data/samrala_comparison_data.json';
import { translations } from './translations';
import './App.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import KPIBanner from './components/KPIBanner';
import BoothGrid from './components/BoothGrid';
import PartyHub from './components/PartyHub';
import RenumberingAuditModal from './components/RenumberingAuditModal';
import BoothModal from './components/BoothModal';
import CustomDropdown from './components/CustomDropdown';

export default function App() {
  // 1. Core State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('samrala_theme') || 'dark';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('samrala_lang') || 'en';
  });

  const [activeTab, setActiveTab] = useState('DASHBOARD'); // 'DASHBOARD', 'PARTY_HUB', 'BOOTHS', 'AUDIT'
  const [selectedParty, setSelectedParty] = useState('ALL'); // 'ALL', 'INC', 'AAP', 'SAD', 'BJP'
  const [partyFilter, setPartyFilter] = useState('ALL'); // 'ALL', 'INC_WINS', 'AAP_WINS', 'SAD_WINS', 'BJP_WINS', 'FLIPPED_ONLY', 'RETAINED_ONLY'
  const [categoryFilter, setCategoryFilter] = useState('ALL'); // 'ALL', 'WON_BOTH', 'GAINED', 'LOST_24', 'WEAK'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('BOOTH_ASC');

  // Modals
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync theme with HTML root attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('samrala_theme', theme);
  }, [theme]);

  // Sync language with localStorage
  useEffect(() => {
    localStorage.setItem('samrala_lang', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isPa = language === 'pa';
  const t = translations[language] || translations.en;

  const summary = samralaData.summary || {};
  const allBooths = samralaData.booths || [];

  // Compute party stats for Party Hub
  const partyStats = useMemo(() => {
    const parties = ['INC', 'AAP', 'SAD', 'BJP'];
    const candidates = {
      INC: { c24: 'Dr. Amar Singh (MP)', c22: 'Rupinder Singh Raja Gill' },
      AAP: { c24: 'Gurpreet Singh GP', c22: 'Jagtar Singh Diyalpura (MLA)' },
      SAD: { c24: 'Bikramjit Singh Khalsa', c22: 'Paramjit Singh Dhillon' },
      BJP: { c24: 'Gejja Ram Valmiki', c22: 'Ranjit Singh Gahlewal' }
    };

    const stats = {};
    parties.forEach(p => {
      const pLower = p.toLowerCase();
      const v24 = summary.party_votes_2024?.[p] || 0;
      const v22 = summary.party_votes_2022?.[p] || 0;
      const s24 = summary.party_shares_2024?.[p] || 0;
      const s22 = summary.party_shares_2022?.[p] || 0;
      const w24 = summary.booths_won_2024?.[p] || 0;
      const w22 = summary.booths_won_2022?.[p] || 0;

      let won_both = 0;
      let gained = 0;
      let lost_24 = 0;
      let weak = 0;
      let top_booth = { no: 1, name: '', votes: 0 };

      allBooths.forEach(b => {
        const cat = b.categories?.[p];
        if (cat === 'WON_BOTH') won_both++;
        else if (cat === 'GAINED') gained++;
        else if (cat === 'LOST_24') lost_24++;
        else if (cat === 'WEAK') weak++;

        const votes = b[`${pLower}_24`] || b.data_2024?.[`${pLower}_votes`] || 0;
        if (votes > top_booth.votes) {
          top_booth = {
            no: b.booth_no,
            name: isPa ? (b.village_pa || b.village_en) : (b.village_en || b.village_pa),
            votes: votes,
            pct: b[`${pLower}_share_24`] || 0
          };
        }
      });

      stats[p] = {
        votes_2024: v24,
        votes_2022: v22,
        share_2024: s24,
        share_2022: s22,
        swing: Number((s24 - s22).toFixed(2)),
        booths_won_2024: w24,
        booths_won_2022: w22,
        won_both,
        gained,
        lost_24,
        weak,
        top_booth,
        c24: candidates[p]?.c24,
        c22: candidates[p]?.c22
      };
    });

    return stats;
  }, [allBooths, summary, isPa]);

  // Handle Tab Switch
  const handleSelectPartyTab = (party) => {
    setSelectedParty(party);
    setPartyFilter('ALL');
    setCategoryFilter('ALL');
    if (activeTab === 'PARTY_HUB') {
      setActiveTab('DASHBOARD');
    }
  };

  const handleApplyQuickFilter = (category) => {
    setCategoryFilter(category);
    setActiveTab('DASHBOARD');
  };

  // Filter & Sort Logic
  const filteredBooths = useMemo(() => {
    return allBooths.filter(b => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const bNoStr = String(b.booth_no);
        const vEn = (b.village_en || '').toLowerCase();
        const vPa = (b.village_pa || '').toLowerCase();
        const w24 = (b.winner_24 || '').toLowerCase();
        const w22 = (b.winner_22 || '').toLowerCase();

        const match = 
          bNoStr === q || 
          bNoStr.includes(q) || 
          vEn.includes(q) || 
          vPa.includes(q) ||
          w24.includes(q) ||
          w22.includes(q);

        if (!match) return false;
      }

      // 2. Party Filter in ALL Mode
      if (selectedParty === 'ALL') {
        if (partyFilter === 'INC_WINS' && b.winner_24 !== 'INC') return false;
        if (partyFilter === 'AAP_WINS' && b.winner_24 !== 'AAP') return false;
        if (partyFilter === 'SAD_WINS' && b.winner_24 !== 'SAD') return false;
        if (partyFilter === 'BJP_WINS' && b.winner_24 !== 'BJP') return false;
        if (partyFilter === 'FLIPPED_ONLY' && !b.is_flipped) return false;
        if (partyFilter === 'RETAINED_ONLY' && b.is_flipped) return false;
      } else {
        // 3. Single Party Category Filter
        if (categoryFilter !== 'ALL') {
          const cat = b.categories?.[selectedParty];
          if (cat !== categoryFilter) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      if (sortBy === 'BOOTH_ASC') return a.booth_no - b.booth_no;
      if (sortBy === 'BOOTH_DESC') return b.booth_no - a.booth_no;
      if (sortBy === 'TURNOUT_DESC') return (b.turnout_24 || 0) - (a.turnout_24 || 0);
      if (sortBy === 'TURNOUT_ASC') return (a.turnout_24 || 0) - (b.turnout_24 || 0);
      if (sortBy === 'MARGIN_DESC') return (b.margin_24 || 0) - (a.margin_24 || 0);
      if (sortBy === 'INC_DESC') return (b.inc_24 || 0) - (a.inc_24 || 0);
      if (sortBy === 'AAP_DESC') return (b.aap_24 || 0) - (a.aap_24 || 0);
      if (sortBy === 'SAD_DESC') return (b.sad_24 || 0) - (a.sad_24 || 0);
      if (sortBy === 'BJP_DESC') return (b.bjp_24 || 0) - (a.bjp_24 || 0);
      return a.booth_no - b.booth_no;
    });
  }, [allBooths, searchQuery, selectedParty, partyFilter, categoryFilter, sortBy]);

  const handleResetFilters = () => {
    setSelectedParty('ALL');
    setPartyFilter('ALL');
    setCategoryFilter('ALL');
    setSearchQuery('');
    setSortBy('BOOTH_ASC');
  };

  const handlePrint = () => {
    window.print();
  };

  // Sort dropdown options
  const sortOptions = [
    { value: 'BOOTH_ASC', label: t?.sort_booth_asc || 'Booth No (1 → 218)' },
    { value: 'BOOTH_DESC', label: t?.sort_booth_desc || 'Booth No (218 → 1)' },
    { value: 'TURNOUT_DESC', label: t?.sort_turnout_desc || 'Turnout 2024 (High → Low)' },
    { value: 'TURNOUT_ASC', label: t?.sort_turnout_asc || 'Turnout 2024 (Low → High)' },
    { value: 'MARGIN_DESC', label: t?.sort_margin_desc || 'Lead Margin (Highest Win)' },
    { value: 'INC_DESC', label: t?.sort_inc_desc || 'INC Votes (High → Low)' },
    { value: 'AAP_DESC', label: t?.sort_aap_desc || 'AAP Votes (High → Low)' },
    { value: 'SAD_DESC', label: t?.sort_sad_desc || 'SAD Votes (High → Low)' },
    { value: 'BJP_DESC', label: t?.sort_bjp_desc || 'BJP Votes (High → Low)' },
  ];

  return (
    <div className="app-shell" data-theme={theme}>
      {/* 1. Header */}
      <Header 
        theme={theme}
        toggleTheme={toggleTheme}
        onMenuClick={() => setMobileMenuOpen(prev => !prev)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredCount={filteredBooths.length}
        language={language}
        onLanguageChange={setLanguage}
        t={t}
      />

      <div className="app-main-layout">
        {/* 2. Sidebar Navigation */}
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onOpenAudit={() => setAuditModalOpen(true)}
          t={t}
        />

        {/* 3. Main Dashboard Viewport */}
        <main className="dashboard-content">
          <div className="content-inner">
            {/* Title Block & Actions */}
            <div className="title-section-bar">
              <div className="title-left">
                <span className="segment-badge-tag">{t?.segment_tag || '58-SAMRALA ASSEMBLY SEGMENT'}</span>
                <h1 className="title-main">{t?.main_title || 'Comparative Booth Intelligence'}</h1>
                <p className="title-subtitle">{t?.main_subtitle || '2022 Vidhan Sabha vs 2024 Lok Sabha Polling Telemetry across all 218 Polling Stations (Fatehgarh Sahib PC)'}</p>
              </div>

              <div className="title-actions no-print">
                <a 
                  href="./Samrala_Master_Party_Booth_Analysis_2022_2024.xlsx"
                  download
                  className="btn-action-primary"
                  title={t?.action_excel_title || 'Download Master Excel'}
                >
                  <FileSpreadsheet size={16} />
                  <span>{t?.action_excel || 'Master Excel'}</span>
                </a>

                <button 
                  className="btn-action-outline"
                  onClick={() => setAuditModalOpen(true)}
                  title={t?.action_audit_title || 'View Booth Numbering Audit'}
                >
                  <ShieldCheck size={16} />
                  <span>{t?.action_audit || 'Booth Audit'}</span>
                </button>

                <button 
                  className="btn-action-outline"
                  onClick={handlePrint}
                  title={t?.action_export_pdf_title || 'Print/Export PDF'}
                >
                  <Printer size={16} />
                  <span>{t?.action_export_pdf || 'Export PDF'}</span>
                </button>
              </div>
            </div>

            {/* Strict Renumbering Audit Notification Banner */}
            <div className="audit-notification-strip">
              <div className="strip-left">
                <ShieldCheck size={18} className="strip-shield-icon" />
                <div className="strip-text-wrap">
                  <strong className="strip-title">{t?.audit_banner_title || 'BOOTH NUMBERING AUDIT: 100% IDENTICAL IN BOTH ELECTIONS'}</strong>
                  <p className="strip-desc">{t?.audit_banner_desc || 'Strict sequential and mathematical analysis proves Booths #1 to #218 remained 100% unchanged between 2022 Vidhan Sabha and 2024 Lok Sabha. Correlation: 0.9412. Zero auxiliary/split booths.'}</p>
                </div>
              </div>
              <button 
                className="btn-strip-action no-print"
                onClick={() => setAuditModalOpen(true)}
              >
                <span>{t?.audit_banner_btn || 'View Full Audit Report'}</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* KPI Summary Banner */}
            <KPIBanner 
              summary={summary}
              t={t}
              onOpenAudit={() => setAuditModalOpen(true)}
            />

            {/* TAB CONTENT 1: PARTY HUB */}
            {activeTab === 'PARTY_HUB' && (
              <PartyHub 
                partyStats={partyStats}
                onSelectPartyTab={handleSelectPartyTab}
                onApplyQuickFilter={handleApplyQuickFilter}
                language={language}
                t={t}
              />
            )}

            {/* TAB CONTENT 2: DASHBOARD / BOOTHS REGISTRY */}
            {(activeTab === 'DASHBOARD' || activeTab === 'BOOTHS') && (
              <section className="registry-section">
                {/* Registry Header */}
                <div className="registry-header-bar">
                  <div className="registry-title-wrap">
                    <h2 className="registry-title">{t?.registry_title || 'Booth Performance Registry'}</h2>
                    <p className="registry-subtitle">
                      {t?.registry_subtitle || 'Detailed booth-by-booth vote tally, turnout, winners, and margin shifts across 58-Samrala'}
                    </p>
                  </div>

                  <button 
                    className="btn-registry-reset no-print"
                    onClick={handleResetFilters}
                    title="Reset all filters and search"
                  >
                    <span>{t?.reset_all || 'Reset All'}</span>
                  </button>
                </div>

                {/* Party Selector Navigation Tabs */}
                <div className="party-nav-tabs no-print">
                  <button 
                    className={`party-tab-btn ${selectedParty === 'ALL' ? 'active' : ''}`}
                    onClick={() => handleSelectPartyTab('ALL')}
                  >
                    <span>{t?.tab_all || 'All 218 Booths'}</span>
                    <span className="tab-count-pill">{allBooths.length}</span>
                  </button>

                  <button 
                    className={`party-tab-btn inc ${selectedParty === 'INC' ? 'active' : ''}`}
                    onClick={() => handleSelectPartyTab('INC')}
                  >
                    <span className="party-dot inc"></span>
                    <span>{t?.tab_inc || 'INC Analysis'}</span>
                    <span className="tab-count-pill">{summary.booths_won_2024?.INC || 100}</span>
                  </button>

                  <button 
                    className={`party-tab-btn aap ${selectedParty === 'AAP' ? 'active' : ''}`}
                    onClick={() => handleSelectPartyTab('AAP')}
                  >
                    <span className="party-dot aap"></span>
                    <span>{t?.tab_aap || 'AAP Analysis'}</span>
                    <span className="tab-count-pill">{summary.booths_won_2024?.AAP || 91}</span>
                  </button>

                  <button 
                    className={`party-tab-btn sad ${selectedParty === 'SAD' ? 'active' : ''}`}
                    onClick={() => handleSelectPartyTab('SAD')}
                  >
                    <span className="party-dot sad"></span>
                    <span>{t?.tab_sad || 'SAD Analysis'}</span>
                    <span className="tab-count-pill">{summary.booths_won_2024?.SAD || 19}</span>
                  </button>

                  <button 
                    className={`party-tab-btn bjp ${selectedParty === 'BJP' ? 'active' : ''}`}
                    onClick={() => handleSelectPartyTab('BJP')}
                  >
                    <span className="party-dot bjp"></span>
                    <span>{t?.tab_bjp || 'BJP Analysis'}</span>
                    <span className="tab-count-pill">{summary.booths_won_2024?.BJP || 8}</span>
                  </button>
                </div>

                {/* Sub-Filters & Controls Toolbar */}
                <div className="registry-toolbar no-print">
                  {/* Left: Quick Filters */}
                  <div className="toolbar-quick-filters">
                    {selectedParty === 'ALL' ? (
                      <>
                        <button 
                          className={`pill-filter ${partyFilter === 'ALL' ? 'active' : ''}`}
                          onClick={() => setPartyFilter('ALL')}
                        >
                          {t?.filter_all || 'All'}
                        </button>
                        <button 
                          className={`pill-filter inc ${partyFilter === 'INC_WINS' ? 'active' : ''}`}
                          onClick={() => setPartyFilter('INC_WINS')}
                        >
                          {t?.filter_inc_wins || 'INC Wins (100)'}
                        </button>
                        <button 
                          className={`pill-filter aap ${partyFilter === 'AAP_WINS' ? 'active' : ''}`}
                          onClick={() => setPartyFilter('AAP_WINS')}
                        >
                          {t?.filter_aap_wins || 'AAP Wins (91)'}
                        </button>
                        <button 
                          className={`pill-filter sad ${partyFilter === 'SAD_WINS' ? 'active' : ''}`}
                          onClick={() => setPartyFilter('SAD_WINS')}
                        >
                          {t?.filter_sad_wins || 'SAD Wins (19)'}
                        </button>
                        <button 
                          className={`pill-filter bjp ${partyFilter === 'BJP_WINS' ? 'active' : ''}`}
                          onClick={() => setPartyFilter('BJP_WINS')}
                        >
                          {t?.filter_bjp_wins || 'BJP Wins (8)'}
                        </button>
                        <button 
                          className={`pill-filter flip ${partyFilter === 'FLIPPED_ONLY' ? 'active' : ''}`}
                          onClick={() => setPartyFilter('FLIPPED_ONLY')}
                        >
                          {t?.filter_flipped || 'Flipped (104)'}
                        </button>
                        <button 
                          className={`pill-filter retain ${partyFilter === 'RETAINED_ONLY' ? 'active' : ''}`}
                          onClick={() => setPartyFilter('RETAINED_ONLY')}
                        >
                          {t?.filter_retained || 'Retained (114)'}
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className={`pill-filter ${categoryFilter === 'ALL' ? 'active' : ''}`}
                          onClick={() => setCategoryFilter('ALL')}
                        >
                          {t?.filter_all || 'All'}
                        </button>
                        <button 
                          className={`pill-filter ${categoryFilter === 'WON_BOTH' ? 'active' : ''}`}
                          onClick={() => setCategoryFilter('WON_BOTH')}
                        >
                          {isPa ? 'ਪੱਕੇ ਗੜ੍ਹ (ਦੋਵੇਂ ਜਿੱਤੇ)' : 'Strongholds (Won Both)'}
                        </button>
                        <button 
                          className={`pill-filter ${categoryFilter === 'GAINED' ? 'active' : ''}`}
                          onClick={() => setCategoryFilter('GAINED')}
                        >
                          {isPa ? 'ਨਵੇਂ ਜਿੱਤੇ (2024)' : 'Gained in 2024'}
                        </button>
                        <button 
                          className={`pill-filter ${categoryFilter === 'LOST_24' ? 'active' : ''}`}
                          onClick={() => setCategoryFilter('LOST_24')}
                        >
                          {isPa ? 'ਗਵਾਏ ਬੂਥ (2024)' : 'Lost in 2024'}
                        </button>
                        <button 
                          className={`pill-filter ${categoryFilter === 'WEAK' ? 'active' : ''}`}
                          onClick={() => setCategoryFilter('WEAK')}
                        >
                          {isPa ? 'ਕਮਜ਼ੋਰ ਬੂਥ (<20%)' : 'Weak (<20%)'}
                        </button>
                      </>
                    )}
                  </div>

                  {/* Right: Custom Dropdown Sort Selector */}
                  <div className="toolbar-controls-right">
                    <CustomDropdown 
                      options={sortOptions}
                      value={sortBy}
                      onChange={setSortBy}
                      label={t?.sort_order_label || 'Sort order'}
                    />
                  </div>
                </div>

                {/* Booth Grid / Table Display */}
                <BoothGrid 
                  booths={filteredBooths}
                  selectedParty={selectedParty}
                  onSelectBooth={setSelectedBooth}
                  partyFilter={selectedParty === 'ALL' ? partyFilter : categoryFilter}
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                  language={language}
                  t={t}
                />
              </section>
            )}
          </div>
        </main>
      </div>

      {/* 4. Modals */}
      {selectedBooth && (
        <BoothModal 
          booth={selectedBooth}
          onClose={() => setSelectedBooth(null)}
          language={language}
          t={t}
        />
      )}

      {auditModalOpen && (
        <RenumberingAuditModal 
          isOpen={auditModalOpen}
          onClose={() => setAuditModalOpen(false)}
          auditData={summary.renumbering_audit}
          booths={allBooths}
          t={t}
          isPa={isPa}
        />
      )}
    </div>
  );
}
