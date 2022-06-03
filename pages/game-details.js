import { useRouter } from 'next/router';
import Layout from '../components/layout';
import GameBar from '../components/scoreBar';

import axios from 'axios';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Details() {
  const router = useRouter();
  // const [data, setData] = useState(null)
  // axios.get(`api/boxscore?gameID=${router.query.gamePk}`);
  // console.log(router.query);
  // const { data: gameData } = useSWR(
  //   router.query.gameID
  //     ? `https://statsapi.mlb.com/api/v1.1/game/${router.query.gameID}/feed/live`
  //     : null,
  //   fetcher,
  //   {
  //     refreshInterval: 10000,
  //   }
  // );

  // useEffect(() => {
  //   console.log('running')
  //   axios.get('/api/boxscore')
  // }, [])

  // if (!gameData)
  //   return (
  //     <Layout date={new Date()} page="gameDetails">
  //     </Layout>
  //   );

  // const {
  //   gamePk,
  //   gameData: {
  //     teams: { away: awayTeam, home: homeTeam },
  //     status: {
  //       detailedState,
  //       abstractGameState,
  //       codedGameState,
  //       abstractGameCode,
  //     },
  //     datetime,
  //     probablePitchers,
  //   },
  //   liveData: {
  //     linescore: {
  //       teams: teamRuns,
  //       currentInning: inningNumber,
  //       currentInningOrdinal: nth_Inning,
  //       inningHalf,
  //       scheduledInnings,
  //       balls,
  //       strikes,
  //       outs,
  //     },
  //     boxscore: { teams: playerNames },
  //     plays: { allPlays, playsByInning },
  //     decisions,
  //   },
  // } = gameData;
  // const { data: gameData } = useSWR(
  //   router.query.gameID ? `api/boxscore?gameID=${router.query.gameID}` : null,
  //   fetcher,
  //   {
  //     refreshInterval: 10000,
  //   }
  // );
  console.log(router.query.gameID);
  return (
    <Layout page="gameDetails">
      <main>
        {/* <GameBar home={homeTeam} away={awayTeam} /> */}
      </main>
    </Layout>
  );
}
