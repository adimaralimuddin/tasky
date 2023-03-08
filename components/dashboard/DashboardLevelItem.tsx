import React from "react";
import { DashboardType, LevelType } from "../../features/app/appSlice";
import { _useLevelColors } from "../../lib/utils/_utilsClasses";
interface Props {
  data: DashboardType[];
  text: string;
  value: LevelType;
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
    <div className=" card-all hover:shadow-slate-200 dark:hover:shadow-black cursor-pointer animate-pop rounded-2xl px-[3.3%] py-2 flex gap-2 flex-1 justify-between items-center md:max-w-[220px]  min-w-[180px]">
      <div>
        <h4 className="text-accent font-semibold">{text}</h4>
        <div
          style={{
            background: _useLevelColors(value, "palegreen", "skyblue", "pink"),
          }}
          className={"p-1 mx-2 rounded-xl max-w-[40px] dark:opacity-60 "}
        ></div>
        <p className="text-sm py-1 flex_ text-sec ">
          <span className="">{card?.category}</span>
          {card?._count?.id} cards
        </p>
      </div>
      <div className="text-center">
        <h4 className="font-bold text-value ">{x?.count}</h4>
        <h5 className="text-accent">cards</h5>
      </div>
    </div>
  );
}

export default DashboardLevelItem;
