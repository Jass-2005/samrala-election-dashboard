# -*- coding: utf-8 -*-
"""
Generate 90-Day Tactical Field Operations Masterplan (English & Gurmukhi Punjabi)
for all 218 polling stations of 58-Samrala Assembly Segment.
Features deep localized context for Samrala, Machhiwara, Bet belt, and rural panchayats.
"""

import sys

sys.stdout.reconfigure(encoding='utf-8')

def generate_masterplan(booths_comparison):
    plan = {}
    
    for b in booths_comparison:
        b_no = b['booth_no']
        v_en = b.get('village_en', f'Booth {b_no}')
        v_pa = b.get('village_pa', f'ਬੂਥ {b_no}')
        w22 = b.get('winner_22', 'AAP')
        w24 = b.get('winner_24', 'INC')
        m24 = b.get('margin_24', 0)
        m22 = b.get('margin_22', 0)
        
        # Strategic classification & structured 90-day steps
        if w24 == 'INC' and w22 == 'INC':
            zone_en = "Core Congress Fortress (High Retentive Resistance Zone)"
            zone_pa = "ਕਾਂਗਰਸ ਦਾ ਪੱਕਾ ਗੜ੍ਹ (ਉੱਚ ਰੋਕਥਾਮ ਅਤੇ ਮੁਕਾਬਲਾ ਜ਼ੋਨ)"
            act_en = f"Congress strongly defended {v_en} with a +{m24} margin in 2024. Break traditional Congress dynastic patronage by organizing direct public grievance camps, spotlighting AAP state welfare schemes (300 units free power, Aam Aadmi Clinics, canal tail water), and inducting local youth panchayat influencers."
            act_pa = f"2024 ਵਿੱਚ ਕਾਂਗਰਸ ਨੇ {v_pa} ਵਿੱਚ +{m24} ਵੋਟਾਂ ਦੀ ਲੀਡ ਬਰਕਰਾਰ ਰੱਖੀ। ਰਵਾਇਤੀ ਕਾਂਗਰਸੀ ਵੋਟ ਬੈਂਕ ਵਿੱਚ ਸੰਨ੍ਹ ਲਾਉਣ ਲਈ ਪੰਜਾਬ ਸਰਕਾਰ ਦੀਆਂ ਭਲਾਈ ਸਕੀਮਾਂ (ਮੁਫ਼ਤ ਬਿਜਲੀ, ਆਮ ਆਦਮੀ ਕਲੀਨਿਕ, ਨਹਿਰੀ ਪਾਣੀ) ਦਾ ਪ੍ਰਚਾਰ ਕਰੋ ਅਤੇ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਨੌਜਵਾਨਾਂ ਨੂੰ ਆਪ ਨਾਲ ਜੋੜੋ।"
            steps_en = [
                f"Days 1-30: Micro-audit voter sentiments in {v_en} to map the {m24}-vote deficit down to family and mohalla level.",
                f"Days 31-60: Organize local grievance resolution camps for pending revenue, tubewell power, and blue ration cards.",
                f"Days 61-90: Induct 10-15 influential neutral and disgruntled Congress booth families into AAP block committee ahead of 2027."
            ]
            steps_pa = [
                f"ਦਿਨ 1-30: {v_pa} ਵਿੱਚ {m24} ਵੋਟਾਂ ਦੇ ਫ਼ਰਕ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਕੇ ਪਰਿਵਾਰ ਪੱਧਰ 'ਤੇ ਕਮਜ਼ੋਰ ਪੱਤੀਆਂ ਦੀ ਸ਼ਨਾਖ਼ਤ ਕਰੋ।",
                f"ਦਿਨ 31-60: ਪਿੰਡ ਵਿੱਚ ਮਾਲ ਵਿਭਾਗ, ਮੋਟਰ ਕੁਨੈਕਸ਼ਨ ਅਤੇ ਨੀਲੇ ਰਾਸ਼ਨ ਕਾਰਡਾਂ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਹੱਲ ਕਰਨ ਲਈ ਵਿਸ਼ੇਸ਼ ਕੈਂਪ ਲਗਾਓ।",
                f"ਦਿਨ 61-90: ਕਾਂਗਰਸ ਤੋਂ ਨਾਰਾਜ਼ 10-15 ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਪਰਿਵਾਰਾਂ ਨੂੰ 2027 ਚੋਣਾਂ ਦੇ ਮੱਦੇਨਜ਼ਰ ਆਪ ਬੂਥ ਕਮੇਟੀ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ।"
            ]
        elif w24 == 'INC' and w22 == 'AAP':
            zone_en = f"Swing Loss to INC: Immediate Reclaim & Counter-Offensive Zone"
            zone_pa = f"ਕਾਂਗਰਸ ਵੱਲ ਤਬਦੀਲ ਬੂਥ: ਤੁਰੰਤ ਮੁੜ-ਪ੍ਰਾਪਤੀ ਅਤੇ ਚੋਣ ਹਮਲਾਵਰ ਜ਼ੋਨ"
            act_en = f"Booth flipped from AAP (2022) to INC (2024) with a {m24} lead for Dr. Amar Singh. Re-engage grassroots volunteers, address farmer crop procurement concerns, and deploy MLA Jagtar Singh Diyalpura's team for direct village development sanctions to overturn the deficit."
            act_pa = f"ਇਹ ਬੂਥ 2022 ਵਿੱਚ ਆਪ ਨੇ ਜਿੱਤਿਆ ਸੀ ਪਰ 2024 ਵਿੱਚ ਡਾ. ਅਮਰ ਸਿੰਘ (ਕਾਂਗਰਸ) ਨੂੰ {m24} ਦੀ ਲੀਡ ਮਿਲੀ। ਵਿਧਾਇਕ ਜਗਤਾਰ ਸਿੰਘ ਦਿਆਲਪੁਰਾ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਜ਼ਮੀਨੀ ਵਰਕਰਾਂ ਨਾਲ ਮੀਟਿੰਗਾਂ ਕਰੋ ਅਤੇ ਪਿੰਡ ਦੇ ਵਿਕਾਸ ਕਾਰਜਾਂ ਲਈ ਵਿਸ਼ੇਸ਼ ਗ੍ਰਾਂਟਾਂ ਜਾਰੀ ਕਰਵਾ ਕੇ ਲੀਡ ਤੋੜੋ।"
            steps_en = [
                f"Days 1-30: Re-activate the 2022 winning AAP booth cadre in {v_en} and resolve local leadership friction.",
                f"Days 31-60: Sanction priority grants for rural link roads, solar lighting, and school sports infrastructure in {v_en}.",
                f"Days 61-90: Conduct booth-level door-to-door rally to neutralize false narratives and reclaim the +{m24} vote swing."
            ]
            steps_pa = [
                f"ਦਿਨ 1-30: {v_pa} ਵਿੱਚ 2022 ਦੇ ਪੁਰਾਣੇ ਆਪ ਵਾਲੰਟੀਅਰਾਂ ਨੂੰ ਮੁੜ ਸਰਗਰਮ ਕਰੋ ਅਤੇ ਸਥਾਨਕ ਮਤਭੇਦ ਦੂਰ ਕਰੋ।",
                f"ਦਿਨ 31-60: ਪਿੰਡ ਦੀਆਂ ਫਿਰਨੀਆਂ, ਸੋਲਰ ਲਾਈਟਾਂ ਅਤੇ ਖੇਡ ਮੈਦਾਨਾਂ ਲਈ ਸਰਕਾਰੀ ਫੰਡ ਤੁਰੰਤ ਜਾਰੀ ਕਰਵਾਓ।",
                f"ਦਿਨ 61-90: ਘਰ-ਘਰ ਰਾਬਤਾ ਮੁਹਿੰਮ ਚਲਾ ਕੇ +{m24} ਵੋਟਾਂ ਦੇ ਫ਼ਰਕ ਨੂੰ ਪੂਰਾ ਕਰੋ ਅਤੇ ਮੁੜ ਆਪ ਦਾ ਗੜ੍ਹ ਬਣਾਓ।"
            ]
        elif w24 == 'AAP' and w22 == 'AAP':
            zone_en = "Core AAP Citadel (Retention & Fortification Zone)"
            zone_pa = "ਆਪ ਦਾ ਅਜਿੱਤ ਗੜ੍ਹ (ਸਾਂਭ-ਸੰਭਾਲ ਅਤੇ ਹੋਰ ਮਜ਼ਬੂਤੀ ਜ਼ੋਨ)"
            act_en = f"AAP firmly retained {v_en} with a decisive +{m24} vote lead. Protect this strategic stronghold by forming a dedicated 15-member Booth Command Unit. Accelerate welfare beneficiary registration and maintain active touch with youth sports clubs."
            act_pa = f"{v_pa} ਵਿੱਚ ਆਮ ਆਦਮੀ ਪਾਰਟੀ ਨੇ +{m24} ਵੋਟਾਂ ਦੀ ਸ਼ਾਨਦਾਰ ਲੀਡ ਨਾਲ ਜਿੱਤ ਬਰਕਰਾਰ ਰੱਖੀ। ਇਸ ਗੜ੍ਹ ਨੂੰ ਹੋਰ ਮਜ਼ਬੂਤ ਕਰਨ ਲਈ 15 ਮੈਂਬਰੀ ਬੂਥ ਕਮਾਂਡ ਯੂਨਿਟ ਗਠਿਤ ਕਰੋ ਅਤੇ ਨੌਜਵਾਨ ਸਪੋਰਟਸ ਕਲੱਬਾਂ ਨਾਲ ਸਿੱਧਾ ਸੰਪਰਕ ਬਣਾਓ।"
            steps_en = [
                f"Days 1-30: Comprehensive door-to-door check of 300 free units electricity and elderly pension delivery in {v_en}.",
                f"Days 31-60: Organize farmer interaction meetings addressing canal irrigation and Mandi procurement infrastructure.",
                f"Days 61-90: Mobilize young first-time voters into a high-energy campaign force to expand the +{m24} lead for 2027."
            ]
            steps_pa = [
                f"ਦਿਨ 1-30: {v_pa} ਵਿੱਚ ਮੁਫ਼ਤ ਬਿਜਲੀ ਅਤੇ ਬੁਢਾਪਾ ਪੈਨਸ਼ਨ ਲਾਭਪਾਤਰੀਆਂ ਨਾਲ ਘਰ-ਘਰ ਮਿਲਣੀ ਮੁਕੰਮਲ ਕਰੋ।",
                f"ਦਿਨ 31-60: ਕਿਸਾਨਾਂ ਨਾਲ ਨਹਿਰੀ ਪਾਣੀ ਅਤੇ ਮੰਡੀਆਂ ਦੇ ਪ੍ਰਬੰਧਾਂ ਸਬੰਧੀ ਸਿੱਧਾ ਸੰਵਾਦ ਕਰੋ।",
                f"ਦਿਨ 61-90: 2027 ਚੋਣਾਂ ਵਿੱਚ +{m24} ਵੋਟਾਂ ਦੀ ਲੀਡ ਨੂੰ ਹੋਰ ਵੱਡਾ ਕਰਨ ਲਈ ਨੌਜਵਾਨਾਂ ਦੀ ਵਿਸ਼ੇਸ਼ ਟੀਮ ਤਿਆਰ ਕਰੋ।"
            ]
        elif w24 == 'AAP' and w22 != 'AAP':
            zone_en = f"Historic Breakthrough: AAP Flipped {w22} Stronghold"
            zone_pa = f"ਇਤਿਹਾਸਕ ਪ੍ਰਾਪਤੀ: {w22} ਦੇ ਗੜ੍ਹ ਨੂੰ ਢਾਹ ਕੇ ਆਪ ਦੀ ਵੱਡੀ ਜਿੱਤ"
            act_en = f"Stunning breakthrough in {v_en} where AAP dismantled traditional {w22} dominance with a +{m24} vote lead. Formally induct all community swing influencers who backed AAP into the circle leadership and prioritize panchayat infrastructure."
            act_pa = f"{v_pa} ਵਿੱਚ ਆਪ ਨੇ {w22} ਦੇ ਪੁਰਾਣੇ ਦਬਦਬੇ ਨੂੰ ਤੋੜ ਕੇ +{m24} ਵੋਟਾਂ ਦੀ ਸ਼ਾਨਦਾਰ ਜਿੱਤ ਦਰਜ ਕੀਤੀ। ਚੋਣਾਂ ਵਿੱਚ ਆਪ ਦਾ ਸਾਥ ਦੇਣ ਵਾਲੇ ਸਥਾਨਕ ਪਤਵੰਤਿਆਂ ਨੂੰ ਬਲਾਕ ਲੀਡਰਸ਼ਿਪ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ ਅਤੇ ਪਿੰਡ ਦੇ ਵਿਕਾਸ ਕਾਰਜ ਤਰਜੀਹ 'ਤੇ ਕਰੋ।"
            steps_en = [
                f"Days 1-30: Formally honor and integrate community swing elders who supported Gurpreet GP in {v_en}.",
                f"Days 31-60: Accelerate paved streets, sewage drainage, and LED lighting projects across the entire village.",
                f"Days 61-90: Convert this newly captured booth into a permanent, impregnable AAP fortress ahead of 2027."
            ]
            steps_pa = [
                f"ਦਿਨ 1-30: {v_pa} ਵਿੱਚ ਆਪ ਦੇ ਹੱਕ ਵਿੱਚ ਭੁਗਤਣ ਵਾਲੇ ਪੰਚਾਇਤੀ ਆਗੂਆਂ ਦਾ ਸਨਮਾਨ ਕਰਕੇ ਸੰਗਠਨ ਵਿੱਚ ਥਾਂ ਦਿਓ।",
                f"ਦਿਨ 31-60: ਪਿੰਡ ਦੀਆਂ ਪੱਕੀਆਂ ਗਲੀਆਂ, ਨਾਲੀਆਂ ਅਤੇ ਐਲਈਡੀ ਲਾਈਟਾਂ ਦੇ ਕੰਮ ਤੁਰੰਤ ਮੁਕੰਮਲ ਕਰਵਾਓ।",
                f"ਦਿਨ 61-90: ਇਸ ਨਵੇਂ ਜਿੱਤੇ ਬੂਥ ਨੂੰ 2027 ਲਈ ਪੱਕੇ ਗੜ੍ਹ ਵਿੱਚ ਤਬਦੀਲ ਕਰੋ।"
            ]
        elif w24 == 'SAD':
            zone_en = "Akali Dal Stronghold: Rural Patronage Penetration Zone"
            zone_pa = "ਅਕਾਲੀ ਦਲ ਦਾ ਪ੍ਰਭਾਵ ਖੇਤਰ: ਪੇਂਡੂ ਭਾਈਚਾਰਕ ਸੰਨ੍ਹ ਜ਼ੋਨ"
            act_en = f"SAD captured a +{m24} vote lead under Bikramjit Khalsa in {v_en}. Neutralize traditional Akali village kinship networks through unbiased panchayat grant allocations, fair cooperative society credit, and outreach to non-aligned agrarian families."
            act_pa = f"{v_pa} ਵਿੱਚ ਅਕਾਲੀ ਦਲ ਨੇ +{m24} ਵੋਟਾਂ ਦੀ ਲੀਡ ਹਾਸਲ ਕੀਤੀ। ਰਵਾਇਤੀ ਅਕਾਲੀ ਪ੍ਰਭਾਵ ਨੂੰ ਖ਼ਤਮ ਕਰਨ ਲਈ ਨਿਰਪੱਖ ਪੰਚਾਇਤੀ ਗ੍ਰਾਂਟਾਂ, ਸੁਸਾਇਟੀਆਂ ਦੇ ਕਰਜ਼ਾ ਰਾਹਤ ਪ੍ਰਬੰਧ ਅਤੇ ਨਿਰਪੱਖ ਕਿਸਾਨ ਪਰਿਵਾਰਾਂ ਨਾਲ ਸਿੱਧਾ ਸੰਪਰਕ ਬਣਾਓ।"
            steps_en = [
                f"Days 1-30: In-depth survey of neutral households in {v_en} outside the traditional Akali patronage circle.",
                f"Days 31-60: Release targeted Punjab Govt grants for village community centres and drinking water RO plants.",
                f"Days 61-90: Win over respected panches and cooperative society members to overturn the {m24} vote gap."
            ]
            steps_pa = [
                f"ਦਿਨ 1-30: {v_pa} ਵਿੱਚ ਅਕਾਲੀ ਦਲ ਦੇ ਪ੍ਰਭਾਵ ਤੋਂ ਬਾਹਰਲੇ ਨਿਰਪੱਖ ਪਰਿਵਾਰਾਂ ਦੀ ਸ਼ਨਾਖ਼ਤ ਕਰੋ।",
                f"ਦਿਨ 31-60: ਪਿੰਡ ਦੀਆਂ ਧਰਮਸ਼ਾਲਾਵਾਂ ਅਤੇ ਪੀਣ ਵਾਲੇ ਪਾਣੀ ਦੇ ਆਰ.ਓ. ਪ੍ਰੋਜੈਕਟਾਂ ਲਈ ਵਿਸ਼ੇਸ਼ ਗ੍ਰਾਂਟ ਜਾਰੀ ਕਰਵਾਓ।",
                f"ਦਿਨ 61-90: ਸਥਾਨਕ ਪੰਚਾਂ ਅਤੇ ਸੁਸਾਇਟੀ ਆਗੂਆਂ ਨੂੰ ਆਪ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰਕੇ {m24} ਵੋਟਾਂ ਦਾ ਫ਼ਰਕ ਖ਼ਤਮ ਕਰੋ।"
            ]
        else: # BJP (w24 == 'BJP')
            zone_en = "BJP Urban/Commercial Pocket: Merchant & Municipal Neutralization Zone"
            zone_pa = "ਭਾਜਪਾ ਦਾ ਸ਼ਹਿਰੀ/ਵਪਾਰੀ ਜ਼ੋਨ: ਵਪਾਰਕ ਤਾਲਮੇਲ ਅਤੇ ਸੰਵਾਦ ਜ਼ੋਨ"
            act_en = f"BJP surged with a +{m24} lead in {v_en} under Gejja Ram. Engage local trade and shopkeeper associations with business-friendly state policies, resolve urban municipal sewerage and road paving issues, and counter communal polarization."
            act_pa = f"{v_pa} ਵਿੱਚ ਭਾਜਪਾ ਨੇ +{m24} ਵੋਟਾਂ ਦੀ ਲੀਡ ਹਾਸਲ ਕੀਤੀ। ਸ਼ਹਿਰੀ ਵਪਾਰੀ ਅਤੇ ਦੁਕਾਨਦਾਰ ਵਰਗ ਨਾਲ ਸਿੱਧਾ ਰਾਬਤਾ ਕਾਇਮ ਕਰੋ, ਮਿਊਂਸਪਲ ਕੌਂਸਲ ਦੇ ਸੀਵਰੇਜ ਅਤੇ ਸੜਕਾਂ ਦੇ ਮਸਲੇ ਹੱਲ ਕਰੋ।"
            steps_en = [
                f"Days 1-30: Convene townhall meetings with local market associations and small traders in {v_en}.",
                f"Days 31-60: Fast-track municipal civic clearances, streetlight repairs, and clean water drainage.",
                f"Days 61-90: Showcase Punjab Govt's trade deregulation and industrial policies to win back the +{m24} deficit."
            ]
            steps_pa = [
                f"ਦਿਨ 1-30: {v_pa} ਦੇ ਸਥਾਨਕ ਵਪਾਰ ਮੰਡਲਾਂ ਅਤੇ ਦੁਕਾਨਦਾਰਾਂ ਨਾਲ ਵਿਸ਼ੇਸ਼ ਮੀਟਿੰਗਾਂ ਕਰੋ।",
                f"ਦਿਨ 31-60: ਨਗਰ ਕੌਂਸਲ ਰਾਹੀਂ ਸੀਵਰੇਜ, ਸਟਰੀਟ ਲਾਈਟਾਂ ਅਤੇ ਸਫ਼ਾਈ ਦੇ ਕੰਮ ਪਹਿਲ ਦੇ ਆਧਾਰ 'ਤੇ ਕਰਵਾਓ।",
                f"ਦਿਨ 61-90: ਪੰਜਾਬ ਸਰਕਾਰ ਦੀਆਂ ਵਪਾਰ ਪੱਖੀ ਨੀਤੀਆਂ ਦਾ ਪ੍ਰਚਾਰ ਕਰਕੇ ਭਾਜਪਾ ਦੀ {m24} ਵੋਟਾਂ ਦੀ ਲੀਡ ਤੋੜੋ।"
            ]

        plan[b_no] = {
            'booth_no': b_no,
            'zone_en': zone_en,
            'zone_pa': zone_pa,
            'action_en': act_en,
            'action_pa': act_pa,
            'steps_en': steps_en,
            'steps_pa': steps_pa
        }
        
    return plan

if __name__ == '__main__':
    print("generate_samrala_masterplan module loaded successfully.")
