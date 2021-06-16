import styles from './menu.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Menu({show}) {
  const [elemHeight, setElemHeight] = useState('0');
  const menuLinks = [
    { name: 'Home', link: '/' },
    { name: 'Scores', link: '/scores' },
    { name: 'Standings', link: '/standings' },
    { name: 'Boxscores', link: '/' },
    {
      name: 'About',
      link: 'https://github.com/christian-montes/baseball-scores',
    },
  ];
  const menuItems = menuLinks.map((item) => {
    return (
      <li key={item.name}>
        <Link href={item.link}>{item.name}</Link>
      </li>
    );
  });

  function getHeight() {
    var windowH = window.innerHeight;
    var header = document.querySelector('header');
    let headerHeight = header.offsetHeight;
    headerHeight += parseInt(
      window.getComputedStyle(header).getPropertyValue('margin-top')
    );
    headerHeight += parseInt(
      window.getComputedStyle(header).getPropertyValue('margin-bottom')
    );

    let menuHeight = String(windowH - headerHeight);
    menuHeight += 'px';
    if (window.innerWidth < 500) {
      setElemHeight(menuHeight);
    }
  }

  useEffect(() => {
    getHeight();
  }, []);

  return (
    <div
      id="menuContainer"
      className={show ? styles.dropdownContent : styles.hiddenMenu}
      style={
        elemHeight !== '0'
          ? { height: elemHeight }
          : { height: '410px' }
      }
    >
      <ul>{menuItems}</ul>
    </div>
  );
}
