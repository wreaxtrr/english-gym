/* Озвучка через встроенный в браузер синтез речи (Web Speech API). Без сети и ключей. */
window.EG = window.EG || {};

EG.tts = (function () {
  const synth = window.speechSynthesis;
  const ok = !!(synth && window.SpeechSynthesisUtterance);
  let voices = [];
  function loadVoices() {
    if (!ok) return;
    voices = synth.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
  }
  if (ok) { loadVoices(); synth.onvoiceschanged = loadVoices; }

  function pick() {
    const want = EG.store.state.settings.voice;
    if (want) { const v = voices.find((x) => x.name === want); if (v) return v; }
    return voices.find((v) => /en[-_]US/i.test(v.lang) && /google|natural|samantha|aria|jenny/i.test(v.name))
      || voices.find((v) => /en[-_](US|GB)/i.test(v.lang)) || voices[0] || null;
  }

  function speak(text, slow) {
    if (!ok) return false;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = pick();
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-US";
    const base = EG.store.state.settings.rate || 0.95;
    u.rate = slow ? Math.max(0.5, base * 0.65) : base;
    synth.speak(u);
    return true;
  }

  return { get ok() { return ok; }, speak, get voices() { return voices; } };
})();
