import React from 'react';
import { 
  Award, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck, 
  AlertTriangle,
  ChevronRight,
  Flame,
  Target
} from 'lucide-react';

export default function PartyHub({ 
  partyStats, 
  onSelectPartyTab, 
  onApplyQuickFilter,
  language = 'en',
  t 
}) {
  const isPa = language === 'pa';
  const parties = ['INC', 'AAP', 'SAD', 'BJP'];

  const partyDetails = {
    INC: {
      name: isPa ? 'ਕਾਂਗਰਸ' : 'Indian National Congress',
      c24: 'Dr. Amar Singh (MP)',
      c22: 'Rupinder Singh Raja Gill',
      colorClass: 'inc',
      role: isPa ? '2024 ਜੇਤੂ ਪਾਰਟੀ (100 ਬੂਥ ਜਿੱਤਾਂ)' : '2024 Winning Party (100 Booth Wins)'
    },
    AAP: {
      name: isPa ? 'ਆਮ ਆਦਮੀ ਪਾਰਟੀ' : 'Aam Aadmi Party',
      c24: 'Gurpreet Singh GP',
      c22: 'Jagtar Singh Diyalpura (MLA)',
      colorClass: 'aap',
      role: isPa ? '2022 ਵਿਧਾਨ ਸਭਾ ਜੇਤੂ (91 ਬੂਥ ਜਿੱਤਾਂ)' : '2022 Assembly Winner (91 Booth Wins)'
    },
    SAD: {
      name: isPa ? 'ਸ਼੍ਰੋਮਣੀ ਅਕਾਲੀ ਦਲ' : 'Shiromani Akali Dal',
      c24: 'Bikramjit Singh Khalsa',
      c22: 'Paramjit Singh Dhillon',
      colorClass: 'sad',
      role: isPa ? 'ਤੀਜਾ ਸਥਾਨ (19 ਬੂਥ ਜਿੱਤਾਂ)' : 'Third Force (19 Booth Wins)'
    },
    BJP: {
      name: isPa ? 'ਭਾਰਤੀ ਜਨਤਾ ਪਾਰਟੀ' : 'Bharatiya Janata Party',
      c24: 'Gejja Ram Valmiki',
      c22: 'Ranjit Singh Gahlewal',
      colorClass: 'bjp',
      role: isPa ? 'ਸ਼ਹਿਰੀ ਵਾਧਾ (8 ਬੂਥ ਜਿੱਤਾਂ)' : 'Urban Surge (8 Booth Wins)'
    }
  };

  return (
    <div className="party-hub-container">
      {/* Title & Introduction */}
      <div className="party-hub-header">
        <div>
          <h2 className="party-hub-main-title">{t?.party_hub_title || 'Multi-Party Tactical Intelligence Hub'}</h2>
          <p className="party-hub-subtitle">
            {t?.party_hub_subtitle || 'In-depth performance breakdown, vote swings, retention rates, and tactical targets across 58-Samrala'}
          </p>
        </div>
      </div>

      {/* 4 Multi-Party Intelligence Cards */}
      <div className="party-cards-grid">
        {parties.map((p) => {
          const s = partyStats[p] || {};
          const meta = partyDetails[p];
          const swing = s.swing || 0;
          const isPositive = swing >= 0;

          return (
            <div key={p} className={`party-intel-card ${meta.colorClass}`}>
              {/* Card Top */}
              <div className="intel-card-header">
                <div>
                  <div className="party-tag-badge">
                    <span className={`party-pill ${meta.colorClass}`}>{p}</span>
                    <span className="party-tag-sub">{meta.role}</span>
                  </div>
                  <h3 className="party-intel-name">{meta.name}</h3>
                  <div className="candidate-line">
                    <span className="c-label">2024:</span> <strong>{meta.c24}</strong>
                    <span className="c-sep">•</span>
                    <span className="c-label">2022:</span> <span>{meta.c22}</span>
                  </div>
                </div>
              </div>

              {/* Core Metrics Grid */}
              <div className="intel-metrics-row">
                <div className="intel-metric-box">
                  <span className="im-label">{t?.label_vote_share || 'Vote Share'}</span>
                  <div className="im-val">{s.share_2024}%</div>
                  <div className={`im-sub ${isPositive ? 'text-up' : 'text-down'}`}>
                    {isPositive ? '+' : ''}{swing}% vs 2022
                  </div>
                </div>

                <div className="intel-metric-box">
                  <span className="im-label">{t?.label_net_votes || 'Net Votes'}</span>
                  <div className="im-val">{s.votes_2024?.toLocaleString()}</div>
                  <div className="im-sub">
                    {s.votes_2022 ? `${s.votes_2022.toLocaleString()} in '22` : ''}
                  </div>
                </div>

                <div className="intel-metric-box">
                  <span className="im-label">{t?.label_booth_wins || 'Booths Won'}</span>
                  <div className="im-val highlight">{s.booths_won_2024}</div>
                  <div className="im-sub">
                    vs {s.booths_won_2022} in '22
                  </div>
                </div>
              </div>

              {/* Tactical Categorization Chips */}
              <div className="intel-chips-section">
                <div className="chip-row">
                  <button 
                    className="tactical-chip gained"
                    onClick={() => {
                      onSelectPartyTab(p);
                      onApplyQuickFilter('GAINED');
                    }}
                    title="Click to view all booths gained in 2024"
                  >
                    <ArrowUpRight size={13} />
                    <span>{t?.label_gained_booths || 'Gained'}: <strong>{s.gained || 0}</strong></span>
                  </button>

                  <button 
                    className="tactical-chip retained"
                    onClick={() => {
                      onSelectPartyTab(p);
                      onApplyQuickFilter('WON_BOTH');
                    }}
                    title="Click to view strongholds retained in both elections"
                  >
                    <ShieldCheck size={13} />
                    <span>{t?.label_retained_booths || 'Strongholds'}: <strong>{s.won_both || 0}</strong></span>
                  </button>
                </div>

                <div className="chip-row">
                  <button 
                    className="tactical-chip lost"
                    onClick={() => {
                      onSelectPartyTab(p);
                      onApplyQuickFilter('LOST_24');
                    }}
                    title="Click to view booths lost in 2024"
                  >
                    <ArrowDownRight size={13} />
                    <span>{t?.label_lost_booths || 'Lost'}: <strong>{s.lost_24 || 0}</strong></span>
                  </button>

                  <button 
                    className="tactical-chip weak"
                    onClick={() => {
                      onSelectPartyTab(p);
                      onApplyQuickFilter('WEAK');
                    }}
                    title="Click to view booths with < 20% vote share"
                  >
                    <AlertTriangle size={13} />
                    <span>{t?.label_weak_booths || 'Weak'}: <strong>{s.weak || 0}</strong></span>
                  </button>
                </div>
              </div>

              {/* Top Booth Banner */}
              {s.top_booth && s.top_booth.votes > 0 && (
                <div className="top-booth-strip">
                  <Flame size={14} className="flame-icon" />
                  <div className="top-booth-info">
                    <span className="tb-label">{t?.label_top_booth || 'Top Booth'}:</span>
                    <span className="tb-name">
                      Booth #{s.top_booth.no} ({s.top_booth.name}) — <strong>{s.top_booth.votes} votes ({s.top_booth.pct}%)</strong>
                    </span>
                  </div>
                </div>
              )}

              {/* Card Footer Action */}
              <div className="intel-card-footer">
                <button 
                  className="btn-deep-dive"
                  onClick={() => onSelectPartyTab(p)}
                >
                  <span>{isPa ? `${p} ਦੇ ਸਾਰੇ ਬੂਥ ਦੇਖੋ` : `View All ${p} Booths`}</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
