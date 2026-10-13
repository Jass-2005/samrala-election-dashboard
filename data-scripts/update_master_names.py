import os
import sys
import json
import pandas as pd

sys.stdout.reconfigure(encoding='utf-8')

# 1. Compile refined dictionary of all 218 booths
refined_names = {}

for b in range(1, 219):
    sec_names = []
    sec_file = f"e:/SAMRALA/{b}/booth{b}_sections.txt"
    if os.path.exists(sec_file):
        with open(sec_file, encoding='utf-8', errors='ignore') as f:
            for line in f:
                parts = line.strip().split('|')
                if len(parts) >= 3 and parts[0].strip().isdigit():
                    s_pa = parts[1].strip()
                    s_en = parts[2].strip()
                    if s_pa and not s_pa.startswith("ਸੈਕਸ਼ਨ"):
                        sec_names.append((s_pa, s_en))
                        
    csv_sec = ""
    csv_file = f"e:/SAMRALA/{b}/booth{b}_voters_share.csv"
    if os.path.exists(csv_file):
        try:
            df = pd.read_csv(csv_file, nrows=5)
            if 'Section Name and No.' in df.columns and len(df) > 0:
                csv_sec = str(df['Section Name and No.'].iloc[0]).strip()
        except:
            pass

    # Clean raw csv_sec
    raw_clean_pa = csv_sec.split('-', 1)[-1].strip() if '-' in csv_sec else csv_sec.strip()
    
    primary_pa = sec_names[0][0] if sec_names else raw_clean_pa
    primary_en = sec_names[0][1] if sec_names and not sec_names[0][1].lower().startswith("section") else ""

    # Known Punjabi to English romanization dictionary
    ro_dict = {
        'ਮੰਡ ਸ਼ੇਰੀਆਂ': 'Mand Sherian',
        'ਮੰਡ ਹੱਸੋਗੜ': 'Mand Hassogarh',
        'ਪੰਧੇਰ': 'Pandher',
        'ਪੰਡੂਰ': 'Pandher',
        'ਚੱਕਲੀ ਮੰਗਾ': 'Chakkli Manga',
        'ਜੇਧਵਾਲ': 'Jedhwal',
        'ਜੈਪਵਾਲ': 'Jedhwal',
        'ਰੁੜੇਵਾਲ': 'Rurhewal',
        'ਰੂੜੇਵਾਲ': 'Rurhewal',
        'ਚੂਹੇਵਾਲ': 'Rurhewal',
        'ਮੱਡ ਝੌਂਦੀ': 'Madd Jhondi',
        'ਈਸਾਪੁਰ': 'Isapur',
        'ਡੀਸਪੁਰ': 'Isapur',
        'ਮਿਲਕਵਾਲ': 'Milkwal',
        'ਜੱਸੇਵਾਲ': 'Jassewal',
        'ਜੱਸੋਵਾਲ': 'Jassewal',
        'ਸੈਂਸੇਵਾਲ ਕਲਾਂ': 'Sainsewal Kalan',
        'ਸੈੰเสਵਾਲ ਕਲਾਂ': 'Sainsewal Kalan',
        'ਮੰਡ ਉਧੋਵਾਲ': 'Mand Udhowal',
        'ਮੰਡ ਉੱਧੋਵਾਲ': 'Mand Udhowal',
        'ਰਹੀਆਂਬਾਦ ਕਲਾਂ': 'Rahianbad Kalan',
        'ਰਹੀਮਾਬਾਦ ਕਲਾਂ': 'Rahianbad Kalan',
        'ਜੀਵਨਪੁਰ': 'Jeevanpur',
        'ਮਾਣੇਵਾਲ': 'Maneval',
        'ਰਹੀਮਾਂਬਾਦ ਖੁਰਦ': 'Rahimabad Khurd',
        'ਹੰਢਾਂਬਾਦ ਖੁਰਦ': 'Rahimabad Khurd',
        'ਪੰਜਗਰਾਈਆਂ': 'Panjgaraiyan',
        'ਜਾਤੀਵਾਲ': 'Jatiwal',
        'ਜੁਲਗੜ੍ਹ': 'Julgarh',
        'ਲੱਖੋਵਾਲ ਕਲਾਂ': 'Lakhowal Kalan',
        'ਲੱਖੇਵਾਲ ਕਲਾਂ': 'Lakhowal Kalan',
        'ਚਾਵਾ ਰੋਡ': 'Chawa Road',
        'ਭੰਗਲਾਂ': 'Bhanglan',
        'ਭਗਵਾਨਪੁਰਾ': 'Bhagwanpura',
        'ਦਿਆਲਪੁਰਾ': 'Diyalpura',
        'ਕਕਰਾਲਾ ਖੁਰਦ': 'Kakrala Khurd',
        'ਕਕਰਾਲਾ ਕਲਾਂ': 'Kakrala Kalan',
        'ਬਰਮਾ': 'Barma',
        'ਪਵਾਤ': 'Pawat',
        'ਸਲੌਦੀ': 'Saloudi',
        'ਸਲੌਦੀ ਖੁਰਦ': 'Saloudi Khurd',
        'ਪ੍ਰੇਮ ਨਗਰ': 'Prem Nagar',
        'ਬੋਂਦਲੀ': 'Bondli',
        'ਉਟਾਲਾਂ': 'Otalan',
        'ਘੁਲਾਲ': 'Ghulal',
        'ਬਰਵਾਲੀ': 'Barwali',
        'ਕੋਟਲਾ': 'Kotla',
        'ਟੋਡਰਪੁਰ': 'Todarpur',
        'ਦਿਵਾਲਾ': 'Diwala',
        'ਬਗਲੀ ਕਲਾਂ': 'Bagli Kalan',
        'ਲੱਲ ਕਲਾਂ': 'Lall Kalan',
        'ਲੱਲ ਖੁਰਦ': 'Lall Khurd',
        'ਮੁਸਕਾਬਾਦ': 'Muskabad',
        'ਗਹਿਲੇਵਾਲ': 'Gahlewal',
        'ਕੁੱਬੇ': 'Kubbe',
        'ਰਾਜੇਵਾਲ': 'Rajewal',
        'ਮਾਦਪੁਰ': 'Madpur',
        'ਹਰਿਓਂ ਕਲਾਂ': 'Harion Kalan',
        'ਹਰਿਓਂ ਖੁਰਦ': 'Harion Khurd',
        'ਝੜੌਦੀ': 'Jharoudi',
        'ਚਹਿਲਾਂ': 'Chahilan',
        'ਸੇਹ': 'Seh',
        'ਸਿਆੜ੍ਹ': 'Siarh',
        'ਬੁਰਜ ਕੱਚਾ': 'Burj Kacha',
        'ਸ਼ੇਰੀਆਂ': 'Sherian',
        'ਸੇਰੀਆਂ': 'Sherian',
        'ਹੈਡੋਂ ਬੇਟ': 'Haidon Bet',
        'ਹੈਡੋ ਬੇਟ': 'Haido Bet',
        'ਛੋੜੀਆਂ': 'Chhorian',
        'ਸਰਬਤਗੜ': 'Sarbatgarh',
        'ਫਤਿਹਗੜ੍ਹ ਬੇਟ': 'Fatehgarh Bet',
        'ਚੱਕ ਲੋਹਟ': 'Chak Lohat',
        'ਸੇਰਪੁਰ ਬੇਟ': 'Sherpur Bet',
        'ਸੇਰਪੁਰ ਬੇਟ ਬਸਤੀ': 'Sherpur Bet Basti'
    }

    if not primary_en:
        primary_en = ro_dict.get(primary_pa, "")
        
    if not primary_en:
        # Fallback to romanization
        primary_en = f"Booth {b} ({primary_pa})" if primary_pa else f"Booth {b} (Samrala)"
        
    if not primary_pa:
        primary_pa = f"ਬੂਥ {b} (ਸਮਰਾਲਾ)"
        primary_en = f"Booth {b} (Samrala)"

    refined_names[b] = {
        'pa': primary_pa,
        'en': primary_en
    }

# Update samrala_comparison_data.json
with open('samrala_comparison_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for b in data['booths']:
    b_no = b['booth_no']
    if b_no in refined_names:
        rn = refined_names[b_no]
        b['village_en'] = rn['en']
        b['village_pa'] = rn['pa']
        b['village_english'] = rn['en']
        b['village_punjabi'] = rn['pa']
        b['exact_name_punjabi'] = rn['pa']

with open('samrala_comparison_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Copy to samrala-election-dashboard
with open('samrala-election-dashboard/src/data/samrala_comparison_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Updated samrala_comparison_data.json with refined names!")

# Re-run merge_samrala_data.py to refresh Excel & CSV
import subprocess
subprocess.run([sys.executable, 'merge_samrala_data.py'], check=True)

# Copy updated Excel and CSV to dashboard public & dist
import shutil
shutil.copy('Samrala_Master_Party_Booth_Analysis_2022_2024.xlsx', 'samrala-election-dashboard/public/')
shutil.copy('Samrala_All_Booths_Comparison.csv', 'samrala-election-dashboard/public/')
if os.path.exists('samrala-election-dashboard/dist'):
    shutil.copy('Samrala_Master_Party_Booth_Analysis_2022_2024.xlsx', 'samrala-election-dashboard/dist/')
    shutil.copy('Samrala_All_Booths_Comparison.csv', 'samrala-election-dashboard/dist/')

print("All files synchronized successfully!")
