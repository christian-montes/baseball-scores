// import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// import getID from '../lib/teamIndex';

// import Layout from '../components/layout';
// import styles from '../styles/Head.module.scss';
// import SeasonSeries from '../components/seasonSeries';

export default function Head2Head() {
    const router = useRouter();
  //   // creating a reference to the child component
  //   const seasonSeriesRef = useRef();
  useEffect(() => {
    router.push('/scores')
  }, [])

  //   const [team1, setTeam1] = useState('');
  //   const [team2, setTeam2] = useState('');

  //   useEffect(() => {
  //     let team1Element = document.getElementById('team1');
  //     let team2Element = document.getElementById('team2');
  //     // console.log(team2Element.value);

  //     var windowSearchString = window.location.search;
  //     // console.log(windowSearchString);
  //     let searchTeam1;
  //     let searchTeam2;
  //     if (
  //       !/teamOne/.test(windowSearchString) &&
  //       !/teamTwo/.test(windowSearchString)
  //     ) {
  //       // router.replace argument is an Object from Node docs
  //       router.replace({ pathname: '/head-to-head', search: '' });
  //     } else if (
  //       !/teamTwo/.test(windowSearchString) &&
  //       /teamOne/.test(windowSearchString)
  //     ) {
  //       searchTeam1 = windowSearchString
  //         .slice(windowSearchString.indexOf('=') + 1)
  //         .replace(/\+/g, ' ');
  //       searchTeam2 = '';
  //     } else if (
  //       /teamTwo/.test(windowSearchString) &&
  //       !/teamOne/.test(windowSearchString)
  //     ) {
  //       searchTeam2 = windowSearchString
  //         .slice(windowSearchString.indexOf('=') + 1)
  //         .replace(/\+/g, ' ');
  //       searchTeam1 = '';
  //     } else {
  //       searchTeam1 = windowSearchString
  //         .slice(
  //           windowSearchString.indexOf('teamOne') + 'teamOne'.length + 1,
  //           windowSearchString.indexOf('&')
  //         )
  //         .replace(/\+/g, ' ');
  //       searchTeam2 = windowSearchString
  //         .slice(windowSearchString.indexOf('teamTwo') + 'teamTwo'.length + 1)
  //         .replace(/\+/g, ' ');
  //     }
  //     // let searchTeam1 = windowSearchString
  //     //   .slice(
  //     //     windowSearchString.indexOf('teamOne') + 'teamOne'.length + 1,
  //     //     windowSearchString.indexOf('&')
  //     //   )
  //     //   .replace(/\+/g, ' ');

  //     // let searchTeam2 = windowSearchString
  //     //   .slice(windowSearchString.indexOf('teamTwo') + 'teamTwo'.length + 1)
  //     //   .replace(/\+/g, ' ');

  //     let queryTeam1 = router.query?.teamOne;
  //     let queryTeam2 = router.query?.teamTwo;

  //     if (queryTeam1) {
  //       setTeam1(queryTeam1);
  //       seasonSeriesRef.current.updateAwayTeam(queryTeam1);
  //       team1Element.value = queryTeam1;
  //     } else if (searchTeam1) {
  //       if (getID(searchTeam1) < 1) {
  //         router.replace('/head-to-head');
  //         team1Element.value = '';
  //         team2Element.value = '';
  //         setTeam1('');
  //         setTeam2('');
  //       } else {
  //         // FIX THIS!!!!
  //         seasonSeriesRef.current.updateAwayTeam(searchTeam1);
  //         setTeam1(searchTeam1);
  //         team1Element.value = searchTeam1;
  //       }
  //     } else {
  //       setTeam1(team1Element.value);
  //     }

  //     if (queryTeam2) {
  //       setTeam2(queryTeam2);
  //       seasonSeriesRef.current.updateHomeTeam(queryTeam2);
  //       team2Element.value = queryTeam2;
  //     } else if (searchTeam2) {
  //       if (getID(searchTeam2) < 1) {
  //         router.replace('/head-to-head');
  //         team1Element.value = '';
  //         team2Element.value = '';
  //         setTeam1('');
  //         setTeam2('');
  //       } else {
  //         setTeam2(searchTeam2);
  //         seasonSeriesRef.current.updateHomeTeam(searchTeam2);
  //         team2Element.value = searchTeam2;
  //       }
  //     } else {
  //       setTeam2(team2Element.value);
  //     }

  //     // queryTeam1 ? setTeam1(queryTeam1) : setTeam1(team1Element.value);
  //     // queryTeam2 ? setTeam2(queryTeam2) : setTeam2(team2Element.value);
  //   }, []);
  //   // console.log(team1, team2, 'hello');

  //   const teams = [
  //     {
  //       division: 'NL West',
  //       teams: [
  //         'Arizona Diamondbacks',
  //         'Colorado Rockies',
  //         'Los Angeles Dodgers',
  //         'San Diego Padres',
  //         'San Francisco Giants',
  //       ],
  //     },
  //     {
  //       division: 'NL Central',
  //       teams: [
  //         'Chicago Cubs',
  //         'Cincinnati Reds',
  //         'Milwaukee Brewers',
  //         'Pittsburgh Pirates',
  //         'St. Louis Cardinals',
  //       ],
  //     },
  //     {
  //       division: 'NL East',
  //       teams: [
  //         'Atlanta Braves',
  //         'Miami Marlins',
  //         'New York Mets',
  //         'Philadelphia Phillies',
  //         'Washington Nationals',
  //       ],
  //     },
  //     {
  //       division: 'AL West',
  //       teams: [
  //         'Houston Astros',
  //         'Los Angeles Angels',
  //         'Oakland Athletics',
  //         'Seattle Mariners',
  //         'Texas Rangers',
  //       ],
  //     },
  //     {
  //       division: 'AL Central',
  //       teams: [
  //         'Chicago White Sox',
  //         'Cleveland Indians',
  //         'Detroit Tigers',
  //         'Kansas City Royals',
  //         'Minnesota Twins',
  //       ],
  //     },
  //     {
  //       division: 'AL East',
  //       teams: [
  //         'Baltimore Orioles',
  //         'Boston Red Sox',
  //         'New York Yankees',
  //         'Toronto Blue Jays',
  //         'Tampa Bay Rays',
  //       ],
  //     },
  //   ];

  //   const dropdownOptionsTeamOne = teams.map((division) => {
  //     return (
  //       <optgroup key={`${division['division']}One`} label={division['division']}>
  //         {division['teams'].map((team) => {
  //           return (
  //             <option key={`${team}One`} value={team} disabled={team2 === team}>
  //               {team}
  //             </option>
  //           );
  //         })}
  //       </optgroup>
  //     );
  //   });

  //   const dropdownOptionsTeamTwo = teams.map((division) => {
  //     return (
  //       <optgroup key={`${division['division']}Two`} label={division['division']}>
  //         {division['teams'].map((team) => {
  //           return (
  //             <option key={`${team}Two`} value={team} disabled={team1 === team}>
  //               {team}
  //             </option>
  //           );
  //         })}
  //       </optgroup>
  //     );
  //   });

  //   return (
  //     <Layout>
  //       <main className={styles.mainContainer}>
  //         <div>Select two teams to view their season series</div>
  //         <div>
  //           <label htmlFor="team1">Team 1</label>
  //           <select
  //             name="team1"
  //             id="team1"
  //             onChange={(event) => {
  //               console.log(event.target.value);
  //               setTeam1(event.target.value);
  //               seasonSeriesRef.current.updateAwayTeam(event.target.value);
  //             }}
  //           >
  //             <option value="" defaultValue>
  //               Team 1
  //             </option>
  //             {dropdownOptionsTeamOne}
  //           </select>

  //           <label htmlFor="team2">Team 2</label>
  //           <select
  //             name="team2"
  //             id="team2"
  //             onChange={(event) => {
  //               console.log(event.target.value);
  //               setTeam2(event.target.value);
  //               seasonSeriesRef.current.updateHomeTeam(event.target.value);
  //             }}
  //           >
  //             <option value="" defaultValue>
  //               Team 2
  //             </option>
  //             {dropdownOptionsTeamTwo}
  //           </select>
  //         </div>
  //         <div>
  //           Team 1: {team1} Team 2: {team2}
  //         </div>
  //         <section>
  //           <SeasonSeries away={team1} home={team2} ref={seasonSeriesRef} />
  //         </section>
  //       </main>
  //     </Layout>
  //   );
  return <div>Obsolete</div>;
}
