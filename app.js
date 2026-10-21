import { MONTH_NAMES, getEventsForDate } from './common.js';

// Application state
let currentDate = new Date();
let eventsData = [];

// DOM Element references
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const jumpBtn = document.getElementById('jump-btn');
const monthSelect = document.getElementById('month-select');
const yearInput = document.getElementById('year-input');
const monthYearTitle = document.getElementById('month-year-title');
const calendarDaysContainer = document.getElementById('calendar-days');

// Load events JSON file and render calendar
async function initCalendar() {
  try {
    const response = await fetch('./days.json');
    if (response.ok) {
      eventsData = await response.json();
    }
  } catch (error) {
    console.error('Error fetching events.json:', error);
  }

  setupEventListeners();
  renderCalendar();
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Update header title
  monthYearTitle.textContent = `${MONTH_NAMES[month]} ${year}`;

  // Sync control inputs
  monthSelect.value = month;
  yearInput.value = year;

  // Clear previous cells
  calendarDaysContainer.innerHTML = '';

  // Get index of first day of month (0 = Sunday) & total days in month
  const startDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 1. Render empty padding cells before 1st of month
  for (let i = 0; i < startDayOfWeek; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'day-cell empty';
    calendarDaysContainer.appendChild(emptyCell);
  }

  // 2. Render actual day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'day-cell';

    // Day number label
    const dayNumber = document.createElement('span');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day;
    dayCell.appendChild(dayNumber);

    // Get matching events for this date
    const dayEvents = getEventsForDate(eventsData, year, month, day);

    dayEvents.forEach(event => {
      let eventElement;

      // If descriptionURL exists, render an interactive anchor link
      if (event.descriptionURL) {
        eventElement = document.createElement('a');
        eventElement.href = event.descriptionURL;
        eventElement.target = '_blank';
        eventElement.rel = 'noopener noreferrer';
        eventElement.setAttribute('aria-label', `${event.name} description (opens in a new tab)`);
      } else {
        eventElement = document.createElement('div');
      }

      eventElement.className = 'event-tag';
      eventElement.textContent = event.name;
      dayCell.appendChild(eventElement);
    });

    calendarDaysContainer.appendChild(dayCell);
  }
}

function setupEventListeners() {
  // Navigation: Previous Month
  prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  // Navigation: Next Month
  nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });


  // Jump to specific month & year
  jumpBtn.addEventListener('click', () => {
    const selectedMonth = parseInt(monthSelect.value, 10);
    const selectedYear = parseInt(yearInput.value, 10);

    if (!isNaN(selectedYear) && selectedYear > 0) {
      currentDate = new Date(selectedYear, selectedMonth, 1);
      renderCalendar();
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initCalendar);