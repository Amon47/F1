import { getTeamClass } from './utils.js';

export function fillTable(tableBody, data, rowTemplate) {
  tableBody.innerHTML = '';
  data.forEach((item, index) => {
    const row = document.createElement('tr');
    if (index === 0) row.classList.add('first-place');
    row.innerHTML = rowTemplate(item);
    tableBody.appendChild(row);
  });
}

export function fillStandingsTable(tableBody, standings) {
  tableBody.innerHTML = '';
  standings.forEach(item => {
    const row = document.createElement('tr');
    row.className = getTeamClass(item.team);
    row.innerHTML = `
      <td>${item.position}</td>
      <td>${item.driver || item.team}</td>
      <td>${item.points}</td>
    `;
    tableBody.appendChild(row);
  });
}

export function fillCalendarTable(tableBody, calendar) {
  tableBody.innerHTML = '';
  calendar.forEach(event => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${event.date}</td>
      <td>${event.name}</td>
    `;
    tableBody.appendChild(row);
  });
}