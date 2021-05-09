import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.scss';

export default function Layout({ children }) {
  return (
    <>

      {/* <Head>
        <meta name='keywords' content='MLB baseball scores live' />
        <meta name='og:title' content='Live MLB Scores' />
        <meta name='twitter:card' content='Live Baseball score feed' />
      </Head> */}

      <header className={styles.parent}>
        <div className={styles.child}>
          <Image 
            src='/mlb-logo.svg' 
            alt='Major League Baseball'
            width={60} height={60}
          />
        </div>
        <div className={styles.dateGame}>
          Friday May 7
        </div>
      </header>

      <main className={styles.games}>{children}</main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by NextJS
        </a>
      </footer>
    </>
  )
}