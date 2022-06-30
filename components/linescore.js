import styles from '../styles/linescore.module.scss'

export default function LineScore() {
  return (
    <div className={styles.threeSections}>
      <div className={styles.section1}>
        <div className={styles.topRowElement}>Placehold</div>
        <div>Team Away</div>
        <div>Team Home</div>
      </div>
      <div className={styles.section2}>Innings</div>
      <div className={styles.section3}>
        <div className={styles.topRowElement}>
          <div>R</div>
          <div>H</div>
          <div>E</div>
        </div>
        <div>
          <div>1</div>
          <div>3</div>
          <div>0</div>
        </div>
        <div>
          <div>4</div>
          <div>8</div>
          <div>1</div>
        </div>
      </div>
    </div>
  );
}