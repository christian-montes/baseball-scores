
export default function Inning({ gameState, inningData, outs, teamRunData, timeData }) {
  const { inningNumber, nth_Inning, inningHalf, scheduledInnings } = inningData;

  const {
    home: { runs: runsHome },
    away: { runs: runsAway },
  } = teamRunData;

  const { time, ampm } = timeData;

  // need to add scheduled time data
  // may be better to check if the innings played are simply different, not if one is greater than the other;
  const display =
    gameState === 'Pre-Game'
      ? `${time} ${ampm}`
      : gameState === 'Warmup'
      ? gameState
      : gameState === 'In Progress'
      ? inningHalf === 'Top'
        ? outs === 3
          ? inningNumber >= scheduledInnings && runsHome > runsAway
            ? 'Final'
            : `Mid ${nth_Inning}`
          : `${inningHalf} ${nth_Inning}`
        : outs === 3
        ? `End ${nth_Inning}`
        : `Bot ${nth_Inning}`
      : gameState === 'Final'
      ? inningNumber !== scheduledInnings
        ? `${gameState}/${inningNumber}`
        : gameState
      : 'Final';

  return (
    <>
      <div
        className="position-absolute pe-2 top-0 end-0"
        style={{ fontSize: '13px' }}
      >
        {display}
      </div>
    </>
  );
}
