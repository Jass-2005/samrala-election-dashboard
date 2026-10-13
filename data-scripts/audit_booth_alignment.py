import pandas as pd
import numpy as np
import sys

sys.stdout.reconfigure(encoding='utf-8')

df22 = pd.read_csv('Samrala_2022_Assembly_Booth_Results.csv')
df24 = pd.read_csv('Samrala_2024_Parliamentary_Booth_Results.csv')

print(f"2022 Booth count: {len(df22)}")
print(f"2024 Booth count: {len(df24)}")

merged = pd.merge(df22, df24, on='Booth No')
print(f"Matched Booth count: {len(merged)}")

# Turnout correlation
r_turnout = np.corrcoef(merged['Total Votes Polled (2022)'], merged['Total Votes Polled (2024)'])[0, 1]
print(f"\nTurnout Correlation (2022 vs 2024): {r_turnout:.4f}")

# Check difference in turnout
merged['Diff'] = merged['Total Votes Polled (2024)'] - merged['Total Votes Polled (2022)']
merged['Pct_Diff'] = (merged['Diff'] / merged['Total Votes Polled (2022)']) * 100

print(f"Mean turnout change: {merged['Diff'].mean():.1f} votes ({merged['Pct_Diff'].mean():.1f}%)")
print(f"Standard deviation of change: {merged['Diff'].std():.1f} votes")
print(f"Min turnout change: {merged['Diff'].min()} votes")
print(f"Max turnout change: {merged['Diff'].max()} votes")

# Check if any booths have extreme divergence (outliers)
outliers = merged[abs(merged['Pct_Diff']) > 50]
print(f"\nBooths with >50% turnout change: {len(outliers)}")
if len(outliers) > 0:
    print(outliers[['Booth No', 'Total Votes Polled (2022)', 'Total Votes Polled (2024)', 'Diff', 'Pct_Diff']])

# Check correlations of party votes where same party / ideology exists
r_aap = np.corrcoef(merged['AAP Votes (2022)'], merged['AAP Votes (2024)'])[0, 1]
r_inc = np.corrcoef(merged['INC Votes (2022)'], merged['INC Votes (2024)'])[0, 1]
r_sad = np.corrcoef(merged['SAD Votes (2022)'], merged['SAD Votes (2024)'])[0, 1]
r_bjp = np.corrcoef(merged['BJP Votes (2022)'], merged['BJP Votes (2024)'])[0, 1]

print(f"\nParty Vote Correlations across 218 booths:")
print(f"AAP (2022 vs 2024): {r_aap:.4f}")
print(f"INC (2022 vs 2024): {r_inc:.4f}")
print(f"SAD (2022 vs 2024): {r_sad:.4f}")
print(f"BJP (2022 vs 2024): {r_bjp:.4f}")

# Print first 20 booths side-by-side
print("\nFirst 20 Booths Side-by-Side Inspection:")
cols = ['Booth No', 'Total Votes Polled (2022)', 'Total Votes Polled (2024)', 'AAP Votes (2022)', 'AAP Votes (2024)', 'INC Votes (2022)', 'INC Votes (2024)', 'SAD Votes (2022)', 'SAD Votes (2024)', 'Winner Party (2022)', 'Winner Party (2024)']
print(merged[cols].head(20).to_string())
