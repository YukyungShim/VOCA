import zipfile
import json
import xml.etree.ElementTree as ET
import sys
import os

def parse_xlsx(filename):
    with zipfile.ZipFile(filename, 'r') as z:
        strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            ss_tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
            for si in ss_tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
                texts = [t.text for t in si.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') if t.text]
                strings.append(''.join(texts))
        
        sheet_tree = ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
        rows_data = []
        for r in sheet_tree.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row'):
            row_dict = {}
            for c in r.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
                r_ref = c.get('r')
                col_letter = ''.join([ch for ch in r_ref if ch.isalpha()])
                t = c.get('t')
                v = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                val = v.text if v is not None else ''
                if t == 's' and val.isdigit():
                    val = strings[int(val)]
                row_dict[col_letter] = val.strip()
            rows_data.append(row_dict)
        
        words = []
        current_word = None
        
        for row in rows_data[1:]: # skip header
            num_str = row.get('A', '')
            w_str = row.get('B', '')
            pos_str = row.get('C', '')
            mean_str = row.get('D', '')
            
            if not num_str and not w_str and not pos_str and not mean_str:
                continue
                
            if num_str and w_str:
                if current_word:
                    words.append(current_word)
                current_word = {
                    'num': float(num_str) if '.' in num_str else int(num_str) if num_str.isdigit() else len(words) + 1,
                    'word': w_str,
                    'details': [{'pos': pos_str, 'meaning': mean_str}] if (pos_str or mean_str) else []
                }
            elif current_word:
                if pos_str or mean_str:
                    current_word['details'].append({'pos': pos_str, 'meaning': mean_str})
                    
        if current_word:
            words.append(current_word)
            
        return words

base_dir = r"C:\Users\플랜트안전부\Desktop\YukyungShim\TEPS VOCA"
f248 = os.path.join(base_dir, "TEPS 선별 영어 단어 248개.xlsx")
f900 = os.path.join(base_dir, "TEPS 영어 단어 900개(387점용).xlsx")

words248 = parse_xlsx(f248)
words900 = parse_xlsx(f900)

print(f"248 words count: {len(words248)}")
print(f"900 words count: {len(words900)}")

out_data = {
    "group_248": words248,
    "group_900": words900
}

out_path = os.path.join(base_dir, "teps_voca_data.json")
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(out_data, f, ensure_ascii=False, indent=2)

print("Saved data to", out_path)
