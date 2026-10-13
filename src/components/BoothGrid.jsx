import React, { useState } from 'react';
import { LayoutGrid, List, ArrowUpRight, ArrowDownRight, Minus, ChevronRight, ShieldCheck } from 'lucide-react';
import { formatStatus, formatCategory } from '../translations';

export default function BoothGrid({ 
  booths, 
  selectedParty, 
  onSelectBooth,
  partyFilter,
  searchQuery,
  onClearSearch,
  language = 'en',
  t
}) {
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'GRID';
    }
    return 'LIST';
  });

  const isAllMode = selectedParty === 'ALL';
  const pKey = selectedParty.toLowerCase(); // 'inc', 'aap', 'sad', 'bjp'
  const isPa = language === 'pa';

  if (booths.length === 0) {
    return (
      <div className="empty-state">
        <p style={{ fontSize: '1rem', fontWeight: 600 }}>
          {isPa 
            ? (searchQuery ? `"${searchQuery}" ਨਾਲ ਕੋਈ ਬੂਥ ਨਹੀਂ ਮਿਲਿਆ।` : 'ਕੋਈ ਬੂਥ ਮਾਪਦੰਡਾਂ ਨਾਲ ਮੇਲ ਨਹੀਂ ਖਾਂਦਾ।')
            : (searchQuery ? `No booths match "${searchQuery}".` : 'No booths match the selected criteria.')}
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          {t?.no_match_sub || 'Try searching for a different booth number (e.g. 1, 50, 104) or clear the filter.'}
        </p>
        {searchQuery && onClearSearch && (
          <button 
            className="btn-registry-reset"
            style={{ marginTop: '14px', display: 'inline-flex' }}
            onClick={onClearSearch}
          >
            {isPa ? 'ਖੋਜ ਸਾਫ਼ ਕਰੋ' : 'Clear Search'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="booth-container">
      {/* List Header Bar */}
      <div className="booth-list-header">
        <div className="list-title-wrap">
          <span className="list-count-badge">{booths.length} {t?.booths_count || 'Booths'}</span>
          <span className="list-filter-label">
            {isAllMode && (
              partyFilter === 'ALL' ? (isPa ? 'ਸੰਪੂਰਨ ਮਾਸਟਰ ਸੂਚੀ (ਕੁੱਲ 218 ਬੂਥ)' : 'Complete Master List (All 218 Booths)') :
              partyFilter === 'INC_WINS' ? (isPa ? '2024 ਵਿੱਚ ਕਾਂਗਰਸ ਵੱਲੋਂ ਜਿੱਤੇ ਬੂਥ (100 ਬੂਥ)' : 'Booths Won by INC in 2024 (100 Booths)') :
              partyFilter === 'AAP_WINS' ? (isPa ? '2024 ਵਿੱਚ ਆਪ ਵੱਲੋਂ ਜਿੱਤੇ ਬੂਥ (91 ਬੂਥ)' : 'Booths Won by AAP in 2024 (91 Booths)') :
              partyFilter === 'SAD_WINS' ? (isPa ? '2024 ਵਿੱਚ ਅਕਾਲੀ ਦਲ ਵੱਲੋਂ ਜਿੱਤੇ ਬੂਥ (19 ਬੂਥ)' : 'Booths Won by SAD in 2024 (19 Booths)') :
              partyFilter === 'BJP_WINS' ? (isPa ? '2024 ਵਿੱਚ ਭਾਜਪਾ ਵੱਲੋਂ ਜਿੱਤੇ ਬੂਥ (8 ਬੂਥ)' : 'Booths Won by BJP in 2024 (8 Booths)') :
              partyFilter === 'FLIPPED_ONLY' ? (isPa ? 'ਤਬਦੀਲ ਬੂਥ (104 ਬੂਥ - ਪਾਰਟੀ ਬਦਲੀ)' : 'Flipped Booths (104 Booths - Changed Party)') :
              partyFilter === 'RETAINED_ONLY' ? (isPa ? 'ਬਰਕਰਾਰ ਬੂਥ (114 ਬੂਥ - ਉਹੀ ਪਾਰਟੀ)' : 'Retained Booths (114 Booths - Same Party)') : (t?.booths_count || 'Booths')
            )}
            {!isAllMode && (
              partyFilter === 'ALL' ? (isPa ? `${selectedParty} ਲਈ ਸਾਰੇ 218 ਬੂਥ` : `All 218 Booths for ${selectedParty}`) :
              partyFilter === 'WON_BOTH' ? (isPa ? `${selectedParty} ਪੱਕੇ ਗੜ੍ਹ (2022 ਅਤੇ 2024 ਦੋਵੇਂ ਜਿੱਤੇ)` : `${selectedParty} Strongholds (Won Both 2022 & 2024)`) :
              partyFilter === 'GAINED' ? (isPa ? `${selectedParty} ਨਵੇਂ ਜਿੱਤੇ ਬੂਥ (2024 ਜਿੱਤ, 2022 ਹਾਰ)` : `${selectedParty} Gains (Won in 2024, Lost in 2022)`) :
              partyFilter === 'LOST_24' ? (isPa ? `${selectedParty} ਗਵਾਏ ਬੂਥ (2022 ਜਿੱਤ, 2024 ਹਾਰ)` : `${selectedParty} Losses (Won in 2022, Lost in 2024)`) :
              partyFilter === 'WEAK' ? (isPa ? `${selectedParty} ਕਮਜ਼ੋਰ ਬੂਥ (<20% ਵੋਟ ਹਿੱਸਾ)` : `Weak Booths for ${selectedParty} (< 20% Vote Share)`) :
              partyFilter === 'LOST_BOTH' ? (isPa ? `${selectedParty} ਦੋਵੇਂ ਵਾਰ ਹਾਰੇ ਬੂਥ` : `Booths Lost Both Times by ${selectedParty}`) : (t?.booths_count || 'Booths')
            )}
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="view-toggle-wrap">
          <button 
            className={`btn-view-toggle ${viewMode === 'LIST' ? 'active' : ''}`}
            onClick={() => setViewMode('LIST')}
            title="List / Table View"
            aria-label="Table View"
          >
            <List size={16} />
            <span className="toggle-lbl">Table</span>
          </button>
          <button 
            className={`btn-view-toggle ${viewMode === 'GRID' ? 'active' : ''}`}
            onClick={() => setViewMode('GRID')}
            title="Card Grid View"
            aria-label="Grid Cards View"
          >
            <LayoutGrid size={16} />
            <span className="toggle-lbl">Cards</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: TABLE VIEW */}
      {viewMode === 'LIST' && (
        <div className="table-wrapper">
          <table className="booth-data-table">
            <thead>
              <tr>
                <th style={{ width: '85px' }}>{t?.th_booth || 'Booth #'}</th>
                <th>{t?.th_village || 'Village / Polling Station'}</th>
                <th style={{ width: '130px' }}>{t?.th_turnout || 'Turnout (2024)'}</th>
                <th style={{ width: '150px' }}>{t?.th_lead_2024 || '2024 Winner & Margin'}</th>
                <th style={{ width: '120px' }}>{t?.th_lead_2022 || '2022 Winner'}</th>
                <th style={{ width: '140px' }}>{t?.th_status || 'Trajectory / Shift'}</th>
                {!isAllMode && (
                  <th style={{ width: '180px' }}>
                    {t?.th_party_perf ? t.th_party_perf.replace('{party}', selectedParty) : `${selectedParty} Votes & Share`}
                  </th>
                )}
                <th style={{ width: '100px', textAlign: 'center' }}>{t?.th_action || 'Action'}</th>
              </tr>
            </thead>
            <tbody>
              {booths.map((b) => {
                const w24 = b.winner_24;
                const w22 = b.winner_22;
                const m24 = b.margin_24;
                const isFlip = b.is_flipped;

                // Party specific stats
                const partyVotes24 = b[`${pKey}_24`] ?? b.data_2024?.[pKey] ?? 0;
                const partyShare24 = b[`${pKey}_share_24`] ?? b.data_2024?.[`${pKey}_pct`] ?? 0;
                const partySwing = b[`${pKey}_swing`] ?? 0;

                const villageName = isPa ? (b.village_pa || b.village_en) : (b.village_en || b.village_pa);

                return (
                  <tr 
                    key={b.booth_no} 
                    className={`table-row ${isFlip ? 'row-flipped' : 'row-retained'}`}
                    onClick={() => onSelectBooth(b)}
                  >
                    {/* Booth Number with verified tag */}
                    <td className="cell-booth-no">
                      <div className="booth-badge-cell">
                        <span className="booth-num">#{b.booth_no}</span>
                        <span className="audit-sub-tag">1-to-1</span>
                      </div>
                    </td>

                    {/* Village / Polling Station */}
                    <td className="cell-village">
                      <div className="village-name-primary">{villageName}</div>
                      <div className="village-name-sub">
                        {isPa ? b.village_en : b.village_pa}
                      </div>
                    </td>

                    {/* Turnout 2024 */}
                    <td className="cell-turnout">
                      <div className="turnout-val">{b.turnout_24?.toLocaleString()}</div>
                      <div className={`turnout-sub ${b.turnout_diff >= 0 ? 'text-up' : 'text-down'}`}>
                        {b.turnout_diff >= 0 ? '+' : ''}{b.turnout_diff} ({b.turnout_pct}%)
                      </div>
                    </td>

                    {/* 2024 Winner */}
                    <td className="cell-winner-24">
                      <div className="winner-cell-wrap">
                        <span className={`party-pill ${w24.toLowerCase()}`}>{w24}</span>
                        <span className="lead-margin">+{m24?.toLocaleString()}</span>
                      </div>
                    </td>

                    {/* 2022 Winner */}
                    <td className="cell-winner-22">
                      <span className={`party-pill subtle ${w22.toLowerCase()}`}>{w22}</span>
                    </td>

                    {/* Trajectory */}
                    <td className="cell-status">
                      <span className={`status-pill ${isFlip ? 'status-flip' : 'status-retained'}`}>
                        {formatStatus(b.status_label, language)}
                      </span>
                    </td>

                    {/* Single Party Performance */}
                    {!isAllMode && (
                      <td className="cell-party-perf">
                        <div className="party-perf-wrap">
                          <span className="party-votes-strong">{partyVotes24} ({partyShare24}%)</span>
                          <span className={`swing-tag ${partySwing >= 0 ? 'swing-positive' : 'swing-negative'}`}>
                            {partySwing >= 0 ? '+' : ''}{partySwing}%
                          </span>
                        </div>
                        <div className="party-cat-sub">
                          {formatCategory(b.categories?.[selectedParty], language)}
                        </div>
                      </td>
                    )}

                    {/* Action Button */}
                    <td className="cell-action" style={{ textAlign: 'center' }}>
                      <button 
                        className="btn-table-inspect"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBooth(b);
                        }}
                      >
                        {t?.btn_inspect || 'Inspect'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW 2: GRID CARDS VIEW */}
      {viewMode === 'GRID' && (
        <div className="booth-card-grid">
          {booths.map((b) => {
            const w24 = b.winner_24;
            const w22 = b.winner_22;
            const m24 = b.margin_24;
            const isFlip = b.is_flipped;

            const partyVotes24 = b[`${pKey}_24`] ?? b.data_2024?.[pKey] ?? 0;
            const partyShare24 = b[`${pKey}_share_24`] ?? b.data_2024?.[`${pKey}_pct`] ?? 0;
            const partySwing = b[`${pKey}_swing`] ?? 0;

            const villageName = isPa ? (b.village_pa || b.village_en) : (b.village_en || b.village_pa);

            return (
              <div 
                key={b.booth_no} 
                className={`booth-card ${isFlip ? 'card-flip' : 'card-retained'}`}
                onClick={() => onSelectBooth(b)}
              >
                {/* Card Top */}
                <div className="booth-card-header">
                  <div className="card-booth-id">
                    <span className="booth-card-num">#{b.booth_no}</span>
                    <span className="booth-card-audit-pill">
                      <ShieldCheck size={11} className="inline-icon" />
                      1-to-1
                    </span>
                  </div>
                  <span className={`status-pill mini ${isFlip ? 'status-flip' : 'status-retained'}`}>
                    {formatStatus(b.status_label, language)}
                  </span>
                </div>

                {/* Village Info */}
                <div className="booth-card-body">
                  <h4 className="booth-card-village">{villageName}</h4>
                  <div className="booth-card-village-alt">
                    {isPa ? b.village_en : b.village_pa}
                  </div>

                  {/* 2024 Outcome Strip */}
                  <div className="card-outcome-strip">
                    <div className="outcome-block">
                      <span className="outcome-label">2024 {isPa ? 'ਜੇਤੂ' : 'Winner'}</span>
                      <div className="outcome-val-wrap">
                        <span className={`party-pill ${w24.toLowerCase()}`}>{w24}</span>
                        <span className="lead-tag">+{m24}</span>
                      </div>
                    </div>

                    <div className="outcome-block right">
                      <span className="outcome-label">2022 {isPa ? 'ਜੇਤੂ' : 'Winner'}</span>
                      <span className={`party-pill subtle ${w22.toLowerCase()}`}>{w22}</span>
                    </div>
                  </div>

                  {/* Single party specific block */}
                  {!isAllMode && (
                    <div className="card-party-highlight">
                      <div className="highlight-row">
                        <span className="hl-label">{selectedParty} {isPa ? 'ਵੋਟਾਂ' : 'Votes'}:</span>
                        <span className="hl-val">{partyVotes24} ({partyShare24}%)</span>
                      </div>
                      <div className="highlight-row">
                        <span className="hl-label">{selectedParty} Swing:</span>
                        <span className={`swing-tag ${partySwing >= 0 ? 'swing-positive' : 'swing-negative'}`}>
                          {partySwing >= 0 ? '+' : ''}{partySwing}%
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Mini Vote Bar for Card */}
                  <div className="card-vote-bar">
                    <div 
                      className="bar-seg inc" 
                      style={{ width: `${b.inc_share_24 || 0}%` }} 
                      title={`INC: ${b.inc_share_24}%`}
                    />
                    <div 
                      className="bar-seg aap" 
                      style={{ width: `${b.aap_share_24 || 0}%` }} 
                      title={`AAP: ${b.aap_share_24}%`}
                    />
                    <div 
                      className="bar-seg sad" 
                      style={{ width: `${b.sad_share_24 || 0}%` }} 
                      title={`SAD: ${b.sad_share_24}%`}
                    />
                    <div 
                      className="bar-seg bjp" 
                      style={{ width: `${b.bjp_share_24 || 0}%` }} 
                      title={`BJP: ${b.bjp_share_24}%`}
                    />
                  </div>

                  {/* Card Footer Turnout */}
                  <div className="booth-card-footer">
                    <span className="card-turnout-text">
                      {isPa ? 'ਕੁੱਲ ਵੋਟਿੰਗ:' : 'Turnout:'} <strong>{b.turnout_24?.toLocaleString()}</strong>
                    </span>
                    <span className="card-open-link">
                      {isPa ? 'ਵੇਰਵਾ' : 'Audit'}
                      <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
