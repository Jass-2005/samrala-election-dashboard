import React from 'react';
import { Compass, Activity, BarChart3, CheckCircle2 } from 'lucide-react';
import { CONSTITUENCIES } from '../data/constituencies';
import { t } from '../utils/translations';

export default function KPIBanner({ summary, constituencyId, language }) {
  const currentConst = CONSTITUENCIES[constituencyId] || CONSTITUENCIES.SAMRALA;

  const totalBooths = currentConst.total_booths || summary?.total_booths || 218;
  const tot24 = (summary?.total_votes_2024 || summary?.votes_2024?.total || 109284).toLocaleString();
  const tot22 = (summary?.total_votes_2022 || summary?.votes_2022?.total || 132736);
  const diffTot = (summary?.total_votes_2024 || 109284) - tot22;
  const diffPct = ((diffTot / tot22) * 100).toFixed(1);
  const turnoutShift = `${diffPct}%`;
  const turnoutPct = '64.5%';

  // INC Stats
  const v24Inc = summary?.votes_2024?.inc || summary?.party_votes_2024?.INC || 37641;
  const incVotes = v24Inc.toLocaleString();
  const incWins = summary?.booths_won_2024?.INC || 100;
  const incShare = `${summary?.votes_2024?.inc_pct || summary?.party_shares_2024?.INC || 34.4}%`;
  const v24Aap = summary?.votes_2024?.aap || summary?.party_votes_2024?.AAP || 35316;
  const incLead = `+${(v24Inc - v24Aap).toLocaleString()}`;

  // AAP Stats
  const aapCandidate = language === 'pa' ? 'ਆਪ (ਗੁਰਪ੍ਰੀਤ ਜੀਪੀ)' : 'AAP (GURPREET GP)';
  const aapVotes = v24Aap.toLocaleString();
  const aapWins = summary?.booths_won_2024?.AAP || 91;
  const aapShare = `${summary?.votes_2024?.aap_pct || summary?.party_shares_2024?.AAP || 32.3}%`;
  const aapGains = `${summary?.booths_won_2024?.AAP || 91}`;

  return (
    <section className="dsidein-kpi-grid" aria-label="Election Highlights and Summary Metrics">
      {/* KPI 1: Live Telemetry & Polling Stations */}
      <div className="dsidein-kpi-card">
        <div className="kpi-top-row">
          <div className="kpi-icon-pill icon-blue">
            <Compass size={18} />
          </div>
        </div>
        <div className="kpi-label">
          {language === 'pa' ? 'ਕੁੱਲ ਪੋਲਿੰਗ ਸਟੇਸ਼ਨ' : 'POLLING STATIONS'}
        </div>
        <div className="kpi-value text-blue">
          {totalBooths} {language === 'pa' ? 'ਬੂਥ' : 'Booths'}
        </div>
        <div className="kpi-sub-pill text-blue">
          ● {language === 'pa' ? '100% ਪ੍ਰਮਾਣਿਤ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਿਤ' : '100% Monitored & Verified'}
        </div>
      </div>

      {/* KPI 2: Total 2024 Turnout */}
      <div className="dsidein-kpi-card">
        <div className="kpi-top-row">
          <div className="kpi-icon-pill icon-orange">
            <Activity size={18} />
          </div>
        </div>
        <div className="kpi-label">
          {language === 'pa' ? '2024 ਕੁੱਲ ਵੈਧ ਵੋਟਾਂ' : '2024 VALID VOTES'}
        </div>
        <div className="kpi-value">{tot24}</div>
        <div className="kpi-sub-pill text-orange">
          ● {turnoutPct} {language === 'pa' ? 'ਪੋਲਿੰਗ' : 'Valid Polled'} ({turnoutShift} {language === 'pa' ? 'ਬਨਾਮ ’22' : 'vs ’22'})
        </div>
      </div>

      {/* KPI 3: Congress (INC) */}
      <div className="dsidein-kpi-card inc-kpi">
        <div className="kpi-top-row">
          <div className="kpi-icon-pill icon-orange">
            <BarChart3 size={18} />
          </div>
        </div>
        <div className="kpi-label">
          {language === 'pa' ? 'ਕਾਂਗਰਸ (INC)' : 'CONGRESS (INC)'}
        </div>
        <div className="kpi-value text-orange">{incVotes}</div>
        <div className="kpi-sub-pill text-orange">
          ● {incWins} {language === 'pa' ? 'ਜਿੱਤਾਂ' : 'Wins'} ({incShare} | {incLead} {language === 'pa' ? 'ਲੀਡ' : 'Lead'})
        </div>
      </div>

      {/* KPI 4: AAP */}
      <div className="dsidein-kpi-card aap-kpi">
        <div className="kpi-top-row">
          <div className="kpi-icon-pill icon-blue">
            <CheckCircle2 size={18} />
          </div>
        </div>
        <div className="kpi-label">{aapCandidate}</div>
        <div className="kpi-value text-blue">{aapVotes}</div>
        <div className="kpi-sub-pill text-blue">
          ● {aapWins} {language === 'pa' ? 'ਜਿੱਤਾਂ' : 'Wins'} ({aapShare} | {aapGains} {language === 'pa' ? 'ਲਾਭ' : 'Gains'})
        </div>
      </div>
    </section>
  );
}
