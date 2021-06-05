import Layout from '../components/layout';
import Score from '../components/score';

import axios from 'axios';
import { add, format, sub } from 'date-fns';
import { useEffect, useState } from 'react';

export default function ScorePage({ todaysGames }) {
  const [selDate, setSelDate] = useState(new Date());
  const [formedDate, setFormedDate] = useState('');
  const [data, setData] = useState(todaysGames);
  // destructuring data object to get date and games
  const {
    dates: [{ date, games }],
  } = data;
  const GameComponents = games.map((game) => {
    return <Score key={game.gamePk} link={game.link} />;
  });

  const toggleDate = (event) => {
    event.preventDefault();
    let gameDate;

    event.currentTarget.id === 'right'
      ? (gameDate = add(selDate, { days: 1 }))
      : (gameDate = sub(selDate, { days: 1 }));

    let formattedDate = format(gameDate, 'yyyy-MM-dd');
    // console.log(formattedDate);
    setSelDate(gameDate);
    setFormedDate(formattedDate);
  };

  const returnToToday = (event) => {
    event.preventDefault();

    const today = format(new Date(), 'yyyy-MM-dd');
    setSelDate(new Date());
    setFormedDate(today)
  };

  useEffect(async () => {
    // console.log('effect');
    let newData =
      formedDate &&
      (await axios
        .get(
          `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${formedDate}&endDate=${formedDate}`
        )
        .then((res) => res.data));

    formedDate && setData(newData);
  }, [formedDate]);

  // console.log(todaysGames);

  return (
    <Layout
      date={selDate}
      page={'scores'}
      dateCallback={toggleDate}
      returnCallback={returnToToday}
    >
      {GameComponents}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const gameDate = format(new Date(), 'yyyy-MM-dd');
  // console.log(gameDate);

  const todaysGames = await axios
    .get(
      `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${gameDate}&endDate=${gameDate}`
    )
    .then((res) => res.data);

  if (!todaysGames) {
    return {
      notFound: true,
    };
  }

  return { props: { todaysGames } };
}
