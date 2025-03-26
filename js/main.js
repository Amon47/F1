import { 
    loadParticipants,
    loadCurrentStandings,
    loadConstructorStandings,
    loadCalendar,
    saveParticipant
  } from './data.js';
  
  // Inicializácia aplikácie
  async function initApp() {
    try {
      const [participants, standings, constructors, calendar] = await Promise.all([
        loadParticipants(),
        loadCurrentStandings(),
        loadConstructorStandings(),
        loadCalendar()
      ]);
      
      console.log("Data loaded:", { participants, standings, constructors, calendar });
      // Sem pridajte vašu logiku na zobrazenie dát
      
    } catch (error) {
      console.error("Initialization failed:", error);
      alert("Nepodarilo sa načítať dáta");
    }
  }
  
  // Spustenie po načítaní DOM
  document.addEventListener('DOMContentLoaded', initApp);