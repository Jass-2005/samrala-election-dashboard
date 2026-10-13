import React, { useState } from 'react';
import { LayoutGrid, List, ArrowUpRight, ArrowDownRight, Minus, ChevronRight, Printer } from 'lucide-react';
import { t } from '../utils/translations';

export default function BoothGrid({ 
  booths, 
  selectedParty, 
  onSelectBooth,
  onExportBoothPdf,
  partyFilter,
  language
}) {
  const [viewMode, setViewMode] = useState('LIST'); // 'LIST' or 'GRID'

  const isAllMode = selectedParty === 'ALL';
  const pKey = selectedParty.toLowerCase(); // 'aap', 'inc', 'sad', 'bjp'

  const renderBoothBadge = (b) => {
    const isRearranged = b.is_rearranged || (b.booth_no_2022 && b.booth_no_2024 && b.booth_no_2022 !== b.booth_no_2024);
    if (isRearranged) {
      return (
        <div className="dual-booth-badge rearranged" title={`2022 Booth #${b.booth_no_2022} rearranged to 2024 Booth #${b.booth_no_2024}`}>
          <span className="booth-tag-22">’22 #{b.booth_no_2022}</span>
          <span className="booth-tag-sep">➔</span>
          <span className="booth-tag-24">’24 #{b.booth_no_2024}</span>
        </div>
      );
    }
    return (
      <div className="dual-booth-badge matched" title={`Booth #${b.booth_no} (Identical in 2022 & 2024)`}>
        <span className="card-booth-badge">#{b.booth_no}</span>
        <span className="booth-match-tag">’22 & ’24</span>
      </div>
    );
  };

  const renderTableBoothBadge = (b) => {
    const isRearranged = b.is_rearranged || (b.booth_no_2022 && b.booth_no_2024 && b.booth_no_2022 !== b.booth_no_2024);
    if (isRearranged) {
      return (
        <div className="dual-booth-badge-table rearranged" title={`2022 Booth #${b.booth_no_2022} ➔ 2024 Booth #${b.booth_no_2024}`}>
          <span className="badge-22">’22 #{b.booth_no_2022}</span>
          <span className="badge-arrow">➔</span>
          <span className="badge-24">’24 #{b.booth_no_2024}</span>
        </div>
      );
    }
    return (
      <div className="booth-avatar-badge-wrap" title={`Booth #${b.booth_no} (2022 & 2024 matched)`}>
        <span className="booth-avatar-badge">{b.booth_no}</span>
        <span className="booth-match-sub">22 & 24</span>
      </div>
    );
  };

  if (booths.length === 0) {
    return (
      <div className="empty-state">
        <p style={{ fontSize: '1rem', fontWeight: 600 }}>
          {language === 'pa' ? 'ਚੁਣੇ ਗਏ ਫਿਲਟਰ ਅਨੁਸਾਰ ਕੋਈ ਬੂਥ ਨਹੀਂ ਮਿਲਿਆ।' : 'No booths match the selected criteria.'}
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          {language === 'pa' ? 'ਕਿਰਪਾ ਕਰਕੇ ਖੋਜ ਜਾਂ ਫਿਲਟਰ ਬਦਲੋ।' : 'Try clearing the search query or category filter.'}
        </p>
      </div>
    );
  }

  return (
    <div className="booth-container">
      {/* List Header Bar */}
      <div className="booth-list-header">
        <div className="list-title-wrap">
          <span className="list-count-badge">
            {booths.length} {language === 'pa' ? 'ਬੂਥ' : 'Booths'}
          </span>
          <span className="list-filter-label">
            {isAllMode && (
              partyFilter === 'ALL' ? (language === 'pa' ? 'ਸਾਰੇ ਬੂਥਾਂ ਦੀ ਮੁਕੰਮਲ ਸੂਚੀ' : `Complete Master List (${booths.length} Booths)`) :
              partyFilter === 'INC_WINS' ? (language === 'pa' ? '2024 ਵਿੱਚ ਕਾਂਗਰਸ ਦੁਆਰਾ ਜਿੱਤੇ ਬੂਥ' : 'Booths Won by INC in 2024') :
              partyFilter === 'AAP_WINS' ? (language === 'pa' ? '2024 ਵਿੱਚ ਆਪ ਦੁਆਰਾ ਜਿੱਤੇ ਬੂਥ' : 'Booths Won by AAP in 2024') :
              partyFilter === 'BJP_WINS' ? (language === 'pa' ? '2024 ਵਿੱਚ ਭਾਜਪਾ ਦੁਆਰਾ ਜਿੱਤੇ ਬੂਥ' : 'Booths Won by BJP in 2024') :
              partyFilter === 'SAD_WINS' ? (language === 'pa' ? '2024 ਵਿੱਚ ਅਕਾਲੀ ਦਲ ਦੁਆਰਾ ਜਿੱਤੇ ਬੂਥ' : 'Booths Won by SAD in 2024') : 
              partyFilter === 'FLIPPED' ? (language === 'pa' ? 'ਬਦਲੇ ਹੋਏ ਬੂਥ (Flipped Booths)' : 'Flipped Booths') : 'Booths'
            )}
            {!isAllMode && (
              partyFilter === 'ALL' ? (language === 'pa' ? `${selectedParty} ਦੇ ਸਾਰੇ ਬੂਥ` : `All Booths for ${selectedParty}`) :
              partyFilter === 'WON_BOTH' ? (language === 'pa' ? `${selectedParty} ਗੜ੍ਹ (ਦੋਵੇਂ 2022 ਅਤੇ 2024 ਜਿੱਤੇ)` : `${selectedParty} Strongholds (Won Both 2022 & 2024)`) :
              partyFilter === 'GAINED' ? (language === 'pa' ? `${selectedParty} ਲਾਭ (2024 ਜਿੱਤਿਆ, 2022 ਹਾਰਿਆ)` : `${selectedParty} Gains (Won in 2024, Lost in 2022)`) :
              partyFilter === 'LOST_24' ? (language === 'pa' ? `${selectedParty} ਨੁਕਸਾਨ (2022 ਜਿੱਤਿਆ, 2024 ਹਾਰਿਆ)` : `${selectedParty} Losses (Won in 2022, Lost in 2024)`) :
              partyFilter === 'WEAK' ? (language === 'pa' ? `${selectedParty} ਲਈ ਕਮਜ਼ੋਰ ਬੂਥ (< 20% ਵੋਟਾਂ)` : `Weak Booths for ${selectedParty} (< 20% Vote Share)`) :
              partyFilter === 'LOST_BOTH' ? (language === 'pa' ? `${selectedParty} ਦੁਆਰਾ ਦੋਵੇਂ ਵਾਰ ਹਾਰੇ ਬੂਥ` : `Booths Lost Both Times by ${selectedParty}`) : 'Booths'
            )}
          </span>
        </div>

        <div className="view-toggle-btns">
          <button 
            className={`toggle-btn ${viewMode === 'LIST' ? 'active' : ''}`}
            onClick={() => setViewMode('LIST')}
            title="List View"
            aria-label="List View"
          >
            <List size={16} />
            <span>{t('list_view', language)}</span>
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'GRID' ? 'active' : ''}`}
            onClick={() => setViewMode('GRID')}
            title="Grid Cards View"
            aria-label="Grid Cards View"
          >
            <LayoutGrid size={16} />
            <span>{t('grid_view', language)}</span>
          </button>
        </div>
      </div>

      {/* View Mode: Table List */}
      {viewMode === 'LIST' ? (
        <div className="clean-table-wrap">
          <table className="clean-table">
            <thead>
              {isAllMode ? (
                /* Complete List Headers */
                <tr>
                  <th style={{ width: '65px', textAlign: 'center' }}>{t('col_no', language)}</th>
                  <th>{t('col_village', language)}</th>
                  <th>{t('col_winner_22', language)}</th>
                  <th>{t('col_winner_24', language)}</th>
                  <th>{t('col_shift_status', language)}</th>
                  <th style={{ textAlign: 'right' }}>{t('col_turnout_24', language)}</th>
                  <th style={{ textAlign: 'right' }}>{t('col_turnout_shift', language)}</th>
                  <th style={{ width: '84px', textAlign: 'center' }}>{t('col_action', language)}</th>
                </tr>
              ) : (
                /* Party-Specific Headers */
                <tr>
                  <th style={{ width: '65px', textAlign: 'center' }}>{t('col_no', language)}</th>
                  <th>{t('col_village', language)}</th>
                  <th style={{ textAlign: 'right' }}>2022 ({selectedParty})</th>
                  <th style={{ textAlign: 'right' }}>2024 ({selectedParty})</th>
                  <th style={{ textAlign: 'right' }}>{language === 'pa' ? 'ਫ਼ਰਕ' : 'Shift'}</th>
                  <th>{t('col_winner_22', language)}</th>
                  <th>{t('col_winner_24', language)}</th>
                  <th>{t('col_category', language)}</th>
                  <th style={{ width: '84px', textAlign: 'center' }}>{t('col_action', language)}</th>
                </tr>
              )}
            </thead>
            <tbody>
              {booths.map((b) => {
                const w22 = b.data_2022.winner_party;
                const w24 = b.data_2024.winner_party;
                const diff = b.comparison.turnout_diff;
                const pct = b.comparison.turnout_pct;

                if (isAllMode) {
                  return (
                    <tr 
                      key={b.booth_no}
                      onClick={() => onSelectBooth(b)}
                      title={`Click to inspect Booth #${b.booth_no}`}
                    >
                      <td style={{ textAlign: 'center' }}>
                        {renderTableBoothBadge(b)}
                      </td>

                      <td>
                        {language === 'pa' ? (
                          <>
                            <div className="village-pa punjabi-font" style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                              {b.village_punjabi || b.exact_name_punjabi}
                            </div>
                            <div className="village-en" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {b.village_english}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="village-en">{b.village_english}</div>
                            <div className="village-pa punjabi-font">{b.village_punjabi || b.exact_name_punjabi}</div>
                          </>
                        )}
                      </td>

                      <td>
                        <span className={`mini-winner ${w22}`}>{w22}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                          +{b.data_2022.margin}
                        </span>
                      </td>

                      <td>
                        <span className={`mini-winner ${w24}`}>{w24}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                          +{b.data_2024.margin}
                        </span>
                      </td>

                      <td>
                        <span className={`cat-pill ${b.comparison.is_flip ? 'lost' : 'won'}`}>
                          {b.comparison.status_label}
                        </span>
                      </td>

                      <td style={{ textAlign: 'right', fontWeight: 600 }}>
                        {b.data_2024.total.toLocaleString()}
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <span className={`diff-pill ${diff >= 0 ? 'gain' : 'loss'}`}>
                          {diff >= 0 ? `+${diff}` : diff} ({pct}%)
                        </span>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <button
                            className="btn-table-pdf"
                            title={`Export Booth #${b.booth_no} as PDF`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onExportBoothPdf(b);
                            }}
                          >
                            <Printer size={12} />
                            <span>PDF</span>
                          </button>
                          <button
                            className="btn-table-view"
                            title={`Inspect Booth #${b.booth_no}`}
                            onClick={() => onSelectBooth(b)}
                          >
                            <span>{t('inspect', language)}</span>
                            <ChevronRight size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                // Party-Specific Row
                const v22 = b.data_2022[pKey] || 0;
                const pct22 = b.data_2022[`${pKey}_pct`] || 0;
                const v24 = b.data_2024[pKey] || 0;
                const pct24 = b.data_2024[`${pKey}_pct`] || 0;
                const partyDiff = v24 - v22;
                const swing = (pct24 - pct22).toFixed(1);

                let catLabel = language === 'pa' ? 'ਦੋਵੇਂ ਹਾਰੇ' : 'Lost Both';
                let catClass = 'neutral';
                if (w22 === selectedParty && w24 === selectedParty) {
                  catLabel = language === 'pa' ? 'ਦੋਵੇਂ ਜਿੱਤੇ' : 'Won Both';
                  catClass = 'won';
                } else if (w22 !== selectedParty && w24 === selectedParty) {
                  catLabel = language === 'pa' ? '2024 ’ਚ ਜਿੱਤਿਆ' : 'Gained in ’24';
                  catClass = 'gained';
                } else if (w22 === selectedParty && w24 !== selectedParty) {
                  catLabel = language === 'pa' ? `${w24} ਤੋਂ ਹਾਰਿਆ` : `Lost to ${w24}`;
                  catClass = 'lost';
                }

                if (pct24 < 20.0 && b.data_2024.total > 0) {
                  catLabel = language === 'pa' ? 'ਕਮਜ਼ੋਰ (<20%)' : 'Weak (<20%)';
                  catClass = 'weak';
                }

                return (
                  <tr 
                    key={b.booth_no}
                    onClick={() => onSelectBooth(b)}
                    title={`Click to inspect Booth #${b.booth_no}`}
                  >
                    <td style={{ textAlign: 'center' }}>
                      {renderTableBoothBadge(b)}
                    </td>

                    <td>
                      {language === 'pa' ? (
                        <>
                          <div className="village-pa punjabi-font" style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                            {b.village_punjabi || b.exact_name_punjabi}
                          </div>
                          <div className="village-en" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {b.village_english}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="village-en">{b.village_english}</div>
                          <div className="village-pa punjabi-font">{b.village_punjabi || b.exact_name_punjabi}</div>
                        </>
                      )}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <strong>{v22}</strong>
                      <span className="pct-sub">({pct22}%)</span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <strong>{v24}</strong>
                      <span className="pct-sub">({pct24}%)</span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <span className={`diff-pill ${partyDiff >= 0 ? 'gain' : 'loss'}`}>
                        {partyDiff >= 0 ? `+${partyDiff}` : partyDiff}
                      </span>
                      <span className="pct-sub" style={{ display: 'block', fontSize: '0.6875rem' }}>
                        {swing >= 0 ? `+${swing}%` : `${swing}%`}
                      </span>
                    </td>

                    <td>
                      <span className={`mini-winner ${w22}`}>{w22}</span>
                    </td>

                    <td>
                      <span className={`mini-winner ${w24}`}>{w24}</span>
                    </td>

                    <td>
                      <span className={`cat-pill ${catClass}`}>{catLabel}</span>
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <button
                          className="btn-table-pdf"
                          title={`Export Booth #${b.booth_no} as PDF`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onExportBoothPdf(b);
                          }}
                        >
                          <Printer size={12} />
                          <span>PDF</span>
                        </button>
                        <button
                          className="btn-table-view"
                          title={`Inspect Booth #${b.booth_no}`}
                          onClick={() => onSelectBooth(b)}
                        >
                          <span>{t('inspect', language)}</span>
                          <ChevronRight size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* View Mode: Card Grid */
        <div className="grid-cards-layout">
          {booths.map((b) => {
            const w22 = b.data_2022.winner_party;
            const w24 = b.data_2024.winner_party;
            const diff = b.comparison.turnout_diff;

            if (isAllMode) {
              return (
                <div 
                  key={b.booth_no} 
                  className="booth-card"
                  onClick={() => onSelectBooth(b)}
                >
                  <div className="card-top-row">
                    {renderBoothBadge(b)}
                    <span className={`cat-pill ${b.comparison.is_flip ? 'lost' : 'won'}`}>
                      {b.comparison.status_label}
                    </span>
                  </div>

                  {language === 'pa' ? (
                    <>
                      <div className="card-village-punjabi punjabi-font" style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                        {b.village_punjabi || b.exact_name_punjabi}
                      </div>
                      <div className="card-village-name" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {b.village_english}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="card-village-name">{b.village_english}</div>
                      <div className="card-village-punjabi punjabi-font">{b.village_punjabi || b.exact_name_punjabi}</div>
                    </>
                  )}

                  <div className="card-stats-box">
                    <div className="card-stat-col">
                      <span className="card-stat-label">{t('col_winner_22', language)}</span>
                      <span className={`mini-winner ${w22}`} style={{ marginTop: '3px' }}>
                        {w22} (+{b.data_2022.margin})
                      </span>
                      <span className="pct-sub" style={{ margin: '4px 0 0 0' }}>{b.data_2022.total} polled</span>
                    </div>

                    <div className="card-stat-col">
                      <span className="card-stat-label">{t('col_winner_24', language)}</span>
                      <span className={`mini-winner ${w24}`} style={{ marginTop: '3px' }}>
                        {w24} (+{b.data_2024.margin})
                      </span>
                      <span className="pct-sub" style={{ margin: '4px 0 0 0' }}>{b.data_2024.total} polled</span>
                    </div>
                  </div>

                  <div className="card-footer-row">
                    <div>
                      <span className="footer-label">{language === 'pa' ? 'ਵੋਟਿੰਗ ਫ਼ਰਕ: ' : 'Turnout: '}</span>
                      <span className={`diff-pill ${diff >= 0 ? 'gain' : 'loss'}`}>
                        {diff >= 0 ? `+${diff}` : diff}
                      </span>
                    </div>
                    <button
                      className="btn-card-pdf"
                      title={`Export Booth #${b.booth_no} as PDF`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onExportBoothPdf(b);
                      }}
                    >
                      <Printer size={12} />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              );
            }

            // Party-Specific Card
            const v22 = b.data_2022[pKey] || 0;
            const pct22 = b.data_2022[`${pKey}_pct`] || 0;
            const v24 = b.data_2024[pKey] || 0;
            const pct24 = b.data_2024[`${pKey}_pct`] || 0;
            const partyDiff = v24 - v22;

            let catLabel = language === 'pa' ? 'ਦੋਵੇਂ ਹਾਰੇ' : 'Lost Both';
            let catClass = 'neutral';
            if (w22 === selectedParty && w24 === selectedParty) {
              catLabel = language === 'pa' ? 'ਦੋਵੇਂ ਜਿੱਤੇ' : 'Won Both';
              catClass = 'won';
            } else if (w22 !== selectedParty && w24 === selectedParty) {
              catLabel = language === 'pa' ? '2024 ’ਚ ਜਿੱਤਿਆ' : 'Gained in ’24';
              catClass = 'gained';
            } else if (w22 === selectedParty && w24 !== selectedParty) {
              catLabel = language === 'pa' ? `${w24} ਤੋਂ ਹਾਰਿਆ` : `Lost to ${w24}`;
              catClass = 'lost';
            }

            if (pct24 < 20.0 && b.data_2024.total > 0) {
              catLabel = language === 'pa' ? 'ਕਮਜ਼ੋਰ (<20%)' : 'Weak (<20%)';
              catClass = 'weak';
            }

            return (
              <div 
                key={b.booth_no} 
                className="booth-card"
                onClick={() => onSelectBooth(b)}
              >
                <div className="card-top-row">
                  {renderBoothBadge(b)}
                  <span className={`cat-pill ${catClass}`}>{catLabel}</span>
                </div>

                {language === 'pa' ? (
                  <>
                    <div className="card-village-punjabi punjabi-font" style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                      {b.village_punjabi || b.exact_name_punjabi}
                    </div>
                    <div className="card-village-name" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {b.village_english}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="card-village-name">{b.village_english}</div>
                    <div className="card-village-punjabi punjabi-font">{b.village_punjabi || b.exact_name_punjabi}</div>
                  </>
                )}

                <div className="card-stats-box">
                  <div className="card-stat-col">
                    <span className="card-stat-label">2022 Votes</span>
                    <strong>{v22}</strong> <span className="pct-sub">({pct22}%)</span>
                    <span className={`mini-winner ${w22}`} style={{ marginTop: '4px' }}>{w22} Won</span>
                  </div>

                  <div className="card-stat-col">
                    <span className="card-stat-label">2024 Votes</span>
                    <strong>{v24}</strong> <span className="pct-sub">({pct24}%)</span>
                    <span className={`mini-winner ${w24}`} style={{ marginTop: '4px' }}>{w24} Won</span>
                  </div>
                </div>

                <div className="card-footer-row">
                  <div>
                    <span className="footer-label">{language === 'pa' ? 'ਫ਼ਰਕ: ' : 'Shift: '}</span>
                    <span className={`diff-pill ${partyDiff >= 0 ? 'gain' : 'loss'}`}>
                      {partyDiff >= 0 ? `+${partyDiff}` : partyDiff}
                    </span>
                  </div>
                  <button
                    className="btn-card-pdf"
                    title={`Export Booth #${b.booth_no} as PDF`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onExportBoothPdf(b);
                    }}
                  >
                    <Printer size={12} />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
