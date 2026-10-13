import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';
import { CONSTITUENCIES } from '../data/constituencies';
import { t } from '../utils/translations';

export default function ConstituencyDropdown({ constituencyId, setConstituencyId, language }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentConst = CONSTITUENCIES[constituencyId] || CONSTITUENCIES.SAMRALA;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const constList = [
    CONSTITUENCIES.SAMRALA
  ].filter(Boolean);

  return (
    <div className="constituency-dropdown-wrap" ref={dropdownRef}>
      <button
        type="button"
        className={`constituency-dropdown-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title={t('select_constituency', language)}
      >
        <span className="constituency-pin-pill">
          <MapPin size={13} />
        </span>
        <span className="constituency-name-label">
          {language === 'pa' ? currentConst.name_pa : currentConst.name_en}
        </span>
        <span className="constituency-booth-pill">
          {currentConst.total_booths} {language === 'pa' ? 'ਬੂਥ' : 'Booths'}
        </span>
        <ChevronDown size={14} className={`constituency-chevron ${isOpen ? 'rotate' : ''}`} />
      </button>

      {isOpen && (
        <div className="constituency-dropdown-menu" role="listbox">
          <div className="constituency-menu-header">
            {language === 'pa' ? 'ਵਿਧਾਨ ਸਭਾ ਹਲਕਾ ਚੁਣੋ' : 'SELECT ASSEMBLY SEGMENT'}
          </div>
          {constList.map((c) => {
            const isSelected = c.id === constituencyId;
            return (
              <div
                key={c.id}
                className={`constituency-menu-item ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  setConstituencyId(c.id);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={isSelected}
              >
                <div className="constituency-item-left">
                  <div className="constituency-code-badge">#{c.code}</div>
                  <div className="constituency-item-info">
                    <div className="constituency-item-title">
                      {language === 'pa' ? c.name_pa : c.name_en}
                    </div>
                    <div className="constituency-item-sub">
                      {language === 'pa' ? c.district_pa : c.district_en}
                    </div>
                  </div>
                </div>
                <div className="constituency-item-right">
                  <span className="constituency-count-tag">
                    {c.total_booths} {language === 'pa' ? 'ਬੂਥ' : 'Booths'}
                  </span>
                  {isSelected && <Check size={16} className="constituency-check" />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
