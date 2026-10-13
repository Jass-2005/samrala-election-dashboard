import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Menu, ChevronDown, Search, Globe, FileSpreadsheet, ExternalLink } from 'lucide-react';
import { CONSTITUENCIES } from '../data/constituencies';
import { t } from '../utils/translations';
import ConstituencyDropdown from './ConstituencyDropdown';

export default function Header({ 
  theme, 
  toggleTheme, 
  onMenuClick,
  searchQuery,
  setSearchQuery,
  constituencyId,
  setConstituencyId,
  language,
  setLanguage
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const currentConst = CONSTITUENCIES[constituencyId] || CONSTITUENCIES.SAMRALA;

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="app-header no-print">
      <div className="header-container">
        {/* Left: Hamburger, Section title & Custom Constituency Dropdown */}
        <div className="header-left">
          <button 
            className="btn-icon header-hamburger" 
            onClick={onMenuClick}
            aria-label="Toggle Menu"
          >
            <Menu size={20} />
          </button>
          
          <div className="header-section-label">
            <span className="section-title-text hide-mobile">{t('dashboard', language)}</span>
            <span className="header-separator hide-mobile">/</span>
            
            {/* Custom Interactive Constituency Dropdown */}
            <ConstituencyDropdown 
              constituencyId={constituencyId} 
              setConstituencyId={setConstituencyId} 
              language={language} 
            />
          </div>
        </div>

        {/* Center: Search input */}
        <div className="header-center-search">
          <div className="header-search-box">
            <Search size={15} className="header-search-icon" />
            <input 
              type="text" 
              className="header-search-input"
              placeholder={language === 'pa' ? 'ਬੂਥ, ਪਿੰਡ ਜਾਂ ਨੰਬਰ ਖੋਜੋ...' : 'Search booths, villages, numbers...'}
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search booths or villages"
            />
          </div>
        </div>

        {/* Right: Language, Excel Download, Theme & Profile */}
        <div className="header-right">
          {/* Language Switcher Pill (EN / ਪੰਜਾਬੀ) */}
          <div className="language-toggle-pill" title="Toggle English / ਪੰਜਾਬੀ">
            <Globe size={14} className="lang-globe-icon" />
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <span className="lang-sep">|</span>
            <button 
              className={`lang-btn ${language === 'pa' ? 'active' : ''}`}
              onClick={() => setLanguage('pa')}
            >
              ਪੰਜਾਬੀ
            </button>
          </div>

          {/* Quick Master Excel Download */}
          <a
            href={currentConst?.excelFile || '#'}
            download={currentConst?.excelName || 'Master_Excel.xlsx'}
            className="btn-header-download"
            title={language === 'pa' ? 'ਮਾਸਟਰ ਐਕਸਲ ਸ਼ੀਟ ਡਾਊਨਲੋਡ ਕਰੋ (.xlsx)' : 'Download Master Excel Sheet (.xlsx)'}
          >
            <FileSpreadsheet size={15} />
            <span className="hide-mobile">Excel</span>
          </a>

          {/* Theme Toggle */}
          <button 
            className="btn-icon" 
            onClick={toggleTheme} 
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Dsidein Interactive Profile Dropdown */}
          <div className="dsidein-profile-dropdown-wrap" ref={profileRef}>
            <button 
              type="button"
              className={`dsidein-user-profile ${profileOpen ? 'open' : ''}`}
              onClick={() => setProfileOpen(prev => !prev)}
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              title="Dsidein Command Center Telemetry"
            >
              <div className="user-avatar-circle">
                <img 
                  src="./dsidein_logo_transparent.png" 
                  alt="Dsidein" 
                  className="user-avatar-img" 
                />
              </div>
              <span className="user-profile-name">Dsidein</span>
              <ChevronDown size={13} className={`profile-chevron ${profileOpen ? 'rotate' : ''}`} />
            </button>

            {profileOpen && (
              <div className="dsidein-profile-menu">
                <div className="profile-menu-top">
                  <div className="profile-status-indicator online">
                    <span className="status-dot"></span>
                    <span>{language === 'pa' ? 'ਲਾਈਵ ਟੈਲੀਮੈਟਰੀ ਸਰਗਰਮ' : 'Live Telemetry Active'}</span>
                  </div>
                  <div className="profile-system-title">DSIDEIN COMMAND CENTER</div>
                  <div className="profile-system-subtitle">
                    {language === 'pa' ? 'ਚੋਣ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਬੂਥ ਇੰਟੈਲੀਜੈਂਸ' : 'Election Analytics & Telemetry'}
                  </div>
                </div>
                <div className="profile-menu-divider"></div>
                <div className="profile-menu-details">
                  <div className="profile-detail-row">
                    <span className="profile-detail-lbl">{language === 'pa' ? 'ਹਲਕਾ' : 'Constituency'}:</span>
                    <span className="profile-detail-val">{language === 'pa' ? currentConst.name_pa : currentConst.name_en}</span>
                  </div>
                  <div className="profile-detail-row">
                    <span className="profile-detail-lbl">{language === 'pa' ? 'ਕੁੱਲ ਬੂਥ' : 'Booths'}:</span>
                    <span className="profile-detail-val">{currentConst.total_booths}</span>
                  </div>
                  <div className="profile-detail-row">
                    <span className="profile-detail-lbl">{language === 'pa' ? 'ਸਥਿਤੀ' : 'Status'}:</span>
                    <span className="profile-detail-val status-verified">● 100% Verified</span>
                  </div>
                </div>
                <div className="profile-menu-divider"></div>
                <div className="profile-menu-actions">
                  <a
                    href={currentConst?.excelFile || '#'}
                    download={currentConst?.excelName}
                    className="profile-action-link"
                    onClick={() => setProfileOpen(false)}
                  >
                    <FileSpreadsheet size={14} />
                    <span>{language === 'pa' ? 'ਮਾਸਟਰ ਐਕਸਲ ਸ਼ੀਟ' : 'Master Excel Sheet'}</span>
                  </a>
                  <a
                    href="https://dsidein.com/samrala-2022-2024"
                    target="_blank"
                    rel="noreferrer"
                    className="profile-action-link"
                    onClick={() => setProfileOpen(false)}
                  >
                    <ExternalLink size={14} />
                    <span>dsidein.com</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
