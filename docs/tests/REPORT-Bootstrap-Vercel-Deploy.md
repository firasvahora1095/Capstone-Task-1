# Bootstrap Restyling Vercel Deployment Test Report

**Tester:** Aiden Brundell
**Date:** 16th August 2026
**Source branch & commit:** main / 9aa183c
**Browser Engine:** Mozilla Firefox
**Environment:** Deployed vercel server
**URL**: https://capstone-task-1-frontend.vercel.app

## Results

| No. | Test | Result | Notes |
|---|---|---|---|
| 01 | Deployment Availability (sign in) | FAIL (Minor issue) | See Bug 02 |
| 02 | Login Validation  | PASS | N/A |
| 03 | Automatic team page redirect | PASS | N/A |
| 04 | Team page content | PASS | N/A |
| 05 | Page stability | PASS | N/A |

## Bugs
02. BUG | Deployment Availability (sign in) 01

Page: https://capstone-task-1-frontend.vercel.app/auth/signin
Reproduction Steps: When on the login page in a private firefox window, without autofill details, enter 'test' as email and do not enter a password, then click 'sign in'. 
Summary: Error pop-up and text for email and password does not always appear on non-chromium browsers. The form still prevents invalid submission and behaves as expected.
Expected Result: Invalid emails or empty passwords should always identify the error on the login page.
Actual Result: On Firefox, invalid emails appears to only error once a valid email has been put in the email box (and then edited to be invalid). Empty password error does not appear if the email was never entered. The email box becomes focused but no text appears. This issue is not present on chromium browsers.
Screenshot: docs/tests/screenshots/02DeploymentAvailability.png

Severity: Low
Notes: This does not break the page, but it does not meet the accessibility requirements.

## Report
Deployment on vercel, successful login validation, automatic redirection and page context/stability was manually tested. All content was consistent with the testing requirements except for the login page, which did not always show invalid email and password error messages (see Bug 02).
