import Image from 'next/image';
import wcCorrectGB from '../lib/wildcardGB';
import styles from './divisionStandings.module.scss';

export default function WildcardStandings({ data }) {
  // console.log(data)

  const displayStats = [
    'wins',
    'losses',
    'winPercent',
    'divisionGamesBehind',
    'streak',
    'Last Ten',
  ];

  const subsetStats = data.map((tm) => {
    const { stats, team } = tm;
    let DGBIndex;
    let STRKIndex;
    let L10Index;
    let filteredStats = stats
      .filter((stat) => {
        const { name } = stat;
        return displayStats.includes(name);
      })
      .map((stat, index) => {
        stat.name === 'divisionGamesBehind' &&
          ((DGBIndex = index), (stat['shortDisplayName'] = 'GB'));
        stat.name === 'streak' && (STRKIndex = index);
        stat.name === 'Last Ten' && (L10Index = index);
        return stat;
      });

    filteredStats = filteredStats
      .slice(0, STRKIndex)
      .concat(
        filteredStats[DGBIndex],
        filteredStats[STRKIndex],
        filteredStats[L10Index]
      );

    return { team, stats: filteredStats };
  });

  let divisionLeaderRep = { East: [], Central: [], West: [] };

  const wildcardLeaders = subsetStats.filter((team) => {
    const {
      stats,
      team: { abbreviation, division },
    } = team;
    const [{ displayValue: GB }] = stats.filter((stat) => {
      const { name } = stat;
      return name === 'divisionGamesBehind';
    });

    GB === '-' && divisionLeaderRep[division].push(abbreviation);
    return GB === '-';
  });

  let divisionTied = [];
  for (let [division, leaders] of Object.entries(divisionLeaderRep)) {
    if (leaders.length > 1) {
      divisionTied.push(division);
    }
  }

  // console.log(wildcardLeaders);

  const wildcardChasers = subsetStats.filter((team) => {
    const {
      stats,
      team: { division },
    } = team;
    const [{ displayValue: GB }] = stats.filter((stat) => {
      const { name } = stat;
      return name === 'divisionGamesBehind';
    });
    // console.log([team.team.name, GB]);
    return GB !== '-' || divisionTied.includes(division);
  });

  // The second team in the array is what the Wildcard standings are based on
  // const refTeam = wildcardChasers[1];
  const chasersCorrectGB = wcCorrectGB(wildcardChasers);
  const wildcardLeadersGB = wcCorrectGB(wildcardLeaders, divisionTied);

  // console.log(wildcardChasers);
  const Headers = wildcardLeadersGB[0]['stats'].map((stat) => {
    const { name, shortDisplayName } = stat;

    return <th key={name}>{shortDisplayName}</th>;
  });

  function tableRows(data) {
    return data.map((tm) => {
      const {
        team: { abbreviation, fileCode, teamName },
        stats,
      } = tm;

      const statData = stats.map((stat) => {
        const { name, displayValue } = stat;

        return <td key={name}>{displayValue}</td>;
      });

      const rowData = [
        <td key={abbreviation}>
          <Image
            src={`/${fileCode}.svg`}
            alt={teamName}
            width={40}
            height={23}
          />{' '}
          {abbreviation}
        </td>,
        ...statData,
      ];
      return <tr key={abbreviation}>{rowData}</tr>;
    });
  }

  const LeaderRows = tableRows(wildcardLeadersGB);
  const nonLeaderRows = tableRows(chasersCorrectGB);

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th>Leaders</th>
            {Headers}
          </tr>
        </thead>
        <tbody className={styles.body}>{LeaderRows}</tbody>
        <thead className={styles.header}>
          <tr>
            <th>Wildcard</th>
            {Headers}
          </tr>
        </thead>
        <tbody className={styles.body}>{nonLeaderRows}</tbody>
      </table>
    </>
  );
}
