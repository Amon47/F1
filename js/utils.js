// Pomocné funkcie
export const getTeamClass = (teamName) => {
    if (!teamName) return '';
    const teamClasses = {
      'mclaren': 'team-mclaren',
      'ferrari': 'team-ferrari',
      'red bull': 'team-redbull',
      'mercedes': 'team-mercedes',
      'aston martin': 'team-astonmartin',
      'alpine': 'team-alpine',
      'haas': 'team-haas',
      'racing bulls': 'team-racingbulls',
      'williams': 'team-williams',
      'sauber': 'team-sauber'
    };
    return teamClasses[teamName.toLowerCase()] || '';
  };
  
  // Formátovanie dátumu
  export const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('sk-SK', options);
  };
  
  // Error handling
  export const handleError = (error) => {
    console.error('Chyba:', error);
    alert(`Nastala chyba: ${error.message}`);
  };