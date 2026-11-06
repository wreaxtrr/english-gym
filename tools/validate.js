// Проверка контента: node tools/validate.js
global.window = global;
const dir = require('path').resolve(__dirname, '..');
['content-b1','content-b2','content-c1','content-roadmap','content-ielts','checker'].forEach(f => require(dir + '/js/' + f + '.js'));
const C = EG.check; let problems = 0;
const ids = new Set();
for (const t of EG.topics) {
  if (!t.items || !t.items.length) { console.log('EMPTY topic', t.id); problems++; }
  if (!EG.stages.some((s) => s.id === t.stage)) { console.log('BAD stage', t.id); problems++; }
  (t.items||[]).filter(i=>i.focus).forEach(i=>i.focus.forEach(f=>{ if(!EG.topics.some(x=>x.id===f)) { console.log('BAD focus', t.id, f); problems++; } }));
  if (ids.has(t.id)) { console.log('DUP topic', t.id); problems++; } ids.add(t.id);
  (t.items||[]).forEach((it, i) => {
    const tag = t.id + '#' + i + ' ' + it.t;
    if (it.o) { if (typeof it.a !== 'number' || it.a < 0 || it.a >= it.o.length) { console.log('BAD idx', tag); problems++; } return; }
    if (it.t === 'write') { const r = C.checkWriting(it.model); r.issues.forEach(x => { console.log('MODEL FP', tag, '|', x.text, '|', x.msg); problems++; }); return; }
    if (it.t === 'rw' && !it.h) { console.log('NO INSTR', tag); problems++; }
    if (it.t === 'gap' && !it.q.includes('___')) { console.log('NO GAP', tag); problems++; }
    const ans = C.answersOf(it);
    if (!ans.length || ans.some(a => !a)) { console.log('EMPTY ans', tag); problems++; }
    if ((it.t === 'fix' || it.t === 'rw') && C.check(it, it.q).ok) { console.log('FIX accepts wrong', tag, it.q); problems++; }
    if (it.t === 'fix' || it.t === 'tr' || it.t === 'rw') {
      const seen = new Set();
      ans.forEach(a => { const n = C.norm(a); if (seen.has(n)) return; seen.add(n);
        C.checkWriting(a).issues.forEach(x => { console.log('ANS FP', tag, '|', a, '|', x.text, '|', x.msg); problems++; }); });
    }
  });
}
for (const p of EG.ielts) if (p.model) C.checkWriting(p.model).issues.forEach(x => { console.log('IELTS FP', p.q.slice(0,30), x.text, x.msg); problems++; });
const n = EG.topics.reduce((a,t)=>a+(t.items||[]).length,0);
console.log('topics', EG.topics.length, 'items', n, 'problems', problems);
process.exitCode = problems ? 1 : 0;
