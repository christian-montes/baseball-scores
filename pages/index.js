import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import Layout from '../components/layout';

export default function Home() {
  const dateProp = new Date();
  // console.log(dateProp)
  return (
    <>
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
