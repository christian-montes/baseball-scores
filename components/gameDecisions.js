import styles from '../styles/score.module.scss';

export default function Decision({ decisions }) {
  const {
    winner: { fullName: nameWinner },
    loser: { fullName: nameLoser },
  } = decisions;

  // const lastNameWinner = nameWinner.split(' ').slice(-1);
  // const lastNameLoser = nameLoser.split(' ').slice(-1);
  let nameSave = 'N/A';

  if (decisions?.save) {
    nameSave = decisions.save.fullName;
  }

  const labelStyle = {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '12px',
    fontWeight: '300',
  };

  const dataStyle = {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '12px',
    fontWeight: 'bold',
  };

  const noSaveLabel = {
    ...labelStyle,
    visibility: 'hidden',
  };

  const noSaveData = {
    ...dataStyle,
    visibility: 'hidden',
  };
  return (
    <>
      <div className={styles.gameDecision}>
        <div>
          <div style={labelStyle}>WIN</div>
          <div style={dataStyle}>{nameWinner}</div>
        </div>
        <div>
          <div style={labelStyle}>LOSS</div>
          <div style={dataStyle}>{nameLoser}</div>
        </div>
        <div>
          <div style={nameSave === 'N/A' ? noSaveLabel : labelStyle}>SAVE</div>
          <div style={nameSave === 'N/A' ? noSaveData : dataStyle}>
            {nameSave}
          </div>
        </div>
        {/* <div style={{ fontSize: '14px' }}>FINAL</div>
        <div>{`${awayAbbr} ${runsAway}, ${homeAbbr} ${runsHome}`}</div>
        <div style={{ fontSize: '14px', color: '#99A6AB' }}>
          {lastNameSave
            ? `W: ${lastNameWinner} L: ${lastNameLoser} S: ${lastNameSave}`
            : `W: ${lastNameWinner} L: ${lastNameLoser}`}
        </div> */}
      </div>
    </>
  );
}
