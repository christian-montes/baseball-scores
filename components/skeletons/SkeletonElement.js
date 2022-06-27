import styles from './SkeletonElement.module.scss';

export default function SkeletonElement({ type }) {
  const style =
    type === 'name'
      ? styles.skeleton_teamname
      : type === 'record'
      ? styles.skeleton_teamRecord
      : type === 'gamestate'
      ? styles.skeleton_gamestate
      : styles.skeleton_teamLogo;
  return <div className={style}></div>;
}
