import styles from '../styles/score.module.scss';

export default function ProbablePitchers({ pitchers, names }) {
  const {
    away: { id: awayID, fullName: nameAway } = { id: '0', fullName: 'TBD' },
    home: { id: homeID, fullName: nameHome } = { id: '0', fullName: 'TBD' },
  } = pitchers;

  const {
    away: { players: playersAway },
    home: { players: playersHome },
  } = names;

  let awayW, awayL, awayERA, homeW, homeL, homeERA;

  if (awayID !== '0') {
    awayW = playersAway[`ID${awayID}`]['seasonStats']['pitching']['wins'];
    awayL = playersAway[`ID${awayID}`]['seasonStats']['pitching']['losses'];
    awayERA = playersAway[`ID${awayID}`]['seasonStats']['pitching']['era'];
  }

  if (homeID !== '0') {
    homeW = playersHome[`ID${homeID}`]['seasonStats']['pitching']['wins'];
    homeL = playersHome[`ID${homeID}`]['seasonStats']['pitching']['losses'];
    homeERA = playersHome[`ID${homeID}`]['seasonStats']['pitching']['era'];
  }

  return (
    <div className={styles.probablesContainer}>
      <div className={styles.heading}>Probable Pitchers</div>
      <div>
        <div className={styles.pitcherName}>{nameAway}</div>
        <div className={awayID === '0' ? styles.tbd_pitcher : styles.wl_ERA}>
          {awayID === '0' ? `TBD` : `${awayW}-${awayL}, ${awayERA} ERA`}
        </div>
      </div>

      <div>
        <div className={styles.pitcherName}>{nameHome}</div>
        <div className={homeID === '0' ? styles.tbd_pitcher : styles.wl_ERA}>
          {homeID === '0' ? `TBD` : `${homeW}-${homeL}, ${homeERA} ERA`}
        </div>
      </div>
    </div>
  );
}
