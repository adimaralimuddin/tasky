import React from "react";
import useCardsByIds from "../../features/card/useCardsByIds";
import _useLevelValues_ from "../../lib/utils/_useLevelValues_";
import Modal from "../elements/Modal";
import CardItem from "../work/card/cardItem/CardItem";
import { SelectedGraphItem } from "./DashBoardGraph";

interface Props {
  open: boolean;
  setOpen: any;
  selected: SelectedGraphItem;
}

function DashboardGraphLists({ open, setOpen, selected }: Props) {
  const { data: cards } = useCardsByIds(selected?.cards);
  console.log(`data  - `, cards);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        className="h-full max-h-[90vh] card max-w-5xl "
      >
        {() => (
          <div className=" ">
            <div>
              <h2 className="text-accent">
                {_useLevelValues_(selected?.level)}
              </h2>
            </div>

            <div>
              {cards?.map((card) => (
                <CardItem card={card} key={card?.id} />
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default DashboardGraphLists;
