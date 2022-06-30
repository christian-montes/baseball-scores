import styles from '../styles/linescore.module.scss';

export default function LineScore({ linescoreData }) {
  const {
    currentInning,
    scheduledInnings,
    teams: { home: homeRHE, away: awayRHE },
    innings: inningsData,
  } = linescoreData;
  const ArrayInnings =
    currentInning > scheduledInnings
      ? Array.from(Array(currentInning + 1).keys()).slice(1)
      : Array.from(Array(scheduledInnings + 1).keys()).slice(1);
  // console.log(ArrayInnings);

  const topRow = ArrayInnings.map((inning) => {
    return <div key={`Inning_${inning}`}>{inning}</div>;
  });

  const awayInnings = inningsData.map((inning, index) => {
    const { away } = inning;

    return <div key={`away_inning_${index}`}>{away.runs}</div>;
  });

  const homeInnings = inningsData.map((inning, index) => {
    const { home } = inning;

    return <div key={`home_inning_${index}`}>{home.runs}</div>;
  });
  return (
    <div className={styles.threeSections}>
      <div className={styles.section1}>
        <div className={styles.topRowElement}>Placehold</div>
        <div>Team Away</div>
        <div>Team Home</div>
      </div>
      <div className={styles.section2}>
        <div className={styles.topRowElement}>{topRow}</div>
        <div>{awayInnings}</div>
        <div>{homeInnings}</div>
      </div>
      <div className={styles.section3}>
        <div className={styles.topRowElement}>
          <div>R</div>
          <div>H</div>
          <div>E</div>
        </div>
        <div>
          <div>{awayRHE.runs}</div>
          <div>{awayRHE.hits}</div>
          <div>{awayRHE.errors}</div>
        </div>
        <div>
          <div>{homeRHE.runs}</div>
          <div>{homeRHE.hits}</div>
          <div>{homeRHE.errors}</div>
        </div>
      </div>
    </div>
  );
}
