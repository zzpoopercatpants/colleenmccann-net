import json
from docx import Document
from docx.oxml.ns import qn

path = r"Q:\Claude\colleenmccann-net\Human_vs_Humanoid_Labour_PL_Business_Case_FINAL.docx"
doc = Document(path)

blocks = []

def iter_block_items(parent):
    parent_elm = parent.element.body
    for child in parent_elm.iterchildren():
        if child.tag == qn('w:p'):
            from docx.text.paragraph import Paragraph
            yield ('p', Paragraph(child, parent))
        elif child.tag == qn('w:tbl'):
            from docx.table import Table
            yield ('tbl', Table(child, parent))

def para_info(p):
    text = p.text.strip()
    style = (p.style.name or '').lower()
    runs = [r for r in p.runs if r.text.strip()]
    all_bold = bool(runs) and all(r.bold for r in runs)
    return text, style, all_bold

for kind, item in iter_block_items(doc):
    if kind == 'p':
        text, style, all_bold = para_info(item)
        if not text:
            continue
        level = None
        if 'heading 1' in style or style == 'title':
            level = 'h1'
        elif 'heading 2' in style:
            level = 'h2'
        elif 'heading 3' in style:
            level = 'h3'
        elif all_bold and len(text) < 90:
            level = 'h3'
        blocks.append({'type': 'p', 'style': level or 'normal', 'text': text, 'bold': all_bold})
    else:
        rows = []
        for row in item.rows:
            rows.append([cell.text.strip() for cell in row.cells])
        blocks.append({'type': 'table', 'rows': rows})

with open(r"Q:\Claude\colleenmccann-net\scripts\paper-extract.json", 'w', encoding='utf-8') as f:
    json.dump(blocks, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(blocks)} blocks")
for b in blocks:
    if b['type'] == 'p' and b['style'] != 'normal':
        print(b['style'], '-', b['text'][:70])
