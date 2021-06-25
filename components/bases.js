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
   * The update runners is the basis of the
   * Bases component. This function takes the plays of the current half inning and
   * loops through the array of plays.
   * By extracting
   * the originBase,
   * the start Base, and
   * the End Base, the correct bases can be shown to have a runner on.
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

      playsThisInning.map((play) => {
        const {
          runners,
          about: { isComplete },
        } = play;
        // Origin base is used to track which base the runner originated from;
        // used to track runner advancing on the play
        let originBases = [];
        let endBases = [];
        if (runners.length > 1) {
          // the error for the bases may be coming from runners advancing on a throw and "end" appearing more than once;
          // maybe create an array to hold the bases where the runner started to keep track of the same runner making another move on the same play
          // Object.keys(runnersOn).forEach((r) => (runnersOn[r] = false));
          // console.log(runnersOn);
          runners.map((runner) => {
            const {
              movement: { originBase, start, end, isOut },
            } = runner;

            if (isOut) {
              return;
            }
            if (!originBases.includes(originBase)) {
              if (!endBases.includes(start)) {
                runnersOn[start] = false;
              }
              endBases.push(end);
              originBases.push(originBase);

              if (end === '1B') {
                runnersOn[end] = true;
              } else if (end === '2B') {
                runnersOn[end] = true;
              } else if (end === '3B') {
                runnersOn[end] = true;
              }
            } else {
              runnersOn[start] = false;

              if (end === '1B') {
                runnersOn[end] = true;
              } else if (end === '2B') {
                runnersOn[end] = true;
              } else if (end === '3B') {
                runnersOn[end] = true;
              }
            }

            // console.log(runnersOn);
          });
        } else if (runners.length === 1) {
          if (!runnersOn['1B'] && !runnersOn['2B'] && !runnersOn['3B']) {
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
          } else if (runnersOn['1B'] || runnersOn['2B'] || runnersOn['3B']) {
            runners.map((runner) => {
              const {
                movement: { start, end },
              } = runner;

              runnersOn[start] = false;
              if (end === '1B') {
                runnersOn[end] = true;
              } else if (end === '2B') {
                runnersOn[end] = true;
              } else if (end === '3B') {
                runnersOn[end] = true;
              }
            });
          }
        }
      });
      // console.log(runnersOn);
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

  useEffect(() => {
    // console.log(['useEffect', outs, inningNumber]);
    updateRunners();
  }, [balls, strikes, outs, allPlays]);
  // console.log([runnerFirst, runnerSecond, runnerThird]);

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
