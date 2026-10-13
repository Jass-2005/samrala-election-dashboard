// 58-Samrala Bilingual Localization Dictionary (English & Gurmukhi Punjabi)

export const translations = {
  en: {
    // Header
    header_section: 'DASHBOARD',
    header_crumb: '58-SAMRALA',
    search_placeholder_desktop: 'Search 218 booths, villages, wards, numbers...',
    search_placeholder_mobile: 'Search booth number, village, or locality...',
    theme_switch_light: 'Switch to Light Mode',
    theme_switch_dark: 'Switch to Dark Mode',
    lang_name: 'English',
    lang_code: 'EN',

    // Sidebar
    nav_dashboard: 'Dashboard',
    nav_party_hub: 'Party Hub',
    nav_booths: '218 Booths',
    nav_audit: 'Booth Audit',
    nav_analytics: 'Analytics',
    nav_master_excel: 'Master Excel',
    nav_exec_report: 'Executive Report',
    nav_portal: 'Dsidein Portal',

    // Title Bar & Actions
    segment_tag: '58-SAMRALA ASSEMBLY SEGMENT',
    main_title: 'Comparative Booth Intelligence',
    main_subtitle: '2022 Vidhan Sabha vs 2024 Lok Sabha Polling Telemetry across all 218 Polling Stations (Fatehgarh Sahib PC)',
    action_excel: 'Master Excel',
    action_excel_title: 'Download Master Analysis Spreadsheet (Excel .xlsx with INC/AAP/SAD/BJP Sheets)',
    action_audit: 'Booth Numbering Audit',
    action_audit_title: 'View Strict Booth Numbering Alignment Verification between 2022 & 2024',
    action_export_pdf: 'Export PDF',
    action_export_pdf_title: 'Export Current View as PDF with Dsidein Watermark',

    // Renumbering / Alignment Audit Banner
    audit_banner_title: 'BOOTH NUMBERING AUDIT: 100% IDENTICAL IN BOTH ELECTIONS',
    audit_banner_desc: 'Strict sequential and mathematical analysis proves Booths #1 to #218 remained 100% unchanged between 2022 Vidhan Sabha and 2024 Lok Sabha. Correlation: 0.9412. Zero auxiliary/split booths.',
    audit_banner_btn: 'View Full Audit Report',

    // KPI Cards
    kpi_booths_label: 'POLLING STATIONS',
    kpi_booths_val: '218 Booths',
    kpi_booths_sub: '● 100% Monitored & Verified',
    kpi_evm_label: '2024 EVM POLLED',
    kpi_evm_val: '109,284',
    kpi_evm_sub: '● 100% Form-20 EVM Match',
    kpi_inc_label: 'INC (DR. AMAR SINGH)',
    kpi_inc_val: '37,641',
    kpi_inc_sub: '● 100 Wins (34.4% Share | +2,325 Lead)',
    kpi_aap_label: 'AAP (GURPREET SINGH GP)',
    kpi_aap_val: '35,316',
    kpi_aap_sub: '● 91 Wins (32.3% Share | Runner-up)',
    kpi_sad_label: 'SAD (BIKRAMJIT KHALSA)',
    kpi_sad_val: '17,619',
    kpi_sad_sub: '● 19 Wins (16.1% Share | 3rd)',
    kpi_bjp_label: 'BJP (GEJJA RAM)',
    kpi_bjp_val: '7,970',
    kpi_bjp_sub: '● 8 Wins (7.3% Share | 4th)',

    // Registry Header & Toolbar
    registry_title: 'Booth Performance Registry',
    registry_subtitle: 'Detailed booth-by-booth vote tally, turnout, winners, and margin shifts across 58-Samrala',
    booths_count: 'Booths',
    reset_all: 'Reset All',
    search_registry_all: 'Search all 218 booths by number or locality (e.g. 1, 50, Samrala, Machhiwara, Bondli)...',
    search_registry_party: 'Search {party} performance by booth no. or locality...',
    sort_order_label: 'Sort order',
    label_booth_2024: '2024 Booth',
    label_booth_2022: '2022 Booth',
    pill_unchanged: 'Unchanged (1-to-1)',

    // Party Tabs
    tab_all: 'All 218 Booths',
    tab_inc: 'INC Analysis',
    tab_aap: 'AAP Analysis',
    tab_sad: 'SAD Analysis',
    tab_bjp: 'BJP Analysis',

    // Quick Filters
    filter_all: 'All',
    filter_inc_wins: 'INC Wins (100)',
    filter_aap_wins: 'AAP Wins (91)',
    filter_sad_wins: 'SAD Wins (19)',
    filter_bjp_wins: 'BJP Wins (8)',
    filter_flipped: 'Flipped (104)',
    filter_retained: 'Retained (114)',

    // Sort Options
    sort_booth_asc: 'Booth No (1 → 218)',
    sort_booth_desc: 'Booth No (218 → 1)',
    sort_turnout_desc: 'Turnout 2024 (High → Low)',
    sort_turnout_asc: 'Turnout 2024 (Low → High)',
    sort_margin_desc: 'Lead Margin (Highest Win)',
    sort_inc_desc: 'INC Votes (High → Low)',
    sort_aap_desc: 'AAP Votes (High → Low)',
    sort_sad_desc: 'SAD Votes (High → Low)',
    sort_bjp_desc: 'BJP Votes (High → Low)',

    // Table Headers
    th_booth: 'Booth #',
    th_village: 'Village / Polling Station',
    th_turnout: 'Turnout (2024)',
    th_lead_2024: '2024 Winner & Margin',
    th_lead_2022: '2022 Winner',
    th_status: 'Trajectory / Shift',
    th_party_perf: '{party} Performance (24 vs 22)',
    th_action: 'Action',
    btn_inspect: 'View Audit',

    // Party Hub
    party_hub_title: 'Multi-Party Tactical Intelligence Hub',
    party_hub_subtitle: 'In-depth performance breakdown, vote swings, retention rates, and tactical targets',
    label_vote_share: 'Vote Share',
    label_net_votes: 'Net Votes',
    label_booth_wins: 'Booths Won',
    label_retained_booths: 'Strongholds Retained',
    label_gained_booths: 'New Booths Flipped',
    label_lost_booths: 'Lost Booths',
    label_weak_booths: 'Weak Defense (<20%)',
    label_top_booth: 'Top Performing Booth',
    badge_fortified: 'FORTIFIED',
    badge_vulnerable: 'VULNERABLE',

    // Modal
    modal_back: 'Back to Registry',
    modal_title: 'Polling Station Comprehensive Audit',
    modal_subtitle: 'Full electoral telemetry, candidate-wise votes, and 90-day operational directive',
    modal_section_summary: 'Electoral Summary',
    modal_section_comparison: '2022 vs 2024 Vote Share Comparison',
    modal_section_candidates: 'Candidate Breakdown (Form 20)',
    modal_section_plan: '90-Day Tactical Field Operations Plan',
    modal_step_phase: 'Phase',
    modal_close: 'Close Window',

    // Audit Modal
    audit_modal_title: 'Strict Booth Alignment & Renumbering Audit',
    audit_modal_subtitle: 'Official Verification of 58-Samrala Booth Sequential Alignment (2022 ↔ 2024)',
    audit_rule_1_title: '100% Sequential Match',
    audit_rule_1_desc: 'Form 20 for 2022 Vidhan Sabha lists Booths #1 to #218. Form 20 for 2024 Lok Sabha segment lists Booths #1 to #218 in identical geographical sequence.',
    audit_rule_2_title: 'No Auxiliary/Split Booths',
    audit_rule_2_desc: 'Zero polling stations were bifurcated (no auxiliary suffix like A/B or newly added stations). All 218 stations remained stable.',
    audit_rule_3_title: 'High Turnout Correlation (0.9412)',
    audit_rule_3_desc: 'Pearson correlation between 2022 and 2024 total votes polled is 0.9412, verifying identical voter catchment zones.',

    // Empty state
    no_match: 'No booths match the selected criteria.',
    no_match_sub: 'Try searching for a different booth number (e.g. 1, 50, 104) or clear the filter.'
  },

  pa: {
    // Header
    header_section: 'ਡੈਸ਼ਬੋਰਡ',
    header_crumb: '58-ਸਮਰਾਲਾ',
    search_placeholder_desktop: '218 ਬੂਥ, ਪਿੰਡ, ਵਾਰਡ, ਨੰਬਰ ਖੋਜੋ...',
    search_placeholder_mobile: 'ਬੂਥ ਨੰਬਰ, ਪਿੰਡ ਜਾਂ ਇਲਾਕਾ ਖੋਜੋ...',
    theme_switch_light: 'ਲਾਈਟ ਮੋਡ ਚੁਣੋ',
    theme_switch_dark: 'ਡਾਰਕ ਮੋਡ ਚੁਣੋ',
    lang_name: 'ਪੰਜਾਬੀ',
    lang_code: 'ਪੰਜਾਬੀ',

    // Sidebar
    nav_dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    nav_party_hub: 'ਪਾਰਟੀ ਹੱਬ',
    nav_booths: '218 ਬੂਥ',
    nav_audit: 'ਬੂਥ ਆਡਿਟ',
    nav_analytics: 'ਵਿਸ਼ਲੇਸ਼ਣ',
    nav_master_excel: 'ਮਾਸਟਰ ਐਕਸਲ',
    nav_exec_report: 'ਐਗਜ਼ੀਕਿਊਟਿਵ ਰਿਪੋਰਟ',
    nav_portal: 'ਡੀਸਾਈਡਇਨ ਪੋਰਟਲ',

    // Title Bar & Actions
    segment_tag: '58-ਸਮਰਾਲਾ ਵਿਧਾਨ ਸਭਾ ਹਲਕਾ',
    main_title: 'ਤੁਲਨਾਤਮਕ ਬੂਥ ਇੰਟੈਲੀਜੈਂਸ',
    main_subtitle: '2022 ਵਿਧਾਨ ਸਭਾ ਬਨਾਮ 2024 ਲੋਕ ਸਭਾ ਚੋਣਾਂ: ਸਾਰੇ 218 ਪੋਲਿੰਗ ਸਟੇਸ਼ਨਾਂ ਦਾ ਵਿਸਥਾਰਪੂਰਵਕ ਡਾਟਾ (ਫ਼ਤਹਿਗੜ੍ਹ ਸਾਹਿਬ ਹਲਕਾ)',
    action_excel: 'ਮਾਸਟਰ ਐਕਸਲ',
    action_excel_title: 'ਪੂਰਾ ਵਿਸ਼ਲੇਸ਼ਣ ਐਕਸਲ ਸ਼ੀਟ ਵਿੱਚ ਡਾਊਨਲੋਡ ਕਰੋ (ਕਾਂਗਰਸ/ਆਪ/ਅਕਾਲੀ/ਭਾਜਪਾ ਸ਼ੀਟਾਂ ਸਮੇਤ)',
    action_audit: 'ਬੂਥ ਨੰਬਰਿੰਗ ਆਡਿਟ',
    action_audit_title: '2022 ਅਤੇ 2024 ਵਿਚਕਾਰ ਬੂਥ ਨੰਬਰਿੰਗ ਦੀ ਸਖ਼ਤ ਪੜਤਾਲ ਦੇਖੋ',
    action_export_pdf: 'ਪੀ.ਡੀ.ਐੱਫ. ਐਕਸਪੋਰਟ',
    action_export_pdf_title: 'ਮੌਜੂਦਾ ਦ੍ਰਿਸ਼ ਨੂੰ ਡੀਸਾਈਡਇਨ ਵਾਟਰਮਾਰਕ ਸਮੇਤ ਪੀ.ਡੀ.ਐੱਫ. ਵਿੱਚ ਐਕਸਪੋਰਟ ਕਰੋ',

    // Renumbering / Alignment Audit Banner
    audit_banner_title: 'ਬੂਥ ਨੰਬਰਿੰਗ ਆਡਿਟ: ਦੋਵਾਂ ਚੋਣਾਂ ਵਿੱਚ 100% ਇੱਕੋ ਜਿਹੇ',
    audit_banner_desc: 'ਸਖ਼ਤ ਗਣਿਤਕ ਵਿਸ਼ਲੇਸ਼ਣ ਸਾਬਤ ਕਰਦਾ ਹੈ ਕਿ ਬੂਥ #1 ਤੋਂ #218 ਤੱਕ 2022 ਅਤੇ 2024 ਦੌਰਾਨ 100% ਅਣਬਦਲੇ ਰਹੇ। ਸਹਿ-ਸੰਬੰਧ: 0.9412। ਕੋਈ ਵਾਧੂ ਜਾਂ ਵੰਡਿਆ ਬੂਥ ਨਹੀਂ।',
    audit_banner_btn: 'ਪੂਰੀ ਆਡਿਟ ਰਿਪੋਰਟ ਦੇਖੋ',

    // KPI Cards
    kpi_booths_label: 'ਕੁੱਲ ਪੋਲਿੰਗ ਸਟੇਸ਼ਨ',
    kpi_booths_val: '218 ਬੂਥ',
    kpi_booths_sub: '● 100% ਤਸਦੀਕਸ਼ੁਦਾ ਤੇ ਨਿਗਰਾਨੀ ਅਧੀਨ',
    kpi_evm_label: '2024 ਕੁੱਲ ਈ.ਵੀ.ਐੱਮ. ਪੋਲ',
    kpi_evm_val: '109,284',
    kpi_evm_sub: '● 100% ਫਾਰਮ-20 ਨਾਲ ਮੇਲ ਖਾਂਦਾ',
    kpi_inc_label: 'ਕਾਂਗਰਸ (ਡਾ. ਅਮਰ ਸਿੰਘ)',
    kpi_inc_val: '37,641',
    kpi_inc_sub: '● 100 ਜਿੱਤਾਂ (34.4% ਹਿੱਸਾ | +2,325 ਲੀਡ)',
    kpi_aap_label: 'ਆਪ (ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ ਜੀ.ਪੀ.)',
    kpi_aap_val: '35,316',
    kpi_aap_sub: '● 91 ਜਿੱਤਾਂ (32.3% ਹਿੱਸਾ | ਦੂਜਾ ਸਥਾਨ)',
    kpi_sad_label: 'ਅਕਾਲੀ ਦਲ (ਬਿਕਰਮਜੀਤ ਖਾਲਸਾ)',
    kpi_sad_val: '17,619',
    kpi_sad_sub: '● 19 ਜਿੱਤਾਂ (16.1% ਹਿੱਸਾ | ਤੀਜਾ ਸਥਾਨ)',
    kpi_bjp_label: 'ਭਾਜਪਾ (ਗੇਜਾ ਰਾਮ)',
    kpi_bjp_val: '7,970',
    kpi_bjp_sub: '● 8 ਜਿੱਤਾਂ (7.3% ਹਿੱਸਾ | ਚੌਥਾ ਸਥਾਨ)',

    // Registry Header & Toolbar
    registry_title: 'ਬੂਥ ਕਾਰਗੁਜ਼ਾਰੀ ਰਜਿਸਟਰ',
    registry_subtitle: '58-ਸਮਰਾਲਾ ਦੇ ਸਾਰੇ ਬੂਥਾਂ ਦੀਆਂ ਵੋਟਾਂ, ਵੋਟਿੰਗ ਫ਼ੀਸਦੀ, ਜੇਤੂ ਪਾਰਟੀਆਂ ਅਤੇ ਲੀਡ ਦਾ ਤੁਲਨਾਤਮਕ ਵੇਰਵਾ',
    booths_count: 'ਬੂਥ',
    reset_all: 'ਸਭ ਰੀਸੈੱਟ ਕਰੋ',
    search_registry_all: 'ਸਾਰੇ 218 ਬੂਥ ਨੰਬਰ ਜਾਂ ਪਿੰਡ ਰਾਹੀਂ ਖੋਜੋ (ਜਿਵੇਂ 1, 50, ਸਮਰਾਲਾ, ਮਾਛੀਵਾੜਾ, ਬੋਂਦਲੀ)...',
    search_registry_party: '{party} ਕਾਰਗੁਜ਼ਾਰੀ ਬੂਥ ਨੰਬਰ ਜਾਂ ਪਿੰਡ ਰਾਹੀਂ ਖੋਜੋ...',
    sort_order_label: 'ਤਰਤੀਬ',
    label_booth_2024: '2024 ਬੂਥ',
    label_booth_2022: '2022 ਬੂਥ',
    pill_unchanged: 'ਅਣਬਦਲਿਆ (1-ਤੋਂ-1)',

    // Party Tabs
    tab_all: 'ਸਾਰੇ 218 ਬੂਥ',
    tab_inc: 'ਕਾਂਗਰਸ ਵਿਸ਼ਲੇਸ਼ਣ',
    tab_aap: 'ਆਪ ਵਿਸ਼ਲੇਸ਼ਣ',
    tab_sad: 'ਅਕਾਲੀ ਦਲ ਵਿਸ਼ਲੇਸ਼ਣ',
    tab_bjp: 'ਭਾਜਪਾ ਵਿਸ਼ਲੇਸ਼ਣ',

    // Quick Filters
    filter_all: 'ਸਾਰੇ',
    filter_inc_wins: 'ਕਾਂਗਰਸ ਜਿੱਤਾਂ (100)',
    filter_aap_wins: 'ਆਪ ਜਿੱਤਾਂ (91)',
    filter_sad_wins: 'ਅਕਾਲੀ ਜਿੱਤਾਂ (19)',
    filter_bjp_wins: 'ਭਾਜਪਾ ਜਿੱਤਾਂ (8)',
    filter_flipped: 'ਤਬਦੀਲ ਬੂਥ (104)',
    filter_retained: 'ਬਰਕਰਾਰ ਬੂਥ (114)',

    // Sort Options
    sort_booth_asc: 'ਬੂਥ ਨੰਬਰ (1 → 218)',
    sort_booth_desc: 'ਬੂਥ ਨੰਬਰ (218 → 1)',
    sort_turnout_desc: '2024 ਪੋਲ ਹੋਈਆਂ ਵੋਟਾਂ (ਵੱਧ ਤੋਂ ਘੱਟ)',
    sort_turnout_asc: '2024 ਪੋਲ ਹੋਈਆਂ ਵੋਟਾਂ (ਘੱਟ ਤੋਂ ਵੱਧ)',
    sort_margin_desc: 'ਜਿੱਤ ਦੀ ਲੀਡ (ਵੱਧ ਤੋਂ ਘੱਟ)',
    sort_inc_desc: 'ਕਾਂਗਰਸ ਵੋਟਾਂ (ਵੱਧ ਤੋਂ ਘੱਟ)',
    sort_aap_desc: 'ਆਪ ਵੋਟਾਂ (ਵੱਧ ਤੋਂ ਘੱਟ)',
    sort_sad_desc: 'ਅਕਾਲੀ ਵੋਟਾਂ (ਵੱਧ ਤੋਂ ਘੱਟ)',
    sort_bjp_desc: 'ਭਾਜਪਾ ਵੋਟਾਂ (ਵੱਧ ਤੋਂ ਘੱਟ)',

    // Table Headers
    th_booth: 'ਬੂਥ #',
    th_village: 'ਪਿੰਡ / ਪੋਲਿੰਗ ਸਟੇਸ਼ਨ',
    th_turnout: 'ਵੋਟਿੰਗ (2024)',
    th_lead_2024: '2024 ਜੇਤੂ ਅਤੇ ਲੀਡ',
    th_lead_2022: '2022 ਜੇਤੂ',
    th_status: 'ਸਥਿਤੀ / ਤਬਦੀਲੀ',
    th_party_perf: '{party} ਕਾਰਗੁਜ਼ਾਰੀ (24 ਬਨਾਮ 22)',
    th_action: 'ਕਾਰਵਾਈ',
    btn_inspect: 'ਵੇਰਵਾ ਦੇਖੋ',

    // Party Hub
    party_hub_title: 'ਬਹੁ-ਪਾਰਟੀ ਰਣਨੀਤਕ ਇੰਟੈਲੀਜੈਂਸ ਹੱਬ',
    party_hub_subtitle: 'ਪਾਰਟੀ-ਵਾਰ ਕਾਰਗੁਜ਼ਾਰੀ, ਵੋਟ ਸਵਿੰਗ, ਗੜ੍ਹਾਂ ਦੀ ਸਾਂਭ-ਸੰਭਾਲ ਅਤੇ ਰਣਨੀਤਕ ਨਿਸ਼ਾਨੇ',
    label_vote_share: 'ਵੋਟ ਹਿੱਸੇਦਾਰੀ',
    label_net_votes: 'ਕੁੱਲ ਵੋਟਾਂ',
    label_booth_wins: 'ਜਿੱਤੇ ਬੂਥ',
    label_retained_booths: 'ਬਰਕਰਾਰ ਗੜ੍ਹ',
    label_gained_booths: 'ਨਵੇਂ ਜਿੱਤੇ ਬੂਥ',
    label_lost_booths: 'ਗਵਾਏ ਬੂਥ',
    label_weak_booths: 'ਕਮਜ਼ੋਰ ਬੂਥ (<20%)',
    label_top_booth: 'ਸਭ ਤੋਂ ਮਜ਼ਬੂਤ ਬੂਥ',
    badge_fortified: 'ਪੱਕਾ ਗੜ੍ਹ',
    badge_vulnerable: 'ਕਮਜ਼ੋਰ',

    // Modal
    modal_back: 'ਵਾਪਸ ਰਜਿਸਟਰ ਵੱਲ',
    modal_title: 'ਪੋਲਿੰਗ ਸਟੇਸ਼ਨ ਵਿਸਥਾਰਪੂਰਵਕ ਆਡਿਟ',
    modal_subtitle: 'ਸੰਪੂਰਨ ਚੋਣ ਵੇਰਵਾ, ਉਮੀਦਵਾਰ-ਵਾਰ ਵੋਟਾਂ ਅਤੇ 90-ਦਿਨਾ ਰਣਨੀਤਕ ਕਾਰਜ ਯੋਜਨਾ',
    modal_section_summary: 'ਚੋਣ ਸਾਰਾਂਸ਼',
    modal_section_comparison: '2022 ਬਨਾਮ 2024 ਵੋਟ ਸ਼ੇਅਰ ਤੁਲਨਾ',
    modal_section_candidates: 'ਉਮੀਦਵਾਰ-ਵਾਰ ਵੋਟ ਵੇਰਵਾ (ਫਾਰਮ 20)',
    modal_section_plan: '90-ਦਿਨਾ ਜ਼ਮੀਨੀ ਰਣਨੀਤਕ ਮਾਸਟਰਪਲਾਨ',
    modal_step_phase: 'ਪੜਾਅ',
    modal_close: 'ਬੰਦ ਕਰੋ',

    // Audit Modal
    audit_modal_title: 'ਸਖ਼ਤ ਬੂਥ ਨੰਬਰਿੰਗ ਅਤੇ ਇਕਸਾਰਤਾ ਆਡਿਟ',
    audit_modal_subtitle: '58-ਸਮਰਾਲਾ ਦੇ ਬੂਥਾਂ ਦੀ 2022 ਅਤੇ 2024 ਵਿਚਕਾਰ ਸਰਕਾਰੀ ਤਸਦੀਕ',
    audit_rule_1_title: '100% ਲੜੀਵਾਰ ਮੇਲ',
    audit_rule_1_desc: '2022 ਵਿਧਾਨ ਸਭਾ ਫਾਰਮ 20 ਵਿੱਚ ਬੂਥ #1 ਤੋਂ #218 ਹਨ। 2024 ਲੋਕ ਸਭਾ ਫਾਰਮ 20 ਵਿੱਚ ਵੀ ਬੂਥ #1 ਤੋਂ #218 ਬਿਲਕੁਲ ਉਸੇ ਲੜੀ ਵਿੱਚ ਦਰਜ ਹਨ।',
    audit_rule_2_title: 'ਕੋਈ ਵਾਧੂ ਜਾਂ ਵੰਡਿਆ ਬੂਥ ਨਹੀਂ',
    audit_rule_2_desc: 'ਕਿਸੇ ਵੀ ਪੋਲਿੰਗ ਸਟੇਸ਼ਨ ਨੂੰ ਦੋ ਹਿੱਸਿਆਂ ਵਿੱਚ ਨਹੀਂ ਵੰਡਿਆ ਗਿਆ। ਸਾਰੇ 218 ਸਟੇਸ਼ਨ ਬਿਲਕੁਲ ਸਥਿਰ ਰਹੇ।',
    audit_rule_3_title: 'ਉੱਚ ਵੋਟਿੰਗ ਸਹਿ-ਸੰਬੰਧ (0.9412)',
    audit_rule_3_desc: '2022 ਅਤੇ 2024 ਦੀ ਕੁੱਲ ਪੋਲਿੰਗ ਵਿਚਕਾਰ ਪੀਅਰਸਨ ਸਹਿ-ਸੰਬੰਧ 0.9412 ਹੈ, ਜੋ ਸਾਬਤ ਕਰਦਾ ਹੈ ਕਿ ਵੋਟਰ ਖੇਤਰ ਪੂਰੀ ਤਰ੍ਹਾਂ ਸਮਾਨ ਰਿਹਾ।',

    // Empty state
    no_match: 'ਕੋਈ ਬੂਥ ਮਾਪਦੰਡਾਂ ਨਾਲ ਮੇਲ ਨਹੀਂ ਖਾਂਦਾ।',
    no_match_sub: 'ਕਿਰਪਾ ਕਰਕੇ ਕੋਈ ਹੋਰ ਬੂਥ ਨੰਬਰ (ਜਿਵੇਂ 1, 50, 104) ਜਾਂ ਫਿਲਟਰ ਬਦਲ ਕੇ ਕੋਸ਼ਿਸ਼ ਕਰੋ।'
  }
};

export const formatStatus = (status, language = 'en') => {
  if (language !== 'pa') return status;
  if (!status) return '';
  return status
    .replace('Retained', 'ਬਰਕਰਾਰ')
    .replace('AAP', 'ਆਪ')
    .replace('INC', 'ਕਾਂਗਰਸ')
    .replace('SAD', 'ਅਕਾਲੀ')
    .replace('BJP', 'ਭਾਜਪਾ')
    .replace('SSM(Rajewal)', 'ਰਾਜੇਵਾਲ');
};

export const formatCategory = (cat, language = 'en') => {
  const isPa = language === 'pa';
  switch (cat) {
    case 'WON_BOTH':
      return isPa ? 'ਦੋਵੇਂ ਵਾਰ ਜਿੱਤਿਆ' : 'Won Both (22 & 24)';
    case 'GAINED':
      return isPa ? 'ਨਵਾਂ ਜਿੱਤਿਆ (2024 ਲਾਭ)' : 'Gained in 2024';
    case 'LOST_24':
      return isPa ? '2024 ਵਿੱਚ ਗਵਾਇਆ' : 'Lost in 2024';
    case 'WEAK':
      return isPa ? 'ਕਮਜ਼ੋਰ ਬੂਥ (<20%)' : 'Weak (<20% Share)';
    case 'LOST_BOTH':
      return isPa ? 'ਦੋਵੇਂ ਵਾਰ ਹਾਰਿਆ' : 'Lost Both Elections';
    default:
      return cat;
  }
};
