import Bases from './bases';
import Team from './team';
import Inning from './inning';
import SkeletonScore from './skeletons/SkeletonScore';
import styles from '../styles/score.module.scss';

import axios from 'axios';
import useSWR from 'swr';
import Decision from './gameDecisions';
import { useState } from 'react';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Score({ link, publicGS }) {
  const gameURL = `https://statsapi.mlb.com${link}`;
  const { data: liveGameData } = useSWR(
    publicGS !== 'Final' ? gameURL : null,
    fetcher,
    { refreshInterval: 10000 }
  );
  const { data: gameEndedData } = useSWR(
    publicGS === 'Final' ? gameURL : null,
    fetcher,
    { refreshInterval: 0 }
  );
  const [viewDecisions, setViewDecisions] = useState(false);
  const appData = liveGameData ? liveGameData : gameEndedData;

  // extracting the necessary data to passdown to Team component;
  if (!appData) return <SkeletonScore />;
  const {
    gameData: {
      teams: { away: awayRecord, home: homeRecord },
      status: { detailedState, abstractGameState },
      datetime,
    },
    liveData: {
      linescore: {
        teams: teamRuns,
        currentInning: inningNumber,
        currentInningOrdinal: nth_Inning,
        inningHalf,
        scheduledInnings,
        balls,
        strikes,
        outs,
      },
      plays: { allPlays, playsByInning },
      decisions,
    },
  } = appData;

  const toggleViewDecisions = (event) => {
    event.preventDefault();

    if (detailedState === 'Final') {
      setViewDecisions(!viewDecisions);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.everything} onClick={toggleViewDecisions}>
        {viewDecisions ? (
          <Decision
            teamRuns={teamRuns}
            teamInfoAway={awayRecord}
            teamInfoHome={homeRecord}
            decisions={decisions}
          />
        ) : (
          <>
            <div className={styles.nameAndScore}>
              <Team
                away
                teamRecord={awayRecord}
                teamRunData={teamRuns}
                gameState={detailedState}
              />
              <Team
                teamRecord={homeRecord}
                teamRunData={teamRuns}
                gameState={detailedState}
              />
            </div>

            <div className={styles.basesInning}>
              {/* position-absolute top-50 end-50 translate-middle pe-0" */}
              <div className={styles.basesContainer}>
                {['Preview', 'In Progress'].includes(detailedState) && (
                  <Bases
                    gameState={detailedState}
                    count={{ balls, strikes, outs, inningNumber }}
                    plays={{ allPlays, playsByInning, inningHalf }}
                  />
                )}
              </div>
              <Inning
                publicGS={publicGS}
                detailedState={detailedState}
                abstractGameState={abstractGameState}
                inningData={{
                  inningNumber,
                  nth_Inning,
                  inningHalf,
                  scheduledInnings,
                }}
                outs={outs}
                teamRunData={teamRuns}
                timeData={datetime}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
