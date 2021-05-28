import Bases from './bases';
import Team from './team';
import Inning from './inning';
import SkeletonScore from './skeletons/SkeletonScore';

import axios from 'axios';
import useSWR from 'swr';
import Decision from './gameDecisions';
import { useState } from 'react';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Score({ link }) {
  const gameURL = `https://statsapi.mlb.com${link}`;
  const { data } = useSWR(gameURL, fetcher, { refreshInterval: 10000 });
  const [viewDecisions, setViewDecisions] = useState(false);
  // console.log(data);

  // extracting the necessary data to passdown to Team component;
  if (!data) return <SkeletonScore />;
  const {
    gameData: {
      teams: { away: awayRecord, home: homeRecord },
      status: { detailedState },
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
  } = data;
  // console.log(detailedState);

  const toggleViewDecisions = (event) => {
    event.preventDefault();

    if (detailedState === 'Final') {
      setViewDecisions(!viewDecisions);
    }
  };

  return (
    <div
      className="score container py-1"
      style={{ backgroundColor: '#405259' }}
    >
      <div
        className="row"
        style={{ height: '4.5rem' }}
        onClick={toggleViewDecisions}
      >
        {viewDecisions ? (
          <Decision
            teamRuns={teamRuns}
            teamInfoAway={awayRecord}
            teamInfoHome={homeRecord}
            decisions={decisions}
          />
        ) : (
          <>
            <div className="col-7 col-sm-6">
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

            <div className="col pe-0 h-100 position-relative">
              <div className="position-absolute top-50 end-50 translate-middle pe-0">
                <Bases
                  gameState={detailedState}
                  count={{ balls, strikes, outs, inningNumber }}
                  plays={{ allPlays, playsByInning, inningHalf }}
                />
              </div>
              <Inning
                gameState={detailedState}
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
