import { useUser } from "@auth0/nextjs-auth0";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import LayoutMainHeader from "../layouts/LayoutMainHeader";
import ClassAdderView from "./classEditor/ClassAdderView";
import Classes from "./classlists/Classes";
import ClassLists from "./classlists/ClassLists";

const ClassAdder = dynamic(() => import("./classEditor/ClassAdder"), {
  ssr: false,
  loading: ClassAdderView,
});

function PageMainClass({ myClasses, sampleClasses }: any) {
  const { user } = useUser();
  return (
    <div className=" flex flex-col gap-0  ">
      <Head>
        <title>classes</title>
      </Head>
      <LayoutMainHeader />
      <div className="container max-w-4xl mx-auto col_ gap-0 p-[3%] flex-1 ">
        {!user && (
          <h2 className="pt-3 text-sec">
            Login to see or create your own classes.
          </h2>
        )}
        {user && (
          <>
            <div className="flex_ justify-end">
              <ClassAdder myClasses={myClasses} />
            </div>
            <br />
            <Classes serverClasses={myClasses} />
          </>
        )}
        <br />
        <ClassLists
          data={sampleClasses}
          title="Sample Classes"
          editable={false}
        />
      </div>
    </div>
  );
}

export default PageMainClass;
