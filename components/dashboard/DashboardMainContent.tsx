import { useUser } from "@auth0/nextjs-auth0";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import { AiOutlineFund } from "react-icons/ai";
import useDashboard from "../../features/card/useDashboard";
import { classApiGetClass } from "../../features/class/classApi";
import { DEF_USER } from "../../lib/public";
import Box from "../elements/Box";

type dashType = {
  level: string;
  category: string;
  _count: { id: number };
};

export default function DashboardMainContent() {
  // const { user } = useUser();
  const {
    query: { classId },
  } = useRouter();

  const {
    dashboard: { data },
  } = useDashboard(classId);

  // console.log("dashboard data ", data);

  const total = data?.reduce(
    (total: number, d: dashType) => total + d._count.id,
    0
  );

  return (
    <div className="flex-1 col_ p-3 px-[3%] container max-w-5xl mx-auto">
      <header className="sticky top-[70px]">
        <h3 className="title_">Dashboard</h3>
      </header>
      <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 ring-1d ring-slate-200 shadow-lgd shadow-slate-200">
        <h3 className="text-2xl font-bold flex_ text-pink-400 items-center">
          Total Cards :
          <span className="text-slate-500 font-bold text-2xl px-3">
            {total + 200}
          </span>
        </h3>
        <h3 className="text-lg font-bold flex_">
          Total Learns :
          <span className="text-indigo-400d font-bold text-xl px-3">{231}</span>
        </h3>
      </div>
      <h4 className="subtitle_  p-1">Level</h4>
      <div className="flex gap-7 flex-wrap ">
        <LevelItem data={data} value="easy" field="level" />
        <LevelItem data={data} value="normal" field="level" />
        <LevelItem data={data} value="hard" field="level" />
      </div>

      <h4 className="subtitle_ p-1">Category</h4>
      <div className="flex gap-7 flex-wrap">
        <LevelItem data={data} value="new" field="category" />
        <LevelItem data={data} value="passed" field="category" />
        <LevelItem data={data} value="left" field="category" />
      </div>
    </div>
  );

  //   <div className="flex-1 col_ p-3 px-[3%] container_ ">
  //     <header className="sticky top-[70px] flex items-center justify-between gap-3">
  //       <h3 className="title_">Dashboard</h3>
  //     </header>
  //     <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200 shadow-lgd shadow-slate-200">
  //       <h3 className="text-2xl font-bold flex_ text-pink-400 items-center">
  //         Total Cards :
  //         <span className="text-slate-500 font-bold text-2xl px-3">
  //           {total + 200}
  //         </span>
  //       </h3>
  //       <h3 className="text-lg font-bold flex_">
  //         Total Learns :
  //         <span className="text-indigo-400d font-bold text-xl px-3">{231}</span>
  //       </h3>
  //       <br />
  //       <hr />
  //       <h4 className="subtitle_   p-2">Level</h4>
  //       <div className="flex gap-7 flex-wrap ">
  //         <LevelItem data={data} value="easy" field="level" />
  //         <LevelItem data={data} value="normal" field="level" />
  //         <LevelItem data={data} value="hard" field="level" />
  //       </div>
  //       <br />
  //       <h4 className="subtitle_ p-2">Category</h4>
  //       <div className="flex gap-7 flex-wrap">
  //         <LevelItem data={data} value="new" field="category" />
  //         <LevelItem data={data} value="passed" field="category" />
  //         <LevelItem data={data} value="left" field="category" />
  //       </div>
  //     </div>
  //   </div>
  // );
}

function LevelItem({
  data,
  field = "level",
  value,
}: {
  data: dashType[];
  value: string;
  field: string;
}) {
  const cards = data?.filter((i: any) => i?.[field] == value);
  const x = cards?.reduce(
    (s, f) => {
      s.count += f._count.id;
      return s;
    },
    { count: 0 }
  );
  const valueColo = () =>
    value === "normal" ? "lime" : value === "easy" ? "orange" : "pink";
  return (
    <div
      className={` bg-white p-2 ring-1 gap-4 ring-slate-100 dring-${valueColo()}-100 dark:ring-slate-600 dark:bg-slate-600 rounded-xl hover:shadow-md  hover:-translate-y-1 transition cursor-pointer flex flex-wrap items-end `}
    >
      <div
        className={
          "  text-slate-500  flex gap-2  mr-auto px-1 rounded-md ring-d1 flex-col ring-" +
          valueColo() +
          "-100  "
        }
      >
        <div className="flex gap-2">
          <AiOutlineFund className="text-purple-500 bg-pink-100d p-1 rounded-md text-xl" />
          <small className={"" + `text-${valueColo()}-400 text-sm`}>
            {value}
          </small>
        </div>
        <div className="  font-normal flex items-center  djustify-between">
          <h1 className="font-bold px-2 text-2xl text-slate-500">{x?.count}</h1>
          <h3 className="font-semibold text-slate-500">Cards</h3>
        </div>
      </div>
      <div className="flex flex-cold items-center justify-between px-3">
        <div>
          {cards?.map((c) => (
            <Item key={c._count.id} data={c} field={field} />
          ))}
        </div>
      </div>
    </div>
  );
}

type itemProps = {
  data: dashType;
  field: string;
};

function Item({ data, field }: itemProps) {
  return (
    <div className="flex  gap-2 items-centerd justify-between">
      <p className="text-slate-500 font-light">
        {field !== "category" && data.category}
        {field !== "level" && data.level}
      </p>
      <p className="  text-indigo-400 font-semibold ">
        {data._count.id + data._count?.id}
      </p>
    </div>
  );
}
