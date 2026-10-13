import React from 'react';
import { Sun, Moon, Menu, Search, X } from 'lucide-react';
import LanguageDropdown from './LanguageDropdown';

export default function Header({ 
  theme, 
  toggleTheme, 
  onMenuClick,
  searchQuery,
  setSearchQuery,
  filteredCount,
  language = 'en',
  onLanguageChange,
  t
}) {
  return (
    <header className="app-header no-print">
      <div className="header-container">
        {/* Left: Hamburger & Dashboard Label */}
        <div className="header-left">
          <button 
            className="btn-icon header-hamburger" 
            onClick={onMenuClick}
            aria-label="Toggle Menu"
          >
            <Menu size={20} />
          </button>
          
          <div className="header-section-label">
            <span className="section-title-text">{t?.header_section || 'DASHBOARD'}</span>
            <span className="header-separator">/</span>
            <span className="header-crumb">{t?.header_crumb || '11-AJNALA'}</span>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="header-center-search">
          <div className="header-search-box">
            <Search size={15} className="header-search-icon" />
            <input 
              type="text" 
              className="header-search-input"
              placeholder={t?.search_placeholder_desktop || 'Search 188 booths, localities, numbers...'}
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search booths or villages"
            />
            {searchQuery && (
              <span className="search-results-pill">{filteredCount ?? 0}</span>
            )}
            {searchQuery && (
              <button 
                className="btn-clear-search" 
                onClick={() => setSearchQuery('')}
                title="Clear search"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Right: Language Selector & Theme Toggle */}
        <div className="header-right">
          <LanguageDropdown 
            language={language}
            onLanguageChange={onLanguageChange}
          />

          <button 
            className="btn-icon header-theme-toggle" 
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? (t?.theme_switch_light || 'Switch to Light Mode') : (t?.theme_switch_dark || 'Switch to Dark Mode')}
            title={theme === 'dark' ? (t?.theme_switch_light || 'Switch to Light Mode') : (t?.theme_switch_dark || 'Switch to Dark Mode')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="header-mobile-search">
        <div className="header-search-box">
          <Search size={15} className="header-search-icon" />
          <input 
            type="text" 
            className="header-search-input"
            placeholder={t?.search_placeholder_mobile || 'Search booth number or locality...'}
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search booths or villages mobile"
          />
          {searchQuery && (
            <span className="search-results-pill">{filteredCount ?? 0}</span>
          )}
          {searchQuery && (
            <button 
              className="btn-clear-search" 
              onClick={() => setSearchQuery('')}
              title="Clear search"
              aria-label="Clear search mobile"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
