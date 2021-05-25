import axios from 'axios';
import Layout from '../components/layout';
import Standings from '../components/standings';

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
    });
  });

  const [AmericanLeague, NationalLeague] = children;

  if (!AmericanLeague || !NationalLeague) {
    return { notFound: true };
  }

  return { props: { AmericanLeague, NationalLeague } };
}

export default function StandingsPage({ AmericanLeague, NationalLeague }) {
  // console.log(AmericanLeague)
  const dateProp = new Date();
  const StandingsTables = [AmericanLeague, NationalLeague].map(league => {
    return <Standings key={league['name']} data={league} />
  })

  return (
    <Layout date={dateProp} page={'standings'}>
      {StandingsTables}
    </Layout>
  );
}
