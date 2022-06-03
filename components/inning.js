import { format, utcToZonedTime } from 'date-fns-tz';

export default function Inning({
  publicGS,
  detailedState,
  abstractGameState,
  inningData,
  outs,
  teamRunData,
  timeData,
}) {
  const { inningNumber, nth_Inning, inningHalf, scheduledInnings } = inningData;

  const {
    home: { runs: runsHome },
    away: { runs: runsAway },
  } = teamRunData;

  const { dateTime } = timeData;
  const USER_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone
  const timeZonedDate = utcToZonedTime(dateTime, USER_TIME_ZONE);
  const displayTimeFormatted = format(timeZonedDate, 'h:MM a zzz')

  // need to add scheduled time data
  // may be better to check if the innings played are simply different, not if one is greater than the other;
  const display =
    ['Pre-Game', 'Scheduled'].includes(detailedState) &&
    publicGS !== 'Postponed'
      ? displayTimeFormatted
      : detailedState === 'Warmup'
      ? detailedState
      : detailedState === 'In Progress'
      ? inningHalf === 'Top'
        ? outs === 3
          ? inningNumber >= scheduledInnings && runsHome > runsAway
            ? 'Final'
            : `Mid ${nth_Inning}`
          : `${inningHalf} ${nth_Inning}`
        : outs === 3
        ? `End ${nth_Inning}`
        : `Bot ${nth_Inning}`
      : (detailedState === 'Final' || abstractGameState === 'Final') && publicGS !== 'Postponed'
      ? inningNumber != scheduledInnings || scheduledInnings < 9
        ? `Final/${inningNumber}`
        : detailedState
      : detailedState === 'Scheduled' && publicGS === 'Postponed'
      ? 'Postponed'
      : detailedState;

  return (
    <>
      <div
        style={{
          textAlign: 'end',
          height: '100%',
          width: '50%',
          fontSize: '13px',
          position: 'absolute',
          paddingRight: '8px',
          top: '0',
          right: '0',
        }}
      >
        {display}
      </div>
    </>
  );
}
