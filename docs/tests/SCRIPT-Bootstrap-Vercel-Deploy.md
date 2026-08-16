# Deployed Website Happy-Path Test Script

**Tester:** Aiden Brundell
**Target branch:** main
**Testing workflow:** Manual deployment and content verification testing

# Preconditions

* The latest commit on the main branch is deployed.
* The deployed URL is available.
* An approved test account with valid credentials is available.
* The browser begins in a signed-out state (private window works).
* The approved Team-page content is available for comparison.

============================================================
01. DEPLOYED SIGN IN PAGE AVAILABILITY
============================================================

Statement:
Verify that the sign-in page loads correctly on the deployed website and displays all required content.

Link:
https://capstone-task-1-frontend.vercel.app/auth/signin

What to check:

* The page loads from the deployed domain rather than localhost.
* The email and password fields are visible and accept input.
* The email/password sign-in button is visible.
* No controls overlap, become cut off or extend outside the page.
* No unexpected horizontal scrolling occurs.

Expected result:

* The deployed sign-in page loads without a browser, server or application error.
* All required fields, methods and links are visible and usable.
* No required content is missing or broken.

============================================================
02. VALID LOGIN
============================================================

Statement:
Verify that a user can successfully authenticate on the deployed website using valid email and password credentials.

Link:
https://capstone-task-1-frontend.vercel.app/auth/signin

What to do:

* Enter the test account’s valid email address.
* Enter the valid password.
* Click "Sign in" once.
* Observe the page while the sign-in request is processed.

Expected result:

* The credentials are accepted.
* No invalid-credentials or unexpected application error is shown.
* The request does not become stuck indefinitely.
* The user becomes authenticated without needing to submit the form repeatedly.

============================================================
03. AUTOMATIC TEAM PAGE REDIRECT
============================================================

Statement:
Verify that a successful login automatically redirects the authenticated user to the Team page.

Starting link:
https://capstone-task-1-frontend.vercel.app/auth/signin

Expected destination:
https://capstone-task-1-frontend.vercel.app/team

What to do:

* Continue directly from the valid-login test.
* Do not manually change the URL or select Team from the sidebar.
* Record the first page and final URL displayed after login.
* Confirm that the Team page finishes loading.
* Confirm that the existing sidebar is visible and functional.
* Confirm that Team is highlighted as the active navigation item.

Expected result:

* The user is automatically redirected to /team.
* No manual navigation is required.
* No redirect loop, error page or unintended dashboard page appears.
* The Team page opens within the existing authenticated layout.
* The sidebar remains visible and functional.

============================================================
04. TEAM PAGE REQUIRED CONTENT
============================================================

Statement:
Verify that all approved Team-page content is displayed correctly and completely.

Link:
https://capstone-task-1-frontend.vercel.app/team

What to check:

* The approved team name is displayed as the main heading.
* Every approved team member has exactly one card or section.
* Every card displays the member’s full name.
* Every card displays the member’s correct project role.
* Every card displays the member’s photo or approved fallback.
* Every card displays a non-empty personal or project-related blurb.
* No member or required content field is missing or duplicated.
* Content is assigned to the correct team member.
* If team members are without a supplied image display their initials.
* No broken-image icons appear.
* Profile images and fallbacks use consistent sizing and remain circular and aligned.
* Long names and roles wrap within their cards.
* Long blurbs remain within their cards.
* "Read more" and "Show less" work correctly where provided.
* Card spacing, image sizing, font, accent colour and styling are consistent.

Expected result:

* All approved team members and required content are present and responsive UI behaves as expected.

============================================================
05. LOGIN AND TEAM PAGE LAYOUT STABILITY
============================================================

Statement:
Verify that the deployed Login and Team pages remain readable and usable at desktop and smaller screen widths.

Links:
https://capstone-task-1-frontend.vercel.app/auth/signin
https://capstone-task-1-frontend.vercel.app/team

What to check:

* Test both pages at the normal desktop viewport.
* Open Browser DevTools.
* Set the viewport to 1024 × 900 and reload each page.
* Set the viewport to 768 × 900 and reload each page.

Expected result:

* Both pages remain readable and usable at all tested widths.
* Required content remains visible.
* Text wraps inside its intended container.
* Cards, controls and images do not overlap or overflow.

============================================================
BUG LOGGING
============================================================

Statement:
Record every bug found during testing with reproduction steps.

If no bugs are found, record:
"No bugs found during edge-case testing."

For every bug found, record:
- Bug title
- Page/URL
- Steps to reproduce
- Expected result
- Actual result
- Screenshot if useful
- Browser/viewport used

============================================================
DOCUMENT UPDATE
============================================================

Statement:
Update the project testing document after completing all deployed tests.
