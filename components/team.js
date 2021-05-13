import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaseballBall } from '@fortawesome/free-solid-svg-icons';

export default function Team({ away, teamRecord, teamRunData }) {
  const {
    teamName,
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
        <div className="col-2 px-1">
          <span style={{ fontSize: '23px' }}>
            <FontAwesomeIcon icon={faBaseballBall} />
          </span>
        </div>
        <div className="col-8 h-100 ps-2.5">
          <div
            className="row h-50"
            style={{ fontSize: '13px', paddingBottom: '0px' }}
          >
            {teamName}
            {/* Name */}
          </div>
          <div
            className="row h-50"
            style={{ fontSize: '10px', marginBottom: '0px' }}
          >
            {/* 18-17 */}
            {wins}-{losses}
          </div>
        </div>
        <div className="col-2 ps-0">{away ? runsAway : runsHome}</div>
      </div>
    </>
  );
}
