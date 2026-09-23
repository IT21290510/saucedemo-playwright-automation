# SauceDemo QA Automation

![Playwright Tests](https://github.com/IT21290510/saucedemo-playwright-automation/actions/workflows/playwright.yml/badge.svg)

## Overview

An end-to-end QA automation project for the SauceDemo web application using Playwright and TypeScript.

The project demonstrates UI automation, API testing, reusable test architecture, cross-browser testing, and CI/CD integration.

## Test Coverage

### UI Testing
- Login
- Product validation
- Product sorting
- Add/remove products
- Shopping cart
- Checkout
- Order completion
- Logout
- Negative test scenarios

### API Testing
- GET users
- POST user
- GET non-existing user
- Response status validation
- Response body validation

## Test Automation Framework

- Page Object Model (POM)
- Playwright fixtures
- Reusable test data
- Cross-browser testing
- API automation

## Browsers

- Chromium
- Firefox
- WebKit

## Framework & Tools

- Playwright
- TypeScript
- API Testing
- Git
- GitHub
- GitHub Actions
- CI/CD
- HTML Reporting

## Reporting

Playwright HTML reports are generated after test execution.

The reports include:
- Test execution results
- Passed and failed tests
- Execution time
- Screenshots for failed tests
- Videos for failed tests
- Trace information for retries

Reports are also uploaded as artifacts through GitHub Actions.

## CI/CD

GitHub Actions automatically runs the Playwright test suite when changes are pushed to the main branch or when a pull request is created.

## Project Structure

QA Automation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── api-tests/
├── fixtures/
├── pages/
├── test-data/
├── tests/
├── playwright.config.ts
├── package.json
└── README.md

## Author

Weenali Ranatunge

