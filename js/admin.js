import { 
    saveParticipant, 
    updateParticipant, 
    deleteParticipant,
    saveStandings,
    saveConstructorStandings
  } from './data.js';
  import { state, calculatePoints, getDriverTeam } from './main.js';
  
  // Admin funkcie
  export async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
      if (username === "admin" && password === "admin123") {
        state.currentUser = { username: "admin", isAdmin: true };
        document.getElementById('admin-controls').classList.remove('hidden');
        return true;
      }
      throw new Error("Neplatné prihlasovacie údaje");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
      return false;
    }
  }
  
  export async function handleSaveParticipant() {
    if (!state.currentUser?.isAdmin) return;
  
    const participant = {
      name: document.getElementById('edit-name').value,
      drivers: [
        document.getElementById('edit-driver1').value,
        document.getElementById('edit-driver2').value,
        document.getElementById('edit-driver3').value
      ],
      teams: [
        document.getElementById('edit-team1').value,
        document.getElementById('edit-team2').value,
        document.getElementById('edit-team3').value
      ]
    };
  
    try {
      const isNew = !state.participants.some(p => p.name === participant.name);
      
      if (isNew) {
        await saveParticipant(participant);
      } else {
        await updateParticipant(participant);
      }
      
      alert("Údaje boli úspešne uložené");
      return true;
    } catch (error) {
      console.error("Save failed:", error);
      alert("Uloženie zlyhalo: " + error.message);
      return false;
    }
  }
  
  export async function handleDeleteParticipant() {
    if (!state.currentUser?.isAdmin) return;
  
    const participantName = document.getElementById('edit-name').value;
    if (!participantName) return;
  
    if (confirm(`Naozaj chcete vymazať ${participantName}?`)) {
      try {
        await deleteParticipant(participantName);
        alert("Účastník bol vymazaný");
        return true;
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Vymazanie zlyhalo: " + error.message);
        return false;
      }
    }
  }
  
  export async function handleSaveStandings() {
    if (!state.currentUser?.isAdmin) return;
  
    const standings = [];
    const inputs = document.querySelectorAll('#edit-standings-body input');
    
    inputs.forEach(input => {
      standings.push({
        driver: input.getAttribute('data-driver'),
        points: parseInt(input.value)
      });
    });
  
    try {
      await saveStandings(standings);
      alert("Poradie bolo aktualizované");
      return true;
    } catch (error) {
      console.error("Save standings failed:", error);
      alert("Uloženie poradia zlyhalo");
      return false;
    }
  }
  
  // Event listenery
  export function setupAdminListeners() {
    document.getElementById('login-btn').addEventListener('click', login);
    document.getElementById('save-participant-btn').addEventListener('click', handleSaveParticipant);
    document.getElementById('delete-participant-btn').addEventListener('click', handleDeleteParticipant);
    document.getElementById('save-standings-btn').addEventListener('click', handleSaveStandings);
  }
  
  // Inicializácia admin rozhrania
  export function initAdmin() {
    if (state.currentUser?.isAdmin) {
      document.getElementById('admin-controls').classList.remove('hidden');
    }
  }