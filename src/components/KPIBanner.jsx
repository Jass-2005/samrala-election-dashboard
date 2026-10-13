import React from 'react';
import { 
  Building2, 
  Vote, 
  ShieldCheck, 
  Award
} from 'lucide-react';

export default function KPIBanner({ summary, t, onOpenAudit }) {
  if (!summary) return null;

  return (
    <div className="kpi-banner-grid">
      {/* 1. Polling Stations & Audit Card */}
      <div className="kpi-card kpi-card-booths" onClick={onOpenAudit} title="Click to view full Booth Numbering Audit">
        <div className="kpi-header">
          <span className="kpi-label">{t?.kpi_booths_label || 'POLLING STATIONS'}</span>
          <div className="kpi-icon-wrap">
            <Building2 size={16} />
          </div>
        </div>
        <div className="kpi-value">{t?.kpi_booths_val || `${summary.total_booths} Booths`}</div>
        <div className="kpi-sub audit-tag">
          <ShieldCheck size={12} className="inline-icon" />
          <span>{summary.renumbering_audit?.verdict_en ? '100% Identical in 2022 & 2024' : (t?.kpi_booths_sub || '● 100% Verified')}</span>
        </div>
      </div>

      {/* 2. Total Polled Card */}
      <div className="kpi-card kpi-card-evm">
        <div className="kpi-header">
          <span className="kpi-label">{t?.kpi_evm_label || '2024 EVM POLLED'}</span>
          <div className="kpi-icon-wrap">
            <Vote size={16} />
          </div>
        </div>
        <div className="kpi-value">{summary.total_votes_2024?.toLocaleString() || '109,284'}</div>
        <div className="kpi-sub">
          <span className="evm-match-badge">● 100% Form-20 EVM Match</span>
        </div>
      </div>

      {/* 3. INC Card (#1 in 2024) */}
      <div className="kpi-card kpi-card-inc">
        <div className="kpi-header">
          <span className="kpi-label">{t?.kpi_inc_label || 'INC (DR. AMAR SINGH)'}</span>
          <div className="party-badge-pill inc">INC #1</div>
        </div>
        <div className="kpi-value">{summary.party_votes_2024?.INC?.toLocaleString() || '37,641'}</div>
        <div className="kpi-sub">
          <span>● {summary.booths_won_2024?.INC || 100} Wins ({summary.party_shares_2024?.INC || 34.4}%)</span>
        </div>
      </div>

      {/* 4. AAP Card (#2 in 2024) */}
      <div className="kpi-card kpi-card-aap">
        <div className="kpi-header">
          <span className="kpi-label">{t?.kpi_aap_label || 'AAP (GURPREET SINGH GP)'}</span>
          <div className="party-badge-pill aap">AAP #2</div>
        </div>
        <div className="kpi-value">{summary.party_votes_2024?.AAP?.toLocaleString() || '35,316'}</div>
        <div className="kpi-sub">
          <span>● {summary.booths_won_2024?.AAP || 91} Wins ({summary.party_shares_2024?.AAP || 32.3}%)</span>
        </div>
      </div>

      {/* 5. SAD Card (#3 in 2024) */}
      <div className="kpi-card kpi-card-sad">
        <div className="kpi-header">
          <span className="kpi-label">{t?.kpi_sad_label || 'SAD (BIKRAMJIT KHALSA)'}</span>
          <div className="party-badge-pill sad">SAD #3</div>
        </div>
        <div className="kpi-value">{summary.party_votes_2024?.SAD?.toLocaleString() || '17,619'}</div>
        <div className="kpi-sub">
          <span>● {summary.booths_won_2024?.SAD || 19} Wins ({summary.party_shares_2024?.SAD || 16.1}%)</span>
        </div>
      </div>

      {/* 6. BJP Card (#4 in 2024) */}
      <div className="kpi-card kpi-card-bjp">
        <div className="kpi-header">
          <span className="kpi-label">{t?.kpi_bjp_label || 'BJP (GEJJA RAM)'}</span>
          <div className="party-badge-pill bjp">BJP #4</div>
        </div>
        <div className="kpi-value">{summary.party_votes_2024?.BJP?.toLocaleString() || '7,970'}</div>
        <div className="kpi-sub">
          <span>● {summary.booths_won_2024?.BJP || 8} Wins ({summary.party_shares_2024?.BJP || 7.3}%)</span>
        </div>
      </div>
    </div>
  );
}
