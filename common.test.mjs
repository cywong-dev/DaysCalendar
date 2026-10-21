import assert from 'node.assert/strict';
import { getOccurrenceDay, isEventOnDate, getEventsForDate } from './common.js';

console.log('Running Calendar Unit Tests...');

const sampleEvents = [
  {
    name: "Ada Lovelace Day",
    monthName: "October",
    dayName: "Tuesday",
    occurrence: "second",
    descriptionURL: "https://codeyourfuture.github.io/Checkpoint/days/ada.txt"
  }
];

// 1. Test Ada Lovelace Day in October 2024 (2nd Tuesday = Oct 8, 2024)
const ada2024 = getEventsForDate(sampleEvents, 2024, 9, 8);
assert.equal(ada2024.length, 1);
assert.equal(ada2024[0].name, "Ada Lovelace Day");

// 2. Test Ada Lovelace Day in October 2025 (2nd Tuesday = Oct 14, 2025)
const ada2025 = getEventsForDate(sampleEvents, 2025, 9, 14);
assert.equal(ada2025.length, 1);
assert.equal(ada2025[0].name, "Ada Lovelace Day");

console.log('Unit Test Passed Successfully!');