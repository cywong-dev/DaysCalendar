// Array of month names matching Date.prototype.getMonth() index (0 = January)
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Array of day names matching Date.prototype.getDay() index (0 = Sunday)
export const DAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

// Mapping word occurrences to numbers
const OCCURRENCE_MAP = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5
};

/**
 * Calculates the day of the month for a relative occurrence rule (e.g. 2nd Tuesday or last Friday).
 *
 * @param {number} year - e.g. 2024
 * @param {number} monthIndex - 0 to 11
 * @param {number} dayOfWeek - 0 (Sunday) to 6 (Saturday)
 * @param {string} occurrence - "first", "second", "third", "fourth", or "last"
 * @returns {number} The day of the month (1-31), or -1 if not found
 */
export function getOccurrenceDay(year, monthIndex, dayOfWeek, occurrence) {
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();
  const matchingDays = [];

  // Find all dates in the month that fall on the specified day of the week
  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, monthIndex, day);
    if (date.getDay() === dayOfWeek) {
      matchingDays.push(day);
    }
  }

  // Handle "last" occurrence
  if (occurrence === 'last') {
    return matchingDays.length > 0 ? matchingDays[matchingDays.length - 1] : -1;
  }

  // Handle ordinal occurrence ("first", "second", etc.)
  const targetIndex = OCCURRENCE_MAP[occurrence.toLowerCase()];
  if (targetIndex && matchingDays[targetIndex - 1]) {
    return matchingDays[targetIndex - 1];
  }

  return -1;
}

/**
 * Checks if a JSON event item matches the given year, month, and day.
 *
 * @param {Object} event - Item from events.json
 * @param {number} year
 * @param {number} monthIndex - 0 to 11
 * @param {number} day - 1 to 31
 * @returns {boolean}
 */
export function isEventOnDate(event, year, monthIndex, day) {
  // Convert event month string to index (e.g., "October" -> 9)
  const eventMonthIndex = MONTH_NAMES.findIndex(
    m => m.toLowerCase() === event.monthName.toLowerCase()
  );

  if (eventMonthIndex !== monthIndex) {
    return false;
  }

  // Convert event day name string to index (e.g., "Tuesday" -> 2)
  const dayOfWeekIndex = DAY_NAMES.findIndex(
    d => d.toLowerCase() === event.dayName.toLowerCase()
  );

  if (dayOfWeekIndex === -1) {
    return false;
  }

  // Calculate matching day of month
  const targetDay = getOccurrenceDay(year, monthIndex, dayOfWeekIndex, event.occurrence);
  return targetDay === day;
}

/**
 * Filters and returns all events occurring on a specific date.
 *
 * @param {Array} events - List of event objects
 * @param {number} year
 * @param {number} monthIndex - 0 to 11
 * @param {number} day - 1 to 31
 * @returns {Array}
 */
export function getEventsForDate(events, year, monthIndex, day) {
  if (!Array.isArray(events)) {
    return [];
  }

  return events.filter(event => isEventOnDate(event, year, monthIndex, day));
}