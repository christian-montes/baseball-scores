import styles from '../styles/score.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProbablePitchers({ pitchers, names, row }) {
  const [pitcherAway, setPitcherAway] = useState(null);
  const [pitcherHome, setPitcherHome] = useState(null);

  const {
    away: { id: awayID, fullName: nameAway } = { id: '0', fullName: 'TBD' },
    home: { id: homeID, fullName: nameHome } = { id: '0', fullName: 'TBD' },
  } = pitchers;

  const {
    away: { players: playersAway },
    home: { players: playersHome },
  } = names;

  useEffect(async () => {
    if ([0, '0'].includes(awayID)) {
      setPitcherAway('TBD');
    } else {
      const awayPitcherProfile = await axios
        .get(`https://statsapi.mlb.com/api/v1/people/${awayID}`)
        .then((res) => res.data);

      const { people } = awayPitcherProfile;
      setPitcherAway(people[0]);
    }
    // setPitcherAway(awayPitcherProfile);
  }, []);

  useEffect(async () => {
    if ([0, '0'].includes(homeID)) {
      setPitcherHome('TBD');
    } else {
      const homePitcherProfile = await axios
        .get(`https://statsapi.mlb.com/api/v1/people/${homeID}`)
        .then((res) => res.data);

      const { people } = homePitcherProfile;
      setPitcherHome(people[0]);
    }
  }, []);

  // const awayPitcherProfile =
  //   awayID === '0' &&
  //   axios.get(`https://statsapi.mlb.com/api/v1/people/${awayID}`).then(res => res.data);

  // const { people } = awayPitcherProfile;
  // console.log(pitcherAway);

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

  if (!pitcherAway || !pitcherHome) return <div />;

  return (
    <div
      className={row ? styles.horizontalContainer : styles.probablesContainer}
    >
      {!row && <div className={styles.heading}>Probable Pitchers</div>}
      <div className={row && styles.awayPitcherData}>
        {row && (
          <div className={styles.imageStyles}>
            <img
              srcSet={`https://midfield.mlbstatic.com/v1/people/${awayID}/silo/30?zoom=1.2 1x, 
          https://midfield.mlbstatic.com/v1/people/${awayID}/silo/60?zoom=1.2 2x,
          https://midfield.mlbstatic.com/v1/people/${awayID}/silo/90?zoom=1.2 3x`}
              src={`https://midfield.mlbstatic.com/v1/people/${awayID}/silo/30?zoom=1.2 1x`}
              alt={nameAway}
              height={'100%'}
              width={'100%'}
            />
          </div>
        )}

        <div>
          <div className={styles.pitcherName}>
            {pitcherAway.lastName || nameAway}
          </div>
          {pitcherAway !== 'TBD' && (
            <div
              className={styles.pitcherSmallFont}
            >{`${pitcherAway.pitchHand.code}HP #${pitcherAway.primaryNumber}`}</div>
          )}
          <div className={awayID === '0' ? styles.tbd_pitcher : styles.wl_ERA}>
            {awayID === '0' ? `TBD` : `${awayW}-${awayL}, ${awayERA} ERA`}
          </div>
        </div>
      </div>

      <div className={row && styles.homePitcherData}>
        {row && (
          <div className={styles.homeImageStyles}>
            <img
              srcSet={`https://midfield.mlbstatic.com/v1/people/${homeID}/silo/30?zoom=1.2 1x, 
          https://midfield.mlbstatic.com/v1/people/${homeID}/silo/60?zoom=1.2 2x,
          https://midfield.mlbstatic.com/v1/people/${homeID}/silo/90?zoom=1.2 3x`}
              src={`https://midfield.mlbstatic.com/v1/people/${homeID}/silo/30?zoom=1.2 1x`}
              alt={nameHome}
              height={'100%'}
              width={'100%'}
            />
          </div>
        )}

        <div>
          <div className={styles.pitcherName}>
            {pitcherHome.lastName || nameHome}
          </div>
          {pitcherHome !== 'TBD' && (
            <div
              className={styles.pitcherSmallFont}
            >{`${pitcherHome.pitchHand.code}HP #${pitcherHome.primaryNumber}`}</div>
          )}
          <div className={homeID === '0' ? styles.tbd_pitcher : styles.wl_ERA}>
            {homeID === '0' ? `TBD` : `${homeW}-${homeL}, ${homeERA} ERA`}
          </div>
        </div>
      </div>
    </div>
  );
}
