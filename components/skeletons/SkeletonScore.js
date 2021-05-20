import SkeletonElement from './SkeletonElement';
import SkeletonTeam from './SkeletonTeam';

export default function SkeletonScore() {
  return (
    <>
      <div className="score wrapper container py-1">
        <div className="row" style={{ height: '4.5rem' }}>
          <div className="col-8 col-sm-7">
            <SkeletonTeam />
            <SkeletonTeam />
          </div>

          <div className="col pe-0 h-100 position-relative">
            <div className="position-absolute pe-2 top-0 end-0" style={{width: '4rem'}}>
              <SkeletonElement type='name' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
