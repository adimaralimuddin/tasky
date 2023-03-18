import React, { useEffect, useState } from "react";
import { BiBookAlt } from "react-icons/bi";
import useFolderSetter from "../../../../features/app/folders/useFolderSetter";
import { CardTypes } from "../../../../features/card/CardType";
import { TopicType } from "../../../../features/topic/topicType";
import useTopicSelecter from "../../../../features/topic/useTopicSelecter";

import _charLimits from "../../../../lib/utils/_charLimits";
import TopicDeleter from "../topicEditor/TopicDeleter";
import TopicRenamer from "../topicEditor/TopicRenamer";
import TopicOptions from "./TopicOptions";

type props = {
  data: TopicType & { cards?: CardTypes[] };
  selectFolder: any;
};

export default function TopicItem({ data }: props) {
  const [hovered, setHovered] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [changedName, setChangedName] = useState(false);

  const { selectTopic, isTopicSelected } = useTopicSelecter();
  const { selectFolder } = useFolderSetter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setChangedName(true);
    }
  }, [data?.name]);

  const onSelectTopic = () => {
    selectFolder(data.folderId);
    selectTopic(data);
  };

  return (
    <div
      className="flex flex-col relative "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        onClick={onSelectTopic}
        onAnimationEnd={(e) => {
          const div = e.target as HTMLDivElement;
          if (div.classList.contains("popy")) setChangedName(false);
        }}
        className={
          "cursor-pointer flex items-center   dark:hover:bg-layer-100 px-2 p-[2px] rounded-lg text-slate-700 justify-between min-h-[20px]d ring-1d hover:bg-slate-50 active:scale-[1.03] " +
          isTopicSelected(
            data?.id,
            " bg-indigo-100 hover:bg-indigo-200 dark:bg-primary-dark dark:hover:bg-violet-500 ",
            "hover:bg-slate-50"
          ) +
          (changedName && " popy")
        }
      >
        <BiBookAlt className="mr-1 text-indigo-600 dark:text-violet-300" />
        <small
          title={data?.name}
          className={
            "flex-1 py-1 whitespace-nowrap  " +
            isTopicSelected(data?.id, " dark:text-slate-200", "text-phar")
          }
        >
          {_charLimits(data?.name, 20)}
        </small>
      </div>
      <TopicOptions
        hovered={hovered}
        setRenaming={setRenaming}
        setIsDeleting={setIsDeleting}
        data={data}
      />

      <TopicRenamer data={data} open={renaming} setOpen={setRenaming} />

      <TopicDeleter
        data={data}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
    </div>
  );
}
