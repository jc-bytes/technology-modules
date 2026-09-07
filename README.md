# Technology Modules

Public student activities for Technology Grades 6–9.

Website: https://jc-bytes.github.io/technology-modules/

This repository is the public deployment output. The editable module source remains in the Technology planning workspace under `learning-modules/technology-learning-hub`. Teacher guides, scoring notes, formal assessment files and student records are excluded.

To release an update from the planning workspace:

1. Run the hub tests: `npm test`.
2. Build the hub: `VITE_BASE_PATH=/technology-modules/ npm run build`.
3. Run `python3 tools/publishing/export_modules.py /absolute/path/to/this/checkout` from the planning workspace.
4. Review the release diff, commit and push. GitHub Pages publishes `main` from the repository root.
5. Check the homepage, changed class links and downloads on the public website.

The release manifest records SHA-256 hashes of the exported student files. Module publication does not change pilot status or create new graded assignments. Google Classroom owns submissions, deadlines, grades and feedback. The separately maintained Scratch rhythm-game module is linked from the homepage.
