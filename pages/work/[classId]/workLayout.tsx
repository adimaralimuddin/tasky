import WorkHeader from "../../../components/work/workHeader/WorkHeader";
import WorkSide from "../../../components/work/WorkSide/WorkSideMain";

export default function WorkLayout(page: any) {
  return (
    <div className=" min-h-[100vh] flexd flex-col flex   ">
      <div className="flex flex-1">
        <WorkSide />
        <div className="flex-[3] flex flex-col border-b-1 shadow-sm ">
          <WorkHeader />
          {/* <WorkContent /> */}
          {page}
        </div>
      </div>
    </div>
  );
}
