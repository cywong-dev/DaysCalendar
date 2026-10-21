# Testing Documentation

This document outlines how each project requirement and rubric point was tested and verified for the Calendar project.

---

## 1. Calendar Grid & Layout Display
**Rubric description** 
Create an HTML page which displays a calendar showing every day of the current month as a rectangle, grouped by week rows, with Sundays in the first column and the first day of the month in the first row.
**Test description** 
Loaded `index.html` in Chrome across multiple months (e.g., February 2026, October 2026). 
**Test result**
Visually verified that the grid aligns properly with 7 columns starting with Sunday, and that empty padding cells correctly position the 1st of the month in the right row.

## 2. Previous and Next Month Navigation
**Rubric description** 
Two buttons that switch the display to the previous or next month indefinitely without upper/lower boundaries.
**Test description** 
Clicked the "Previous" and "Next" buttons repeatedly to transition across year boundaries (e.g., navigating backward from January 2026 to December 2025, and forward into future years like 2050 and past years like 1900) to ensure smooth state updates and correct month/year headers.
**Test result**
The calendar was displayed correctly.

## 3. Jump to Specific Month and Year
**Rubric description** 
A way to jump directly to a particular month and year (using `<select>` and `<input>` controls).
**Test description** 
Selected various months from the dropdown, typed different years (including historical and distant future years like 1900 and 2050), and clicked the "Jump" button. 
**Test result**
Verified the calendar updated instantly to display the correct target month.

## 4. Dynamic Commemorative Days from JSON
*Rubric description** 
Commemorative days from the JSON file appear correctly for any year without hard-coded logic for specific dates.
**Test description** 
Add new day record - International Dawn Chorus Day in the json file.
**Test result**
The new day can be shown correctly in the web page.

## 5. Unit Tests
*Rubric description**
Repository must contain at least one unit test demonstrating that code works.
**Test description** 
Unit tests in `common.test.js` - Created Node.js unit tests (`common.test.js`) using `node:assert/strict` to test core date calculation and JSON rule-matching logic. 
**Test result**
The assertion pass successfully.

## 6. 100% Accessibility (Lighthouse)
**Rubric description**
Every view of the website must be accessible, scoring 100% accessibility in Lighthouse Snapshot mode.
**Test description** 
Ran Google Chrome DevTools Lighthouse in "Snapshot" mode across multiple month views. 
**Test result**
Verified that accessibility standards resulting in a 100% score.
