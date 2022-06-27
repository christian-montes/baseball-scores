import Layout from '../../components/layout';
import GameBar from '../../components/scoreBar';

import styles from '../../styles/gameID.module.scss';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Details() {
  const router = useRouter();
  // console.log(router.query.gameID);
  // console.log(router.query['gameID'])
  const gameID = router.query['gameID'];

  // useEffect(() => {
  //   if (!router.query.gameID) {
  //     router.replace('/scores')
  //   }
  // })

  const { data: gameData } = useSWR(
    router.query.gameID
      ? `https://statsapi.mlb.com/api/v1.1/game/${gameID}/feed/live`
      : null,
    fetcher,
    {
      refreshInterval: 10000,
    }
  );

  if (!gameData) return <Layout date={new Date()} page="gameDetails"></Layout>;

  const {
    gamePk,
    gameData: {
      teams: { away: awayTeam, home: homeTeam },
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
  } = gameData;

  return (
    <Layout>
      <main className={styles.mainContainer}>
        {/* <GameBar home={homeTeam} away={awayTeam} /> */}
        <div id="column-1" className={styles.firstColumn}>
          Page in development
        </div>
        {/* <div id="column-2" className={styles.secondColumn}></div> */}
      </main>
    </Layout>
  );
}
