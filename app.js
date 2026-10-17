const promptEl = document.getElementById('prompt');
const charCount = document.getElementById('charCount');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

promptEl.addEventListener('input', () => {
  charCount.textContent = `${promptEl.value.length} / 2000`;
  const text = promptEl.value.trim();
  document.getElementById('previewTitle').textContent = text ? (text.length > 54 ? text.slice(0, 54).trim() + '…' : text) : 'A story waiting to happen.';
});

document.querySelectorAll('[data-prompt]').forEach(button => {
  button.addEventListener('click', () => {
    promptEl.value = button.dataset.prompt;
    promptEl.dispatchEvent(new Event('input'));
    promptEl.focus();
  });
});

function getProjectBrief() {
  return {
    prompt: promptEl.value.trim(),
    style: document.getElementById('style').value,
    format: document.getElementById('format').value,
    durationSeconds: Number(document.getElementById('duration').value),
    voiceover: document.getElementById('voice').value,
    backgroundMusic: document.getElementById('music').checked
  };
}

document.getElementById('format').addEventListener('change', event => {
  const format = event.target.value;
  const names = {'9:16':'VERTICAL','16:9':'LANDSCAPE','1:1':'SQUARE'};
  document.getElementById('aspectTag').textContent = `${format} · ${names[format]}`;
});

document.getElementById('duration').addEventListener('change', event => {
  document.getElementById('durationMeta').textContent = `Target: ${event.target.value} sec`;
});

document.getElementById('generateBtn').addEventListener('click', async () => {
  const brief = getProjectBrief();
  if (brief.prompt.length < 10) {
    showToast('Add a little more detail to your prompt first.');
    promptEl.focus();
    return;
  }

  const button = document.getElementById('generateBtn');
  const oldText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<span>✦</span> Preparing your brief…';
  const panel = document.getElementById('outputPanel');
  panel.innerHTML = `<div class="output-icon">✦</div><div><h3>Project brief ready</h3><p>Your settings have been organised. This demo does not render an actual video yet.</p><ul class="brief-list">
    <li><b>Style:</b> ${escapeHTML(brief.style)}</li>
    <li><b>Format:</b> ${escapeHTML(brief.format)}</li>
    <li><b>Target duration:</b> ${brief.durationSeconds} seconds</li>
    <li><b>Voiceover:</b> ${escapeHTML(brief.voiceover)}</li>
    <li><b>Background music:</b> ${brief.backgroundMusic ? 'Planned' : 'Off'}</li>
  </ul><button type="button" id="downloadBrief" style="margin-top:12px;border:1px solid #51467d;border-radius:8px;background:#25203e;color:#dcd4ff;padding:9px 11px;font-size:10px;font-weight:700;cursor:pointer">Download project brief (.txt) ↓</button></div>`;
  document.getElementById('downloadBrief').addEventListener('click', () => downloadBrief(brief));
  button.disabled = false;
  button.innerHTML = oldText;
  showToast('Project brief prepared. Real video generation needs an AI provider connection.');
});

function downloadBrief(brief) {
  const content = [
    'dhaLewis AI Video Studio — Project Brief',
    '========================================',
    '',
    'PROMPT', brief.prompt, '',
    'STYLE', brief.style, '',
    'FORMAT', brief.format, '',
    'TARGET DURATION', `${brief.durationSeconds} seconds`, '',
    'VOICEOVER', brief.voiceover, '',
    'BACKGROUND MUSIC', brief.backgroundMusic ? 'Planned' : 'Off', '',
    'NOTE', 'This is a production brief, not a rendered video.'
  ].join('\\n');
  const blob = new Blob([content], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'dhaLewis-video-project-brief.txt';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

document.getElementById('upgradeBtn').addEventListener('click', () => {
  showToast('Paid plans can be added after video generation and usage costs are confirmed.');
});
