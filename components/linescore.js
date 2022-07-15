import styles from '../styles/linescore.module.scss';

export default function LineScore({ linescoreData, names }) {
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
    return (
      <div className="data" key={`Inning_${inning}`}>
        {inning}
      </div>
    );
  });

  let awayInnings = inningsData.map((inning, index) => {
    const { away } = inning;

    return (
      <div className="data" key={`away_inning_${index}`}>
        {away.runs}
      </div>
    );
  });

  const differenceAway = topRow.length - awayInnings.length;
  awayInnings = awayInnings.concat(
    Array(differenceAway).map((item, index) => {
      return <div key={`away_fill_${index}`}>&nbsp;</div>;
    })
  );

  let homeInnings = inningsData.map((inning, index) => {
    const { home } = inning;

    return <div key={`home_inning_${index}`}>{home.runs}</div>;
  });

  const differenceHome = topRow.length - homeInnings.length;
  homeInnings = homeInnings.concat(
    Array(differenceHome).map((item, index) => {
      return <div key={`home_fill_${index}`}>&nbsp;</div>;
    })
  );

  return (
    <div className={styles.threeSections}>
      <div className={styles.section1}>
        {/* insert a placeholder here using css */}
        <div className={styles.topRowElement}>&nbsp;</div>
        <div>{names[0]}</div>
        <div>{names[1]}</div>
      </div>
      <div id="linescore-wrapper" className={styles.linescore_wrapper}>
        <div className={styles.section2}>
          <div className={styles.topRowElement}>{topRow}</div>
          <div>{awayInnings}</div>
          <div>{homeInnings}</div>
        </div>
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
