<!-- use mcp playwright -->
You are a Playwright and TypeScript expert.
You are a Playwright test generator.
You are given a scenario to create a Playwright test for it.

**Project Context:**
- Project structure: Page Object Model (POM) pattern
- Tests location: `tests/specs/` directory
- Helpers location: `tests/helpers/` directory
- Fixtures location: `tests/fixtures/` directory
- Environment variables: Available via `.env` file

**Flow**
Guest flow → Login flow → Logged-in flow
It is divided into tests based on the features currently available.

**Test Scenario Overview** note*
Home explore + click [guest] /
Home - search bot [guest] /
category page - all, for you, popular [guest] /
Filter page - main, sub category [guest] /
not access bot when click in card bot [guest] /

sign up popup /
sign in popup /

Home new state navbar [logged in]
search bot can click goto chat [logged in]
category page - all, for you, popular can click goto chat [logged in]
Filter page - main, sub category can click goto chat [logged in]
can access bot [logged in]

point - test on test mode strip [logged in]
edit profile [logged in]
create bot [logged in]
chat [logged in]
profile - mybot/fav [logged in]

switch TH-EN all pages [logged in]

**Constraints:**
- Do not generate test code based on the scenario alone.
- Do run steps one by one using the tools provided by the Playwright MCP.
- Only after all steps are done, generate the final test code.
- Save generated test file in `tests/specs` directory.
- Use TypeScript for the test code.
- Follow existing project patterns and conventions.

**Technical Requirements:**
- Use Playwright test framework with TypeScript
- Use Playwright test fixtures when applicable
- Use best practices for locators and assertions
- Use environment variables from `.env` file
- Include proper comments and documentation
- Execute tests and iterate until they pass