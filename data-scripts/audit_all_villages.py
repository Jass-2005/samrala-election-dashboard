import os
import sys
import pandas as pd
import json

sys.stdout.reconfigure(encoding='utf-8')

booth_audit = []

for b in range(1, 219):
    sec_names = []
    # 1. From sections.txt
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
                        
    # 2. From voters_share.csv
    csv_sec = ""
    csv_file = f"e:/SAMRALA/{b}/booth{b}_voters_share.csv"
    if os.path.exists(csv_file):
        try:
            df = pd.read_csv(csv_file, nrows=5)
            if 'Section Name and No.' in df.columns and len(df) > 0:
                csv_sec = str(df['Section Name and No.'].iloc[0]).strip()
        except:
            pass

    primary_pa = sec_names[0][0] if sec_names else (csv_sec.split('-', 1)[-1].strip() if '-' in csv_sec else csv_sec)
    primary_en = sec_names[0][1] if sec_names and not sec_names[0][1].lower().startswith("section") else ""
    
    booth_audit.append({
        'booth_no': b,
        'primary_pa': primary_pa,
        'primary_en': primary_en,
        'all_sections': [s[0] for s in sec_names],
        'csv_sec': csv_sec
    })

print(f"Total booths audited: {len(booth_audit)}")

# Check first 20 booths
print("\nFirst 20 Booths Master Mapping:")
for item in booth_audit[:20]:
    b = item['booth_no']
    print(f"Booth {b:3d} -> PA: {item['primary_pa']:<25} | EN: {item['primary_en']:<20} | Raw CSV: {item['csv_sec']}")

# Check last 10 booths
print("\nLast 10 Booths Master Mapping (209 to 218):")
for item in booth_audit[208:]:
    b = item['booth_no']
    print(f"Booth {b:3d} -> PA: {item['primary_pa']:<25} | EN: {item['primary_en']:<20} | Raw CSV: {item['csv_sec']}")
