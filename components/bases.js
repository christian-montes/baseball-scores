import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import styles from './bases.module.scss';

export default function Bases({ gameState, count }) {
  // const [vizSetting, setVizSetting] = useState({ visibility: 'visible' });
  console.log(gameState);
  const { balls, strikes, outs } = count;

  // if (gameState === 'Final' || 'Preview') {
  //   return (
  //     <>
  //       <div className={styles.field}></div>
  //     </>
  //   );
  // }

  return (
    <>
      <div className={styles.field}>
        {(gameState === 'In Progress' || gameState === 'Warmup') && (
          <>
            <span className={styles.firstBase} id="first-base">
              <FontAwesomeIcon icon={faSquareFull} />
            </span>

            <span className={styles.secondBase} id="second-base">
              <FontAwesomeIcon icon={faSquareFull} />
            </span>

            <span className={styles.thirdBase} id="second-base">
              <FontAwesomeIcon icon={faSquareFull} />
            </span>

            <span className={styles.count} id="count">
              {balls}-{strikes}, {outs} out
            </span>
          </>
        )}
      </div>
    </>
  );
}
