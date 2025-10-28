# Copilot instructions for contributors (AI agents)

- Project type: static vanilla JS site (no build). Open `index.html` or `pages/*.html` in browser. Components are in `components/` (paired `.js` + `.css`). Page scripts live in `scripts/`.

- Important files:
  - `components/QuestionCard.js`, `components/Choices.js`, `components/NavBar.js` — component templates return HTML strings and use global handlers (e.g. `handleAnswerSelect`, `goToNextQuestion`).
  - `scripts/questions.js`, `scripts/mocktest.js`, `scripts/test-tienganh.js` — page logic and state. `showState()` and `useState()` patterns are used for UI state.
  - `data/questions.json` — canonical FAQ/test data source used by `questions.html` and UniFAQ.

- Patterns to follow:
  - Keep relative paths intact (pages load scripts via `../`); when editing files, prefer minimal changes to paths.
  - Components return HTML strings (template literals). Use existing event patterns: global functions on `window` (e.g. `window.handleAnswerSelect`) rather than adding new frameworks.
  - State is often held in module-level variables or via the custom `useState` (returns getter/setter). Call `renderApp()` after state changes.

- Testing / running locally:
  - No build step. Serve files with Live Server or open `pages/test-runner.html` to run unit tests.
  - Unit tests are in `scripts/questions.test.js` and run via the test runner HTML page.

- When adding features:
  - Update `data/questions.json` for content-driven features (e.g., UniFAQ, scoring).
  - Add new pages under `pages/` and corresponding scripts under `scripts/`.
  - Prefer progressive enhancements: add new buttons/IDs and wire handlers to existing global functions where appropriate.

- Example tasks in this repo:
  - UniFAQ: `pages/unifaq.html` + `scripts/unifaq.js` (search top-3 FAQs by keyword; fetches `data/questions.json`).
  - MockTest scoring: `scripts/mocktest.js` implements scoring and displays breakdown in results view.

If any behavior is unclear, open `pages/*.html` to reproduce the UI and inspect browser console for runtime errors. If you modify paths or add files, update relative imports in the HTML pages.