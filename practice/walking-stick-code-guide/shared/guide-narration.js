// English guide recordings are generated locally. Original word recordings stay separate.
let active = null;
export function stopGuideNarration() {
  const session = active;
  active = null;
  if (!session) return;
  session.audio.pause();
  session.audio.removeAttribute('src');
  session.audio.load();
  session.audio.remove();
  session.reset();
}
export function attachNarration(button, status, file) {
  button.addEventListener('click', () => {
    if (active?.button === button) { stopGuideNarration(); return; }
    stopGuideNarration();
    document.querySelectorAll('audio,video').forEach(audio => audio.pause());
    const audio = document.createElement('audio');
    audio.id = 'fm-guide-narration';
    audio.hidden = true;
    audio.preload = 'none';
    audio.src = file;
    document.body.append(audio);
    const reset = () => {
      if (!button.isConnected) return;
      button.textContent = 'Read aloud';
      button.setAttribute('aria-pressed', 'false');
      status.textContent = '';
    };
    const session = {audio, button, reset};
    active = session;
    const fail = () => {
      if (active !== session) return;
      stopGuideNarration();
      if (status.isConnected) status.textContent = 'Could not load the recording. Press Read aloud to try again.';
    };
    audio.addEventListener('ended', () => { if (active === session) stopGuideNarration(); });
    audio.addEventListener('error', fail);
    audio.addEventListener('playing', () => { if (active === session) status.textContent = ''; });
    button.textContent = 'Stop reading';
    button.setAttribute('aria-pressed', 'true');
    status.textContent = 'Loading voice…';
    audio.play().catch(fail);
  });
}
if (typeof window !== 'undefined') window.addEventListener('pagehide', stopGuideNarration);
if (typeof document !== 'undefined') document.addEventListener('play', event => {
  if (['AUDIO','VIDEO'].includes(event.target.tagName) && event.target !== active?.audio) stopGuideNarration();
}, true);
