import styles from './divisionStandings.module.scss';

export default function WilcardStandings({ data }) {
  // console.log(data)

  const displayStats = [
    'wins',
    'losses',
    'winPercent',
    'divisionGamesBehind',
    'streak',
    'Last Ten',
  ];

  const filteredStats = data.map((tm) => {
    const { stats, team } = tm;
    const filtered = stats.filter((stat) => {
      const { name } = stat;
      return displayStats.includes(name);
    });

    return { team, stats: filtered };
  });

  console.log(filteredStats);

  const wilcardLeaders = filteredStats.filter((team) => {
    const { stats } = team;
    const [{ displayValue: GB }] = stats.filter((stat) => {
      const { name } = stat;
      return name === 'divisionGamesBehind';
    });
    return GB === '-';
  });

  const nonLeaders = filteredStats.filter((team) => {
    const { stats } = team;
    const [{ displayValue: GB }] = stats.filter((stat) => {
      const { name } = stat;
      return name === 'divisionGamesBehind';
    });
    // console.log([team.team.name, GB]);
    return GB !== '-';
  });

  // console.log(nonLeaders);
  const Headers = wilcardLeaders[0]['stats'].map((stat) => {
    const { name, shortDisplayName } = stat;

    return <th key={name}>{shortDisplayName}</th>;
  });

  function tableRows(data) {
    return data.map((tm) => {
      const {
        team: { abbreviation, fileCode },
        stats,
      } = tm;

      const statData = stats.map((stat) => {
        const { name, displayValue } = stat;

        return <td key={name}>{displayValue}</td>;
      });

      const rowData = [
        <td key={abbreviation}>
          <object data={`${fileCode}.svg`} width={40} height={23} />{' '}
          {abbreviation}
        </td>,
        ...statData,
      ];
      return <tr key={abbreviation}>{rowData}</tr>;
    });
  }

  const LeaderRows = tableRows(wilcardLeaders);
  const nonLeaderRows = tableRows(nonLeaders);

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
            <th>Wilcard</th>
            {Headers}
          </tr>
        </thead>
        <tbody className={styles.body}>{nonLeaderRows}</tbody>
      </table>
    </>
  );
}
