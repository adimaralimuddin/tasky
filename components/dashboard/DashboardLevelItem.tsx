import React from "react";
import { DashboardType } from "../../features/app/appSlice";
interface Props {
  data: DashboardType[];
  text: string;
  value: string;
  //   field: string;
  total: number;
}
function DashboardLevelItem({ data, text, value, total }: Props) {
  const cards = data?.filter((i: any) => i?.level == value);

  const x = cards?.reduce(
    (s, f) => {
      s.count += f._count.id;
      return s;
    },
    { count: 0 }
  );
  const card = cards?.[0];
  return (
    <div className=" card card-shadow animate-pop rounded-2xl px-[3.3%] py-2 flex gap-2 flex-1 justify-between items-center md:max-w-[220px] shadow-sm shadow-slate-200 min-w-[180px]">
      <div>
        <h4 className="text-accent font-semibold">{text}</h4>
        <div className="p-1 mx-2 rounded-xl bg-slate-200 dark:bg-slate-600  max-w-[40px]"></div>
        <p className="text-sm py-1 flex_ dark:text-slate-400">
          <span className="">{card?.category}</span>
          {card?._count?.id} cards
        </p>
      </div>
      <div className="text-center">
        <h4 className="font-bold text-value ">{x?.count}</h4>
        <h5 className="dark:text-slate-400">cards</h5>
      </div>
    </div>
  );
}

export default DashboardLevelItem;
