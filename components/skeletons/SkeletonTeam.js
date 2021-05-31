import SkeletonElement from "./SkeletonElement";

export default function SkeletonTeam() {
  return (
    <>
      <div className="row h-50 align-items-center">
        <div className="col-2 px-1">
          <SkeletonElement type="logo" />
        </div>
        <div className="col-7 h-100 px-0 pt-1">
            <SkeletonElement className="row h-50" type="name" />
            <SkeletonElement className="row" type="record" />
        </div>
      </div>
    </>
  );
}