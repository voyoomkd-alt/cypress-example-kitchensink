import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/specs',
  reporter: [
    ['list'],                 // console output
    ['allure-playwright']     // Allure report
  ],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure', // automatically take screenshot if test fails
    trace: 'retain-on-failure',    // record trace for debugging
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
