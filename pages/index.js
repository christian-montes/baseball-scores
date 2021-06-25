import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Layout from '../components/layout';

export default function Home() {
  const dateProp = new Date();
  // console.log(dateProp)
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
      <Layout page={'index'} date={dateProp}>
        <div className={styles.container}>
          <h1 className={styles.title}>Scores</h1>
          <Link href="/scores">
            <a className={styles.scores}>View Live Scores</a>
          </Link>

          <h1 className={styles.title}>Current Standings</h1>
          <Link href="/standings">
            <a className={styles.scores}>View Standings</a>
          </Link>
        </div>
      </Layout>
    </>
  );
}
