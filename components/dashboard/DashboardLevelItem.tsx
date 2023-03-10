import React from "react";
import { DashboardType, LevelType } from "../../features/app/appSlice";
import _useCategoryValue from "../../lib/utils/_useCategoryValue";
import { _useLevelColors } from "../../lib/utils/_utilsClasses";
interface Props {
  data: DashboardType[];
  text: string;
  value: LevelType;
}
function DashboardLevelItem({ text, value, data }: Props) {
  const cardsByLevelStats = data?.filter((i: any) => i?.level == value);

  const totalCardsStats = cardsByLevelStats?.reduce(
    (s, f) => {
      s.count += f._count.id;
      return s;
    },
    { count: 0 }
  );

  return (
    <div className=" card-all hover:shadow-slate-200 dark:hover:shadow-black cursor-pointer animate-pop rounded-2xl px-[3.3%] py-2 flex gap-2 flex-1  items-center md:max-w-[250px]  min-w-[180px]">
      <div className=" flex-1 max-w-[200px]">
        <h4 className="text-accent font-semibold">{text}</h4>
        <div
          style={{
            background: _useLevelColors(value, "palegreen", "skyblue", "pink"),
          }}
          className={"p-1 mx-2 rounded-xl max-w-[40px] dark:opacity-60 "}
        ></div>
        <div className="flex_ justify-between gap-1 flex-wrap pr-1 flex-1 pt-2">
          {(cardsByLevelStats?.length || 0) >= 2 &&
            cardsByLevelStats?.map((stat) => (
              <div
                className="text-sm py-1 flex_ text-sec leading-[.5] "
                key={stat.category}
              >
                <p>{_useCategoryValue(stat.category)}</p>
                <p>{stat._count?.id}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="text-center">
        <h4 className="font-bold text-value ">{totalCardsStats?.count}</h4>
        <h5 className="text-accent">cards</h5>
      </div>
    </div>
  );
}

export default DashboardLevelItem;
