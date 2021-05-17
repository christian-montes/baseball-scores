import { useState } from 'react';
import styles from './bases.module.scss';

export default function Bases({ gameState, count, plays }) {
  const [{ runnerFirst, runnerSecond, runnerThird }, setRunners] = useState({
    runnerFirst: false,
    runnerSecond: false,
    runnerThird: false,
  });
  const { balls, strikes, outs, inningNumber } = count;
  const { allPlays, playsByInning, inningHalf } = plays;
  const display = ['In Progress', 'Warmup'].indexOf(gameState) >= 0;
  /**
   * If the length of the plays array is one,
   * that play will set the state of runners.
   *
   * if the length of the array is gt one,
   * the previous play will set the state of runners,
   * UNLESS the previous play made the third out
   */
  const inningHalfLower = inningHalf.toLowerCase();
  const playsIndex = playsByInning[inningNumber - 1][inningHalfLower];
  const playsThisInning = allPlays.slice(playsIndex[0]);

  if (outs !== 3) {
    const runnersOn = {
      runnerFirst: false,
      runnerSecond: false,
      runnerThird: false,
    };

    playsThisInning.map((play) => {
      const {
        runners,
        about: { isComplete },
      } = play;
      if (isComplete && runners.length > 1) {
        runnersOn[runnerFirst] = false;
        runnersOn[runnerSecond] = false;
        runnersOn[runnerThird] = false;
        runners.map((runner) => {
          const {
            movement: { end },
          } = runner;
          end === '1B'
            ? (runnersOn[runnerFirst] = true)
            : end === '2B'
            ? (runnersOn[runnerSecond] = true)
            : end === '3B'
            ? (runnersOn[runnerThird] = true)
            : null;
        });
      }
    });

    setRunners(runnersOn);
  } else {
    setRunners({ runnerFirst: false, runnerSecond: false, runnerThird: false });
  }

  // const first = null;
  // const second = null;
  // const third = null;

  return (
    <>
      <div className={styles.field}>
        {display && (
          <>
            <span
              className={
                runnerFirst ? styles.firstBase_runnerOn : styles.firstBase
              }
              id="first-base"
            ></span>

            <span
              className={
                runnerSecond ? styles.secondBase_runnerOn : styles.secondBase
              }
              id="second-base"
            ></span>

            <span
              className={
                runnerFirst ? styles.thirdBase_runnerOn : styles.thirdBase
              }
              id="second-base"
            ></span>

            <span className={styles.count} id="count">
              {balls}-{strikes}, {outs} out
            </span>
          </>
        )}
      </div>
    </>
  );
}
