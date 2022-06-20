import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Layout from '../components/layout';
import styles from '../styles/Head.module.scss';

export default function Head2Head() {
  const router = useRouter();

  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  useEffect(() => {
    let team1Element = document.getElementById('team1');
    // console.log(team1Element.value);

    let team2Element = document.getElementById('team2');
    // console.log(team2Element.value);

    let queryTeam1 = router.query?.teamOne;
    let queryTeam2 = router.query?.teamTwo;
    // console.log(router.query);

    if (queryTeam1) {
      setTeam1(queryTeam1);
      team1Element.value = queryTeam1;
    } else {
      setTeam1(team1Element.value);
    }

    if (queryTeam2) {
      setTeam2(queryTeam2);
      team2Element.value = queryTeam2;
    } else {
      setTeam2(team2Element.value);
    }

    // queryTeam1 ? setTeam1(queryTeam1) : setTeam1(team1Element.value);
    // queryTeam2 ? setTeam2(queryTeam2) : setTeam2(team2Element.value);
  }, []);

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

  const dropdownOptionsTeamOne = teams.map((division) => {
    return (
      <optgroup key={`${division['division']}One`} label={division['division']}>
        {division['teams'].map((team) => {
          return (
            <option key={`${team}One`} value={team} disabled={team2 === team}>
              {team}
            </option>
          );
        })}
      </optgroup>
    );
  });

  const dropdownOptionsTeamTwo = teams.map((division) => {
    return (
      <optgroup key={`${division['division']}Two`} label={division['division']}>
        {division['teams'].map((team) => {
          return (
            <option key={`${team}Two`} value={team} disabled={team1 === team}>
              {team}
            </option>
          );
        })}
      </optgroup>
    );
  });

  return (
    <Layout>
      <main className={styles.mainContainer}>
        <div>Select two teams to view their season series</div>
        <div>
          <label htmlFor="team1">Team 1</label>
          <select
            name="team1"
            id="team1"
            onChange={(event) => {
              console.log(event.target.value);
              setTeam1(event.target.value);
            }}
          >
            <option defaultValue>Team 1</option>
            {dropdownOptionsTeamOne}
          </select>

          <label htmlFor="team2">Team 2</label>
          <select
            name="team2"
            id="team2"
            onChange={(event) => {
              console.log(event.target.value);
              setTeam2(event.target.value);
            }}
          >
            <option defaultValue>Team 2</option>
            {dropdownOptionsTeamTwo}
          </select>
        </div>
        <div>
          Team 1: {team1} Team 2: {team2}
        </div>
      </main>
    </Layout>
  );
}
