const STORAGE_KEY = 'g8:lunchapp:summative-1:v1';
const DB_NAME = 'g8-lunchapp-summative-1';
const DB_VERSION = 1;
const TESTS = [
  { id: 'test1', number: 1, food: 'one', action: 'Choose food 1 in your app, then press Confirm.' },
  { id: 'test2', number: 2, food: 'two', action: 'Choose food 2 in your app, then press Confirm.' },
  { id: 'test3', number: 3, food: 'one', action: 'Choose food 1 again, then press Confirm.' }
];
const blankState = () => ({
  page: 'instructions',
  name: '',
  group: '',
  foodOne: 'Rice',
  foodTwo: 'Vegetables',
  tests: {
    test1: { actual: '', decision: '' },
    test2: { actual: '', decision: '' },
    test3: { actual: '', decision: '' }
  },
  explanation: ''
});
let state = loadState();
let databasePromise;
let activeObjectUrl;
const main = document.querySelector('#fm-main');
const nav = document.querySelector('#step-navigation');
const warning = document.querySelector('#save-warning');
const toast = document.querySelector('#toast');
const dialog = document.querySelector('#identity-dialog');

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!saved || typeof saved !== 'object') return blankState();
    const base = blankState();
    return {
      ...base,
      ...saved,
      tests: Object.fromEntries(Object.keys(base.tests).map(id => [id, { ...base.tests[id], ...(saved.tests?.[id] || {}) }]))
    };
  } catch {
    return blankState();
  }
}
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    warning.textContent = '';
  } catch {
    warning.textContent = 'This browser could not save your text. Download the PDF before leaving this page.';
  }
}
function clean(value) { return String(value ?? '').trim(); }
function selectedFood(which) { return clean(which === 'one' ? state.foodOne : state.foodTwo); }
function expectedMessage(which) { return `You chose: ${selectedFood(which) || '________'}`; }
function formatDate() {
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());
}
function setToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(setToast.timer);
  setToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}
function updateHeader() {
  const fullName = clean(state.name) || 'Name not entered';
  const group = clean(state.group);
  document.querySelector('#student-summary').textContent = group ? `${fullName} · ${group}` : fullName;
}
function renderNav() {
  const pages = [
    ['instructions', 'Instructions'], ['test1', 'Test 1'], ['test2', 'Test 2'],
    ['test3', 'Test 3'], ['explain', 'Explain']
  ];
  nav.innerHTML = pages.map(([id, label], index) => `<button class="step-link" type="button" data-page="${id}" ${state.page === id ? 'aria-current="step"' : ''}><span class="long-label">${label}</span><span class="short-label">${label}</span><span class="page-count">${index + 1} of 5</span></button>`).join('');
}
function renderInstructions() {
  main.innerHTML = `
    <header class="fm-hero">
      <p class="fm-label">Page 1 of 5 · Start here</p>
      <h1>Complete your lunch app</h1>
      <div>Use your saved app. Check what it says when you choose a food.</div>
    </header>
    <section class="fm-block">
      <h2>First, add your details</h2>
      <div class="choice-fields">
        <label class="fm-field">Your name
          <input id="student-name" maxlength="60" autocomplete="name" value="">
        </label>
        <label class="fm-field">Your group
          <select id="student-group"><option value="">Choose your group</option><option value="8A">8A</option><option value="8B">8B</option></select>
        </label>
      </div>
      <p class="file-hint">The date is added to your PDF when you download it.</p>
    </section>
    <section class="fm-block">
      <h2>Choose two foods</h2>
      <p>Rice and Vegetables are ready to use. You may keep them or choose two different foods. Use the same two names in your app's food selector.</p>
      <div class="choice-fields">
        <label class="fm-field">Food 1
          <input id="food-one" maxlength="30" value="" autocomplete="off">
        </label>
        <label class="fm-field">Food 2
          <input id="food-two" maxlength="30" value="" autocomplete="off">
        </label>
      </div>
      <p id="food-error" class="inline-error" role="status" aria-live="polite"></p>
      <div class="message-sample"><span>Your app should use this message pattern:</span><strong id="message-preview"></strong></div>
    </section>
    <div class="intro-grid">
      <section class="intro-card">
        <h2>What to do</h2>
        <ol class="plain-steps">
          <li>Open your saved LunchApp in MIT App Inventor. Keep one screen and the Confirm button.</li>
          <li>Put your two foods in the selector. Keep the selected_meal variable and message blocks.</li>
          <li>Run your latest APK in BrowserStack App Live.</li>
          <li>Do Tests 1, 2 and 3 in order. Record the message you expected, the message you saw, and Pass or Fail.</li>
        </ol>
      </section>
      <section class="intro-card">
        <h2>What to hand in</h2>
        <ol class="plain-steps">
          <li>Download this site's answers as a PDF.</li>
          <li>Export LunchApp as an editable .aia file.</li>
          <li>Submit both files to Google Classroom.</li>
        </ol>
        <p class="small-note">A screenshot is required for every test. Add it on that test page before moving on. The PDF will not download until all three screenshots are attached.</p>
      </section>
    </div>
    <nav class="fm-pager" aria-label="Page controls"><span></span><button class="fm-button primary next" type="button" data-page="test1">Go to Test 1</button></nav>`;
  document.querySelector('#student-name').value = state.name;
  document.querySelector('#student-group').value = state.group;
  document.querySelector('#food-one').value = state.foodOne;
  document.querySelector('#food-two').value = state.foodTwo;
  updateFoodPreview();
}
function updateFoodPreview() {
  const preview = document.querySelector('#message-preview');
  if (preview) preview.textContent = `You chose: ${clean(state.foodOne) || '[food 1]'}`;
}
function renderTest(test) {
  const data = state.tests[test.id];
  const meal = selectedFood(test.food);
  main.innerHTML = `
    <header class="fm-hero">
      <p class="fm-label">Page ${test.number + 1} of 5 · Test ${test.number}</p>
      <h1>Test ${test.number}</h1>
      <div>${test.action}</div>
    </header>
    <section class="test-meta" aria-label="Test record">
      <p><strong>Food to test:</strong> <span class="food-value"></span></p>
      <div class="message-sample"><span>Expected message</span><strong class="expected-message"></strong></div>
      <label class="fm-field">Actual message you saw
        <textarea class="actual-box" id="actual-${test.id}" maxlength="180" placeholder="Copy the message shown by your running app."></textarea>
      </label>
      <label class="fm-field">Your decision
        <select class="decision-select" id="decision-${test.id}">
          <option value="">Choose Pass or Fail</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>
        <small>Choose Pass if the actual message matches the expected message. Otherwise choose Fail.</small>
      </label>
    </section>
    <section class="upload-panel">
      <h2>Required screenshot</h2>
      <p class="file-hint">Add a screenshot that shows the selected food and the result after Confirm. It stays in this browser and is added to your PDF. You need one screenshot for each test.</p>
      <label class="file-label">Add or replace screenshot
        <input type="file" id="screenshot-${test.id}" accept="image/*" aria-label="Add or replace screenshot for Test ${test.number}">
      </label>
      <div class="image-slot" aria-live="polite"><p class="upload-status">Add a screenshot to continue to the next page.</p></div>
      <p id="screenshot-requirement" class="inline-error" role="status" aria-live="polite"></p>
    </section>
    <nav class="fm-pager" aria-label="Page controls">
      <button class="fm-button quiet" type="button" data-page="${test.number === 1 ? 'instructions' : `test${test.number - 1}`}">Previous page</button>
      <button class="fm-button primary next" type="button" data-page="${test.number === 3 ? 'explain' : `test${test.number + 1}`}" >Next page</button>
    </nav>`;
  main.querySelector('.food-value').textContent = meal;
  main.querySelector('.expected-message').textContent = expectedMessage(test.food);
  main.querySelector(`#actual-${test.id}`).value = data.actual;
  main.querySelector(`#decision-${test.id}`).value = data.decision;
  showScreenshot(test.id);
}
function renderExplain() {
  main.innerHTML = `
    <header class="fm-hero">
      <p class="fm-label">Page 5 of 5 · Last step</p>
      <h1>Explain the variable</h1>
      <div>Say what selected_meal remembers and how the message uses it.</div>
    </header>
    <section class="fm-block">
      <h2>Write one sentence</h2>
      <p>A variable is like a little note inside the program. It keeps a value so the program can use it later.</p>
      <div class="variable-frame">The variable selected_meal remembers __________, so the message can show __________.</div>
      <label class="fm-field" for="explanation">My one-sentence explanation
        <textarea id="explanation" maxlength="220" rows="3" placeholder="The variable selected_meal..."></textarea>
      </label>
      <p class="file-hint">Use your own words. Keep the English sentence short.</p>
    </section>
    <section class="completion-note">
      <h2>Before you submit</h2>
      <p>Download the PDF from the button at the top. Export your editable LunchApp .aia file. Submit both files to Google Classroom.</p>
      <p>Your work saves in this browser. Attach the required screenshot on every test page before downloading your PDF.</p>
    </section>
    <nav class="fm-pager" aria-label="Page controls"><button class="fm-button quiet" type="button" data-page="test3">Previous page</button><span></span></nav>`;
  main.querySelector('#explanation').value = state.explanation;
}
function render() {
  updateHeader();
  renderNav();
  if (state.page === 'instructions') renderInstructions();
  else if (state.page === 'explain') renderExplain();
  else {
    const test = TESTS.find(item => item.id === state.page) || TESTS[0];
    state.page = test.id;
    renderTest(test);
  }
}
async function setPage(id) {
  const allowed = ['instructions', 'test1', 'test2', 'test3', 'explain'];
  if (!allowed.includes(id)) return;
  const targetIndex = allowed.indexOf(id);
  const requiredBefore = targetIndex >= 2 ? TESTS.slice(0, targetIndex - 1) : [];
  for (const test of requiredBefore) {
    const screenshot = await getScreenshot(test.id).catch(() => null);
    if (!screenshot) {
      const message = `Add the screenshot for Test ${test.number} before moving on.`;
      const inline = document.querySelector('#screenshot-requirement');
      if (inline) inline.textContent = message;
      else setToast(message);
      return;
    }
  }
  if (state.page === 'instructions' && id !== 'instructions') {
    const first = clean(state.foodOne), second = clean(state.foodTwo);
    if (!first || !second || first.toLocaleLowerCase() === second.toLocaleLowerCase()) {
      const error = document.querySelector('#food-error');
      if (error) error.textContent = 'Enter two different foods before starting the tests.';
      return;
    }
  }
  state.page = id;
  saveState();
  render();
  main.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
nav.addEventListener('click', event => {
  const button = event.target.closest('[data-page]');
  if (button) void setPage(button.dataset.page);
});
main.addEventListener('click', event => {
  const button = event.target.closest('[data-page]');
  if (button) void setPage(button.dataset.page);
  if (event.target.closest('.remove-image')) removeScreenshot(event.target.closest('.remove-image').dataset.test);
});
main.addEventListener('input', event => {
  const { id, value } = event.target;
  if (id === 'student-name') state.name = value;
  else if (id === 'food-one') state.foodOne = value;
  else if (id === 'food-two') state.foodTwo = value;
  else if (id === 'explanation') state.explanation = value;
  else {
    const match = id.match(/^actual-(test[123])$/);
    if (match) state.tests[match[1]].actual = value;
  }
  saveState();
  updateHeader();
  updateFoodPreview();
});
main.addEventListener('change', event => {
  const { id, value } = event.target;
  if (id === 'student-group') state.group = value;
  const match = id.match(/^decision-(test[123])$/);
  if (match) state.tests[match[1]].decision = value;
  if (id === 'screenshot-test1' || id === 'screenshot-test2' || id === 'screenshot-test3') {
    const testId = id.replace('screenshot-', '');
    if (event.target.files?.[0]) storeScreenshot(testId, event.target.files[0]);
  }
  saveState();
  updateHeader();
});

function openDatabase() {
  if (databasePromise) return databasePromise;
  databasePromise = new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) return reject(new Error('Browser image storage is unavailable.'));
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => request.result.createObjectStore('screenshots', { keyPath: 'testId' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not open browser image storage.'));
  });
  return databasePromise;
}
async function saveScreenshot(record) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('screenshots', 'readwrite');
    transaction.objectStore('screenshots').put(record);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error || new Error('Could not save screenshot.'));
    transaction.onabort = () => reject(transaction.error || new Error('Could not save screenshot.'));
  });
}
async function getScreenshot(testId) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction('screenshots', 'readonly').objectStore('screenshots').get(testId);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error || new Error('Could not read screenshot.'));
  });
}
async function deleteScreenshot(testId) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('screenshots', 'readwrite');
    transaction.objectStore('screenshots').delete(testId);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error || new Error('Could not remove screenshot.'));
  });
}
async function compressScreenshot(file) {
  if (!file.type.startsWith('image/')) throw new Error('Choose an image file.');
  if (file.size > 25000000) throw new Error('Choose an image smaller than 25 MB.');
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1500 / bitmap.width, 1800 / bitmap.height);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext('2d', { alpha: false }).drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.88));
  if (!blob) throw new Error('This image could not be prepared. Try another screenshot.');
  return blob;
}
async function storeScreenshot(testId, file) {
  const slot = main.querySelector('.image-slot');
  const status = slot?.querySelector('.upload-status');
  if (status) status.textContent = 'Saving screenshot in this browser…';
  try {
    const image = await compressScreenshot(file);
    await saveScreenshot({ testId, image, fileName: file.name, savedAt: new Date().toISOString() });
    await showScreenshot(testId);
  } catch (error) {
    if (status) status.textContent = error.message || 'Screenshot could not be saved. Try a smaller image or ask your teacher for help.';
    else setToast(error.message || 'Screenshot could not be saved.');
  }
}
async function showScreenshot(testId) {
  const slot = main.querySelector('.image-slot');
  if (!slot) return;
  slot.replaceChildren();
  try {
    const record = await getScreenshot(testId);
    if (!record) {
      const status = document.createElement('p');
      status.className = 'upload-status';
      status.textContent = 'Add a screenshot to continue to the next page.';
      slot.append(status);
      return;
    }
    if (activeObjectUrl) URL.revokeObjectURL(activeObjectUrl);
    activeObjectUrl = URL.createObjectURL(record.image);
    const image = document.createElement('img');
    image.className = 'image-preview';
    image.src = activeObjectUrl;
    image.alt = `Screenshot attached to ${testId.replace('test', 'Test ')}`;
    const status = document.createElement('p');
    status.className = 'upload-status';
    status.textContent = `Saved in this browser: ${record.fileName}`;
    const remove = document.createElement('button');
    remove.className = 'fm-button quiet remove-image';
    remove.type = 'button';
    remove.dataset.test = testId;
    remove.textContent = 'Remove screenshot';
    slot.append(image, status, remove);
  } catch {
    const status = document.createElement('p');
    status.className = 'upload-status';
    status.textContent = 'Image storage is unavailable here. Try another browser or ask your teacher for the paper record.';
    slot.append(status);
  }
}
async function removeScreenshot(testId) {
  try {
    await deleteScreenshot(testId);
    if (activeObjectUrl) URL.revokeObjectURL(activeObjectUrl);
    activeObjectUrl = null;
    await showScreenshot(testId);
  } catch {
    setToast('This screenshot could not be removed from browser storage.');
  }
}

function addHeader(doc, title, pageNo) {
  const width = doc.internal.pageSize.getWidth();
  doc.setFillColor(245, 185, 29);
  doc.roundedRect(15, 14, 14, 14, 2, 2, 'F');
  doc.setTextColor(21, 67, 92);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('LA', 17.2, 23.2);
  doc.setFontSize(9);
  doc.text('GRADE 8 - T3 SUMMATIVE 1', 34, 18);
  doc.setFontSize(17);
  doc.text(title, 34, 27);
  doc.setDrawColor(185, 201, 208);
  doc.line(15, 34, width - 15, 34);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 100, 110);
  doc.setFontSize(8);
  doc.text(`${clean(state.name) || 'Name not entered'} | ${clean(state.group) || 'Group not entered'} | ${formatDate()}`, 15, 39);
  doc.text(`Page ${pageNo} of 5`, width - 15, 39, { align: 'right' });
  doc.setTextColor(16, 47, 64);
}
function addLabel(doc, label, value, y, { width = 180, size = 11 } = {}) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(label, 16, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(size);
  const lines = doc.splitTextToSize(value || 'Not entered', width);
  doc.text(lines, 16, y + 6);
  return y + 6 + lines.length * (size * 0.36 + 1.2);
}
function addFooter(doc, pageNo) {
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  doc.setDrawColor(185, 201, 208);
  doc.line(15, height - 13, width - 15, height - 13);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 100, 110);
  doc.text('Submit this PDF with your LunchApp .aia file.', 15, height - 8);
  doc.text(`${pageNo} / 5`, width - 15, height - 8, { align: 'right' });
  doc.setTextColor(16, 47, 64);
}
function addInstructionPage(doc) {
  addHeader(doc, 'Instructions', 1);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Choose two foods', 16, 55);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(`Food 1: ${clean(state.foodOne) || 'Not entered'}`, 16, 66);
  doc.text(`Food 2: ${clean(state.foodTwo) || 'Not entered'}`, 16, 75);
  doc.setDrawColor(23, 124, 114);
  doc.setFillColor(227, 244, 236);
  doc.roundedRect(15, 82, 185, 21, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.text(`Message pattern: You chose: ${clean(state.foodOne) || '[food]'}`, 20, 95);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Do these steps', 16, 118);
  const steps = [
    'Open your saved LunchApp in MIT App Inventor. Keep one screen and the Confirm button.',
    'Use your two foods in the selector. Keep the selected_meal variable and message blocks.',
    'Run your latest APK in BrowserStack App Live.',
    'Test food 1, food 2, then food 1 again. Record the expected message, actual message, and Pass or Fail.'
  ];
  let y = 130;
  for (let i = 0; i < steps.length; i++) {
    doc.setFillColor(21, 67, 92);
    doc.circle(19, y - 1.3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text(String(i + 1), 19, y + 1.4, { align: 'center' });
    doc.setTextColor(16, 47, 64);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(steps[i], 171);
    doc.text(lines, 27, y);
    y += Math.max(12, lines.length * 5.3 + 5);
  }
  doc.setFillColor(255, 242, 189);
  doc.roundedRect(15, y + 3, 185, 36, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Required screenshots', 20, y + 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(doc.splitTextToSize('Attach all three test screenshots. Download this PDF and submit it with your editable LunchApp .aia file to Google Classroom.', 174), 20, y + 20);
}
async function addTestPage(doc, test, pageNo) {
  addHeader(doc, `Test ${test.number}`, pageNo);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(test.action, 16, 55);
  addLabel(doc, 'Food to test', selectedFood(test.food), 67, { size: 11 });
  addLabel(doc, 'Expected message', expectedMessage(test.food), 84, { size: 11 });
  const entry = state.tests[test.id];
  const actualY = addLabel(doc, 'Actual message you saw', clean(entry.actual) || 'Not entered', 103, { width: 178, size: 10.5 });
  addLabel(doc, 'Your decision', clean(entry.decision) || 'Not selected', Math.max(125, actualY + 2), { size: 10.5 });
  const shot = await getScreenshot(test.id).catch(() => null);
  const imageTop = 151;
  if (shot?.image) {
    const data = await blobToDataUrl(shot.image);
    const props = doc.getImageProperties(data);
    const maxWidth = 180;
    const maxHeight = 105;
    const scale = Math.min(maxWidth / props.width, maxHeight / props.height);
    const width = props.width * scale;
    const height = props.height * scale;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Required screenshot', 16, imageTop - 4);
    doc.addImage(data, 'JPEG', 16, imageTop, width, height, undefined, 'FAST');
  } else {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 100, 110);
    doc.setTextColor(166, 65, 53);
    doc.text('Required screenshot missing.', 16, imageTop + 4);
    doc.setTextColor(16, 47, 64);
  }
}
function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('Could not read screenshot.'));
    reader.readAsDataURL(blob);
  });
}
function addExplainPage(doc) {
  addHeader(doc, 'Explain the variable', 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('In one sentence, say what selected_meal remembers and how the message uses it.', 16, 57);
  doc.setFillColor(232, 243, 243);
  doc.setDrawColor(23, 124, 114);
  doc.roundedRect(15, 68, 185, 28, 2, 2, 'FD');
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.text('A variable is like a little note that keeps a value for the program.', 20, 80);
  doc.setFontSize(9);
  doc.text('The variable selected_meal remembers __________, so the message can show __________.', 20, 88);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('My one-sentence explanation', 16, 112);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setDrawColor(185, 201, 208);
  doc.roundedRect(15, 118, 185, 55, 2, 2, 'S');
  const response = doc.splitTextToSize(clean(state.explanation) || 'Not entered', 173);
  doc.text(response, 20, 128);
  doc.setFontSize(9);
  doc.setTextColor(80, 100, 110);
  doc.text('Download the PDF and submit it with your LunchApp .aia file.', 16, 188);
  doc.setTextColor(16, 47, 64);
}
async function downloadPdf() {
  try {
    for (const test of TESTS) {
      const screenshot = await getScreenshot(test.id).catch(() => null);
      if (screenshot) continue;
      state.page = test.id;
      saveState();
      render();
      main.focus({ preventScroll: true });
      const message = `Add the required screenshot for Test ${test.number} before downloading the PDF.`;
      const inline = document.querySelector('#screenshot-requirement');
      if (inline) inline.textContent = message;
      else setToast(message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const module = await import('./shared/jspdf.umd.min.js');
    const jsPDF = globalThis.jspdf?.jsPDF || module.default?.jsPDF || module.jsPDF;
    if (!jsPDF) throw new Error('PDF download is not available in this browser.');
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter', compress: true });
    addInstructionPage(doc);
    addFooter(doc, 1);
    for (let index = 0; index < TESTS.length; index++) {
      doc.addPage('letter', 'portrait');
      await addTestPage(doc, TESTS[index], index + 2);
      addFooter(doc, index + 2);
    }
    doc.addPage('letter', 'portrait');
    addExplainPage(doc);
    addFooter(doc, 5);
    const filename = `${(clean(state.name) || 'Student').replace(/[^A-Za-z0-9_-]+/g, '_')}-LunchApp-test-record.pdf`;
    doc.save(filename);
  } catch (error) {
    setToast(error.message || 'Could not make the PDF. Try again in this browser.');
  }
}
document.querySelector('#download-pdf').addEventListener('click', downloadPdf);
document.querySelector('#edit-identity').addEventListener('click', () => {
  document.querySelector('#dialog-name').value = state.name;
  document.querySelector('#dialog-group').value = state.group;
  dialog.showModal();
});
document.querySelector('#close-identity').addEventListener('click', () => dialog.close());
document.querySelector('#identity-form').addEventListener('submit', event => {
  event.preventDefault();
  state.name = document.querySelector('#dialog-name').value;
  state.group = document.querySelector('#dialog-group').value;
  saveState();
  updateHeader();
  dialog.close();
  if (state.page === 'instructions') render();
});
render();
