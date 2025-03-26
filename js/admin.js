import { participantTips } from './data.js';
import { showParticipant, getTeamClass, getDriverTeam } from './main.js';

// Globálne premenné
let currentUser = null;
let currentParticipant = null;

// Prihlasovacia funkcia
export function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if(username === "admin" && password === "admin123") {
        currentUser = { username: "admin", isAdmin: true };
        document.getElementById('admin-controls').classList.remove('hidden');
        alert("Admin prihlásený!");
    } else if(username && password) {
        currentUser = { username, isAdmin: false };
        document.getElementById('admin-controls').classList.add('hidden');
        alert("Vitaj " + username + "!");
    } else {
        alert("Chyba prihlásenia!");
    }
}

// Zobrazenie editácie poradia
export function showEditStandings() {
    if (!currentUser?.isAdmin) return;
    
    const modalBody = document.getElementById('edit-standings-body');
    modalBody.innerHTML = '';
    
    currentStandings.forEach(driver => {
        const row = document.createElement('tr');
        row.className = getTeamClass(driver.team);
        row.innerHTML = `
            <td>${driver.position}</td>
            <td>${driver.driver}</td>
            <td>${driver.team}</td>
            <td><input type="number" value="${driver.points}" data-driver="${driver.driver}"></td>
        `;
        modalBody.appendChild(row);
    });
    
    document.getElementById('edit-standings-modal').style.display = 'flex';
}

// Zobrazenie editácie konštruktérov
export function showEditConstructors() {
    if (!currentUser?.isAdmin) return;
    
    const modalBody = document.getElementById('edit-constructors-body');
    modalBody.innerHTML = '';
    
    constructorStandings.forEach(team => {
        const row = document.createElement('tr');
        row.className = getTeamClass(team.team);
        row.innerHTML = `
            <td>${team.position}</td>
            <td>${team.team}</td>
            <td><input type="number" value="${team.points}" data-team="${team.team}"></td>
        `;
        modalBody.appendChild(row);
    });
    
    document.getElementById('edit-constructors-modal').style.display = 'flex';
}

// Uloženie účastníka
export function saveParticipant() {
    if (!currentUser?.isAdmin || !currentParticipant) return;
    
    const newName = document.getElementById('edit-name').value;
    if (!newName) {
        alert("Meno účastníka nemôže byť prázdne!");
        return;
    }
    
    const drivers = [
        document.getElementById('edit-driver1').value,
        document.getElementById('edit-driver2').value,
        document.getElementById('edit-driver3').value
    ];
    
    const teams = [
        document.getElementById('edit-team1').value,
        document.getElementById('edit-team2').value,
        document.getElementById('edit-team3').value
    ];
    
    if (new Set(drivers).size !== 3) {
        alert("Jazdci sa nesmú opakovať!");
        return;
    }
    
    if (new Set(teams).size !== 3) {
        alert("Tímy sa nesmú opakovať!");
        return;
    }
    
    currentParticipant.name = newName;
    currentParticipant.drivers = drivers;
    currentParticipant.teams = teams;
    
    calculatePoints();
    fillTipovackaTable();
    fillParticipantsList();
    showParticipant(newName);
    
    alert("Účastník bol úspešne aktualizovaný!");
}

// Vymazanie účastníka
export function deleteParticipant() {
    if (!currentUser?.isAdmin || !currentParticipant) return;
    
    if (confirm(`Naozaj chcete vymazať účastníka ${currentParticipant.name}?`)) {
        const index = participantTips.findIndex(p => p.name === currentParticipant.name);
        if (index !== -1) {
            participantTips.splice(index, 1);
            
            calculatePoints();
            fillTipovackaTable();
            fillParticipantsList();
            
            document.getElementById('edit-participant').classList.add('hidden');
            document.getElementById('user-profile').innerHTML = '<p>Vyberte účastníka pre detailné informácie...</p>';
            
            alert("Účastník bol úspešne vymazaný!");
        }
    }
}

// Pridanie nového účastníka
export function addNewParticipant() {
    if (!currentUser?.isAdmin) return;
    
    document.getElementById('new-participant-name').value = '';
    document.getElementById('new-driver1').selectedIndex = 0;
    document.getElementById('new-driver2').selectedIndex = 0;
    document.getElementById('new-driver3').selectedIndex = 0;
    document.getElementById('new-team1').selectedIndex = 0;
    document.getElementById('new-team2').selectedIndex = 0;
    document.getElementById('new-team3').selectedIndex = 0;
    
    document.getElementById('add-participant-modal').style.display = 'flex';
}

// Potvrdenie pridania účastníka
export function confirmAddParticipant() {
    const name = document.getElementById('new-participant-name').value.trim();
    if (!name) {
        alert("Meno účastníka nemôže byť prázdne!");
        return;
    }
    
    if (participantTips.some(p => p.name === name)) {
        alert("Účastník s týmto menom už existuje!");
        return;
    }
    
    const drivers = [
        document.getElementById('new-driver1').value,
        document.getElementById('new-driver2').value,
        document.getElementById('new-driver3').value
    ];
    
    const teams = [
        document.getElementById('new-team1').value,
        document.getElementById('new-team2').value,
        document.getElementById('new-team3').value
    ];
    
    if (new Set(drivers).size !== 3) {
        alert("Jazdci sa nesmú opakovať!");
        return;
    }
    
    if (new Set(teams).size !== 3) {
        alert("Tímy sa nesmú opakovať!");
        return;
    }
    
    participantTips.push({
        name: name,
        drivers: drivers,
        teams: teams,
        points: 0
    });
    
    calculatePoints();
    fillTipovackaTable();
    fillParticipantsList();
    hideModal('add-participant-modal');
    
    alert("Nový účastník bol úspešne pridaný!");
}

// Skrytie modálneho okna
function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}