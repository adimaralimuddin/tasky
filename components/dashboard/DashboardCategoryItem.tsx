import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { CategoryType, DashboardType } from "../../features/app/appSlice";
import _useLevelValues_ from "../../lib/utils/_useLevelValues_";
import _usePercentage from "../../lib/utils/_usePercentage";
import Pie from "../elements/Pie";

const DashboardCardLists = dynamic(() => import("./DashboardCardLists"));

interface Props {
  data: DashboardType[] | undefined;
  value: CategoryType;
  field: string;
  text: string;
  total: number;
}
export default function DashboardCategoryItem({
  data,
  field = "level",
  value,
  total = 1,
  text,
}: Props) {
  const [open, setOpen] = useState(false);

  const cardsByCategoryStats = data?.filter((i: any) => i?.[field] == value);
  const totalCardsStats = cardsByCategoryStats?.reduce(
    (s, f) => {
      s.count += f._count.id;
      return s;
    },
    { count: 0 }
  );

  const valuePercentage = _usePercentage(totalCardsStats?.count || 0, total);
  return (
    <div
      onClick={() => setOpen(true)}
      className={`  flex-col flex-1 md:max-w-[250px]`}
    >
      <div className="card flex-1 h-full card-ring px-6 py-4 hover:shadow-2xl hover:shadow-slate-300 dark:hover:shadow-black  rounded-3xl  shadow-[1px_22px_51px_0px_rgba(132,132,132,0.15)] cursor-pointer   transition flex gap-3 justify-between  hover:scale-[1.03]">
        <div className="ring-1d flex-col gap-2d">
          <Image
            className=" dark:opacity-60"
            src={`/icon/categoryItemMain/${value}.svg`}
            width={28}
            height={28}
            alt="dashboard category icon"
          />
          <h4 className={" font-bold text-accent "}>{text}</h4>
          <div className="leading-[1]">
            {(cardsByCategoryStats?.length || 0) >= 2 &&
              cardsByCategoryStats?.map((stat) => (
                <div className=" text-sec " key={stat.level}>
                  <small>
                    {_useLevelValues_(stat.level)} {stat?._count?.id}
                  </small>
                </div>
              ))}
          </div>
        </div>

        <div className=" flex flex-col justify-end items-center">
          <Pie value={valuePercentage} />
          <div className="flex  gap-2 items-center pt-1 text-sm text-value ">
            {totalCardsStats?.count}
            <small className="  font-semibold  ">Cards</small>
          </div>
        </div>
      </div>
      {open && (
        <DashboardCardLists
          total={totalCardsStats?.count || 0}
          open={open}
          setOpen={setOpen}
          text={text}
          field={"category"}
          value={value}
        />
      )}
    </div>
  );
}
