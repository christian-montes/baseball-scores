import SkeletonElement from './SkeletonElement';
import styles from './SkeletonElement.module.scss';

export default function SkeletonTeam() {
  return (
    <>
      <div className={styles.skeletonTeamRow}>
        <div style={{ paddingLeft: '5px' }}>
          <SkeletonElement type="logo" />
        </div>
        <div>
          <SkeletonElement type="name" />
          {/* <SkeletonElement className="row" type="record" /> */}
        </div>
      </div>
    </>
  );
}
