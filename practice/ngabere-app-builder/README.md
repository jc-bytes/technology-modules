# Build Cultural Language

A local, student-facing guide generated from the Technology formative website template.
The starter provides email/password sign-in, shared words and learner-specific Firebase saving.
Students style the card, add four buttons, upload three recordings and build four Click events.
Each event contains one call to a supplied helper: eight student blocks in total.

Serve this folder through a web server; ES modules do not run reliably by double-clicking index.html.
For example, run `python3 -m http.server 8000 --bind 127.0.0.1` here and open http://127.0.0.1:8000.

Build in the official MIT editor: https://ai2.appinventor.mit.edu/.
Open the deployed standalone viewer at https://jc-bytes.github.io/appinventor-class-preview/ to test exported .aia files.
A bundled fallback also remains at viewer/index.html.
After editing in MIT, export a fresh .aia and choose that new file in the viewer.
The official MIT site has no custom Web Preview button. The local editor is used only for
reference captures, not as the student editor link. Android APK export remains optional.
The viewer travels with this website and does not require the local App Inventor server.
The website still needs to be hosted or served through HTTP; Firebase requires internet.

The students selected Cultural Language as the app name. Its first lesson teaches Ngäbere.
The guide-only path begins with the finished app, then downloading, opening and importing the starter.
The Designer orientation step marks Palette, Viewer, Components and Properties on an actual Designer screenshot.
Pages without a useful picture use the full available content width.
App changes show actual Web Preview before/after captures. Editor references are actual captures;
code pictures use native Blockly renders. The empty navigation row uses its real Components/Properties
reference because it has no useful running-app content yet.

Runtime pictures use controlled local service replies and a fictional learner. They illustrate visible
states; they do not prove Firebase account creation, cloud writes or Android device playback.
Students verify sign-in and persistence with their own app accounts in the viewer.
The guide does not ask for a name, grade or answers, and has no answer export. Build and recording downloads remain available.
Keep passwords out of answers and screenshots.

The starter and three original recordings are in downloads/. Completed models, recovery projects,
private capture checkpoints and teacher QA records are kept outside this student website.
The original Ngäbere recordings remain unchanged and credited in ASSET-CREDITS.txt.
Read aloud uses locally generated English Kokoro-82M MP3s (af_heart); no student data is used.
Scripts and credits are included. Regenerate narration through prepare_narration.mjs and
 generate_narration.py in tools/planning/steam8b_language_app in the school repository.

Current guide-only path has 46 instructional steps. Legacy question links lead to relevant instructions.
Current checks: 15 author/narration tests; source-model
block scenarios. See the separate teacher QA records for evidence and limits.
No online publication or new cloud/device acceptance is claimed by this review.
