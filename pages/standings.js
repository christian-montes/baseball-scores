import axios from 'axios';
import { useState } from 'react';
import Layout from '../components/layout';
import Standings from '../components/standings';
import { changeAbbreviation, getFileCode } from '../lib/teamNames';
import styles from '../styles/Standings.module.scss';

export async function getStaticProps() {
  const { children } = await axios
    .get('https://site.api.espn.com/apis/v2/sports/baseball/mlb/standings')
    .then((res) => res.data);

  const { groups } = await axios
    .get(
      'https://site.web.api.espn.com/apis/site/v2/sports/baseball/mlb/groups'
    )
    .then((res) => res.data);

  const teamDivisions = {};

  groups.map((league) => {
    const { children } = league;

    children.map((division) => {
      const { name: fullDivisionName, teams } = division;
      const region = fullDivisionName.split(' ')[2];
      // console.log(region);
      teams.map((team) => {
        const { abbreviation } = team;
        teamDivisions[abbreviation] = region;
      });
    });
  });

  // console.log(teamDivisions);

  children.map((league) => {
    const {
      standings: { entries },
    } = league;
    entries.map((entry) => {
      const {
        team: { abbreviation },
      } = entry;
      entry['team']['division'] = teamDivisions[abbreviation];
      entry['team']['fileCode'] = getFileCode(abbreviation);
      entry['team']['abbreviation'] = changeAbbreviation(abbreviation);
    });
  });

  const [AmericanLeague, NationalLeague] = children;

  if (!AmericanLeague || !NationalLeague) {
    return { notFound: true };
  }
  // set to 3600 so the page's data can be revalidated after __1__ hour
  return { props: { AmericanLeague, NationalLeague }, revalidate: 3600 };
}

export default function StandingsPage({ AmericanLeague, NationalLeague }) {
  const [viewStandings, setViewStandings] = useState('divisional');
  // console.log(AmericanLeague)
  const dateProp = new Date();
  const StandingsTables = [AmericanLeague, NationalLeague].map((league) => {
    return (
      <Standings key={league['name']} data={league} show={viewStandings} />
    );
  });

  return (
    <Layout date={dateProp} page={'standings'}>
      <div className={styles.container}>
        <div
          onClick={(event) => {
            event.preventDefault();
            setViewStandings('divisional');
          }}
          className={
            viewStandings === 'divisional'
              ? styles.selectedElement
              : styles.element
          }
        >
          Division
        </div>
        <div
          onClick={(event) => {
            event.preventDefault();
            setViewStandings('wildcard');
          }}
          className={
            viewStandings === 'wildcard'
              ? styles.selectedElement
              : styles.element
          }
        >
          Wilcard
        </div>
      </div>
      {StandingsTables}
    </Layout>
  );
}
