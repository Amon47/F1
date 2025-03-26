import { currentStandings, constructorStandings, grandPrixList, participantTips } from './data.js';

// Globálne premenné
let currentUser = null;
let currentParticipant = null;

// Funkcia na získanie CSS triedy pre tím
function getTeamClass(teamName) {
    if (!teamName) return '';
    
    const normalizedTeam = teamName.toLowerCase().replace(/\s+/g, '');
    
    if (normalizedTeam.includes("mclaren")) return "team-mclaren";
    if (normalizedTeam.includes("ferrari")) return "team-ferrari";
    if (normalizedTeam.includes("redbull")) return "team-redbull";
    if (normalizedTeam.includes("mercedes")) return "team-mercedes";
    if (normalizedTeam.includes("astonmartin")) return "team-astonmartin";
    if (normalizedTeam.includes("alpine")) return "team-alpine";
    if (normalizedTeam.includes("haas")) return "team-haas";
    if (normalizedTeam.includes("racingbulls")) return "team-racingbulls";
    if (normalizedTeam.includes("williams")) return "team-williams";
    if (normalizedTeam.includes("sauber")) return "team-sauber";
    
    return '';
}

// Funkcia na výpočet bodov
function calculatePoints() {
    const actualChampion = currentStandings[0].driver;
    const actualConstructorChampion = constructorStandings[0].team;
    
    const driverStandingsMap = {};
    currentStandings.forEach(driver => {
        driverStandingsMap[driver.driver] = driver.position;
    });

    const teamStandingsMap = {};
    constructorStandings.forEach(team => {
        teamStandingsMap[team.team] = team.position;
    });

    participantTips.forEach(participant => {
        let points = 0;

        // 1. Správny majster sveta (5 bodov)
        if (participant.drivers[0] === actualChampion) {
            points += 5;
        }

        // 2. Správny víťaz pohára konštruktérov (5 bodov)
        if (participant.teams[0] === actualConstructorChampion) {
            points += 5;
        }

        // 3. Správne umiestnenie jazdca v top3 (3 body za každú správnu pozíciu)
        for (let i = 0; i < 3; i++) {
            const tippedDriver = participant.drivers[i];
            const actualPosition = driverStandingsMap[tippedDriver];
            
            if (actualPosition === i + 1) {
                points += 3;
            }
            // 5. Jazdec v top3 ale na inom mieste (1 bod)
            else if (actualPosition <= 3) {
                points += 1;
            }
        }

        // 4. Správne umiestnenie tímu v top3 (3 body za každú správnu pozíciu)
        for (let i = 0; i < 3; i++) {
            const tippedTeam = participant.teams[i];
            const actualPosition = teamStandingsMap[tippedTeam];
            
            if (actualPosition === i + 1) {
                points += 3;
            }
            // 6. Tím v top3 ale na inom mieste (1 bod)
            else if (actualPosition <= 3) {
                points += 1;
            }
        }

        participant.points = points;
    });

    participantTips.sort((a, b) => b.points - a.points);
}

// Naplnenie tabuľky tipovačky
function fillTipovackaTable() {
    const tableBody = document.querySelector('#tips-body');
    tableBody.innerHTML = '';

    participantTips.forEach((participant, index) => {
        const row = document.createElement('tr');
        if (index === 0) row.classList.add('first-place');
        
        const driver1Class = getTeamClass(getDriverTeam(participant.drivers[0]));
        const driver2Class = getTeamClass(getDriverTeam(participant.drivers[1]));
        const driver3Class = getTeamClass(getDriverTeam(participant.drivers[2]));
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${participant.name}</td>
            <td class="${driver1Class}">${participant.drivers[0]}</td>
            <td class="${driver2Class}">${participant.drivers[1]}</td>
            <td class="${driver3Class}">${participant.drivers[2]}</td>
            <td>${participant.points}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Funkcia na získanie tímu pre jazdca
function getDriverTeam(driverName) {
    const driver = currentStandings.find(d => d.driver === driverName);
    return driver ? driver.team : '';
}

// Naplnenie kalendára
function fillCalendar() {
    const tableBody = document.querySelector('#calendar-body');
    tableBody.innerHTML = '';

    grandPrixList.forEach(gp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${gp.date}</td>
            <td>${gp.name}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Naplnenie aktuálneho poradia
function fillStandings() {
    const standingsBody = document.getElementById('current-standings');
    const constructorBody = document.getElementById('constructor-standings');
    
    standingsBody.innerHTML = '';
    constructorBody.innerHTML = '';
    
    currentStandings.forEach(driver => {
        const row = document.createElement('tr');
        const teamClass = getTeamClass(driver.team);
        row.className = teamClass;
        row.innerHTML = `
            <td>${driver.position}</td>
            <td>${driver.driver}</td>
            <td>${driver.team}</td>
            <td>${driver.points}</td>
        `;
        standingsBody.appendChild(row);
    });
    
    constructorStandings.forEach(team => {
        const row = document.createElement('tr');
        const teamClass = getTeamClass(team.team);
        row.className = teamClass;
        row.innerHTML = `
            <td>${team.position}</td>
            <td>${team.team}</td>
            <td>${team.points}</td>
        `;
        constructorBody.appendChild(row);
    });
}

// Naplnenie zoznamu účastníkov
function fillParticipantsList() {
    const participantsList = document.getElementById('participants-list');
    participantsList.innerHTML = '';
    
    participantTips.forEach(participant => {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'participant-link';
        a.textContent = participant.name;
        a.onclick = () => showParticipant(participant.name);
        p.appendChild(a);
        participantsList.appendChild(p);
    });
}

// Funkcia na prepínanie sekcií
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.toggle('hidden');
    
    if (!section.classList.contains('hidden')) {
        if (sectionId === 'calendar-section') {
            fillCalendar();
        } else if (sectionId === 'standings-section') {
            fillStandings();
        }
    }
}

// Zobrazenie účastníka
function showParticipant(name) {
    currentParticipant = participantTips.find(p => p.name === name);
    if (!currentParticipant) return;
    
    const profileDiv = document.getElementById('user-profile');
    
    const driver1Class = getTeamClass(getDriverTeam(currentParticipant.drivers[0]));
    const driver2Class = getTeamClass(getDriverTeam(currentParticipant.drivers[1]));
    const driver3Class = getTeamClass(getDriverTeam(currentParticipant.drivers[2]));
    
    const team1Class = getTeamClass(currentParticipant.teams[0]);
    const team2Class = getTeamClass(currentParticipant.teams[1]);
    const team3Class = getTeamClass(currentParticipant.teams[2]);
    
    profileDiv.innerHTML = `
        <h3>${currentParticipant.name}</h3>
        <p><strong>Tipy:</strong></p>
        <p>1. miesto: <span class="${driver1Class}">${currentParticipant.drivers[0]}</span></p>
        <p>2. miesto: <span class="${driver2Class}">${currentParticipant.drivers[1]}</span></p>
        <p>3. miesto: <span class="${driver3Class}">${currentParticipant.drivers[2]}</span></p>
        <p><strong>Tímy:</strong></p>
        <p>1. miesto: <span class="${team1Class}">${currentParticipant.teams[0]}</span></p>
        <p>2. miesto: <span class="${team2Class}">${currentParticipant.teams[1]}</span></p>
        <p>3. miesto: <span class="${team3Class}">${currentParticipant.teams[2]}</span></p>
        <p><strong>Celkové body:</strong> ${currentParticipant.points}</p>
    `;
}

// Inicializácia
document.addEventListener('DOMContentLoaded', () => {
    calculatePoints();
    fillCalendar();
    fillStandings();
    fillTipovackaTable();
    fillParticipantsList();
    
    // Nastavenie event listenerov pre tlačidlá
    document.querySelectorAll('button').forEach(button => {
        if (button.onclick) {
            const originalOnClick = button.onclick;
            button.onclick = function(e) {
                try {
                    originalOnClick.call(this, e);
                } catch (error) {
                    console.error('Chyba pri kliknutí:', error);
                }
            };
        }
    });
});

// Export funkcií potrebných pre admin.js
export { showParticipant, toggleSection, getTeamClass, getDriverTeam };