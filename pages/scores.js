import Layout from '../components/layout';
import Score from '../components/score';

import axios from 'axios';

export default function ScorePage({ todaysGames }) {
  // destructuring data object to get date and games
  const {
    dates: [{ date, games }],
  } = todaysGames;
  const GameComponents = games.map((game) => {
    return <Score key={game.gamePk} link={game.link} />;
  });

  // console.log(todaysGames);

  return (
    <Layout date={date} page={'scores'} >
      {GameComponents}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const todaysGames = await axios
    .get('https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1')
    .then((res) => res.data);

  if (!todaysGames) {
    return {
      notFound: true,
    };
  }

  return { props: { todaysGames } };
}
