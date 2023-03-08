import Image from "next/image";
import { DashboardType } from "../../features/app/appSlice";
import Pie from "../elements/Pie";
import { dashType } from "./DashboardMainContent";

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
  const cards = data?.filter((i: any) => i?.[field] == value);
  const x = cards?.reduce(
    (s, f) => {
      s.count += f._count.id;
      return s;
    },
    { count: 0 }
  );

  const card = cards?.[0];

  const valueColo = () =>
    value === "normal" ? "lime" : value === "easy" ? "orange" : "pink";
  return (
    <div
      className={`card card-ring  animate-pop flex-col flex-1 px-6 py-4 rounded-3xl md:max-w-[220px] shadow-[1px_22px_51px_0px_rgba(132,132,132,0.15)] cursor-pointer hover:scale-105 transition hover:shadow-2xl hover:shadow-slate-300 dark:hover:shadow-black
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
          <h5 className=" text-sec py-1">{x?.count} cards</h5>
        </div>

        <div className=" flex flex-col justify-end items-center">
          <Pie value={67} />
          <div className="flex  gap-2 items-center pt-1 text-sm text-value ">
            {card?.level}
            <small className="  font-semibold  ">
              {card?._count?.id + card?._count?.id || 0}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
