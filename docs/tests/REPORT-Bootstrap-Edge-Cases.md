# Bootstrap Restyling Edge Cases Test Report

**Tester:** Aiden Brundell
**Date:** 15th August 2026
**Source branch & commit:** main / 5a106ff
**Browser Engine:** Mozilla Firefox
**Environment:** Locally deployed server
**URL**: http://localhost:3000

## Results

| No. | Test | Result | Notes |
|---|---|---|---|
| 01 | Invalid Login Details | PASSED | N/A |
| 02 | Unauthenticated Team Page Access | PASSED | N/A |
| 03 | Missing Photos | PASSED | N/A |
| 04 | Blurb Text Wrapping | FAILED | Bug 01 |
| 05 | Long Name / Role Text Wrapping | PASSED | N/A |
| 06 | Responsive Layout @ 1024px | PASSED | N/A |
| 07 | Responsive Layout @ 768px | PASSED | N/A |

## Bugs
01. BUG | Blurb Text Wrapping (04)
Page: http://localhost:3000/team
Reproduction Steps: When logged into the team page, click 'Read more' on Hyuna's role blurb.
Summary: Expanding the blurb also expands the blurbs of horizontally neighboring team members.
Expected Result: Only the blurb that was interacted with through 'Read more' should expand.
Actual Result: All neighboring blurbs expand.
Screenshot: docs/tests/screenshots/01BlurbTextWrapping.png

Notes: This does not break the page, but it is unexpected behaviour

## Report
The website was manually tested on a locally deployed server. Authentication, missing image fallback, text wrapping/resizing and different viewport resolutions were tested. The website did not pass Test 04 (see Bug 01), as expanding the blurb expanded every horizontally neighboring blurb (See Bug 01). 
All other tests passed successfully.