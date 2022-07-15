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

      // STARTING POINT FOR NEW BASERUNNERS TRACKING MECH
      // UNDO UNTIL HERE

      // to be used for when a play has not been completed
      // this means that the runners array will be empty
      // inningBaserunners has the following structure
      // { id : '1B', id: '3B' }
      let inningBaserunners = {};
      const idsOnBases = { '1B': null, '2B': null, '3B': null };

      playsThisInning.map((play) => {
        const {
          runners,
          about: { isComplete },
          playEvents, // new addition to track base stealing, adv on WP etc
        } = play;
        // Origin base is used to track which base the runner originated from;
        // used to track runner advancing on the play

        // New method using the runner ID found under each runner
        // way to prevent double counting same runner
        let baseRunners = {};

        let originBases = [];
        let endBases = [];

        if (isComplete) {
          if (runners.length > 1) {
            // the error for the bases may be coming from runners advancing on a throw and "end" appearing more than once;
            // maybe create an array to hold the bases where the runner started to keep track of the same runner making another move on the same play
            // Object.keys(runnersOn).forEach((r) => (runnersOn[r] = false));
            // console.log(runnersOn);
            runners.map((runner) => {
              const {
                movement: { originBase, start, end, isOut },
                // new data
                details: {
                  runner: { id: runnerID },
                },
              } = runner;

              if (isOut) {
                // return; CHANGED
                baseRunners[runnerID] = end;
                // if a runner is out, their start base must be false;
                runnersOn[start] = false;
              }
              // if (!originBases.includes(originBase)) { changed
              if (!baseRunners?.runnerID) {
                // if (!endBases.includes(start)) {
                //   runnersOn[start] = false;
                // } changed
                // endBases.push(end);
                baseRunners[runnerID] = end;
                runnersOn[start] = false;
                originBases.push(originBase);

                // if (end === '1B') {
                //   runnersOn[end] = true;
                // } else if (end === '2B') {
                //   runnersOn[end] = true;
                // } else if (end === '3B') {
                //   runnersOn[end] = true;
                // } CHANGED
              } else {
                /**
                 * To get the correct bases, the end base that was originally
                 * saved needs to be removed for runners with more than one entry
                 *
                 * Can be done by slicing up to the last index or by using Array.pop
                 */
                // endBases.pop();
                // if (!endBases.includes(start)) {
                //   runnersOn[start] = false;
                // }
                // runnersOn[start] = false;

                // if (end === '1B') {
                //   runnersOn[end] = true;
                // } else if (end === '2B') {
                //   runnersOn[end] = true;
                // } else if (end === '3B') {
                //   runnersOn[end] = true;
                // }

                baseRunners[runnerID] = end;
                runnersOn[start] = false;
              }

              // console.log(runnersOn);
            });
          } else if (runners.length === 1) {
            if (!runnersOn['1B'] && !runnersOn['2B'] && !runnersOn['3B']) {
              runners.map((runner) => {
                const {
                  movement: { start, end },
                  details: {
                    runner: { id: runnerID },
                  },
                } = runner;

                // if (end === '1B') {
                //   runnersOn[end] = true;
                // } else if (end === '2B') {
                //   runnersOn[end] = true;
                // } else if (end === '3B') {
                //   runnersOn[end] = true;
                // } // deleted
                // console.log(runnersOn);
                baseRunners[runnerID] = end; // added; runner needs to be tracked
                runnersOn[start] = false;
              });
            } else if (runnersOn['1B'] || runnersOn['2B'] || runnersOn['3B']) {
              runners.map((runner) => {
                const {
                  movement: { start, end },
                  details: {
                    runner: { id: runnerID },
                  },
                } = runner;

                runnersOn[start] = false;
                // if (end === '1B') {
                //   runnersOn[end] = true;
                // } else if (end === '2B') {
                //   runnersOn[end] = true;
                // } else if (end === '3B') {
                //   runnersOn[end] = true;
                // } delete

                baseRunners[runnerID] = end; // added to track runner
              });
            }
          }

          // loop through the baseRunners object to update runnersOn
          // and fill in inningBaserunners
          // inningBaserunners needs to be cleared for every play
          // to clear runners involved in base running plays

          // this might not be needed; would remove runners not involved;
          // will handle clearing runners below;
          // inningBaserunners = {};

          for (const baserunner in baseRunners) {
            // might be able to add a condition where if the base runner ends at null if it makes sense
            if (['1B', '2B', '3B'].includes(baseRunners[baserunner])) {
              // update the runners on object
              runnersOn[baseRunners[baserunner]] = true;
              // update the inning baserunners
              inningBaserunners[baserunner] = baseRunners[baserunner];

              // update idsOnBases
              idsOnBases[baseRunners[baserunner]] = baserunner;
            }
          }
        } else {
          // statements to map through playEvents to get the base running plays mid-PA
          playEvents.map((play) => {
            if (play.details.eventType === 'runner_placed') {
              const {
                player: { id },
              } = play;

              runnersOn['2B'] = true;
              // set inningBaserunners
              inningBaserunners[id] = '2B';
              // set idsOnBases
              idsOnBases['2B'] = id;
              
            }
            if (play?.isBaseRunningPlay) {
              // insert statements to update the base for player.id
              const {
                details: { description, event: eventPlay, eventType },
                player: { id },
              } = play;

              // caught stealing and pickoffs are outs on the bases
              if (
                /Caught Stealing/.test(eventPlay) ||
                /Pickoff/.test(eventPlay)
              ) {
                // If runner makes an out, their base needs to be
                // turned off and their entry needs to be removed from
                // inningBaserunners
                runnersOn[inningBaserunners[id]] = false;
                // would need to update idsOnBases too
                idsOnBases[inningBaserunners[id]] = null;
                delete inningBaserunners[id];
              }

              // wild pitches and passed balls allow runners to advance
              if (eventType === 'wild_pitch' || eventType === 'passed_ball') {
                const regex = /\d[a-z]{2}|scores/g;
                const matches = description.match(regex);

                matches.map((match) => {
                  if (match === 'scores') {
                    // only need to turn 3rd base off
                    // let runneron3rd = idsOnBases['3B'];
                    delete inningBaserunners[idsOnBases['3B']];
                    runnersOn['3B'] = false;
                    idsOnBases['3B'] = null;
                  } else if (match === '3rd') {
                    runnersOn['2B'] = false;
                    runnersOn['3B'] = true;

                    inningBaserunners[idsOnBases['2B']] = '3B';
                    idsOnBases['2B'] = null;
                  } else if (match === '2nd') {
                    runnersOn['1B'] = false;
                    runnersOn['2B'] = true;

                    inningBaserunners[idsOnBases['1B']] = '2B';
                    idsOnBases['1B'] = null;
                  }
                });
              }

              if (/Stolen Base/.test(eventPlay)) {
                const regex = /\d[a-z]{2}|scores/g;
                const matches = description.match(regex);

                matches.map((match) => {
                  if (match === 'scores') {
                    // only need to turn 3rd base off
                    // let runneron3rd = idsOnBases['3B'];
                    delete inningBaserunners[idsOnBases['3B']];
                    runnersOn['3B'] = false;
                    idsOnBases['3B'] = null;
                  } else if (match === '3rd') {
                    runnersOn['2B'] = false;
                    runnersOn['3B'] = true;

                    inningBaserunners[idsOnBases['2B']] = '3B';
                    idsOnBases['2B'] = null;
                  } else if (match === '2nd') {
                    runnersOn['1B'] = false;
                    runnersOn['2B'] = true;

                    inningBaserunners[idsOnBases['1B']] = '2B';
                    idsOnBases['1B'] = null;
                  }
                });
              }
            }
          });
        }

        // new addition
        // was going to be for when runners.length === 0;
        // will now be for when the play has not completed.
        // will show runner movement before the plate appearance finishes
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
