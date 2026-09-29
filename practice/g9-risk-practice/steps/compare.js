export const compare = {
  id: 'compare', title: 'Write like the safety check', short: 'Written practice', kind: 'form', stage: 'practice',
  summary: 'Try one full clue, danger, protection and explanation, then one immediate safe action.',
  intro: `<p>Use your own words. This is practice, so you can check the safety example or earlier questions while you work.</p>
    <div class="fm-context"><p><strong>Story A.</strong> A message says it comes from a game club. It asks you to enter your school password through a link you have never used so you can keep your membership.</p></div>`,
  fields: [
    {name:'message-clue-v2', label:'Story A: Which detail is the clue?', type:'text', help:'Write one fact from the story.', context:'A game-club message asks for your school password through an unfamiliar link.'},
    {name:'message-danger-v2', label:'Story A: Name the danger.', type:'text', help:'A short phrase is enough.', context:'A game-club message asks for your school password through an unfamiliar link.'},
    {name:'message-protection-v2', label:'Story A: What is one safe step?', type:'text', help:'Choose a step that protects your password.', context:'A game-club message asks for your school password through an unfamiliar link.'},
    {name:'message-explanation-v2', label:'Story A: Explain in two complete sentences.', type:'textarea', rows:3, help:'Sentence 1: why the clue fits the danger. Sentence 2: how your safe step helps.', context:'A game-club message asks for your school password through an unfamiliar link.'},
    {name:'locked-action-v2', label:'Story B: What should the student do now? Write one complete sentence.', type:'textarea', rows:2, help:'Choose one safe action the student can take now. Then open Your answers or download your practice PDF to review.', context:'A student installed a free photo editor. The files on the computer are now locked, and a message demands money to open them.'},
  ],
  legacyFields: [
    {name:'phishing-response-v1', label:'Earlier Case 1 safe response'},
    {name:'ransomware-response-v1', label:'Earlier Case 2 danger and protection'},
    {name:'bruteforce-response-v1', label:'Earlier Case 3 danger and protection'},
  ],
  pdf:{prompt:'Story A: a game-club message asks for a school password through an unfamiliar link. Record one clue, the danger, a safe step, and two sentences explaining why the clue fits and how the step helps. Story B: a free photo editor locks files and demands money. State one safe action to take now.'},
};
