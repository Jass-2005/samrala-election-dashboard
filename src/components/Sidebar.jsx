import React from 'react';
import { LayoutDashboard, MapPin, Users, FileSpreadsheet, ExternalLink, X, Download } from 'lucide-react';
import { CONSTITUENCIES } from '../data/constituencies';
import { t } from '../utils/translations';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  onClose,
  constituencyId,
  language
}) {
  const currentConst = CONSTITUENCIES[constituencyId] || CONSTITUENCIES.SAMRALA;

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div 
          className="mobile-sidebar-backdrop no-print" 
          onClick={onClose} 
          aria-label="Close Mobile Navigation" 
        />
      )}

      <aside className={`dsidein-sidebar no-print ${isOpen ? 'mobile-open' : ''}`}>
        {/* Top Logo & Close button on mobile */}
        <div className="sidebar-logo-wrap">
          <a 
            href="https://dsidein.com/samrala-2022-2024" 
            title={`Dsidein Command Center — ${currentConst.name_en}`}
            className="sidebar-brand-link"
          >
            <img 
              src="./dsidein_logo_transparent.png" 
              alt="Dsidein Logo" 
              className="sidebar-dsidein-logo" 
            />
          </a>

          {isOpen && (
            <button 
              className="sidebar-mobile-close hide-desktop" 
              onClick={onClose}
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Icons */}
        <nav className="sidebar-nav">
          <button 
            className={`sidebar-nav-btn ${activeTab === 'DASHBOARD' ? 'active' : ''}`}
            onClick={() => handleNavClick('DASHBOARD')}
            title={t('dashboard', language)}
          >
            <div className="active-rail-indicator" />
            <LayoutDashboard size={20} />
            <span className="sidebar-label hide-desktop">{t('dashboard', language)}</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeTab === 'PARTY_HUB' ? 'active' : ''}`}
            onClick={() => handleNavClick('PARTY_HUB')}
            title={t('party_hub', language)}
          >
            <Users size={20} />
            <span className="sidebar-label hide-desktop">{t('party_hub', language)}</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeTab === 'BOOTHS' ? 'active' : ''}`}
            onClick={() => handleNavClick('BOOTHS')}
            title={`${currentConst.total_booths} ${t('all_booths', language)}`}
          >
            <MapPin size={20} />
            <span className="sidebar-label hide-desktop">
              {currentConst.total_booths} {t('all_booths', language)}
            </span>
          </button>

          {/* Master Excel Spreadsheet Download */}
          <a 
            href={currentConst.excelFile} 
            download={currentConst.excelName}
            className="sidebar-nav-btn"
            title={`${t('master_excel', language)} (.xlsx)`}
            onClick={() => { if (onClose) onClose(); }}
          >
            <FileSpreadsheet size={20} />
            <span className="sidebar-label hide-desktop">{t('master_excel', language)}</span>
          </a>

          {/* Comparison CSV Download */}
          <a 
            href={currentConst.csvFile} 
            download={currentConst.csvName}
            className="sidebar-nav-btn"
            title={`${t('comparison_csv', language)} (.csv)`}
            onClick={() => { if (onClose) onClose(); }}
          >
            <Download size={20} />
            <span className="sidebar-label hide-desktop">{t('comparison_csv', language)}</span>
          </a>

          <a 
            href="https://dsidein.com" 
            target="_blank" 
            rel="noreferrer"
            className="sidebar-nav-btn sidebar-external-btn"
            title="Dsidein Official Portal"
          >
            <ExternalLink size={18} />
            <span className="sidebar-label hide-desktop">dsidein.com</span>
          </a>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-status-dot" title="Live Database Synchronized" />
          <span className="sidebar-footer-text">
            {language === 'pa' ? currentConst.name_pa : currentConst.name_en}
          </span>
        </div>
      </aside>
    </>
  );
}
