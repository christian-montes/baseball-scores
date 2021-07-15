import Head from 'next/head';
import Layout from '../components/layout';
import Score from '../components/score';
import styles from '../styles/Scores.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { add, format, sub } from 'date-fns';
import { useRef, useState } from 'react';

export default function ScorePage({ todaysGames, currentGames }) {
  const [selDate, setSelDate] = useState(new Date(currentGames));
  const [formedDate, setFormedDate] = useState(currentGames);
  const [data, setData] = useState(todaysGames);
  const refDate = useRef(currentGames);
  // destructuring data object to get date and games
  // console.log(data);

  let noGamesToday;
  let GameComponents;
  // console.log(data.dates[0]?.games)
  try {
    const {
      dates: [{ games }],
    } = data;
    GameComponents = games.map((game) => {
      return (
        <Score
          key={game.gamePk}
          link={game.link}
          publicGS={game.status.detailedState}
          publicAGC={game.status.abstractGameCode}
        />
      );
    });
  } catch {
    noGamesToday = 'No Games Scheduled';
  }
  // const {
  //   dates: [{ games }],
  // } = data;
  // const GameComponents = games.map((game) => {
  //   return (
  //     <Score
  //       key={game.gamePk}
  //       link={game.link}
  //       publicGS={game.status.detailedState}
  //       publicAGC={game.status.abstractGameCode}
  //     />
  //   );
  // });
  // console.log(GameComponents);
  // console.log(refDate);

  const toggleDate = async (event) => {
    event.preventDefault();
    let gameDate;

    event.currentTarget.id === 'right'
      ? (gameDate = add(selDate, { days: 1 }))
      : (gameDate = sub(selDate, { days: 1 }));

    let formattedDate = format(gameDate, 'yyyy-MM-dd');
    // console.log(formattedDate);
    setSelDate(gameDate);
    setFormedDate(`${formattedDate}T23:05:00Z`);

    let switchData = await axios
      .get(
        `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${formattedDate}&endDate=${formattedDate}`
      )
      .then((res) => res.data);

    setData(switchData);
  };

  const returnToToday = async (event) => {
    event.preventDefault();

    const today = format(new Date(refDate.current), 'yyyy-MM-dd');
    setSelDate(new Date(refDate.current));
    setFormedDate(refDate.current);

    let todayData = await axios
      .get(
        `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${today}&endDate=${today}`
      )
      .then((res) => res.data);

    setData(todayData);
  };

  // console.log([refDate.current, formedDate]);
  const datesEqual = refDate.current === formedDate;

  return (
    <>
      <Head>
        <title>Live Baseball Scores</title>
        <meta name="Description" content="Live scores for today's games" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content="MLB scores live major league baseball" />
        <meta name="og:title" content="Live baseball Scores" />
        <meta name="twitter:card" content="Live Baseball score feed" />
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        />
      </Head>
      <Layout>
        {/* <div className={styles.dateContainer}>
          <div id="left" className={styles.arrows} onClick={toggleDate}>
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </div>
          <div className={styles.gameDate}>
            {format(new Date(formedDate), 'eee MMMM d') || 'Today'}
          </div>
          <div id="right" className={styles.arrows} onClick={toggleDate}>
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </div>
        </div> */}

        <main className={styles.primaryContainer}>
          <div className={styles.DateSwitching}>
            <div className={styles.dateContainer}>
              <div id="left" className={styles.arrowLeft} onClick={toggleDate}>
                <FontAwesomeIcon icon={faChevronCircleLeft} />
              </div>
              <div className={styles.gameDate}>
                {format(new Date(formedDate), 'eee MMMM d') || 'Today'}
              </div>
              <div
                id="right"
                className={styles.arrowRight}
                onClick={toggleDate}
              >
                <FontAwesomeIcon icon={faChevronCircleRight} />
              </div>
            </div>
            <div
              className={
                datesEqual
                  ? styles.returnTodayHidden
                  : styles.returnTodayVisible
              }
              onClick={returnToToday}
            >
              Return to Today &#8617;
            </div>
          </div>
          <div className={styles.contentContainer}>
            <section className={styles.games}>
              {noGamesToday || GameComponents}
            </section>
            <section className={styles.twitter}>
              <a
                className="twitter-timeline"
                data-width="350"
                data-height="700"
                data-theme="dark"
                href="https://twitter.com/MLB?ref_src=twsrc%5Etfw"
              >
                Tweets by MLB
              </a>
            </section>
          </div>
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  // const gameDate = format(new Date(), 'yyyy-MM-dd');
  // console.log(gameDate);

  const todaysGames = await axios
    .get(`https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1`)
    .then((res) => res.data);

  if (!todaysGames) {
    return {
      notFound: true,
    };
  }

  if (todaysGames.totalGames === 0) {
    let currentGames = new Date().toISOString().slice(0, 10);
    return { props: { todaysGames, currentGames } };
  }

  const {
    dates: [{ date }],
  } = todaysGames;
  const currentGames = `${date}T23:05:00Z`;
  // console.log(currentGames)

  return { props: { todaysGames, currentGames } };
}
