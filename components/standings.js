import DivisionStandings from './divisionStandings';
import styles from './standings.module.scss';

export default function Standings({ data }) {
  const {
    name,
    shortName,
    standings: { entries },
  } = data;

  const divisionTeams = ['East', 'Central', 'West'].map((region) => {
    return {
      league: shortName,
      division: [region],
      teams: entries.filter((entry) => {
        const {
          team: { division },
        } = entry;
        return division === region;
      }),
    };
  });

  // console.log(divisionTeams);
  const tables = divisionTeams.map((divs) => {
    const { league, division, teams } = divs;
    return (
      <DivisionStandings
        key={`${league}_${division}`}
        divisionName={division}
        teams={teams}
      />
    );
  });

  return (
    <section className={styles.section} >
      <h3 className={name === 'American League' ? styles.AmericanLeague : styles.NationalLeague} >{name}</h3>
      {tables}
    </section>
  );
}
