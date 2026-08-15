# Bootstrap Restyling Edge Cases Test Script

**Tester:** Aiden Brundell
**Target branch:** main
**Testing workflow:** Manual edge-case and correct response testing

# Preconditions

- The latest commit on main branch is tested locally.
- The tester is not the builder of the code.

============================================================
01. INVALID LOGIN TEST
============================================================

Statement:
Test an invalid login and confirm the user is not authenticated.

Link:
http://localhost:3000/auth/signin

What to do:
- Enter a valid-looking email address.
- Enter an incorrect password.
- Click "Sign in".

Expected result:
- Login must fail.
- User must remain on the sign-in page.
- An "Invalid email or password" error must be shown.
- User must NOT be redirected to /team or /dashboard.

Also test field validation:
- Invalid email format, e.g. test
- Empty password
- Empty email and password

Expected validation:
- Invalid email should show a valid-email error.
- Empty password should show "Password is required".
- Empty email should show an email-required/validation message.


============================================================
02. DIRECT TEAM PAGE ACCESS WITHOUT AUTH
============================================================

Statement:
Test direct access to the Team page while logged out. It must redirect to Sign in.

Link:
http://localhost:3000/team

Expected result:
The browser should redirect to:

http://localhost:3000/auth/signin?redirect=%2Fteam

Pass condition:
- /team cannot be viewed without authentication.
- Sign-in page loads correctly after the redirect.


============================================================
03. MISSING-PHOTO FALLBACK
============================================================

Statement:
Verify team-member cards remain usable when a profile image is missing.

Link:
http://localhost:3000/team

What to check:
- Janataarah Begum shows the "JB" initials fallback.
- Aiden Brundell shows the "AB" initials fallback.
- Other members with no supplied image use the neutral circular placeholder.
- No broken-image icon appears.
- Avatar areas stay circular and aligned.
- Cards do not move or break because an image is missing.

Expected result:
Missing photos are handled gracefully with placeholders/initials and the layout remains intact.


============================================================
04. LONG BLURB TEXT WRAPPING
============================================================

Statement:
Verify long team-member descriptions do not overflow or break the card layout.

Link:
http://localhost:3000/team

What to check:
- Hyuna Bae's longer description is truncated in the default state.
- "Read more" is visible.
- Click "Read more".
- Confirm the full description becomes visible.
- Confirm the card expands without overlapping neighbouring cards.
- Click "Show less".
- Confirm the card returns to the compact state.

Expected result:
Long text is clamped safely, expands correctly, and never overflows the card.


============================================================
05. LONG NAME / ROLE TEXT WRAPPING
============================================================

Statement:
Verify long names and role titles wrap inside the card rather than overflowing.

Link:
http://localhost:3000/team

What to check:
- Names remain inside the card width.
- Role badges remain inside the card.
- Text wraps onto multiple lines where required.
- No text overlaps neighbouring cards or extends outside the card.


============================================================
06. RESPONSIVE LAYOUT @ 1024px
============================================================

Statement:
Verify the Team page layout at 1024px width.

Link:
http://localhost:3000/team

How to test:
- Open Browser Developer Tools.
- Toggle Device Toolbar.
- Set viewport to approximately 1024 x 900.

Expected result:
- Full sidebar is visible.
- Team navigation item is highlighted.
- Team cards display in the intended multi-column layout.
- No horizontal scrolling.
- Text and cards do not overlap.


============================================================
07. RESPONSIVE LAYOUT @ 768px
============================================================

Statement:
Verify the Team page layout at 768px width.

Link:
http://localhost:3000/team

How to test:
- Open Browser Developer Tools.
- Toggle Device Toolbar.
- Set viewport to approximately 768 x 900.

Expected result:
- Sidebar collapses to the narrow icon-only rail.
- Team remains highlighted.
- Cards display in 2 columns.
- No horizontal scrolling.
- Card content stays readable.
- No text or badges overflow.

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
Update the project testing document after completing each edge-case test.

