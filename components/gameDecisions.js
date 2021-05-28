import styles from './gameDecisions.module.scss';

export default function Decision({
  teamRuns,
  teamInfoAway,
  teamInfoHome,
  decisions,
}) {
  const { abbreviation: awayAbbr } = teamInfoAway;

  const { abbreviation: homeAbbr } = teamInfoHome;

  const {
    home: { runs: runsHome },
    away: { runs: runsAway },
  } = teamRuns;

  const {
    winner: { fullName: nameWinner },
    loser: { fullName: nameLoser },
  } = decisions;

  const lastNameWinner = nameWinner.split(' ').slice(-1);
  const lastNameLoser = nameLoser.split(' ').slice(-1);
  let lastNameSave = '';

  if (decisions?.save) {
    lastNameSave = decisions.save.fullName.split(' ').slice(-1);
  }
  return (
    <>
      <div className={styles.final}>FINAL</div>
      <div
        className={styles.scores}
      >{`${awayAbbr} ${runsAway}, ${homeAbbr} ${runsHome}`}</div>
      <div className={styles.decisions}>
        {lastNameSave
          ? `W: ${lastNameWinner} L: ${lastNameLoser} S: ${lastNameSave}`
          : `W: ${lastNameWinner} L: ${lastNameLoser}`}
      </div>
    </>
  );
}
