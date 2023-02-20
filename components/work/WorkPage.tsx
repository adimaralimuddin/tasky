import dynamic from "next/dynamic";
import LayoutHeaderLoader from "../layouts/LayoutHeaderLoader";
import WorkContent from "./workContent/WorkContent";
import WorkContentLoader from "./workContent/WorkContentLoader";
import WorkSideLoader from "./WorkSide/WorkSideLoader";
import WorkSide from "./WorkSide/WorkSideMain";

// const WorkSide = dynamic(() => import("./WorkSide/WorkSideMain"), {
//   ssr: false,
//   loading: WorkSideLoader,
// });
const WorkHeader = dynamic(() => import("./workHeader/WorkHeader"), {
  ssr: false,
  loading: LayoutHeaderLoader,
});
// const WorkContent = dynamic(() => import("./workContent/WorkContent"), {
//   ssr: false,
//   loading: WorkContentLoader,
// });

export default function WorkPage({ post, dashboard }: any) {
  console.log("over here class", post);

  return (
    <div className=" min-h-[100vh] flexd flex-col flex   ">
      <div className="flex flex-1">
        <WorkSide post={post} />
        <div className="flex-[3] flex flex-col border-b-1 shadow-sm ">
          <small>here: {post?.dashboard?.[0]?.level}</small>
          <WorkHeader />
          <WorkContent post={post} />
        </div>
      </div>
    </div>
  );
}
