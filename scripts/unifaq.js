// UniFAQ - fetch FAQs and display top-3 matches for given keywords

async function loadFAQs() {
    try {
        const res = await fetch('../data/questions.json');
        if (!res.ok) throw new Error('Failed to load FAQs');
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('UniFAQ load error', err);
        return [];
    }
}

function scoreFAQ(faq, terms) {
    if (!terms.length) return 0;
    const text = ((faq.question || '') + ' ' + (faq.answer || '')).toLowerCase();
    let score = 0;
    for (const t of terms) {
        if (!t) continue;
        if (text.includes(t)) score += 2;
        // partial word matches
        const parts = t.split('');
        if (parts.length > 2 && text.indexOf(t) !== -1) score += 1;
    }
    return score;
}

function renderResults(results) {
    const container = document.getElementById('unifaqResults');
    if (!results.length) {
        container.innerHTML = '<div class="faq-item">Không tìm thấy kết quả. Thử từ khóa khác.</div>';
        return;
    }
    container.innerHTML = results.map(r => `
        <div class="faq-item">
            <div style="display:flex; justify-content:space-between; gap:1rem;">
                <div style="flex:1"><strong>${r.question}</strong><div style="margin-top:0.5rem;color:#444">${r.answer || ''}</div></div>
                <div class="faq-score">${r.score}</div>
            </div>
        </div>
    `).join('');
}

async function initUniFAQ() {
    const faqs = await loadFAQs();
    const input = document.getElementById('unifaqInput');
    const btn = document.getElementById('unifaqBtn');

    async function doSearch() {
        const raw = input.value.trim().toLowerCase();
        const terms = raw.split(/\s+/).filter(Boolean);
        if (!terms.length) {
            // show top 3 by fallback (first 3 items)
            renderResults(faqs.slice(0,3).map((q,i)=>({...q,score:0})));
            return;
        }
        const scored = faqs.map(f => ({...f, score: scoreFAQ(f, terms)}));
        scored.sort((a,b) => b.score - a.score);
        const top3 = scored.filter(s=>s.score>0).slice(0,3);
        // If none scored, show fuzzy top 3 by fulltext substring count
        if (top3.length === 0) {
            const alt = scored.slice(0,3).map(s=>({...s, score:0}));
            renderResults(alt);
            return;
        }
        renderResults(top3);
    }

    btn.addEventListener('click', doSearch);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });

    // initial: show first 3
    renderResults(faqs.slice(0,3).map((q,i)=>({...q,score:0})));
}

// init when DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUniFAQ);
} else {
    initUniFAQ();
}
