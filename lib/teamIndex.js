const teams = [
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

/**
 * Returns coded team ID used by ESPN API
 * @param {String} name 
 */
export default function getID(name) {
  return teams.indexOf(name) + 1;
}
