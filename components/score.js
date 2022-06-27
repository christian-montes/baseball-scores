import Team from './team';
import Inning from './inning';
import SkeletonScore from './skeletons/SkeletonScore';
import styles from '../styles/score.module.scss';

import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import ProbablePitchers from './probablePitchers';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const DynamicBases = dynamic(() => import('./bases'));
const DynamicDecisions = dynamic(() => import('./gameDecisions'));
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Score({ link, publicGS, publicAGC }) {
  const gameURL = `https://statsapi.mlb.com${link}`;
  const { data: appData } = useSWR(gameURL, fetcher, {
    refreshInterval: 10000,
  });
  // console.log(publicGS);
  // const { data: gameEndedData } = useSWR(
  //   publicGS === 'Final' ? gameURL : null,
  //   fetcher,
  //   { refreshInterval: 0 }
  // );
  // const [viewDecisions, setViewDecisions] = useState(false);
  // const appData = liveGameData ? liveGameData : gameEndedData;

  // const [test, setTest] = useState(publicGS);
  const [element, setElement] = useState(<div />);

  /* will use this state to show/hide box that contains links to season series data
  box score */
  const [show, setShow] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   setTest(publicGS);
  // }, [publicGS]);
  // let updateDeps = [publicCGS, publicGS];

  useEffect(() => {
    if (!appData) return;
    setElement(
      changeHTML(
        publicGS,
        publicAGC,
        detailedState,
        codedGameState,
        abstractGameCode
      )
    );
  }, [appData]);
  // console.log(element)

  // extracting the necessary data to passdown to Team component;
  if (!appData) return <SkeletonScore />;
  const {
    gamePk,
    gameData: {
      teams: { away: awayRecord, home: homeRecord },
      status: {
        detailedState,
        abstractGameState,
        codedGameState,
        abstractGameCode,
      },
      datetime,
      probablePitchers,
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
      boxscore: { teams: playerNames },
      plays: { allPlays, playsByInning },
      decisions,
    },
  } = appData;

  const awayTeamSlug = awayRecord['name'].replaceAll(' ', '-');
  const homeTeamSlug = homeRecord['name'].replaceAll(' ', '-');

  // updateDeps.push(abstractGameCode, detailedState);

  // const toggleViewDecisions = (event) => {
  //   event.preventDefault();

  //   if (detailedState === 'Final') {
  //     setViewDecisions(!viewDecisions);
  //   }
  // };

  // function viewDetails(event) {
  //   event.preventDefault();

  //   // this attaches the gameID to the req object to have it immediately available
  //   // axios.get('/api/gameID', {
  //   //   params: {
  //   //     gameID: gamePk,
  //   //   },
  //   // });

  //   router.push({
  //     pathname: '/game-details',
  //     query: { gameID: gamePk },
  //   });
  // }

  function changeHTML(pgs, pagc, ds, cgs, agc) {
    if (
      pgs === 'Scheduled' ||
      (['Scheduled', 'Pre-Game'].includes(ds) && pagc !== 'F')
    ) {
      return (
        <ProbablePitchers pitchers={probablePitchers} names={playerNames} />
      );
    } else if (['Warmup', 'In Progress', 'Delayed'].includes(ds)) {
      return (
        <div className={styles.basesContainer}>
          <DynamicBases
            gameState={detailedState}
            count={{ balls, strikes, outs, inningNumber }}
            plays={{ allPlays, playsByInning, inningHalf }}
          />
        </div>
      );
    } else if (
      (ds === 'Final' || cgs === 'F' || agc === 'F') &&
      pgs !== 'Postponed'
    ) {
      return <DynamicDecisions decisions={decisions} />;
    } else {
      return <div />;
    }
  }

  // console.log(publicGS);

  return (
    // <Link
    //   href={{
    //     pathname: '/boxscore/[gameID]',
    //     query: { gameID: gamePk },
    //   }}
    // >

    <div className={show ? styles.containerExpandedHeight : styles.container}>
      <div
        className={show ? styles.everythingExpandedHeight : styles.everything}
        onClick={() => {
          setShow(!show);
          // console.log(show);
        }}
      >
        {/* {viewDecisions ? (
          <DynamicDecisions
            toggleView={toggleViewDecisions}
            teamRuns={teamRuns}
            teamInfoAway={awayRecord}
            teamInfoHome={homeRecord}
            decisions={decisions}
          />
        ) : (
          <> */}
        <div className={styles.nameAndScore}>
          <div className={styles.rhe}>
            <div className={styles.fakeImage} />
            <div className={styles.fakeRecord} />
            <div
              className={
                ['Scheduled', 'Pre-Game', 'Postponed'].includes(publicGS)
                  ? styles.runs_Preview
                  : styles.runs
              }
            >
              <div className={styles.entry_container}>R</div>
              <div className={styles.entry_container}>H</div>
              <div className={styles.entry_container}>E</div>
            </div>
          </div>
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
          {/* {['Scheduled', 'Pre-Game'].includes(publicGS) ? (
            <ProbablePitchers pitchers={probablePitchers} names={playerNames} />
          ) : ['Warmup', 'In Progress', 'Delayed'].includes(publicGS) ? (
            <div className={styles.basesContainer}>
              <DynamicBases
                gameState={detailedState}
                count={{ balls, strikes, outs, inningNumber }}
                plays={{ allPlays, playsByInning, inningHalf }}
              />
            </div>
          ) : publicGS === 'Final' || publicCGS === 'F' ? (
            <DynamicDecisions decisions={decisions} />
          ) : (
            <div />
          )} */}
          {element}

          {/* {['Warmup', 'In Progress'].includes(publicGS) && (
                <div
                  className={styles.basesContainer}
                  onClick={toggleViewDecisions}
                >
                  <DynamicBases
                    gameState={detailedState}
                    count={{ balls, strikes, outs, inningNumber }}
                    plays={{ allPlays, playsByInning, inningHalf }}
                  />
                </div>
              )} */}
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
        {/* </>
        )} */}
      </div>
      {/* this is the end of the main container that houses the main elements */}
      <div
        style={
          show
            ? {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '100%',
                height: '30px',
                marginTop: '3px',
                borderTop: '1px solid white',
                visibility: 'visible',
                transition: 'visibility 0.2s ease-in-out 0.1s',
              }
            : {
                visibility: 'hidden',
                height: '0px',
              }
        }
      >
        <Link
          href={{
            pathname: '/boxscore/[gameID]',
            query: { gameID: gamePk },
          }}
        >
          <a className={styles.dataButtons}>Boxscore</a>
        </Link>
        <Link
          href={{
            pathname: '/teamscores/[teams]',
            query: {
              teams: `${awayTeamSlug}_${homeTeamSlug}`,
            },
          }}
        >
          <a className={styles.dataButtons}>Head to Head</a>
        </Link>
      </div>
    </div>

    // </Link>
  );
}
