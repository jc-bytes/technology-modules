const reference = `<details class="case-reference"><summary>Word help</summary><p><strong>Clue:</strong> a detail that shows a danger.</p><p><strong>Phishing:</strong> a fake message tries to get private information.</p><p><strong>Ransomware:</strong> harmful software locks files and asks for money.</p><p><strong>Brute-force attack:</strong> someone tries many passwords to enter an account.</p><p><strong>Backup:</strong> a separate copy of your files.</p></details>`;
const stories = [
 'A message says it is from the school library. It says, "Your account will close today." It asks you to open a link and enter your school password.',
 'A student downloads a game from an unknown website. Then the school files will not open. A message asks for money to unlock the files.',
 'A school account record shows hundreds of password guesses in one night. One guess opens the account.'
];
const questions = [
 [1,'clue','Which detail is a warning?', ['The message names the library.','The message asks for a password through a link.','The student has a school account.']],
 [1,'threat','What is the danger?', ['Phishing','Ransomware','Brute-force attack']],
 [1,'protection','What is the safest step?', ['Enter the password on the new page.','Send the link to classmates.','Ask the library through its usual contact.']],
 [1,'explanation','Why is this message suspicious?', ['A library can never send a message.','It pressures the student to give a private password.','Every message with a link is safe.']],
 [1,'reason','Why does checking with the library help?', ['The student can find out if the message is real.','The new page gets the password faster.','The student can skip every school message.']],
 [2,'clue','Which detail is a warning?', ['The files are for school.','The student likes games.','The files are locked and a message asks for money.']],
 [2,'threat','What is the danger?', ['Brute-force attack','Ransomware','Phishing']],
 [2,'protection','What helps recover locked files?', ['A separate backup of the files.','A shorter password.','More games from unknown websites.']],
 [2,'safeAction','What should the student do now?', ['Pay the money immediately.','Send the game to a friend.','Stop using the computer and tell the teacher.']],
 [3,'clue','Which detail is a warning?', ['The account is for school.','Hundreds of passwords were tried in one night.','The record shows a time.']],
 [3,'threat','What is the danger?', ['Brute-force attack','Phishing','Ransomware']],
 [3,'protection','What helps protect this account?', ['Use the same short password everywhere.','Share the password with a friend.','Use a long unique password and an extra sign-in check.']]
];
export const lesson = {
 id:'G9-SUMMATIVE2-CHOICE',slug:'g9-summative2-choice',title:'Online safety check',shortTitle:'Online safety check',subject:'Technology',layout:'clean-step',fixedGrade:'9',gradeLabel:'Grade 9 Technology',assessmentReview:true,groupPdfByCase:true,
 storageKey:'summative:g9-summative2-choice:v1',pdfFilenamePrefix:'G9_SafetyCheck_Choice',
 pdfStatus:'Summative 2 multiple choice responses. Teacher reviews the selected answers.',
 sections:[
 {id:'start',kind:'html',short:'Start',title:'Online safety check',summary:'Grade 9 · Trimester 3 · Summative 2',html:`<section class="safety-start"><h2>Choose one answer</h2><ol><li>Read the short story.</li><li>Choose one answer for each question.</li><li>Click Next question to continue.</li><li>Check your answers on Review.</li><li>Download your PDF. Attach it to Daily Grade 2 in Google Classroom and click Turn in.</li></ol><p>There are 12 questions. You do not need to write sentences. You may use Word help on each page. Ask your teacher to read the text if you need help.</p><p>Your answers save in this browser. You can go back and change them.</p></section>${reference}`},
 ...questions.map(([caseNumber,name,label,options],i)=>({id:`q${i+1}`,kind:'form',assessment:true,short:`Question ${i+1}`,title:`Case ${caseNumber}`,summary:`Question ${i+1} of 12. Choose one answer.`,intro:`<section class="assessment-case"><h2>What happened</h2><p>${stories[caseNumber-1]}</p><button type="button" class="read-story fm-button quiet">Read aloud</button></section>${reference}`,fields:[{name,label,type:'radio',options}],pdf:{pageBreakBefore:[0,5,9].includes(i),prompt:stories[caseNumber-1],heading:`Case ${caseNumber} Question ${i+1}`}})),
 {id:'review',kind:'review',short:'Review',title:'Review and submit',summary:'Check your choices. Download your PDF and submit it in Google Classroom.'}
 ]
};
