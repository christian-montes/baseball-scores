import SkeletonElement from './SkeletonElement';
import SkeletonTeam from './SkeletonTeam';
import styles from './SkeletonElement.module.scss';

export default function SkeletonScore() {
  return (
    <>
      <div
        // className="score wrapper"
        className={styles.skeletonContainer}
      >
        <div className={styles.skeletonEverything}>
          <div style={{ width: '50%' }}>
            <div className={styles.skeletonRHE} />
            <SkeletonTeam />
            <SkeletonTeam />
          </div>

          <div style={{ width: '50%' }}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: '8px',
              }}
            >
              <SkeletonElement type="gamestate" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
