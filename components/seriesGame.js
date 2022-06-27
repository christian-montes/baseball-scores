import styles from '../styles/seasonSeries.module.scss';
import { format } from 'date-fns';

export default function SeriesGame({ gameData, gameNum }) {
  const game = gameData['competitions'][0];
  const [
    {
      team: { shortDisplayName: homeDisplayName },
    },
    {
      team: { shortDisplayName: awayDisplayName },
    },
  ] = game['competitors'];

  const homeScore = game['competitors'][0]?.score
    ? game['competitors'][0]['score']['displayValue']
    : '-';
  const awayScore = game['competitors'][1]?.score
    ? game['competitors'][1]['score']['displayValue']
    : '-';

  const formattedGameDate = format(new Date(gameData.date), 'M/d');
  // console.log(formattedGameDate);

  return (
    <>
      <div className={styles.entry}>
        <div id="series-gamescore" className={styles.teams}>
          <div className={styles.teamRowStyle}>
            <div>{awayDisplayName}</div>
            <div style={{ width: '19px', height: '19px', textAlign: 'center' }}>
              {awayScore}
            </div>
          </div>
          <div className={styles.teamRowStyle}>
            <div>{homeDisplayName}</div>
            <div style={{ width: '19px', height: '19px', textAlign: 'center' }}>
              {homeScore}
            </div>
          </div>
        </div>
        <div
          id="gamedate"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexGrow: '1',
            width: '50%',
            alignItems: 'center',
          }}
        >
          <div>{`Game ${gameNum}`}</div>
          <div>{formattedGameDate}</div>
        </div>
      </div>
    </>
  );
}
