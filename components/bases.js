import { useState } from 'react';
import styles from './bases.module.scss';

export default function Bases({ gameState, count, plays }) {
  const [outnum, setOut] = useState(null);
  const { balls, strikes, outs } = count;
  const display = ['In Progress', 'Warmup'].indexOf(gameState) >= 0;

  if (outnum === null) setOut(outs);
  /**
   * If the length of the plays array is one,
   * that play will set the state of runners.
   * 
   * if the length of the array is gt one, 
   * the previous play will set the state of runners,
   * UNLESS the previous play made the third out
   */
  const first = null;
  const second = null;
  const third = null;

  return (
    <>
      <div className={styles.field}>
        {display && (
          <>
            <span className={styles.firstBase} id="first-base"></span>

            <span className={styles.secondBase} id="second-base"></span>

            <span className={styles.thirdBase} id="second-base"></span>

            <span className={styles.count} id="count">
              {balls}-{strikes}, {outs} out
            </span>
          </>
        )}
      </div>
    </>
  );
}
