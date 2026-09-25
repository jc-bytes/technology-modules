const STORAGE_KEY = 'g8:lunchapp:summative-1:v1';
const DB_NAME = 'g8-lunchapp-summative-1';
const DB_VERSION = 1;
const TESTS = [
  { id: 'test1', number: 1, food: 'one', action: 'Choose meal option 1 in your app, then press Confirm.' },
  { id: 'test2', number: 2, food: 'two', action: 'Choose meal option 2 in your app, then press Confirm.' },
  { id: 'test3', number: 3, food: 'one', action: 'Choose meal option 1 again, then press Confirm.' }
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
let cropPreviewUrl;
let activeCropTest;
let cropPointer;
const cropSessions = new Map();
const main = document.querySelector('#fm-main');
const nav = document.querySelector('#step-navigation');
const warning = document.querySelector('#save-warning');
const toast = document.querySelector('#toast');
const dialog = document.querySelector('#identity-dialog');
const cropDialog = document.querySelector('#crop-dialog');
const cropStage = document.querySelector('#crop-stage');
const cropImage = document.querySelector('#crop-image');
const cropSelection = document.querySelector('#crop-selection');
const cropInstruction = document.querySelector('#crop-instruction');
const cropSaveButton = document.querySelector('#crop-save');

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
      <h2>Choose two meal options</h2>
      <p>Use Rice and Vegetables, or choose two other meal options. Use those names in your app.</p>
      <div class="choice-fields">
        <label class="fm-field">Meal option 1
          <input id="food-one" maxlength="30" value="" autocomplete="off">
        </label>
        <label class="fm-field">Meal option 2
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
  if (preview) preview.textContent = `You chose: ${clean(state.foodOne) || '[meal option 1]'}`;
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
      <section class="upload-panel" aria-label="Required screenshot">
        <h2>Required screenshot</h2>
        <div class="phone-shell">
          <div class="image-slot phone-screen" data-test="${test.id}" tabindex="0" role="region" aria-label="Screenshot area for Test ${test.number}. Paste a copied image here." aria-live="polite"></div>
        </div>
        <input class="upload-input" type="file" id="screenshot-${test.id}" accept="image/*" tabindex="-1" aria-hidden="true">
        <p id="screenshot-requirement" class="inline-error" role="status" aria-live="polite"></p>
        <p class="upload-status" id="screenshot-status" role="status" aria-live="polite"></p>
      </section>
      <section class="test-meta" aria-label="Test record">
        <p><strong>Meal option to test:</strong> <span class="food-value"></span></p>
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
  const pasteButton = event.target.closest('[data-paste-image]');
  if (pasteButton) pasteButton.closest('.image-slot')?.focus();
  const uploadButton = event.target.closest('[data-upload-image]');
  if (uploadButton) main.querySelector(`#screenshot-${uploadButton.dataset.uploadImage}`)?.click();
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
main.addEventListener('paste', event => {
  const slot = event.target instanceof Element ? event.target.closest('.image-slot') : null;
  if (!slot || !main.contains(slot) || event.target.closest('input, textarea, select, button, [contenteditable="true"]')) return;
  const imageItem = [...(event.clipboardData?.items || [])].find(item => item.kind === 'file' && item.type.startsWith('image/'));
  const pastedImage = imageItem?.getAsFile();
  if (!pastedImage) return;
  event.preventDefault();
  const testId = slot.dataset.test;
  const file = pastedImage.name ? pastedImage : new File([pastedImage], `pasted-${testId}-screenshot.png`, { type: pastedImage.type || 'image/png' });
  const status = main.querySelector('#screenshot-status');
  if (status) status.textContent = 'Preparing pasted screenshot…';
  void storeScreenshot(testId, file);
});
cropStage.addEventListener('pointerdown', startCropDrag);
cropStage.addEventListener('pointermove', moveCropDrag);
cropStage.addEventListener('pointerup', finishCropDrag);
cropStage.addEventListener('pointercancel', finishCropDrag);
cropSelection.addEventListener('keydown', resizeCropWithKeyboard);
cropDialog.addEventListener('click', event => {
  if (event.target.closest('#crop-cancel, #crop-close')) void cancelScreenshotCrop(activeCropTest);
  if (event.target.closest('#crop-use-full')) void saveScreenshotCrop(activeCropTest, true);
  if (event.target.closest('#crop-save')) void saveScreenshotCrop(activeCropTest, false);
});
cropDialog.addEventListener('cancel', event => {
  event.preventDefault();
  void cancelScreenshotCrop(activeCropTest);
});
main.addEventListener('input', event => {
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
    const file = event.target.files?.[0];
    if (file) {
      event.target.value = '';
      void storeScreenshot(testId, file);
    }
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
  const status = main.querySelector('#screenshot-status');
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
  if (activeCropTest) {
    cropSessions.get(activeCropTest)?.bitmap.close?.();
    cropSessions.delete(activeCropTest);
    closeCropDialog();
  }
  const bitmap = await createImageBitmap(image);
  const previewUrl = URL.createObjectURL(image);
  cropImage.src = previewUrl;
  try {
    await cropImage.decode();
  } catch {
    URL.revokeObjectURL(previewUrl);
    cropImage.removeAttribute('src');
    bitmap.close?.();
    throw new Error('This screenshot could not be opened in the crop tool.');
  }
  cropPreviewUrl = previewUrl;
  const session = { testId, image, fileName, bitmap, selection: null };
  cropSessions.set(testId, session);
  activeCropTest = testId;
  updateCropSelection(session);
  cropDialog.showModal();
}
function closeCropDialog() {
  if (cropDialog.open) cropDialog.close();
  if (cropPreviewUrl) URL.revokeObjectURL(cropPreviewUrl);
  cropPreviewUrl = null;
  cropImage.removeAttribute('src');
  activeCropTest = null;
  cropPointer = null;
}
function cropPoint(event) {
  const rect = cropStage.getBoundingClientRect();
  return {
    x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
    y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
  };
}
function cropBoxStyle(element, box) {
  element.style.left = `${box.x * 100}%`;
  element.style.top = `${box.y * 100}%`;
  element.style.width = `${box.w * 100}%`;
  element.style.height = `${box.h * 100}%`;
}
function cropShade(name, box) {
  const shade = document.querySelector(`#crop-shade-${name}`);
  if (!box || box.w <= 0 || box.h <= 0) {
    shade.hidden = true;
    return;
  }
  shade.hidden = false;
  cropBoxStyle(shade, box);
}
function updateCropSelection(session) {
  const box = session.selection;
  const valid = box && box.w >= 0.015 && box.h >= 0.015;
  cropSelection.hidden = !valid;
  cropSaveButton.disabled = !valid;
  if (!valid) {
    cropShade('top', { x: 0, y: 0, w: 1, h: 1 });
    cropShade('left', null);
    cropShade('right', null);
    cropShade('bottom', null);
    cropInstruction.textContent = 'Drag over the screenshot to choose the area to keep.';
    return;
  }
  cropBoxStyle(cropSelection, box);
  cropShade('top', { x: 0, y: 0, w: 1, h: box.y });
  cropShade('bottom', { x: 0, y: box.y + box.h, w: 1, h: 1 - box.y - box.h });
  cropShade('left', { x: 0, y: box.y, w: box.x, h: box.h });
  cropShade('right', { x: box.x + box.w, y: box.y, w: 1 - box.x - box.w, h: box.h });
  cropInstruction.textContent = 'Drag the box to move it. Drag a corner to resize.';
}
function startCropDrag(event) {
  const session = cropSessions.get(activeCropTest);
  if (!session || event.button !== 0) return;
  const target = event.target instanceof Element ? event.target : cropStage;
  const point = cropPoint(event);
  const handle = target.closest('[data-handle]')?.dataset.handle;
  if (handle && session.selection) {
    cropPointer = { pointerId: event.pointerId, mode: 'resize', handle, start: point, initial: { ...session.selection } };
  } else if (session.selection && cropSelection.contains(target)) {
    cropPointer = { pointerId: event.pointerId, mode: 'move', start: point, initial: { ...session.selection } };
  } else {
    session.selection = { x: point.x, y: point.y, w: 0, h: 0 };
    cropPointer = { pointerId: event.pointerId, mode: 'draw', start: point };
    updateCropSelection(session);
  }
  event.preventDefault();
  cropStage.setPointerCapture(event.pointerId);
}
function resizeCropBox(box, handle, point) {
  const minSide = 0.015;
  let left = box.x;
  let top = box.y;
  let right = box.x + box.w;
  let bottom = box.y + box.h;
  if (handle.endsWith('w')) left = Math.max(0, Math.min(point.x, right - minSide));
  else right = Math.min(1, Math.max(point.x, left + minSide));
  if (handle.startsWith('n')) top = Math.max(0, Math.min(point.y, bottom - minSide));
  else bottom = Math.min(1, Math.max(point.y, top + minSide));
  return { x: left, y: top, w: right - left, h: bottom - top };
}
function moveCropDrag(event) {
  if (!cropPointer || event.pointerId !== cropPointer.pointerId) return;
  const session = cropSessions.get(activeCropTest);
  if (!session) return;
  event.preventDefault();
  const point = cropPoint(event);
  const { start, initial, mode, handle } = cropPointer;
  if (mode === 'draw') {
    session.selection = { x: Math.min(start.x, point.x), y: Math.min(start.y, point.y), w: Math.abs(point.x - start.x), h: Math.abs(point.y - start.y) };
  } else if (mode === 'move') {
    const x = Math.max(0, Math.min(1 - initial.w, initial.x + point.x - start.x));
    const y = Math.max(0, Math.min(1 - initial.h, initial.y + point.y - start.y));
    session.selection = { ...initial, x, y };
  } else {
    session.selection = resizeCropBox(initial, handle, point);
  }
  updateCropSelection(session);
}
function finishCropDrag(event) {
  if (!cropPointer || event.pointerId !== cropPointer.pointerId) return;
  const session = cropSessions.get(activeCropTest);
  if (session && (!session.selection || session.selection.w < 0.015 || session.selection.h < 0.015)) session.selection = null;
  cropPointer = null;
  if (cropStage.hasPointerCapture(event.pointerId)) cropStage.releasePointerCapture(event.pointerId);
  if (session) updateCropSelection(session);
}
function resizeCropWithKeyboard(event) {
  const target = event.target instanceof Element ? event.target : null;
  const handle = target?.closest('[data-handle]')?.dataset.handle;
  const session = cropSessions.get(activeCropTest);
  if (!handle || !session?.selection || !event.key.startsWith('Arrow')) return;
  const delta = event.shiftKey ? 0.05 : 0.01;
  const box = session.selection;
  const point = {
    x: (handle.endsWith('w') ? box.x : box.x + box.w) + (event.key === 'ArrowLeft' ? -delta : event.key === 'ArrowRight' ? delta : 0),
    y: (handle.startsWith('n') ? box.y : box.y + box.h) + (event.key === 'ArrowUp' ? -delta : event.key === 'ArrowDown' ? delta : 0)
  };
  event.preventDefault();
  session.selection = resizeCropBox(box, handle, { x: Math.max(0, Math.min(1, point.x)), y: Math.max(0, Math.min(1, point.y)) });
  updateCropSelection(session);
}
function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('This crop could not be prepared.')), 'image/jpeg', 0.9));
}
async function cropScreenshotBlob(session) {
  if (!session.selection) throw new Error('Drag over the screenshot to select an area first.');
  const { width, height } = session.bitmap;
  const { x, y, w, h } = session.selection;
  const sx = Math.round(width * x);
  const sy = Math.round(height * y);
  const sw = Math.min(width - sx, Math.max(1, Math.round(width * w)));
  const sh = Math.min(height - sy, Math.max(1, Math.round(height * h)));
  const canvas = document.createElement('canvas');
  canvas.width = sw;
  canvas.height = sh;
  canvas.getContext('2d', { alpha: false }).drawImage(session.bitmap, sx, sy, sw, sh, 0, 0, sw, sh);
  return canvasToBlob(canvas);
}
async function saveScreenshotCrop(testId, full) {
  const session = cropSessions.get(testId);
  if (!session || (!full && !session.selection)) return;
  const status = main.querySelector('#screenshot-status');
  if (status) status.textContent = 'Saving screenshot in this browser…';
  try {
    const image = full ? session.image : await cropScreenshotBlob(session);
    await saveScreenshot({ testId, image, originalImage: session.image, fileName: session.fileName, savedAt: new Date().toISOString() });
    session.bitmap.close?.();
    cropSessions.delete(testId);
    closeCropDialog();
    await showScreenshot(testId);
  } catch (error) {
    if (status?.isConnected) status.textContent = error.message || 'Could not save the screenshot.';
    else setToast(error.message || 'Could not save the screenshot.');
  }
}
async function cancelScreenshotCrop(testId) {
  if (!testId) return;
  const session = cropSessions.get(testId);
  session?.bitmap.close?.();
  cropSessions.delete(testId);
  closeCropDialog();
  await showScreenshot(testId);
}
async function editScreenshotCrop(testId) {
  const record = await getScreenshot(testId).catch(() => null);
  if (record) await openScreenshotCrop(testId, record.originalImage || record.image, record.fileName || 'screenshot');
}
async function showScreenshot(testId) {
  const slot = main.querySelector('.image-slot');
  if (!slot) return;
  const status = main.querySelector('#screenshot-status');
  slot.replaceChildren();
  slot.classList.remove('has-image');
  if (status) status.textContent = '';
  try {
    const record = await getScreenshot(testId);
    if (!record) {
      const emptyActions = document.createElement('div');
      emptyActions.className = 'screenshot-empty-actions';
      const paste = document.createElement('button');
      paste.className = 'fm-button primary';
      paste.type = 'button';
      paste.dataset.pasteImage = '';
      paste.textContent = 'Paste screenshot';
      const upload = document.createElement('button');
      upload.className = 'fm-button quiet';
      upload.type = 'button';
      upload.dataset.uploadImage = testId;
      upload.textContent = 'Upload screenshot';
      const shortcut = document.createElement('p');
      shortcut.textContent = 'Ctrl+V · ⌘V';
      emptyActions.append(paste, upload, shortcut);
      slot.append(emptyActions);
      return;
    }
    if (activeObjectUrl) URL.revokeObjectURL(activeObjectUrl);
    activeObjectUrl = URL.createObjectURL(record.image);
    const image = document.createElement('img');
    image.className = 'image-preview';
    image.src = activeObjectUrl;
    image.alt = `Screenshot attached to ${testId.replace('test', 'Test ')}`;
    slot.classList.add('has-image');
    const actions = document.createElement('div');
    actions.className = 'screenshot-actions';
    actions.setAttribute('role', 'group');
    actions.setAttribute('aria-label', 'Screenshot options');
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
    const replace = document.createElement('button');
    replace.className = 'fm-button quiet';
    replace.type = 'button';
    replace.dataset.uploadImage = testId;
    replace.textContent = 'Replace screenshot';
    actions.append(edit, replace, remove);
    slot.append(image, actions);
  } catch {
    if (status) status.textContent = 'Image storage is unavailable here. Try another browser or ask your teacher for the paper record.';
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

function addHeader(doc, title) {
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
  const identity = `${studentName} | ${grade} | ${formatDate()}`;
  doc.text(doc.splitTextToSize(identity, width - 30), 15, 39);
  doc.setTextColor(16, 47, 64);
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
  addHeader(doc, 'Instructions');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Choose two meal options', 16, 55);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(`Meal option 1: ${clean(state.foodOne) || 'Not entered'}`, 16, 66);
  doc.text(`Meal option 2: ${clean(state.foodTwo) || 'Not entered'}`, 16, 75);
  doc.setDrawColor(23, 124, 114);
  doc.setFillColor(227, 244, 236);
  doc.roundedRect(15, 82, 185, 21, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.text(`Message pattern: You chose: ${clean(state.foodOne) || '[meal option 1]'}`, 20, 95);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Do these steps', 16, 118);
  const steps = [
    'Open your saved LunchApp in MIT App Inventor. Keep one screen and the Confirm button.',
    'Use your two meal options. Keep selected_meal to remember the selected option. Keep the blocks that show the message.',
    'Run the latest APK (app file) in BrowserStack App Live.',
    'Complete Test 1, then Test 2, then Test 3. Record each test on its page.'
  ];
  let y = 130;
  for (let i = 0; i < steps.length; i++) {
    doc.setFillColor(21, 67, 92);
    const circleCenterY = y - 1.3;
    doc.circle(19, circleCenterY, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text(String(i + 1), 19, circleCenterY + 1, { align: 'center' });
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
async function addTestPage(doc, test) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(doc.splitTextToSize(test.action, 182), 16, 54);

  const pageWidth = doc.internal.pageSize.getWidth();
  const leftX = 15;
  const top = 65;
  const panelHeight = 188;
  const leftWidth = 82;
  const gutter = 8;
  const rightX = leftX + leftWidth + gutter;
  const rightWidth = pageWidth - rightX - 15;
  const innerX = rightX + 7;
  const innerWidth = rightWidth - 14;

  doc.setDrawColor(185, 201, 208);
  doc.setLineWidth(0.35);
  doc.setFillColor(247, 245, 239);
  doc.roundedRect(leftX, top, leftWidth, panelHeight, 2, 2, 'FD');
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(rightX, top, rightWidth, panelHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(40, 104, 131);
  doc.text('Required screenshot', leftX + 6, top + 10);
  doc.setDrawColor(210, 221, 220);
  doc.line(leftX + 6, top + 14, leftX + leftWidth - 6, top + 14);
  const frameX = leftX + 6;
  const frameY = top + 18;
  const frameWidth = leftWidth - 12;
  const frameHeight = panelHeight - 25;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(frameX, frameY, frameWidth, frameHeight, 1.5, 1.5, 'FD');
  const shot = await getScreenshot(test.id).catch(() => null);
  if (shot?.image) {
    const data = await blobToDataUrl(shot.image);
    const props = doc.getImageProperties(data);
    const scale = Math.min((frameWidth - 2) / props.width, (frameHeight - 2) / props.height);
    const width = props.width * scale;
    const height = props.height * scale;
    const x = frameX + (frameWidth - width) / 2;
    const y = frameY + (frameHeight - height) / 2;
    doc.addImage(data, 'JPEG', x, y, width, height, undefined, 'FAST');
  } else {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(166, 65, 53);
    doc.text('Screenshot missing', frameX + frameWidth / 2, frameY + frameHeight / 2, { align: 'center' });
  }

  const entry = state.tests[test.id];
  let y = top + 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 100, 110);
  doc.text('Meal option to test', innerX, y);
  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(16, 47, 64);
  const mealLines = doc.splitTextToSize(selectedFood(test.food) || 'Not entered', innerWidth);
  doc.text(mealLines, innerX, y);
  y += Math.max(5, mealLines.length * 4.5) + 6;

  const expectedLines = doc.splitTextToSize(expectedMessage(test.food), innerWidth - 10);
  const expectedHeight = 17 + expectedLines.length * 4.4;
  doc.setFillColor(227, 244, 236);
  doc.roundedRect(innerX, y, innerWidth, expectedHeight, 1.5, 1.5, 'F');
  doc.setFillColor(40, 104, 131);
  doc.rect(innerX, y, 1.3, expectedHeight, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 104, 131);
  doc.text('Expected message', innerX + 5, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(16, 47, 64);
  doc.text(expectedLines, innerX + 5, y + 13);
  y += expectedHeight + 7;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 100, 110);
  doc.text('Actual message you saw', innerX, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  const actualLines = doc.splitTextToSize(clean(entry.actual) || 'Not entered', innerWidth - 8);
  const actualHeight = Math.max(31, actualLines.length * 4.2 + 10);
  doc.setDrawColor(185, 201, 208);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(innerX, y, innerWidth, actualHeight, 1.5, 1.5, 'FD');
  doc.setTextColor(16, 47, 64);
  doc.text(actualLines, innerX + 4, y + 7);
  y += actualHeight + 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 100, 110);
  doc.text('Your decision', innerX, y);
  y += 4;
  const decision = clean(entry.decision) || 'Not selected';
  const decisionColors = decision === 'Pass' ? [227, 244, 236] : decision === 'Fail' ? [252, 232, 229] : [242, 243, 240];
  const decisionText = decision === 'Pass' ? [25, 102, 71] : decision === 'Fail' ? [147, 48, 39] : [80, 100, 110];
  doc.setFillColor(...decisionColors);
  doc.roundedRect(innerX, y, innerWidth, 12, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...decisionText);
  doc.text(decision, innerX + 5, y + 8);
  doc.setTextColor(16, 47, 64);
  addHeader(doc, `Test ${test.number}`);
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
  addHeader(doc, 'Explain the variable');
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
      await addTestPage(doc, TESTS[index]);
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
