// Dáta o aktuálnom poradí jazdcov
export const currentStandings = [
    { position: 1, driver: "Lando Norris", team: "McLaren", points: 44 },
    { position: 2, driver: "Max Verstappen", team: "Red Bull Racing", points: 36 },
    { position: 3, driver: "George Russell", team: "Mercedes", points: 35 },
    { position: 4, driver: "Oscar Piastri", team: "McLaren", points: 34 },
    { position: 5, driver: "Kimi Antonelli", team: "Mercedes", points: 22 },
    { position: 6, driver: "Alexander Albon", team: "Williams", points: 16 },
    { position: 7, driver: "Esteban Ocon", team: "Haas", points: 10 },
    { position: 8, driver: "Lance Stroll", team: "Aston Martin", points: 10 },
    { position: 9, driver: "Lewis Hamilton", team: "Ferrari", points: 9 },
    { position: 10, driver: "Charles Leclerc", team: "Ferrari", points: 8 },
    { position: 11, driver: "Nico Hulkenberg", team: "Kick Sauber", points: 6 },
    { position: 12, driver: "Oliver Bearman", team: "Haas", points: 4 },
    { position: 13, driver: "Yuki Tsunoda", team: "Racing Bulls", points: 3 },
    { position: 14, driver: "Carlos Sainz", team: "Williams", points: 1 },
    { position: 15, driver: "Isack Hadjar", team: "Racing Bulls", points: 0 },
    { position: 16, driver: "Pierre Gasly", team: "Alpine", points: 0 },
    { position: 17, driver: "Liam Lawson", team: "Red Bull Racing", points: 0 },
    { position: 18, driver: "Jack Doohan", team: "Alpine", points: 0 },
    { position: 19, driver: "Gabriel Bortoleto", team: "Kick Sauber", points: 0 }
];

// Konštruktérske poradie
export const constructorStandings = [
    { position: 1, team: "McLaren", points: 78 },
    { position: 2, team: "Mercedes", points: 57 },
    { position: 3, team: "Red Bull Racing", points: 36 },
    { position: 4, team: "Ferrari", points: 17 },
    { position: 5, team: "Williams", points: 17 },
    { position: 6, team: "Haas", points: 14 },
    { position: 7, team: "Aston Martin", points: 10 },
    { position: 8, team: "Kick Sauber", points: 6 },
    { position: 9, team: "Racing Bulls", points: 3 },
    { position: 10, team: "Alpine", points: 0 }
];

// Kalendár Veľkých cien
export const grandPrixList = [
    { date: "16.03.2025", name: "Veľká cena Austrálie (Melbourne)" },
    { date: "23.03.2025", name: "Veľká cena Číny (Šanghaj)" },
    { date: "06.04.2025", name: "Veľká cena Japonska (Suzuka)" },
    { date: "13.04.2025", name: "Veľká cena Bahrajnu (Sakhir)" },
    { date: "20.04.2025", name: "Veľká cena Saudskej Arábie (Jeddah)" },
    { date: "04.05.2025", name: "Veľká cena Miami (Florida)" },
    { date: "18.05.2025", name: "Veľká cena Emilia Romagna (Imola)" },
    { date: "25.05.2025", name: "Veľká cena Monaka (Monako)" },
    { date: "01.06.2025", name: "Veľká cena Španielska (Barcelona)" },
    { date: "15.06.2025", name: "Veľká cena Kanady (Montreal)" },
    { date: "29.06.2025", name: "Veľká cena Rakúska (Spielberg)" },
    { date: "06.07.2025", name: "Veľká cena Veľkej Británie (Silverstone)" },
    { date: "27.07.2025", name: "Veľká cena Belgicka (Spa-Francorchamps)" },
    { date: "03.08.2025", name: "Veľká cena Maďarska (Hungaroring)" },
    { date: "31.08.2025", name: "Veľká cena Holandska (Zandvoort)" },
    { date: "07.09.2025", name: "Veľká cena Talianska (Monza)" },
    { date: "21.09.2025", name: "Veľká cena Azerbajdžanu (Baku)" },
    { date: "05.10.2025", name: "Veľká cena Singapuru (Marina Bay)" },
    { date: "19.10.2025", name: "Veľká cena USA (Texas)" },
    { date: "26.10.2025", name: "Veľká cena Mexika (Mexiko City)" },
    { date: "09.11.2025", name: "Veľká cena Sao Paula (Interlagos)" },
    { date: "22.11.2025", name: "Veľká cena Las Vegas (Las Vegas)" },
    { date: "30.11.2025", name: "Veľká cena Kataru (Lusail)" },
    { date: "07.12.2025", name: "Veľká cena Abu Dhabi (Yas Marina)" }
];

// Tipy účastníkov (mutable dátová štruktúra)
export let participantTips = [
    {
        name: "Vlasto",
        drivers: ["Lando Norris", "Charles Leclerc", "Max Verstappen"],
        teams: ["McLaren", "Ferrari", "Red Bull Racing"]
    },
    {
        name: "Amon",
        drivers: ["Lando Norris", "Max Verstappen", "Oscar Piastri"],
        teams: ["McLaren", "Ferrari", "Red Bull Racing"]
    },
    {
        name: "Ondra",
        drivers: ["Lando Norris", "Charles Leclerc", "Lewis Hamilton"],
        teams: ["McLaren", "Ferrari", "Mercedes"]
    },
    {
        name: "Dominika",
        drivers: ["Lando Norris", "Max Verstappen", "Charles Leclerc"],
        teams: ["McLaren", "Ferrari", "Red Bull Racing"]
    },
    {
        name: "Dušan",
        drivers: ["Max Verstappen", "Lando Norris", "Oscar Piastri"],
        teams: ["McLaren", "Ferrari", "Red Bull Racing"]
    },
    {
        name: "Lucka",
        drivers: ["Max Verstappen", "Lando Norris", "Lewis Hamilton"],
        teams: ["Red Bull Racing", "Ferrari", "McLaren"]
    }
];