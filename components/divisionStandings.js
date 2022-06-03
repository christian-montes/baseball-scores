import styles from './divisionStandings.module.scss';
import Image from 'next/image';

export default function DivisionStandings({ divisionName, teams }) {
  const displayStats = [
    'wins',
    'losses',
    'winPercent',
    'gamesBehind',
    'streak',
    'Last Ten',
  ];

  const [{ value: firstPlaceWins }, { value: firstPlaceLosses }] = teams[0][
    'stats'
  ].filter((stat) => {
    const { name } = stat;
    return ['wins', 'losses'].includes(name);
  });
  const firstPlaceTeam = teams[0]['team']['name'];

  // console.log([firstPlaceWins, firstPlaceLosses, firstPlaceTeam]);

  // Filtering the stats to show only a select few of the many in the entire data;
  // will probably implement a feature to allow user to select which stats they wish to see
  // includes runs per game, run differential, etc
  const teamsFiltered = teams.map((tm) => {
    const { team, stats } = tm;

    // used for calculating Games back of first
    const [{ value: wins }, { value: losses }] = tm['stats'].filter((stat) => {
      const { name } = stat;
      return ['wins', 'losses'].includes(name);
    });

    // console.log(wins, losses);
    const GB = (
      Math.round(
        (Math.abs(wins - firstPlaceWins) +
          Math.abs(losses - firstPlaceLosses)) *
          10
      ) / 20
    ).toFixed(1);
    // console.log(GB === '0.0');

    const gamesBackProcess = {
      team,
      stats: stats.filter((stat) => {
        const { name } = stat;
        return displayStats.includes(name);
      }),
    };

    gamesBackProcess['stats'].map((stat) => {
      if (stat['name'] === 'gamesBehind' && team['name'] === firstPlaceTeam) {
        stat['value'] = '-';
        stat['displayValue'] = '-';
      } else if (
        stat['name'] === 'gamesBehind' &&
        team['name'] !== firstPlaceTeam
      ) {
        if (Boolean(GB === '0.0')) {
          stat['value'] = '-';
          stat['displayValue'] = '-';
        } else {
          stat['value'] = GB;
          stat['displayValue'] = GB.toString();
        }
      }
    });

    // console.log(gamesBackProcess['stats']);

    return gamesBackProcess;
  });

  // console.log(teamsFiltered);

  const tableHeaders = teamsFiltered[0]['stats'].map((stat) => {
    const { name, shortDisplayName } = stat;

    return <th key={name}>{shortDisplayName}</th>;
  });

  const tableRows = teamsFiltered.map((tm) => {
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
        <Image src={`/${fileCode}.svg`} alt={teamName} width={40} height={23} />{' '}
        {abbreviation}
      </td>,
      ...statData,
    ];
    return <tr key={abbreviation}>{rowData}</tr>;
    // stats.map((stat) => {
    //   const { name, displayValue } = stat;

    //   return <td key={name}>{displayValue}</td>
    // })
  });

  // console.log(tableRows);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th>{divisionName}</th>
            {tableHeaders}
          </tr>
        </thead>
        <tbody className={styles.body}>{tableRows}</tbody>
      </table>
    </>
  );
}
