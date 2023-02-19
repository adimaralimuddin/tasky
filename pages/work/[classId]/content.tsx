import { NextApiRequest } from "next";
import React from "react";
import TopicMainContent from "../../../components/work/topic/TopicMainContent";
import WorkLayout from "./workLayout";

function content({ reqe }: any) {
  console.log("reqe", reqe);
  const classid = reqe.classId;
  return (
    <div>
      <small>{classid}</small>
      <TopicMainContent classId={classid} />
    </div>
  );
}

content.getLayout = WorkLayout;

export const getServerSideProps = (req: NextApiRequest) => {
  console.log(req.query);
  return {
    props: {
      reqe: req.query,
    },
  };
};

export default content;
