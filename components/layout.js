import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import moment from 'moment';

export default function Layout({
  date,
  children,
  page,
  dateCallback,
  returnCallback,
}) {
  // const formattedDate = moment(date).format('dddd MMM D');
  const formattedDate = format(date, 'eeee MMM d');
  const todayFormatted = format(new Date(), 'eeee MMM d');

  const datesEqual = formattedDate === todayFormatted;

  const footerPaths = [
    { name: 'Home', link: '/' },
    { name: 'Scores', link: '/scores' },
    { name: 'Standings', link: '/standings' },
    {
      name: 'About',
      link: 'https://github.com/christian-montes/baseball-scores',
    },
  ];

  const footerLinks = footerPaths.map((path) => {
    return (
      <li key={path.name}>
        <Link href={path.link}>{path.name}</Link>
      </li>
    );
  });
  return (
    <>
      {page === 'index' ? (
        <Head>
          <title>Baseball Scores and Standings</title>
          <meta name="description" content="MLB Score Tracking" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="keywords"
            content="MLB major league baseball scores standings live"
          />
          <meta name="og:title" content="View baseball Scores and Standings" />
        </Head>
      ) : page === 'scores' ? (
        <Head>
          <title>Live Baseball Scores</title>
          <meta name="Description" content="Live scores for today's games" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="keywords"
            content="MLB scores live major league baseball"
          />
          <meta name="og:title" content="Live baseball Scores" />
          <meta name="twitter:card" content="Live Baseball score feed" />
        </Head>
      ) : (
        <Head>
          <title>Current MLB Standings</title>
          <meta name="Description" content="Current MLB Divisional Standings" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="keywords"
            content="Current MLB Standings major league baseball division standings divisional American National"
          />
          <meta name="og:title" content="Current MLB Standings" />
          <meta name="twitter:card" content="Current Baseball Standings" />
        </Head>
      )}

      <header className={styles.parent}>
        <div className={styles.child}>
          <Image
            src="/mlb-logo.svg"
            alt="Major League Baseball"
            width={60}
            height={60}
          />
        </div>
        {date && (
          <div className={styles.todayContainer}>
            {/* {page === 'scores' && (
              <div className={styles.arrows}>
                <FontAwesomeIcon icon={faChevronCircleLeft} />
              </div>
            )} */}
            {datesEqual ? (
              <div className={styles.gameDate}>Today</div>
            ) : (
              <div className={styles.todayDisplay} onClick={returnCallback}>
                Return to today
              </div>
            )}

            {/* {page === 'scores' && (
              <div className={styles.arrows}>
                <FontAwesomeIcon icon={faChevronCircleRight} />
              </div>
            )} */}
          </div>
        )}
        <div className={styles.child}>
          {page === 'index' ? (
            <div style={{ width: '60px', height: '60px' }} />
          ) : (
            <div className={styles.menu}>
              <div id="bar1" className={styles.bar} />
              <div id="bar2" className={styles.bar} />
              <div id="bar3" className={styles.bar} />
            </div>
          )}
        </div>
      </header>

      {page === 'scores' ? (
        <>
          {date && (
            <div className={styles.dateContainer}>
              {page === 'scores' && (
                <div id="left" className={styles.arrows} onClick={dateCallback}>
                  <FontAwesomeIcon icon={faChevronCircleLeft} />
                </div>
              )}
              <div className={styles.gameDate}>{formattedDate || 'Today'}</div>
              {page === 'scores' && (
                <div
                  id="right"
                  className={styles.arrows}
                  onClick={dateCallback}
                >
                  <FontAwesomeIcon icon={faChevronCircleRight} />
                </div>
              )}
            </div>
          )}
          <main className={styles.games}>{children}</main>
        </>
      ) : page === 'standings' ? (
        <main className={styles.standings}>{children}</main>
      ) : (
        <main className={styles.index}>{children}</main>
      )}

      <footer>
        <ul>{footerLinks}</ul>
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by NextJS
        </a> */}
      </footer>
    </>
  );
}
