import styles from '../styles/seasonSeries.module.scss';

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

  const homeScore = game['competitors'][0]?.score ? game['competitors'][0]['score']['displayValue'] : '-';
  const awayScore = game['competitors'][1]?.score ? game['competitors'][1]['score']['displayValue'] : '-';

  const teamRowStyle = { display: 'flex', justifyContent: 'space-around' };

  return (
    <>
      <div className={styles.entry}>
        <div
          id="series-gamescore"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            flexGrow: '1',
          }}
        >
          <div style={teamRowStyle}>
            <div>{awayDisplayName}</div>
            <div>{awayScore}</div>
          </div>
          <div style={teamRowStyle}>
            <div>{homeDisplayName}</div>
            <div>{homeScore}</div>
          </div>
        </div>
        <div
          id="gamedate"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexGrow: '1',
            alignItems: 'center'
          }}
        >
          <div>{`Game ${gameNum}`}</div>
          <div>7/24</div>
        </div>
      </div>
    </>
  );
}
