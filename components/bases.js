import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import styles from './bases.module.scss'

export default function Bases() {
  return (
    <>
      <div className={styles.field}>

        <span className={styles.firstBase} id='first-base'>
          <FontAwesomeIcon icon={faSquareFull} />
        </span>

        <span className={styles.secondBase} id='second-base'>
          <FontAwesomeIcon icon={faSquareFull} />
        </span>

        <span className={styles.thirdBase} id='second-base'>
          <FontAwesomeIcon icon={faSquareFull} />
        </span>

        <span className={styles.count} id='count'>0-2, 2 out</span>

      </div>
    </>
  )
}