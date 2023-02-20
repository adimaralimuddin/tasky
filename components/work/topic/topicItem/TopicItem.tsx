import Link from "next/link";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiBookAlt } from "react-icons/bi";
import { TopicType } from "../../../../features/topic/topicType";
// import useTopicSelect from "../../../../features/topic/useTopicSelect";
// import useWork from "../../../../features/work/useWork";
import _charLimits from "../../../../lib/utils/_charLimits";
import _useWorkRoutes from "../../../../lib/_routes/_useWorkRoutes";
import TopicDeleter from "../topicEditor/TopicDeleter";
import TopicRenamer from "../topicEditor/TopicRenamer";
import TopicOptions from "./TopicOptions";

type props = {
  data: TopicType;
  key?: any;
  selectFolder: any;
};

export default function TopicItem({ data, selectFolder }: props) {
  // console.log(`final topic here = `, data);

  const [hovered, setHovered] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [changedName, setChangedName] = useState(false);
  // const { setTopic, work } = useWork();

  // const router = useRouter();
  const { query, topic, setWorkState } = _useWorkRoutes();
  // const { selectTopic } = useTopicSelect();

  const isSelected = (a: any = true, b: any = false) =>
    query?.topicId === data?.id ? a : b;

  // const isSelected = (a: any = true, b: any = false) =>
  //   work?.selectedTopic?.id === data.id ? a : b;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setChangedName(true);
    }
  }, [data?.name]);

  const onSelectTopic = () => {
    console.log("clicked ///");
    // selectTopic(data);
    selectFolder(true);
    // setWorkState({
    //   topic: data,
    //   category: "all",
    //   content: "topic",
    //   topicId: data.id,
    //   topicName: data.name,
    // });
  };

  return (
    // <Link
    //   replace
    //   href={getNavQueries({
    //     topic: data,
    //     category: "all",
    //     content: "topic",
    //     topicId: data.id,
    //     topicName: data.name,
    //   })}
    //   passHref
    // >
    <div className="flex flex-col">
      <div
        onClick={onSelectTopic}
        onAnimationEnd={(e) => {
          const div = e.target as HTMLDivElement;
          if (div.classList.contains("popy")) {
            setChangedName(false);
          }
        }}
        onMouseEnter={(_) => setHovered(true)}
        onMouseLeave={(_) => setHovered(false)}
        className={
          "cursor-pointer flex items-center  dark:hover:bg-slate-600 px-2 p-[2px] rounded-lg text-slate-700 justify-between min-h-[20px]d ring-1d " +
          isSelected(
            " bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-600",
            "hover:bg-slate-50"
          ) +
          (changedName && " popy")
        }
      >
        <BiBookAlt className="mr-1 text-indigo-600" />
        <small title={data?.name} className="flex-1 py-1 whitespace-nowrap">
          {_charLimits(data?.name, 20)}
        </small>
        <TopicOptions
          hovered={hovered}
          setRenaming={setRenaming}
          setIsDeleting={setIsDeleting}
          data={data}
        />
      </div>

      <TopicRenamer data={data} open={renaming} setOpen={setRenaming} />

      <TopicDeleter
        data={data}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
    </div>
    // </Link>
  );
}
