// Isolated browser profile and local server: never opens the user's live progress.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const KEY = 'english-gym-v1';

(async () => {
  const server = http.createServer((req, res) => {
    const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404).end(); return; }
      res.setHeader('Content-Type', ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' })[path.extname(file)] || 'application/octet-stream');
      res.end(data);
    });
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) });
    const context = await browser.newContext();
    // Fonts are optional; tests need no external network access.
    await context.route('https://**/*', route => route.abort());
    const page = await context.newPage(), errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const base = `http://127.0.0.1:${server.address().port}/`;
    const nav = async hash => { await page.goto(base + hash); await page.locator('#view > *').first().waitFor(); };
    await nav('#today');
    for (const hash of ['#map', '#stats', '#write', '#ielts', '#bank', '#today']) await nav(hash);
    console.log('PASS: all six screens render');

    // Put a real content item first so the test does not depend on random selection.
    await page.evaluate(() => {
      const E = EG.engine, S = EG.store, t = E.units[0];
      const it = t.items.find(i => i.t === 'gap');
      E.buildDrill(t.id, 3);
      S.state.cur.plan = [{ sec: 'practice', kind: 'item', id: it.id }, { sec: 'summary', kind: 'summary' }];
      S.state.cur.i = 0; S.saveNow();
    });
    await nav('#session');
    await page.locator('#ans').fill('my unfinished answer');
    await page.locator('[data-act=pause]').click();
    await page.getByRole('button', { name: 'Продолжить', exact: true }).click();
    assert.equal(await page.locator('#ans').inputValue(), 'my unfinished answer');
    await page.locator('[data-act=check]').click();
    assert.equal(await page.locator('#fb').isVisible(), true);
    await page.reload();
    assert.equal(await page.locator('#fb').isVisible(), true);
    assert.equal(await page.locator('#ans').inputValue(), 'my unfinished answer');
    await page.locator('[data-act=next]').click();
    const once = await page.evaluate(() => {
      const r = EG.store.state.cur.res.find(r => r.id);
      return { id: r.id, n: EG.store.state.items[r.id].n };
    });
    await page.reload();
    assert.equal(await page.evaluate(id => EG.store.state.items[id].n, once.id), once.n);
    console.log('PASS: unfinished and checked answers survive pause/reload without double counting');

    await nav('#today');
    const prior = await page.evaluate(() => JSON.stringify(EG.store.state.cur));
    page.once('dialog', dialog => dialog.dismiss());
    await page.locator('[data-act=restart]').click();
    assert.equal(await page.evaluate(() => JSON.stringify(EG.store.state.cur)), prior);
    console.log('PASS: cancelling a new session preserves the paused run');

    await nav('#ielts');
    const writing = page.locator('.wtext');
    const good = 'I’m a student at university. I study English every day because I want to improve my skills.';
    await writing.fill(good);
    await nav('#today');
    await nav('#ielts');
    assert.equal(await writing.inputValue(), good);
    await page.locator('#iw [data-act=check]').click();
    await writing.fill('I interested in programming and I want to improve my English every day.');
    assert.equal(await page.locator('#iw [data-act=done]').count(), 0);
    await writing.fill(good);
    await page.locator('#iw [data-act=check]').click();
    await page.locator('#iw [data-act=done]').click();
    const saved = await page.evaluate(() => EG.store.state.writes[0]);
    assert.equal(saved.text, good);
    assert.equal(saved.issues, 0);
    console.log('PASS: drafts persist; editing invalidates stale feedback; curly apostrophes save correctly');

    await nav('#stats');
    const beforeImport = await page.evaluate(() => JSON.stringify(EG.store.state));
    await page.locator('details.paste summary').click();
    await page.locator('#impt').fill('{"v":1,"topics":{},"bank":null}');
    await page.locator('[data-act=importtext]').click();
    assert.equal(await page.evaluate(() => JSON.stringify(EG.store.state)), beforeImport);
    await page.locator('#impt').fill('{"v":1,"topics":{}}');
    page.once('dialog', d => d.accept());
    await page.locator('[data-act=importtext]').click();
    assert.equal(await page.evaluate(() => EG.store.backup()), beforeImport);
    console.log('PASS: invalid imports are rejected; valid import backs up prior data');

    const other = await context.newPage();
    await other.goto(base + '#stats');
    await other.evaluate(() => { EG.store.addBank('newer progress', 'новый прогресс'); EG.store.saveNow(); });
    const latest = await other.evaluate(key => localStorage.getItem(key), KEY);
    await page.locator('#set_len').selectOption('long');
    await page.waitForFunction(() => Boolean(EG.store.error));
    assert.equal(await page.locator('#storage-notice').isVisible(), true);
    assert.equal(await page.evaluate(key => localStorage.getItem(key), KEY), latest);
    console.log('PASS: concurrent tabs preserve newer progress and show a warning');
    await other.close();

    await page.reload();
    const target = path.join(root, 'test-results'); fs.mkdirSync(target, { recursive: true });
    await page.setViewportSize({ width: 390, height: 844 });
    for (const hash of ['#today', '#map', '#stats', '#ielts']) {
      await nav(hash);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'mobile overflow on ' + hash);
    }
    await page.screenshot({ path: path.join(target, 'mobile.png'), fullPage: true });
    await page.setViewportSize({ width: 1365, height: 900 });
    await nav('#stats');
    await page.screenshot({ path: path.join(target, 'progress.png'), fullPage: true });
    assert.deepEqual(errors, []);
    console.log('PASS: mobile layouts and browser console');
    await context.close();
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
