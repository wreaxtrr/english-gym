const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../js/store.js'), 'utf8');
const KEY = 'english-gym-v1';
const clone = x => JSON.parse(JSON.stringify(x));

function legacy() {
  return {
    v: 1, created: 1780000000000,
    items: { 'b1_be#0': { b: 3, d: 20780, n: 8, w: 2, l: 20773 } },
    topics: { b1_be: { m: 0.89, n: 20, ok: 18, l: 20773, h: [0, 1, 1] } },
    passed: { b1_be: 20773 }, seenTheory: { b1_be: 20770 }, current: 'b1_art',
    bank: [{ term: 'interested in', tr: 'интересоваться', topic: 'b1_prep', at: 1780000000000, exported: true, n: 2 }],
    sessions: [{ at: 1780000000000, type: 'daily', topic: 'b1_be', n: 10, ok: 8, min: 15, bank: 1 }],
    writes: [{ at: 1780000000000, q: 'About me', part: '', text: 'I study at university.', issues: 0, words: 5 }],
    days: [20772, 20773],
    cur: { type: 'drill', topic: 'b1_be', plan: [{ sec: 'practice', kind: 'item', id: 'b1_be#0' }, { sec: 'summary', kind: 'summary' }], i: 0, res: [], bank: 0, before: { b1_be: 0.89 }, started: 1780000000000 },
    settings: { theme: 'dark', length: 'long', voice: '', rate: 0.9 }
  };
}

function boot(raw, shared) {
  const data = shared || new Map(raw === undefined ? [] : [[KEY, raw]]);
  let failKey = null, readError = false, id = 0;
  const timers = new Map(), win = new EventTarget(), doc = new EventTarget();
  const context = {
    CustomEvent, document: doc,
    localStorage: {
      getItem(k) { if (readError) throw Error('denied'); return data.get(k) ?? null; },
      setItem(k, v) { if (failKey === '*' || failKey === k) throw Error('quota'); data.set(k, v); }
    },
    setTimeout(fn) { timers.set(++id, fn); return id; }, clearTimeout(i) { timers.delete(i); },
    addEventListener: win.addEventListener.bind(win), dispatchEvent: win.dispatchEvent.bind(win)
  };
  context.window = context;
  vm.runInNewContext(source, context);
  return {
    S: context.EG.store, data,
    fail(k) { failKey = k; },
    pagehide() { win.dispatchEvent(new Event('pagehide')); },
    hide() { doc.visibilityState = 'hidden'; doc.dispatchEvent(new Event('visibilitychange')); },
    flush() { for (const fn of [...timers.values()]) fn(); timers.clear(); }
  };
}

test('v1 progress, settings, bank, history and paused run survive update and reload', () => {
  const original = legacy(), env = boot(JSON.stringify(original));
  for (const key of Object.keys(original)) assert.deepEqual(clone(env.S.state[key]), original[key]);
  assert.equal(env.S.error, '');
  assert.ok(env.S.saveNow());
  const again = boot(undefined, env.data);
  for (const key of Object.keys(original)) assert.deepEqual(clone(again.S.state[key]), original[key]);
});

test('pagehide and hidden visibility flush pending answers without waiting for debounce', () => {
  for (const event of ['pagehide', 'hide']) {
    const env = boot(JSON.stringify(legacy()));
    env.S.itemResult('b1_be#0', 'b1_be', true);
    env.S.state.cur.plan[0].answer = 'am';
    env[event]();
    const saved = JSON.parse(env.data.get(KEY));
    assert.equal(saved.items['b1_be#0'].n, 9);
    assert.equal(saved.cur.plan[0].answer, 'am');
  }
});

test('import and reset keep a recoverable copy of all previous progress', () => {
  const env = boot(JSON.stringify(legacy()));
  env.S.state.drafts['My essay'] = 'An unfinished essay';
  const before = clone(env.S.state), incoming = legacy(); incoming.days.push(20774);
  env.S.replace(incoming);
  assert.deepEqual(JSON.parse(env.S.backup()), before);
  assert.deepEqual(clone(env.S.state.days), incoming.days);
  const imported = clone(env.S.state);
  env.S.reset();
  assert.deepEqual(JSON.parse(env.S.backup()), imported);
  assert.deepEqual(clone(env.S.state.topics), {});
  assert.deepEqual(clone(env.S.state.settings), imported.settings);
});

test('malformed imports cannot change memory or storage', () => {
  for (const change of [s => s.bank = null, s => s.topics.b1_be.m = 'bad', s => s.cur.plan = [null], s => s.days = {}, s => s.v = 2, s => s.items['b1_be#0'].b = 99]) {
    const original = JSON.stringify(legacy()), env = boot(original), next = legacy();
    change(next);
    assert.throws(() => env.S.replace(next));
    assert.equal(env.data.get(KEY), original);
    assert.equal(env.S.state.topics.b1_be.m, 0.89);
    assert.equal(env.S.backup(), null);
  }
});

test('corrupt/unsupported saved data is never overwritten by fresh state', () => {
  for (const raw of ['{broken', '{"v":2,"topics":{}}', '{"v":1,"topics":{},"bank":null}']) {
    const env = boot(raw);
    assert.ok(env.S.error);
    env.S.topicResult('b1_be', true); env.flush(); env.pagehide();
    assert.equal(env.data.get(KEY), raw);
    env.S.replace(legacy());
    assert.equal(env.S.backup(), raw);
    assert.equal(env.S.error, '');
    assert.equal(env.S.state.topics.b1_be.n, 20);
  }
});

test('quota failure reports error and failed imports leave current state intact', () => {
  for (const key of [KEY, KEY + '-backup']) {
    const raw = JSON.stringify(legacy()), env = boot(raw), before = clone(env.S.state);
    env.fail(key);
    assert.throws(() => env.S.replace({ v: 1, topics: {} }));
    assert.deepEqual(clone(env.S.state), before);
    assert.equal(env.data.get(KEY), raw);
    assert.ok(env.S.error);
    env.fail(null); assert.ok(env.S.saveNow()); assert.equal(env.S.error, '');
  }
});

test('a stale tab cannot overwrite newer progress, including by import or pagehide', () => {
  const first = boot(JSON.stringify(legacy())), second = boot(undefined, first.data);
  first.S.itemResult('b1_be#0', 'b1_be', true); first.S.saveNow();
  const newer = first.data.get(KEY);
  second.S.itemResult('b1_be#0', 'b1_be', false);
  assert.equal(second.S.saveNow(), false);
  assert.match(second.S.error, /другой вкладке/);
  second.pagehide();
  assert.throws(() => second.S.replace(legacy()));
  assert.equal(first.data.get(KEY), newer);
});

test('writing drafts survive a new browser session and backup round trip', () => {
  const env = boot(JSON.stringify(legacy()));
  env.S.state.drafts['Question'] = 'I’m still writing this answer.';
  env.S.saveNow();
  const next = boot(undefined, env.data);
  assert.equal(next.S.state.drafts.Question, 'I’m still writing this answer.');
  next.S.replace(clone(next.S.state));
  assert.equal(next.S.state.drafts.Question, 'I’m still writing this answer.');
});
