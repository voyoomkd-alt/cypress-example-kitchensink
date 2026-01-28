# Todo App Automation

This repository contains automated tests for the **Todo application** using **Playwright with TypeScript**.  

The tests are basic and include a scenario showing a bug when a Todo task has very long text.

---

## Run the App and Tests

1. Open a terminal in the project folder.  
2. Install dependencies, start the app, and run tests:

```bash
npm install && npm start
# Open a new terminal tab/window and run:
npx playwright test
# To see detailed test reports:
npx playwright show-report
```

3. Open the Todo app in your browser:
http://localhost:8080/todo


What Tests Are Included

Basic Todo functionality:

Add a new task

Edit a task

Mark a task as completed

Delete a task

Bug scenario:

Tasks with very long text may break layout or wrap incorrectly

All tests use Page Object Model for easier maintenance and Allure Reports for step-by-step execution details


# Known Bugs

Long text in Todo tasks may break layout.
This bug is demonstrated in the automated test:
tests/specs/todo.spec.ts → Todo with very long text may break the layout.

Screenshot for the bug: long-todo.png

# Notes

Screenshots are included for bug scenarios

Tests are written in TypeScript using Playwright



