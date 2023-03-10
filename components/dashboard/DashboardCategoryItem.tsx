import Image from "next/image";
import { DashboardType } from "../../features/app/appSlice";
import _useLevelValues_ from "../../lib/utils/_useLevelValues_";
import _usePercentage from "../../lib/utils/_usePercentage";
import Pie from "../elements/Pie";

export default function DashboardCategoryItem({
  data,
  field = "level",
  value,
  total = 1,
  text,
}: {
  data: DashboardType[];
  value: string;
  field: string;
  text: string;
  total: number;
}) {
  const cardsByCategoryStats = data?.filter((i: any) => i?.[field] == value);
  const totalCardsStats = cardsByCategoryStats?.reduce(
    (s, f) => {
      s.count += f._count.id;
      return s;
    },
    { count: 0 }
  );

  return (
    <div
      className={`card card-ring  animate-pop flex-col flex-1 px-6 py-4 rounded-3xl md:max-w-[250px] shadow-[1px_22px_51px_0px_rgba(132,132,132,0.15)] cursor-pointer hover:scale-105 transition hover:shadow-2xl hover:shadow-slate-300 dark:hover:shadow-black
        `}
    >
      <div className="flex gap-3 justify-between">
        <div className="ring-1d flex-col gap-2d">
          <Image
            className=" dark:opacity-60"
            src={`/icon/categoryItemMain/${value}.svg`}
            width={28}
            height={28}
          />
          <h4 className={" font-bold text-accent "}>{text}</h4>
          <div className="leading-[1]">
            {cardsByCategoryStats?.length >= 2 &&
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
          <Pie value={_usePercentage(totalCardsStats?.count, total)} />
          <div className="flex  gap-2 items-center pt-1 text-sm text-value ">
            {totalCardsStats?.count}
            <small className="  font-semibold  ">Cards</small>
          </div>
        </div>
      </div>
    </div>
  );
}
