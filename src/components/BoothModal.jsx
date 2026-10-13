import React from 'react';
import { 
  X, 
  MapPin, 
  Vote, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Compass,
  CheckCircle2,
  Printer
} from 'lucide-react';
import { formatStatus, formatCategory } from '../translations';

export default function BoothModal({ booth, onClose, language = 'en', t }) {
  if (!booth) return null;

  const isPa = language === 'pa';
  const villageName = isPa ? (booth.village_pa || booth.village_en) : (booth.village_en || booth.village_pa);
  const altName = isPa ? booth.village_en : booth.village_pa;

  const d24 = booth.data_2024 || {};
  const d22 = booth.data_2022 || {};
  const plan = booth.plan || {};

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container booth-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-badge-row">
              <span className="modal-booth-id">BOOTH #{booth.booth_no}</span>
              <span className="audit-pill-badge">
                <ShieldCheck size={13} className="inline-icon" />
                1-to-1 Unchanged in 2022 & 2024
              </span>
              <span className={`status-pill ${booth.is_flipped ? 'status-flip' : 'status-retained'}`}>
                {formatStatus(booth.status_label, language)}
              </span>
            </div>
            <h2 className="modal-main-title">{villageName}</h2>
            <div className="modal-sub-locality">
              <MapPin size={13} className="inline-icon" />
              <span>{altName} • 58-Samrala AC (Fatehgarh Sahib PC)</span>
            </div>
          </div>

          <div className="modal-header-actions">
            <button 
              className="btn-modal-print no-print" 
              onClick={handlePrint} 
              title="Print / Export Booth Dossier"
            >
              <Printer size={16} />
              <span>Print</span>
            </button>
            <button 
              className="btn-modal-close" 
              onClick={onClose} 
              aria-label="Close Modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body">
          {/* Section 1: KPI Comparison Row */}
          <div className="modal-kpi-grid">
            <div className="modal-kpi-card">
              <span className="m-kpi-lbl">{isPa ? '2024 ਕੁੱਲ ਪੋਲਿੰਗ' : '2024 Turnout'}</span>
              <div className="m-kpi-val">{booth.turnout_24?.toLocaleString()}</div>
              <span className={`m-kpi-sub ${booth.turnout_diff >= 0 ? 'text-up' : 'text-down'}`}>
                {booth.turnout_diff >= 0 ? '+' : ''}{booth.turnout_diff} ({booth.turnout_pct}%) vs 2022
              </span>
            </div>

            <div className="modal-kpi-card">
              <span className="m-kpi-lbl">{isPa ? '2024 ਜੇਤੂ ਅਤੇ ਲੀਡ' : '2024 Winner & Margin'}</span>
              <div className="m-kpi-val highlight">
                <span className={`party-pill ${booth.winner_24?.toLowerCase()}`}>{booth.winner_24}</span>
                <span className="m-lead-tag">+{booth.margin_24?.toLocaleString()}</span>
              </div>
              <span className="m-kpi-sub">
                {booth.winner_24 === 'INC' ? 'Dr. Amar Singh' : 
                 booth.winner_24 === 'AAP' ? 'Gurpreet Singh GP' : 
                 booth.winner_24 === 'SAD' ? 'Bikramjit Singh Khalsa' : 'Gejja Ram'}
              </span>
            </div>

            <div className="modal-kpi-card">
              <span className="m-kpi-lbl">{isPa ? '2022 ਜੇਤੂ ਅਤੇ ਲੀਡ' : '2022 Winner & Margin'}</span>
              <div className="m-kpi-val">
                <span className={`party-pill subtle ${booth.winner_22?.toLowerCase()}`}>{booth.winner_22}</span>
                <span className="m-lead-tag">+{booth.margin_22?.toLocaleString()}</span>
              </div>
              <span className="m-kpi-sub">
                {booth.winner_22 === 'AAP' ? 'Jagtar Singh Diyalpura' : 
                 booth.winner_22 === 'SAD' ? 'Paramjit Singh Dhillon' : 
                 booth.winner_22 === 'INC' ? 'Rupinder Singh Raja Gill' : 'Balbir Singh Rajewal'}
              </span>
            </div>

            <div className="modal-kpi-card">
              <span className="m-kpi-lbl">{isPa ? 'ਤਬਦੀਲੀ ਸਥਿਤੀ' : 'Shift Trajectory'}</span>
              <div className="m-kpi-val trajectory-text">
                {booth.is_flipped ? `${booth.winner_22} → ${booth.winner_24}` : `${booth.winner_24} Retained`}
              </div>
              <span className="m-kpi-sub">
                {booth.is_flipped ? (isPa ? 'ਸੀਟ ਪਾਰਟੀ ਤਬਦੀਲ' : 'Flipped to new party') : (isPa ? 'ਗੜ੍ਹ ਬਰਕਰਾਰ' : 'Defended successfully')}
              </span>
            </div>
          </div>

          {/* Section 2: Detailed Party Breakdown Comparison */}
          <div className="modal-section-card">
            <h3 className="section-card-title">
              <Vote size={16} />
              <span>{t?.modal_section_comparison || '2022 vs 2024 Vote Share Comparison'}</span>
            </h3>

            <div className="party-comparison-table-wrap">
              <table className="party-comparison-table">
                <thead>
                  <tr>
                    <th>Party</th>
                    <th>2022 Votes</th>
                    <th>2022 Share</th>
                    <th>2024 Votes</th>
                    <th>2024 Share</th>
                    <th>Net Swing</th>
                  </tr>
                </thead>
                <tbody>
                  {/* INC Row */}
                  <tr className={booth.winner_24 === 'INC' ? 'winner-row' : ''}>
                    <td>
                      <span className="party-pill inc">INC</span>
                      <span className="party-full-name">Indian National Congress</span>
                    </td>
                    <td>{booth.inc_22?.toLocaleString()}</td>
                    <td>{booth.inc_share_22}%</td>
                    <td><strong>{booth.inc_24?.toLocaleString()}</strong></td>
                    <td><strong>{booth.inc_share_24}%</strong></td>
                    <td className={booth.inc_swing >= 0 ? 'swing-positive' : 'swing-negative'}>
                      {booth.inc_swing >= 0 ? '+' : ''}{booth.inc_swing}%
                    </td>
                  </tr>

                  {/* AAP Row */}
                  <tr className={booth.winner_24 === 'AAP' ? 'winner-row' : ''}>
                    <td>
                      <span className="party-pill aap">AAP</span>
                      <span className="party-full-name">Aam Aadmi Party</span>
                    </td>
                    <td>{booth.aap_22?.toLocaleString()}</td>
                    <td>{booth.aap_share_22}%</td>
                    <td><strong>{booth.aap_24?.toLocaleString()}</strong></td>
                    <td><strong>{booth.aap_share_24}%</strong></td>
                    <td className={booth.aap_swing >= 0 ? 'swing-positive' : 'swing-negative'}>
                      {booth.aap_swing >= 0 ? '+' : ''}{booth.aap_swing}%
                    </td>
                  </tr>

                  {/* SAD Row */}
                  <tr className={booth.winner_24 === 'SAD' ? 'winner-row' : ''}>
                    <td>
                      <span className="party-pill sad">SAD</span>
                      <span className="party-full-name">Shiromani Akali Dal</span>
                    </td>
                    <td>{booth.sad_22?.toLocaleString()}</td>
                    <td>{booth.sad_share_22}%</td>
                    <td><strong>{booth.sad_24?.toLocaleString()}</strong></td>
                    <td><strong>{booth.sad_share_24}%</strong></td>
                    <td className={booth.sad_swing >= 0 ? 'swing-positive' : 'swing-negative'}>
                      {booth.sad_swing >= 0 ? '+' : ''}{booth.sad_swing}%
                    </td>
                  </tr>

                  {/* BJP Row */}
                  <tr className={booth.winner_24 === 'BJP' ? 'winner-row' : ''}>
                    <td>
                      <span className="party-pill bjp">BJP</span>
                      <span className="party-full-name">Bharatiya Janata Party</span>
                    </td>
                    <td>{booth.bjp_22?.toLocaleString()}</td>
                    <td>{booth.bjp_share_22}%</td>
                    <td><strong>{booth.bjp_24?.toLocaleString()}</strong></td>
                    <td><strong>{booth.bjp_share_24}%</strong></td>
                    <td className={booth.bjp_swing >= 0 ? 'swing-positive' : 'swing-negative'}>
                      {booth.bjp_swing >= 0 ? '+' : ''}{booth.bjp_swing}%
                    </td>
                  </tr>

                  {/* SAD(A) */}
                  <tr>
                    <td>
                      <span className="party-pill other">SAD(A)</span>
                      <span className="party-full-name">SAD Amritsar</span>
                    </td>
                    <td>{d22.sada || 0}</td>
                    <td>-</td>
                    <td><strong>{booth.sada_24?.toLocaleString() || 0}</strong></td>
                    <td><strong>{booth.sada_share_24 || 0}%</strong></td>
                    <td>-</td>
                  </tr>

                  {/* NOTA */}
                  <tr>
                    <td>
                      <span className="party-pill other">NOTA</span>
                      <span className="party-full-name">None of the Above</span>
                    </td>
                    <td>{d22.nota || 0}</td>
                    <td>-</td>
                    <td><strong>{d24.nota || 0}</strong></td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: 90-Day Tactical Field Operations Plan */}
          <div className="modal-section-card masterplan-card">
            <div className="plan-card-header">
              <Compass size={18} className="plan-icon" />
              <div>
                <h3 className="section-card-title" style={{ margin: 0 }}>
                  {t?.modal_section_plan || '90-Day Tactical Field Operations Plan'}
                </h3>
                <span className="plan-zone-badge">
                  {isPa ? plan.zone_pa : plan.zone_en}
                </span>
              </div>
            </div>

            <div className="plan-strategic-directive">
              <h4 className="directive-title">{isPa ? 'ਰਣਨੀਤਕ ਹਦਾਇਤ' : 'Strategic Directive'}</h4>
              <p className="directive-text">
                {isPa ? plan.action_pa : plan.action_en}
              </p>
            </div>

            <div className="plan-steps-grid">
              {(isPa ? plan.steps_pa : plan.steps_en)?.map((step, idx) => (
                <div key={idx} className="plan-step-item">
                  <div className="step-phase-badge">
                    <Calendar size={12} />
                    <span>{idx === 0 ? 'Days 1-30' : idx === 1 ? 'Days 31-60' : 'Days 61-90'}</span>
                  </div>
                  <p className="step-content">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer no-print">
          <div className="footer-meta-info">
            <span>Constituency: 58-Samrala</span>
            <span>•</span>
            <span>Fatehgarh Sahib Parliamentary Segment</span>
            <span>•</span>
            <span>Data Verified via ECI Form-20</span>
          </div>
          <button className="btn-modal-close-action" onClick={onClose}>
            {t?.modal_close || 'Close Window'}
          </button>
        </div>
      </div>
    </div>
  );
}
