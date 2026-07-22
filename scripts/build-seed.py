import json
import random
import string

def key():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=12))

def text_block(text, style='normal', strong=False, list_item=None, level=None):
    span = {'_type': 'span', '_key': key(), 'text': text, 'marks': ['strong'] if strong else []}
    block = {
        '_type': 'block',
        '_key': key(),
        'style': style,
        'children': [span],
        'markDefs': [],
    }
    if list_item:
        block['listItem'] = list_item
        block['level'] = level or 1
    return block

with open(r"Q:\Claude\colleenmccann-net\scripts\paper-extract.json", encoding='utf-8') as f:
    raw_blocks = json.load(f)

# Skip the first two paragraphs (title + subtitle) -- those map to the
# Sanity document's own `title` field, not the body.
raw_blocks = raw_blocks[2:]

body = []
for b in raw_blocks:
    if b['type'] == 'p':
        style = b['style'] if b['style'] in ('h1', 'h2', 'h3') else 'normal'
        body.append(text_block(b['text'], style=style))
    elif b['type'] == 'table':
        for row in b['rows']:
            for cell in row:
                cell = cell.strip()
                if not cell:
                    continue
                lines = [l.strip() for l in cell.split('\n') if l.strip()]
                if not lines:
                    continue
                body.append(text_block(lines[0], strong=True))
                for line in lines[1:]:
                    body.append(text_block(line, list_item='bullet', level=1))

with open(r"Q:\Claude\colleenmccann-net\scripts\paper-body.json", 'w', encoding='utf-8') as f:
    json.dump(body, f, ensure_ascii=False, indent=2)

print(f"Built {len(body)} portable text blocks")

# ---- Assemble the full NDJSON seed ----

about = {
    '_id': 'about',
    '_type': 'about',
    'name': 'Colleen McCann',
    'headshot': {
        '_sanityAsset': 'image@file://./assets/colleen-headshot.jpg',
        'alt': 'Portrait of Colleen McCann',
    },
    'bio': [
        text_block(
            "My name is Colleen McCann and I connect ideas across disciplines, translating "
            "complexity into practical insight for leaders navigating what's next. My work draws "
            "on 27 years as a technical leader across engineering, automation and research. I've "
            "led cross disciplinary teams within multi-million dollar programs to achieve success "
            "and deliver value. I guide critical, business-accelerating research initiatives for "
            "small and medium-sized businesses by helping them navigate technical and business "
            "model hurdles."
        ),
        text_block(
            "Holding an Executive MBA and a degree in mechatronics engineering, I'm a certified "
            "Project Management Professional and Change Management Specialist. I'm also a "
            "published author, a speaker, a part-time professor, a personal development coach "
            "and a proud community mentor with Big Brothers Big Sisters."
        ),
        text_block(
            "I developed Strategy Language©, a business-specific system for influential "
            "communication grounded in the science of modeling excellence - Neurolinguistic "
            "Programming. My passion is uniting knowledge and experience into the synthesis of "
            "high-quality information — lighting the way for idea exchange, impactful "
            "insights and real conversation."
        ),
    ],
}

contact = {
    '_id': 'contact',
    '_type': 'contact',
    'blurb': 'For speaking inquiries, collaboration, or media requests, reach out directly.',
    'email': 'vc.mccann@yahoo.ca',
    'linkedinUrl': 'https://www.linkedin.com/in/colleenmccannpmp',
}

research_pl = {
    '_id': 'research-46-employee-vs-3-robot',
    '_type': 'research',
    'title': 'The $46 Employee vs. The $3 Robot — A Dual-Scenario P&L Business Case: 2026 Reality vs. 2031 Maturity',
    'slug': {'_type': 'slug', 'current': '46-employee-vs-3-robot'},
    'publishDate': '2026-07-22',
    'abstract': (
        'A dual-scenario P&L business case comparing the full cost of human labour against '
        'humanoid robot and AI agent labour for a representative $5 million small enterprise — '
        'modelling both 2026 pricing and 2031 projected maturity, and asking what happens to the '
        'economy those robots are meant to serve.'
    ),
    'topics': ['AI & Robotics', 'Business'],
    'hostingType': 'onsite',
    'body': body,
}

research_nlp = {
    '_id': 'research-nlp-communications-model',
    '_type': 'research',
    'title': "Going Beyond PMI's Communications Plan: Leveraging the NLP Communications Model",
    'slug': {'_type': 'slug', 'current': 'going-beyond-pmis-communications-plan'},
    'publishDate': '2025-09-01',
    'abstract': (
        "An examination of how Neurolinguistic Programming's communications model extends and "
        "strengthens PMI's standard project communications planning framework for more "
        "influential, effective project leadership."
    ),
    'topics': ['Communication', 'Leadership'],
    'hostingType': 'external',
    'externalUrl': "https://www.researchgate.net/publication/395382632_Going_Beyond_PMI's_Communications_Plan_Leveraging_the_NLP_Communications_Model",
    'externalSourceName': 'ResearchGate',
}

media_keynote = {
    '_id': 'media-cme-lean-consortium',
    '_type': 'media',
    'title': 'Applied Projects, Industry Collaboration & Funding',
    'type': 'Keynote',
    'date': '2026-07-17',
    'host': 'Canadian Manufacturers & Exporters — Lean Consortium',
}

media_cambridge = {
    '_id': 'media-cambridge-chamber',
    '_type': 'media',
    'title': 'Human-Machine Interaction & Workforce Transformation',
    'type': 'Co-presentation',
    'date': '2026-03-18',
    'host': 'Cambridge Chamber of Commerce',
}

media_podcast = {
    '_id': 'media-understanding-projects-podcast',
    '_type': 'media',
    'title': 'Managing vs Leading Projects',
    'type': 'Podcast',
    'date': '2021-11-16',
    'host': 'Understanding Projects Podcast #31',
    'linkUrl': 'https://www.youtube.com/watch?v=GTXbWbDabJo&list=PL99wASlf1mNpkSrNfyt4Gs8SfizIBTc04&index=20',
    'linkLabel': 'Watch',
}

docs = [about, contact, research_pl, research_nlp, media_keynote, media_cambridge, media_podcast]

with open(r"Q:\Claude\colleenmccann-net\scripts\seed.ndjson", 'w', encoding='utf-8') as f:
    for doc in docs:
        f.write(json.dumps(doc, ensure_ascii=False) + '\n')

print(f"Wrote {len(docs)} documents to seed.ndjson")
