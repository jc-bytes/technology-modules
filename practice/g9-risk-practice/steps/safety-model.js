export const safetyModel = {
  id: 'safety-model', title: 'See a safety example', short: 'Safety example', kind: 'html', stage: 'model',
  summary: 'Use a story clue to name a danger and choose a safe step.',
  html: `<p>For the <strong>Online safety check</strong>, use these first three steps: this example, three quick questions, and written practice. The later risk steps help with the separate Online risk check.</p>
    <div class="fm-context"><p><strong>Story.</strong> A message says a student won free game credits. To claim them, it asks the student to enter a school password on a new page.</p></div>
    <p><strong>Clue:</strong> The unexpected message asks for a school password.</p>
    <p><strong>Danger:</strong> Phishing. A fake message is trying to collect private information.</p>
    <p><strong>Safe step:</strong> Do not use the link. Ask a trusted adult and check through the official school site.</p>
    <div class="fm-source"><p><strong>Two-sentence example</strong></p><p>The unexpected password request is a phishing clue because it tries to collect private information. I would check through the official school site, so I do not give my password to the sender.</p></div>
    <p>Notice the order: <strong>clue → danger → safe step → why it helps.</strong> You will try that order with a different story.</p>`,
};
