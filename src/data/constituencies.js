import samralaData from './samrala_comparison_data.json';

export const CONSTITUENCIES = {
  SAMRALA: {
    id: 'SAMRALA',
    code: '58',
    name_en: '58 - Samrala',
    name_pa: '58 - ਸਮਰਾਲਾ',
    district_en: 'Fatehgarh Sahib PC (Ludhiana)',
    district_pa: 'ਫ਼ਤਿਹਗੜ੍ਹ ਸਾਹਿਬ ਲੋਕ ਸਭਾ (ਲੁਧਿਆਣਾ)',
    total_booths: 218,
    data: samralaData,
    excelFile: './Samrala_Master_Party_Booth_Analysis_2022_2024.xlsx',
    excelName: 'Samrala_Master_Party_Booth_Analysis_2022_2024.xlsx',
    csvFile: './Samrala_All_Booths_Comparison.csv',
    csvName: 'Samrala_All_Booths_Comparison.csv',
    candidates: {
      2022: {
        AAP: { short_en: 'AAP (Diyalpura)', short_pa: 'ਆਪ (ਦਿਆਲਪੁਰਾ)', name_en: 'Jagtar Singh Diyalpura', name_pa: 'ਜਗਤਾਰ ਸਿੰਘ ਦਿਆਲਪੁਰਾ' },
        INC: { short_en: 'INC (Raja Gill)', short_pa: 'ਕਾਂਗਰਸ (ਰਾਜਾ ਗਿੱਲ)', name_en: 'Rupinder Singh Raja Gill', name_pa: 'ਰੁਪਿੰਦਰ ਸਿੰਘ ਰਾਜਾ ਗਿੱਲ' },
        SAD: { short_en: 'SAD (Dhillon)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਢਿੱਲੋਂ)', name_en: 'Paramjit Singh Dhillon', name_pa: 'ਪਰਮਜੀਤ ਸਿੰਘ ਢਿੱਲੋਂ' },
        BJP: { short_en: 'BJP (Sharma)', short_pa: 'ਭਾਜਪਾ (ਸ਼ਰਮਾ)', name_en: 'Jitender Sharma', name_pa: 'ਜਤਿੰਦਰ ਸ਼ਰਮਾ' }
      },
      2024: {
        INC: { short_en: 'INC (Dr. Amar Singh)', short_pa: 'ਕਾਂਗਰਸ (ਡਾ. ਅਮਰ ਸਿੰਘ)', name_en: 'Dr. Amar Singh', name_pa: 'ਡਾ. ਅਮਰ ਸਿੰਘ' },
        AAP: { short_en: 'AAP (Gurpreet GP)', short_pa: 'ਆਪ (ਗੁਰਪ੍ਰੀਤ ਜੀਪੀ)', name_en: 'Gurpreet Singh GP', name_pa: 'ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ ਜੀਪੀ' },
        SAD: { short_en: 'SAD (Khalsa)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਖ਼ਾਲਸਾ)', name_en: 'Bikramjit Singh Khalsa', name_pa: 'ਬਿਕਰਮਜੀਤ ਸਿੰਘ ਖ਼ਾਲਸਾ' },
        BJP: { short_en: 'BJP (Valmiki)', short_pa: 'ਭਾਜਪਾ (ਵਾਲਮੀਕਿ)', name_en: 'Gejja Ram Valmiki', name_pa: 'ਗੇਜਾ ਰਾਮ ਵਾਲਮੀਕਿ' }
      }
    }
  }
};
