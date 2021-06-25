import Image from "next/image";

export default function Team({ away, teamRecord, teamRunData, gameState }) {
  const {
    teamName,
    fileCode,
    record: { wins, losses },
  } = teamRecord;

  const {
    home: { runs: runsHome },
    away: { runs: runsAway },
  } = teamRunData;

  return (
    <>
      <div
        className="row h-50 align-items-center"
        style={
          away
            ? { paddingBottom: '0px', marginBottom: '0px' }
            : { paddingTop: '0px', marginTop: '0px' }
        }
      >
        <div className="col-2 px-1" style={{ paddingTop: '5px' }}>
          <Image src={`/${fileCode}.svg`} alt={teamName} width={23} height={23} />
        </div>
        <div className="col-7 h-100 ps-3">
          <div
            className="row h-50"
            style={{ fontSize: '13px', paddingBottom: '0px' }}
          >
            {teamName}
            {/* Name */}
          </div>
          <div className="row" style={{ fontSize: '10px' }}>
            {/* 18-17 */}
            {`${wins}-${losses}`}
          </div>
        </div>
        {gameState !== 'Pre-Game' && (
          <div className="col-2 px-0" style={{ textAlign: 'center' }}>
            {away ? runsAway : runsHome}
          </div>
        )}
      </div>
    </>
  );
}
