import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.scss';
import { useRouter } from 'next/router';

import { useState } from 'react';
import Menu from './menu';

export default function Layout({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  // const formattedDate = format(new Date(date), 'eeee MMM d');
  // let todayFormatted;
  // try {
  //   todayFormatted = format(new Date(referenceDate), 'eeee MMM d');
  // } catch {
  //   todayFormatted = format(new Date(date), 'eeee MMM d');
  // }
  // const datesEqual = formattedDate === todayFormatted;

  const footerPaths = [
    { name: 'Home', link: '/' },
    { name: 'Scores', link: '/scores' },
    { name: 'Standings', link: '/standings' },
  ];

  const footerLinks = footerPaths
    .map((path) => {
      return (
        <li key={path.name}>
          <Link href={path.link}>{path.name}</Link>
        </li>
      );
    })
    .concat(
      <li key="github">
        <a
          target="_blank"
          href="https://github.com/christian-montes/baseball-scores"
          rel="external noopener noreferrer"
        >
          GitHub
        </a>
      </li>
    );

  function toggleMenu(event) {
    event.preventDefault();
    setShowMenu(!showMenu);
    // const body = document.querySelector('body');
    // const next = document.querySelector('main');
    // const footer = document.querySelector('footer');
    // body.classList.toggle('showMenu');
    // next.classList.toggle('showMenuSafari');
    // footer.classList.toggle('hideFooter');

    // const menu = document.getElementById('menu');
    // menu.classList.toggle('menuDisplay');

    const __nextContainer = document.getElementById('__next');
    __nextContainer.classList.toggle('noScroll');
    const body = document.querySelector('body');
    body.classList.toggle('noScroll');
  }

  function checkWindowLocation(event) {
    event.preventDefault();

    // const body = document.querySelector('body');
    // const next = document.querySelector('main');
    // const footer = document.querySelector('footer');
    // body.classList.toggle('showMenu');
    // next.classList.toggle('showMenuSafari');
    // footer.classList.toggle('hideFooter');
    if (!showMenu) {
      router.push(event.currentTarget.href);
    } else {
      const body = document.querySelector('body');
      body.classList.toggle('noScroll');
      const __nextContainer = document.getElementById('__next');
      __nextContainer.classList.toggle('noScroll');

      event.currentTarget.href === window.location.href
        ? setShowMenu(!showMenu)
        : router.push(event.currentTarget.href);
    }

    // const body = document.querySelector('body');
    // body.classList.toggle('noScroll');
    // const __nextContainer = document.getElementById('__next');
    // __nextContainer.classList.toggle('noScroll');

    // event.currentTarget.href === window.location.href
    //   ? setShowMenu(!showMenu)
    //   : router.push(event.currentTarget.href);
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'space-between',
      }}
    >
      <header className={styles.parent}>
        <div className={styles.child}>
          <Image
            src="/mlb-logo.svg"
            alt="Major League Baseball"
            width={60}
            height={60}
          />
        </div>
        {/* <div className={styles.todayContainer}>
          {page === 'index' ? (
            <div className={styles.pageName}>Home</div>
          ) : page === 'standings' ? (
            <div className={styles.pageName}>Standings</div>
          ) : page === 'gameDetails' ? (
            <div className={styles.pageName}>Details</div>
          ) : (
            <div className={styles.pageName}>Scores</div>
          )}
        </div> */}
        {/* <NewMenu /> */}
        <div className={styles.child}>
          {/* <div className={styles.dropdown}> */}
          <div id="menu" className={styles.menuBars} onClick={toggleMenu}>
            <div id="bar1" className={showMenu ? styles.bar1 : styles.bar} />
            <div id="bar2" className={showMenu ? styles.bar2 : styles.bar} />
            <div id="bar3" className={showMenu ? styles.bar3 : styles.bar} />
          </div>
          <Menu show={showMenu} clickCallback={checkWindowLocation} />
          {/* <Menu show={showMenu} clickCallback={checkWindowLocation} /> */}
          {/* </div> */}
        </div>
      </header>

      {children}

      <footer>
        <ul>{footerLinks}</ul>
      </footer>
    </div>
  );
}
