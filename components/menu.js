import styles from './menu.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Menu({ show, clickCallback }) {
  // const [elemHeight, setElemHeight] = useState('0');
  // const [windowWidth, setWindowWidth] = useState(0);
  const menuLinks = [
    { name: 'Home', link: '/' },
    { name: 'Scores', link: '/scores' },
    { name: 'Standings', link: '/standings' },
    {
      name: 'About',
      link: 'https://github.com/christian-montes/baseball-scores',
    },
  ];
  const menuItems = menuLinks.map((item) => {
    return (
      <li key={item.name}>
        <Link href={item.link}>
          <a onClick={clickCallback}>{item.name}</a>
        </Link>
      </li>

      // <a key={item.name} href={item.link} onClick={clickCallback}>
      //   <li>{item.name}</li>
      // </a>
    );
  });

  // function getHeight() {
  //   var windowH = window.innerHeight;
  //   var header = document.querySelector('header');
  //   let headerHeight = header.offsetHeight;
  //   headerHeight += parseInt(
  //     window.getComputedStyle(header).getPropertyValue('margin-top')
  //   );
  //   headerHeight += parseInt(
  //     window.getComputedStyle(header).getPropertyValue('margin-bottom')
  //   );

  //   let menuHeight = String(windowH - headerHeight);
  //   menuHeight += 'px';
  //   if (window.innerWidth < 500) {
  //     setElemHeight(menuHeight);
  //   }
  // }

  // useEffect(() => {
  //   getHeight();
  // }, [windowWidth]);

  // useEffect(() => {
  //   var windowW = window.innerWidth;
  //   console.log(windowW)
  //   setWindowWidth(windowW);
  // })

  return (
    <div
      id="menuContainer"
      className={show ? styles.dropdownContent : styles.hiddenMenu}
    >
      <ul>{menuItems}</ul>
    </div>
  );
}
