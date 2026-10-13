import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  MapPin, 
  FileSpreadsheet, 
  FileText, 
  ShieldCheck, 
  X
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  mobileMenuOpen, 
  setMobileMenuOpen,
  onOpenAudit,
  t
}) {
  const handleNavClick = (tab) => {
    setActiveTab(tab);
    if (setMobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-brand">
          <div className="brand-logo-wrap">
            <img 
              src="./dsidein_logo_transparent.png" 
              alt="Dsidein Logo" 
              className="brand-logo-img"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="brand-text">
              <span className="brand-name">DSIDEIN</span>
              <span className="brand-badge">ANALYTICS</span>
            </div>
          </div>
          
          <button 
            className="btn-icon sidebar-close-btn" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav" aria-label="Main Navigation">
          <div className="nav-section-title">INTELLIGENCE</div>
          
          <button 
            className={`nav-item ${activeTab === 'DASHBOARD' ? 'active' : ''}`}
            onClick={() => handleNavClick('DASHBOARD')}
          >
            <LayoutDashboard size={18} />
            <span>{t?.nav_dashboard || 'Dashboard'}</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'PARTY_HUB' ? 'active' : ''}`}
            onClick={() => handleNavClick('PARTY_HUB')}
          >
            <Layers size={18} />
            <span>{t?.nav_party_hub || 'Party Hub'}</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'BOOTHS' ? 'active' : ''}`}
            onClick={() => handleNavClick('BOOTHS')}
          >
            <MapPin size={18} />
            <span>{t?.nav_booths || '218 Booths'}</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'AUDIT' ? 'active' : ''}`}
            onClick={() => {
              if (onOpenAudit) onOpenAudit();
              else handleNavClick('AUDIT');
            }}
          >
            <ShieldCheck size={18} />
            <span>{t?.nav_audit || 'Booth Audit'}</span>
            <span className="nav-badge-pill">100% Match</span>
          </button>

          <div className="nav-section-title" style={{ marginTop: '20px' }}>DOWNLOADS & EXPORTS</div>

          <a 
            href="./Samrala_Master_Party_Booth_Analysis_2022_2024.xlsx" 
            download 
            className="nav-item"
            title="Download Full Excel Workbook (.xlsx)"
          >
            <FileSpreadsheet size={18} />
            <span>{t?.nav_master_excel || 'Master Excel'}</span>
          </a>

          <a 
            href="./Samrala_All_Booths_Comparison.csv" 
            download 
            className="nav-item"
            title="Download All 218 Booths Comparison CSV"
          >
            <FileText size={18} />
            <span>All 218 Booths CSV</span>
          </a>
        </nav>

        {/* Sidebar Footer Info */}
        <div className="sidebar-footer">
          <div className="footer-card">
            <div className="footer-card-header">
              <span className="pulse-indicator"></span>
              <span className="footer-card-title">58-SAMRALA AC</span>
            </div>
            <p className="footer-card-desc">
              218 Booths Audited. 100% Form-20 Match with Zero Error.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
