const STORAGE_KEY = 'g8:lunchapp:summative-1:v1';
const DB_NAME = 'g8-lunchapp-summative-1';
const DB_VERSION = 1;
const TESTS = [
  { id: 'test1', number: 1, food: 'one', action: 'Choose food 1 in your app, then press Confirm.' },
  { id: 'test2', number: 2, food: 'two', action: 'Choose food 2 in your app, then press Confirm.' },
  { id: 'test3', number: 3, food: 'one', action: 'Choose food 1 again, then press Confirm.' }
];
const STEP_PAGES = [
  ['name', 'Name'], ['instructions', 'Instructions'], ['test1', 'Test 1'],
  ['test2', 'Test 2'], ['test3', 'Test 3'], ['explain', 'Explain'], ['submit', 'What to hand in']
];
const blankState = () => ({
  page: 'name',
  firstName: '',
  lastName: '',
  grade: '',
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
const cropSessions = new Map();
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
    const legacyName = clean(saved.name).split(/\s+/).filter(Boolean);
    const legacyGroup = clean(saved.group);
    const legacyFirstName = saved.firstName === undefined ? legacyName[0] ?? '' : '';
    const legacyLastName = saved.lastName === undefined ? legacyName.slice(saved.firstName === undefined ? 1 : 0).join(' ') : '';
    const next = {
      ...base,
      ...saved,
      firstName: saved.firstName ?? legacyFirstName,
      lastName: saved.lastName ?? legacyLastName,
      grade: saved.grade ?? (/^8[AB]$/i.test(legacyGroup) ? '8' : ''),
      tests: Object.fromEntries(Object.keys(base.tests).map(id => [id, { ...base.tests[id], ...(saved.tests?.[id] || {}) }]))
    };
    delete next.name;
    delete next.group;
    return next;
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
  const fullName = [clean(state.firstName), clean(state.lastName)].filter(Boolean).join(' ') || 'Your name';
  const grade = clean(state.grade);
  document.querySelector('#student-summary-name').textContent = fullName;
  document.querySelector('#student-summary-grade').textContent = grade ? `Grade ${grade}` : 'Your grade';
}
function renderNav() {
  nav.innerHTML = STEP_PAGES.map(([id, label], index) => `<button class="fm-nav-link ${state.page === id ? 'is-active' : ''}" type="button" data-page="${id}" ${state.page === id ? 'aria-current="step"' : ''}><span class="fm-nav-dot">${index + 1}</span><span>${label}</span></button>`).join('');
}
function renderName() {
  main.innerHTML = `
    <header class="fm-hero">
      <h1>What’s your name?</h1>
    </header>
    <section class="name-form" aria-label="Student details">
      <label class="fm-field">First name
        <input id="student-first-name" maxlength="60" autocomplete="given-name">
      </label>
      <label class="fm-field">Last name
        <input id="student-last-name" maxlength="60" autocomplete="family-name">
      </label>
      <label class="fm-field">Grade
        <input id="student-grade" maxlength="12" autocomplete="off">
      </label>
    </section>
    <nav class="name-pager" aria-label="Continue"><button class="fm-button primary" type="button" data-page="instructions">Continue</button></nav>`;
  document.querySelector('#student-first-name').value = state.firstName;
  document.querySelector('#student-last-name').value = state.lastName;
  document.querySelector('#student-grade').value = state.grade;
}
function renderInstructions() {
  main.innerHTML = `
    <header class="fm-hero">
      <p class="fm-label">Step 2 of 7</p>
      <h1>Set up your tests</h1>
    </header>
    <section class="fm-block">
      <h2>Choose two foods</h2>
      <p>Use Rice and Vegetables, or choose two different foods. Use the same foods in your app.</p>
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
    <nav class="fm-pager" aria-label="Step navigation"><button class="fm-button quiet" type="button" data-page="name">Previous step</button><button class="fm-button primary next" type="button" data-page="test1">Go to Test 1</button></nav>`;
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
      <p class="fm-label">Step ${test.number + 2} of 7 · Test ${test.number}</p>
      <h1>Test ${test.number}</h1>
      <div>${test.action}</div>
    </header>
    <div class="test-layout">
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
          <small>Choose Pass if the messages match. Otherwise choose Fail.</small>
        </label>
      </section>
      <section class="upload-panel">
        <h2>Required screenshot</h2>
        <p class="file-hint">Show the selected food and result after Confirm. You can crop off extra space before saving.</p>
        <label class="file-label">Add or replace screenshot
          <input type="file" id="screenshot-${test.id}" accept="image/*" aria-label="Add or replace screenshot for Test ${test.number}">
        </label>
        <div class="image-slot" aria-live="polite"></div>
        <p id="screenshot-requirement" class="inline-error" role="status" aria-live="polite"></p>
      </section>
    </div>
    <nav class="fm-pager" aria-label="Step navigation">
      <button class="fm-button quiet" type="button" data-page="${test.number === 1 ? 'instructions' : `test${test.number - 1}`}">Previous step</button>
      <button class="fm-button primary next" type="button" data-page="${test.number === 3 ? 'explain' : `test${test.number + 1}`}" >Next step</button>
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
      <p class="fm-label">Step 6 of 7</p>
      <h1>Explain the variable</h1>
      <div>Say what selected_meal remembers and how the message uses it.</div>
    </header>
    <section class="fm-block">
      <p>A variable is like a little note inside the program. It keeps a value so the program can use it later.</p>
      <div class="variable-frame">The variable selected_meal remembers __________, so the message can show __________.</div>
      <label class="fm-field" for="explanation">My one-sentence explanation
        <textarea id="explanation" maxlength="220" rows="3"></textarea>
      </label>
    </section>
    <nav class="fm-pager" aria-label="Step navigation"><button class="fm-button quiet" type="button" data-page="test3">Previous step</button><button class="fm-button primary next" type="button" data-page="submit">Next step</button></nav>`;
  main.querySelector('#explanation').value = state.explanation;
}
function renderSubmission() {
  main.innerHTML = `
    <header class="fm-hero">
      <p class="fm-label">Step 7 of 7 · Last step</p>
      <h1>What to hand in</h1>
    </header>
    <section class="fm-block">
      <ol class="plain-steps">
        <li>Download your answers as a PDF using the button at the top. It includes your three required screenshots.</li>
        <li>Export your LunchApp as an editable App Inventor project file (.aia).</li>
        <li>Submit both files to Google Classroom.</li>
      </ol>
    </section>
    <nav class="fm-pager" aria-label="Step navigation"><button class="fm-button quiet" type="button" data-page="explain">Previous step</button><span></span></nav>`;
}
function render() {
  const isNamePage = state.page === 'name';
  document.body.classList.toggle('name-screen', isNamePage);
  main.classList.toggle('name-page', isNamePage);
  updateHeader();
  renderNav();
  if (state.page === 'name') renderName();
  else if (state.page === 'instructions') renderInstructions();
  else if (state.page === 'explain') renderExplain();
  else if (state.page === 'submit') renderSubmission();
  else {
    const test = TESTS.find(item => item.id === state.page) || TESTS[0];
    state.page = test.id;
    renderTest(test);
  }
}
async function setPage(id) {
  const allowed = STEP_PAGES.map(([page]) => page);
  if (!allowed.includes(id)) return;
  for (const [testId, session] of cropSessions) {
    session.bitmap.close?.();
    cropSessions.delete(testId);
  }
  state.page = id;
  document.querySelector('#step-menu').open = false;
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
  const cropButton = event.target.closest('[data-crop-action]');
  if (cropButton) {
    const { cropAction, test } = cropButton.dataset;
    if (cropAction === 'save') void saveScreenshotCrop(test, false);
    if (cropAction === 'full') void saveScreenshotCrop(test, true);
    if (cropAction === 'cancel') void cancelScreenshotCrop(test);
    if (cropAction === 'edit') void editScreenshotCrop(test);
  }
});
main.addEventListener('input', event => {
  const cropRange = event.target.closest('.crop-range');
  if (cropRange) {
    const output = main.querySelector(`#${cropRange.id}-value`);
    if (output) output.textContent = `${cropRange.value}%`;
    drawCropPreview(cropRange.dataset.test);
    return;
  }
  const { id, value } = event.target;
  if (id === 'student-first-name') state.firstName = value;
  else if (id === 'student-last-name') state.lastName = value;
  else if (id === 'student-grade') state.grade = value;
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
    await openScreenshotCrop(testId, image, file.name);
  } catch (error) {
    if (status) status.textContent = error.message || 'Screenshot could not be saved. Try a smaller image or ask your teacher for help.';
    else setToast(error.message || 'Screenshot could not be saved.');
  }
}
async function openScreenshotCrop(testId, image, fileName) {
  const slot = main.querySelector('.image-slot');
  if (!slot) return;
  const previous = cropSessions.get(testId);
  previous?.bitmap.close?.();
  const bitmap = await createImageBitmap(image);
  const session = { image, fileName, bitmap };
  cropSessions.set(testId, session);
  slot.innerHTML = `
    <div class="crop-editor">
      <p class="crop-title">Crop your screenshot (optional)</p>
      <p class="file-hint">Move a slider to cut off extra space. Check the preview before saving.</p>
      <div class="crop-preview"><canvas class="crop-canvas" role="img" aria-label="Screenshot crop preview"></canvas></div>
      <div class="crop-controls">
        ${[['top', 'Top'], ['right', 'Right'], ['bottom', 'Bottom'], ['left', 'Left']].map(([edge, label]) => `<label class="crop-control">Crop ${label.toLowerCase()} edge <span id="crop-${edge}-${testId}-value">0%</span><input class="crop-range" id="crop-${edge}-${testId}" data-test="${testId}" data-edge="${edge}" type="range" min="0" max="40" value="0" aria-label="Crop ${label.toLowerCase()} edge"></label>`).join('')}
      </div>
      <div class="crop-actions">
        <button class="fm-button primary" type="button" data-crop-action="save" data-test="${testId}">Save this crop</button>
        <button class="fm-button quiet" type="button" data-crop-action="full" data-test="${testId}">Use full screenshot</button>
        <button class="fm-button quiet" type="button" data-crop-action="cancel" data-test="${testId}">Cancel</button>
      </div>
    </div>`;
  session.canvas = slot.querySelector('.crop-canvas');
  drawCropPreview(testId);
}
function cropBounds(session) {
  const values = Object.fromEntries([...main.querySelectorAll(`.crop-range[data-test="${session.testId}"]`)].map(input => [input.dataset.edge, Number(input.value) / 100]));
  return {
    left: values.left || 0,
    top: values.top || 0,
    width: 1 - (values.left || 0) - (values.right || 0),
    height: 1 - (values.top || 0) - (values.bottom || 0)
  };
}
function drawCropPreview(testId) {
  const session = cropSessions.get(testId);
  if (!session?.canvas || !session.bitmap) return;
  session.testId = testId;
  const bounds = cropBounds(session);
  const { width, height } = session.bitmap;
  const sx = Math.round(width * bounds.left);
  const sy = Math.round(height * bounds.top);
  const sw = Math.max(1, Math.round(width * bounds.width));
  const sh = Math.max(1, Math.round(height * bounds.height));
  const canvas = session.canvas;
  canvas.width = sw;
  canvas.height = sh;
  canvas.getContext('2d', { alpha: false }).drawImage(session.bitmap, sx, sy, sw, sh, 0, 0, sw, sh);
}
function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('This crop could not be prepared.')), 'image/jpeg', 0.9));
}
async function saveScreenshotCrop(testId, full) {
  const session = cropSessions.get(testId);
  if (!session) return;
  const slot = main.querySelector('.image-slot');
  const status = document.createElement('p');
  status.className = 'upload-status';
  status.textContent = 'Saving screenshot in this browser…';
  slot?.replaceChildren(status);
  try {
    const image = full ? session.image : await canvasToBlob(session.canvas);
    await saveScreenshot({ testId, image, originalImage: session.image, fileName: session.fileName, savedAt: new Date().toISOString() });
    session.bitmap.close?.();
    cropSessions.delete(testId);
    await showScreenshot(testId);
  } catch (error) {
    if (status.isConnected) status.textContent = error.message || 'Could not save the screenshot.';
    else setToast(error.message || 'Could not save the screenshot.');
  }
}
async function cancelScreenshotCrop(testId) {
  const session = cropSessions.get(testId);
  session?.bitmap.close?.();
  cropSessions.delete(testId);
  await showScreenshot(testId);
}
async function editScreenshotCrop(testId) {
  const record = await getScreenshot(testId).catch(() => null);
  if (record) await openScreenshotCrop(testId, record.originalImage || record.image, record.fileName || 'screenshot');
}
async function showScreenshot(testId) {
  const slot = main.querySelector('.image-slot');
  if (!slot) return;
  slot.replaceChildren();
  try {
    const record = await getScreenshot(testId);
    if (!record) {
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
    status.textContent = 'Screenshot saved.';
    const remove = document.createElement('button');
    remove.className = 'fm-button quiet remove-image';
    remove.type = 'button';
    remove.dataset.test = testId;
    remove.textContent = 'Remove screenshot';
    const edit = document.createElement('button');
    edit.className = 'fm-button quiet edit-crop';
    edit.type = 'button';
    edit.dataset.test = testId;
    edit.dataset.cropAction = 'edit';
    edit.textContent = 'Crop screenshot';
    slot.append(image, status, edit, remove);
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
  const studentName = [clean(state.firstName), clean(state.lastName)].filter(Boolean).join(' ') || 'Name not entered';
  const grade = clean(state.grade) ? `Grade ${clean(state.grade)}` : 'Grade not entered';
  doc.text(`${studentName} | ${grade} | ${formatDate()}`, 15, 39);
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
    'Use your two foods. Keep the selected_meal variable; it remembers the chosen food. Keep the blocks that show the message.',
    'Run the latest APK (app file) in BrowserStack App Live.',
    'Complete Test 1, then Test 2, then Test 3. Record each test on its page.'
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
  doc.text('Screenshots', 20, y + 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(doc.splitTextToSize('This PDF includes one screenshot for each test.', 174), 20, y + 20);
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
  doc.text('Submit this PDF and your editable App Inventor project file (.aia) to Google Classroom.', 16, 188);
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
    const studentName = [clean(state.firstName), clean(state.lastName)].filter(Boolean).join(' ');
    const filename = `${(studentName || 'Student').replace(/[^A-Za-z0-9_-]+/g, '_')}-LunchApp-test-record.pdf`;
    doc.save(filename);
  } catch (error) {
    setToast(error.message || 'Could not make the PDF. Try again in this browser.');
  }
}
document.querySelector('#download-pdf').addEventListener('click', downloadPdf);
document.querySelector('#edit-identity').addEventListener('click', () => {
  document.querySelector('#dialog-first-name').value = state.firstName;
  document.querySelector('#dialog-last-name').value = state.lastName;
  document.querySelector('#dialog-grade').value = state.grade;
  dialog.showModal();
});
document.querySelector('#close-identity').addEventListener('click', () => dialog.close());
document.querySelector('#identity-form').addEventListener('submit', event => {
  event.preventDefault();
  state.firstName = document.querySelector('#dialog-first-name').value;
  state.lastName = document.querySelector('#dialog-last-name').value;
  state.grade = document.querySelector('#dialog-grade').value;
  saveState();
  updateHeader();
  dialog.close();
  if (state.page === 'name' || state.page === 'instructions') render();
});
document.querySelector('.fm-brand').addEventListener('click', event => {
  event.preventDefault();
  void setPage('name');
});
render();
