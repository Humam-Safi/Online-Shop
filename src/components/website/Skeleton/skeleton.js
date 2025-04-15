import Skeleton from "react-loading-skeleton";
const SkeletonComp = (props) => {

  const dataShow = Array.from({length : props.length}).map((_,index)=>(
    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
      <div className="mx-4 mb-3">
        <Skeleton width={window.innerWidth >= 768 ? "300px" : "200px"} height={props.height} baseColor={props.baseColor}/>
      </div>
    </div>
  ))

  return (
    <div className="row">
      {dataShow}
    </div>
  );
};

export default SkeletonComp;
