import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';

import styles from '../styles/Home.module.scss';

export default function Home() {
  // const header = document.getElementById('header');
  // const footer = document.getElementById('footer');

  // console.log(window.getComputedStyle(header))
  return (
    <>
      <Head>
        <title>Baseball Scores and Standings</title>
        <meta name="description" content="MLB Score Tracking" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="keywords"
          content="MLB major league baseball scores standings live"
        />
        <meta name="og:title" content="View baseball Scores and Standings" />
      </Head>
      <Layout>
        <main className={styles.index}>
          <div className={styles.container}>
            <Link href="/scores">
              <a className={styles.scores}>View Live Scores</a>
            </Link>
            <Link href="/standings">
              <a className={styles.scores}>View Standings</a>
            </Link>
          </div>
        </main>
      </Layout>
    </>
  );
}
