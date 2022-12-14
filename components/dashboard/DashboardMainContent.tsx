import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import useDashboard from "../../features/card/useDashboard";
import { DEF_USER } from "../../lib/public";
import Box from "../elements/Box";

type dashType = {
  level: string;
  category: string;
  _count: { id: number };
};

export default function DashboardMainContent() {
  const { user } = useUser();
  const {
    dashboard: { data },
  } = useDashboard(user?.sub || DEF_USER);

  const total = data?.reduce(
    (total: number, d: dashType) => total + d._count.id,
    0
  );

  return (
    <Box css="flex-1 p-4 flex flex-col gap-3 px-[7%] py-[3%] ">
      <div className="p-3 flex items-center justify-center">
        <h1 className="text-slate-500">
          Total Cards{" "}
          <span className="text-indigo-400 font-bold text-3xl"> {total}</span>
        </h1>
      </div>
      <h2>Level</h2>
      <div className="flex gap-7 flex-wrap">
        <LevelItem data={data} value="easy" field="level" />
        <LevelItem data={data} value="normal" field="level" />
        <LevelItem data={data} value="hard" field="level" />
      </div>
      <br /> <hr />
      <h2>Category</h2>
      <div className="flex gap-7 flex-wrap">
        <LevelItem data={data} value="new" field="category" />
        <LevelItem data={data} value="passed" field="category" />
        <LevelItem data={data} value="left" field="category" />
      </div>
    </Box>
  );
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
  return (
    <div className="p-2 flex-1 ring-1 ring-slate-200 dark:ring-slate-600 dark:bg-slate-600 rounded-xl shadow-md ">
      <h3 className="px-2  text-slate-500">{value}</h3>
      <h1 className="text-center p-3 text-indigo-400">{x?.count} cards</h1>
      <div className="flex flex-col items-center">
        {cards?.map((c) => (
          <Item key={c._count.id} data={c} field={field} />
        ))}
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
    <div className="flex  gap-2 items-center">
      <p className="text-lg font-bold text-indigo-400">{data._count.id}</p>
      <p className="text-slate-500">
        {field !== "category" && data.category}
        {field !== "level" && data.level}
      </p>
    </div>
  );
}
