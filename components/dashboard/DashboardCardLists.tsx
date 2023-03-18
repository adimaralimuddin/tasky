import dynamic from "next/dynamic";
import React, { useState } from "react";
import { CategoryType, LevelType } from "../../features/app/appSlice";
import useCardsByFields from "../../features/card/useCardsByFields";
import useServerState from "../../features/dateState/useServerState";
import Modal from "../elements/Modal";
import CardItem from "../work/card/cardItem/CardItem";

const PlayDashboardCardsPage = dynamic(
  () => import("../play/playOptions/PlayDashboardCardsPage")
);

interface DrilledProps {
  field: "level" | "category";
  value: CategoryType | LevelType;
}

interface Props {
  total: number;
  text: string;
  open: boolean;
  setOpen: any;
}
function DashboardCardLists({
  field = "level",
  value = "hard",
  total = 0,
  text,
  open,
  setOpen,
}: Props & DrilledProps) {
  const classId = useServerState()?.class_?.id;
  const [totalOriginal, setTotalOriginal] = useState(total);

  const { data: cards } = useCardsByFields({ classId, field, value });
  const [playing, setPlaying] = useState(false);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="flex-1 col_ gap-0 p-0 max-h-[95vh] max-w-6xl h-screen w-screen"
    >
      {() => (
        <div className="flex-1 col_ gap-0 ">
          <div className="animate-fadein">
            <div className="flex_  flex-wrap px-6 pt-3 ">
              <div className="flex_ flex-1">
                <h3 className="text-prime font-medium first-letter:uppercase">
                  {text}
                </h3>
                <h3 className="text-accent whitespace-nowrap">
                  {total !== totalOriginal && "previously "} {totalOriginal}{" "}
                  cards
                </h3>
                {total !== totalOriginal && (
                  <h3 className="text-accent whitespace-nowrap">
                    , currently {total} cards
                  </h3>
                )}
                {playing && <p className="text-phar">/</p>}
                {playing && <h3 className="text-value">play</h3>}
                {!playing && (
                  <button
                    className="btn-prime mr-8"
                    onClick={() => setPlaying(true)}
                  >
                    play
                  </button>
                )}
              </div>
              {playing && (
                <button
                  className="btn-sec mr-8"
                  onClick={() => setPlaying(false)}
                >
                  back
                </button>
              )}
            </div>
            {!playing && (
              <div className="flex-1 overflow-y-auto px-6 pl-10 max-h-[80vh] ">
                {cards?.map((card, ind) => (
                  <CardItem
                    card={card}
                    allowOption={false}
                    showAllFields={true}
                    index={true}
                    listInd={ind}
                    key={card.id}
                  />
                ))}
              </div>
            )}
          </div>

          {playing && (
            <PlayDashboardCardsPage
              cards={cards || []}
              setPlaying={setPlaying}
            />
          )}
        </div>
      )}
    </Modal>
  );
}

export default DashboardCardLists;
