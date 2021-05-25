import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import Layout from '../components/layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="MLB Score Tracking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout page={'index'} >
        <div className={styles.container}>
          <h1 className={styles.title}>Scores</h1>
          <Link href='/score'>
            <a className={styles.scores}>View Live Scores</a>
          </Link>

          <h1 className={styles.title}>Current Standings</h1>
          <Link href='/standings'>
            <a className={styles.scores}>View Standings</a>
          </Link>
        </div>
      </Layout>
    </>
  );
}
