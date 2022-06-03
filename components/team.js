import Image from 'next/image';
import styles from '../styles/score.module.scss';

export default function Team({ away, teamRecord, teamRunData, gameState }) {
  const {
    teamName,
    fileCode,
    record: { wins, losses },
  } = teamRecord;

  const {
    home: { runs: runsHome, hits: hitsHome, errors: errHome },
    away: { runs: runsAway, hits: hitsAway, errors: errAway },
  } = teamRunData;

  return (
    <>
      <div className={styles.teamRow}>
        <div className={styles.image}>
          <Image
            src={`/${fileCode}.svg`}
            alt={teamName}
            width={23}
            height={23}
          />
        </div>
        <div className={styles.record}>
          <div className={styles.teamName}>
            {teamName}
            {/* Name */}
          </div>
          <div className={styles.winLoss}>
            {/* 18-17 */}
            {`${wins}-${losses}`}
          </div>
        </div>
        {gameState !== 'Pre-Game' && (
          <div className={styles.runs}>
            <div className={styles.entry_container}>
              {away ? runsAway : runsHome}
            </div>
            <div className={styles.hits_errors}>
              {away ? hitsAway : hitsHome}
            </div>
            <div className={styles.hits_errors}>{away ? errAway : errHome}</div>
          </div>
        )}
      </div>
    </>
  );
}
