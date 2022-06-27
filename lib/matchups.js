const MLBteams = [
  'Baltimore Orioles',
  'Boston Red Sox',
  'Los Angeles Angels',
  'Chicago White Sox',
  'Cleveland Guardians',
  'Detroit Tigers',
  'Kansas City Royals',
  'Milwaukee Brewers',
  'Minnesota Twins',
  'New York Yankees',
  'Oakland Athletics',
  'Seattle Mariners',
  'Texas Rangers',
  'Toronto Blue Jays',
  'Atlanta Braves',
  'Chicago Cubs',
  'Cincinnati Reds',
  'Houston Astros',
  'Los Angeles Dodgers',
  'Washington Nationals',
  'New York Mets',
  'Philadelphia Phillies',
  'Pittsburgh Pirates',
  'St. Louis Cardinals',
  'San Diego Padres',
  'San Francisco Giants',
  'Colorado Rockies',
  'Miami Marlins',
  'Arizona Diamondbacks',
  'Tampa Bay Rays',
];

// const teamSlugs = MLBteams.map((team) => {
//   return team.replaceAll(' ', '-');
// })

// let possibleMatchups = [];

// teamSlugs.map((team1, index1) => {
//   teamSlugs.map((team2, index2) => {
//     if (index1 === index2) {
//       continue;
//     } else {
//       possibleMatchups.push(`${team1}_${team2}`)
//     }
//   })
// })

export function getAllMatchups() {
  const teamSlugs = MLBteams.map((team) => {
    return team.replace(/\s/g, '-');
  });

  let possibleMatchups = teamSlugs
    .map((team1) => {
      return teamSlugs
        .filter((team2) => team1 !== team2)
        .map((team2) => {
          return `${team1}_${team2}`;
        });
    })
    .reduce((prev, curr) => {
      return prev.concat(curr);
    });

  return possibleMatchups.map((matchup) => {
    return {
      params: {teams: matchup}
    }
  });
}
