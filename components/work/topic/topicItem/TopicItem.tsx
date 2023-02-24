import React, { useEffect, useState } from "react";
import { BiBookAlt } from "react-icons/bi";
import { CardTypes } from "../../../../features/card/CardType";
import { TemplateType } from "../../../../features/template/templateType";
import { TopicType } from "../../../../features/topic/topicType";
import useTopicSelecter from "../../../../features/topic/useTopicSelecter";

import _charLimits from "../../../../lib/utils/_charLimits";
import TopicDeleter from "../topicEditor/TopicDeleter";
import TopicRenamer from "../topicEditor/TopicRenamer";
import TopicOptions from "./TopicOptions";

type props = {
  data: TopicType & { cards?: CardTypes[] };
  serverData:
    | (TopicType & { cards?: CardTypes[] } & { Template?: TemplateType[] })
    | undefined;
  key?: any;
  selectFolder: any;
};

export default function TopicItem({ data, selectFolder, serverData }: props) {
  const [hovered, setHovered] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [changedName, setChangedName] = useState(false);

  const { selectTopic, isTopicSelected } = useTopicSelecter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setChangedName(true);
    }
  }, [data?.name]);

  const onSelectTopic = () => {
    console.log(`select topic: `, data);
    selectFolder(true);
    selectTopic(data);
  };

  return (
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
          isTopicSelected(
            data?.id,
            " bg-indigo-50 hover:bg-indigo-100 dark:bg-violet-400 dark:hover:bg-violet-500 ",
            "hover:bg-slate-50"
          ) +
          (changedName && " popy")
        }
      >
        <BiBookAlt className="mr-1 text-indigo-600 dark:text-violet-400" />
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
  );
}
