import styles from './menu.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Menu({ show, clickCallback }) {
  const [page, setPage] = useState('');
  const menuLinks = [
    { name: 'Home', link: '/' },
    { name: 'Scores', link: '/scores' },
    { name: 'Standings', link: '/standings' },
  ];

  const currentPage = { backgroundColor: '#2F567D' };
  const nonCurrentPage = { backgroundColor: 'inherit' };
  const menuItems = menuLinks
    .map((item) => {
      return (
        <li key={item.name}>
          <Link href={item.link}>
            <a
              style={page === item.link ? currentPage : nonCurrentPage}
              onClick={clickCallback}
            >
              {item.name}
            </a>
          </Link>
        </li>
      );
    })
    .concat(
      <li key="github">
        <a
          id="git"
          target="_blank"
          href="https://github.com/christian-montes/baseball-scores"
          rel="external noopener noreferrer"
        >
          GitHub
        </a>
      </li>
    );

  function checkWindowLocation() {
    setPage(window.location.pathname);
  }

  useEffect(() => {
    checkWindowLocation();
  }, []);

  return (
    <>
      <div className={show ? styles.menuContViz : styles.menuContHidden}>
        <ul className={styles.menu}>{menuItems}</ul>
      </div>
    </>
  );
}
