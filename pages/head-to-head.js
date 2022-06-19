import { useState } from 'react';

import Layout from '../components/layout';
import styles from '../styles/Head.module.scss';

export default function Head2Head() {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  const teams = [
    {
      division: 'NL West',
      teams: [
        'Arizona Diamondbacks',
        'Colorado Rockies',
        'Los Angeles Dodgers',
        'San Diego Padres',
        'San Francisco Giants',
      ],
    },
    {
      division: 'NL Central',
      teams: [
        'Chicago Cubs',
        'Cincinnati Reds',
        'Milwaukee Brewers',
        'Pittsburgh Pirates',
        'St. Louis Cardinals',
      ],
    },
    {
      division: 'NL East',
      teams: [
        'Atlanta Braves',
        'Miami Marlins',
        'New York Mets',
        'Philadelphia Phillies',
        'Washington Nationals',
        'Pittsburgh Pirates',
      ],
    },
    {
      division: 'AL West',
      teams: [
        'Houston Astros',
        'Los Angeles Angels',
        'Oakland Athletics',
        'Seattle Mariners',
        'Texas Rangers',
      ],
    },
    {
      division: 'AL Central',
      teams: [
        'Chicago White Sox',
        'Cleveland Indians',
        'Detroit Tigers',
        'Kansas City Royals',
        'Minnesota Twins',
      ],
    },
    {
      division: 'AL East',
      teams: [
        'Baltimore Orioles',
        'Boston Red Sox',
        'New York Yankees',
        'Toronto Blue Jays',
        'Tampa Bay Rays',
      ],
    },
  ];

  const dropdownOptions = teams.map((division) => {
    return (
      <optgroup label={division['division']}>
        {division['teams'].map((team) => {
          return <option value={team}>{team}</option>;
        })}
      </optgroup>
    );
  });

  return (
    <Layout>
      <main className={styles.mainContainer}>
        <div>
          <label for="team1">Team 1</label>
          <select name="team1" id="team1">
            <option selected="selected">Team 1</option>
            {dropdownOptions}
          </select>

          <label for="team2">Team 2</label>
          <select name="team2" id="team2">
            <option selected="selected">Team 2</option>
            {dropdownOptions}
          </select>
        </div>
      </main>
    </Layout>
  );
}
