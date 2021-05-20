import { useEffect, useState } from 'react';
import styles from './bases.module.scss';

export default function Bases({ gameState, count, plays }) {
  const [{ runnerFirst, runnerSecond, runnerThird }, setRunners] = useState({
    runnerFirst: false,
    runnerSecond: false,
    runnerThird: false,
  });
  const { balls, strikes, outs, inningNumber } = count;
  const { allPlays, playsByInning, inningHalf } = plays;
  const display = ['In Progress', 'Warmup'].includes(gameState);
  /**
   * If the length of the plays array is one,
   * that play will set the state of runners.
   *
   * if the length of the array is gt one,
   * the previous play will set the state of runners,
   * UNLESS the previous play made the third out
   */

  const updateRunners = () => {
    const inningHalfLower = inningHalf.toLowerCase();
    const playsIndex = playsByInning[inningNumber - 1][inningHalfLower];
    const playsThisInning = allPlays.slice(playsIndex[0]);
    if (outs !== 3) {
      const runnersOn = {
        '1B': false,
        '2B': false,
        '3B': false,
      };
      // console.log(runnersOn);

      playsThisInning.map((play) => {
        const {
          runners,
          about: { isComplete },
        } = play;
        // console.log(runnersOn);
        if (true) {
          // console.log(runnersOn);
          if (runners.length > 1) {
            Object.keys(runnersOn).forEach((r) => (runnersOn[r] = false));
            // console.log(runnersOn);
            runners.map((runner) => {
              const {
                movement: { end },
              } = runner;

              if (end === '1B') {
                runnersOn[end] = true;
              } else if (end === '2B') {
                runnersOn[end] = true;
              } else if (end === '3B') {
                runnersOn[end] = true;
              }
              // console.log(runnersOn);
            });
          } else if (runners.length === 1) {
           !runnersOn['1B'] &&
             !runnersOn['2B'] &&
             !runnersOn['3B'] &&
             runners.map((runner) => {
               const {
                 movement: { end },
               } = runner;

               if (end === '1B') {
                 runnersOn[end] = true;
               } else if (end === '2B') {
                 runnersOn[end] = true;
               } else if (end === '3B') {
                 runnersOn[end] = true;
               }
               // console.log(runnersOn);
             });
          }
        }
      });
      console.log(runnersOn);
      setRunners({
        runnerFirst: runnersOn['1B'],
        runnerSecond: runnersOn['2B'],
        runnerThird: runnersOn['3B'],
      });
    } else {
      setRunners({
        runnerFirst: false,
        runnerSecond: false,
        runnerThird: false,
      });
    }
  };

  // console.log(testfn)

  useEffect(() => {
    // console.log(['useEffect', outs, inningNumber]);
    updateRunners();
  }, [balls, strikes, outs, allPlays]);
  // console.log([runnerFirst, runnerSecond, runnerThird]);

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
                runnerThird ? styles.thirdBase_runnerOn : styles.thirdBase
              }
              id="third-base"
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
