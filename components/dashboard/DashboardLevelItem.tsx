import dynamic from "next/dynamic";
import React, { useState } from "react";
import { DashboardType, LevelType } from "../../features/app/appSlice";
import _useCategoryValue from "../../lib/utils/_useCategoryValue";
import _usePercentage from "../../lib/utils/_usePercentage";
import { _useLevelColors } from "../../lib/utils/_utilsClasses";
import Pie from "../elements/Pie";

interface Props {
  data: DashboardType[] | undefined;
  text: string;
  value: LevelType;
  total: number;
}

const DashboardCardLists = dynamic(() => import("./DashboardCardLists"));

function DashboardLevelItem({ text, value, data, total = 0 }: Props) {
  const cardsByLevelStats = data?.filter((i: any) => i?.level == value);
  const [open, setOpen] = useState(false);

  const totalCardsStats = cardsByLevelStats?.reduce(
    (s, f) => {
      s.count += f._count.id;
      return s;
    },
    { count: 0 }
  ) || { count: 0 };

  return (
    <div
      onClick={() => setOpen(true)}
      className={
        " card card-ring animate-pop2d card-shadow hover:shadow-slate-200 dark:hover:shadow-black cursor-pointer rounded-2xl px-4 py-3 flex gap-2 flex-1  items-center md:max-w-[250px]  min-w-[180px]" +
        (open ? "" : " card-hover")
      }
    >
      <div className=" flex-1 max-w-[200px]">
        <h4 className="text-accent font-semibold first-letter:uppercase">
          {text}
        </h4>
        <div
          style={{
            background: _useLevelColors(value, "palegreen", "skyblue", "pink"),
          }}
          className={
            "p-[3px] mx-2 my-1 rounded-xl max-w-[40px] dark:opacity-60 "
          }
        ></div>

        <div className="flex_ justify-between gap-1 flex-wrap pr-1 flex-1 pt-2">
          {(cardsByLevelStats?.length || 0) >= 2 &&
            cardsByLevelStats?.map((stat) => (
              <div
                className="text-sm py-1 flex_ text-sec leading-[.5] "
                key={stat.category}
              >
                <p>{_useCategoryValue(stat.category)}</p>
                <p>{stat._count?.id} </p>
              </div>
            ))}
        </div>
      </div>
      <div className="text-center flex-1">
        <h4 className="font-bold text-value ">{totalCardsStats?.count}</h4>
        <h5 className="text-accent">cards</h5>
      </div>
      <div className="text-value font-bold px-3d ">
        <Pie
          size={50}
          fontSize=".8rem"
          value={_usePercentage(totalCardsStats?.count, total)}
        />
      </div>
      {open && (
        <DashboardCardLists
          total={totalCardsStats?.count || 0}
          open={open}
          setOpen={setOpen}
          text={text}
          field={"level"}
          value={value}
        />
      )}
    </div>
  );
}

export default DashboardLevelItem;
