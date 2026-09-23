import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration
 */
export default defineConfig({
  // Include both UI tests and API tests
  testDir: '.',

  // Run tests in parallel
  fullyParallel: true,

  // Prevent test.only from being used in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests twice in CI
  retries: process.env.CI ? 2 : 0,

  // Use one worker in CI
  workers: process.env.CI ? 1 : undefined,

  // Generate an HTML test report
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],

  // Shared test settings
  use: {
    // Collect trace when a test fails and is retried
    trace: 'on-first-retry',

    // Capture screenshot when a test fails
    screenshot: 'only-on-failure',

    // Record video when a test fails
    video: 'retain-on-failure',
  },

  // Run tests on Chromium, Firefox, and WebKit
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});