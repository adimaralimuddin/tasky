import React, { useState } from "react";
import { CardTypes } from "../../features/card/CardType";
import { RefreshIcon } from "../../lib/icons";
import Box from "../elements/Box";
import BtnBack from "../elements/BtnBack";
import BtnPrime from "../elements/BtnPrime";
import Modal from "../elements/Modal";
import CardItem from "../work/card/CardItem";

type props = {
  cards?: CardTypes[];
  finish: boolean;
  setFinish: any;
  playInd: number;
  setPlayInd: any;
};

export default function PlayFinish({ setFinish, cards, setPlayInd }: props) {
  const [selected, setSelected] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const filter = (filterType: string = "easy") =>
    cards?.filter((card) => card.level == filterType);

  const onRepeatHandler = () => {
    setPlayInd(0);
    setFinish(false);
  };

  const onItemSelect = (level: string) => {
    setOpen(true);
    setSelected(level);
  };

  return (
    <div>
      <Box css="flex flex-col min-h-[300px] justify-center">
        <div>
          <BtnBack />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-green-400 ">Finish!</h1>
          <p> cards: {cards?.length - 1}</p>
          <div className="p-2 ring-1 rounded-lg ring-slate-300 my-2 bg-slate-50">
            <Item level="easy" filter={filter} onSelect={onItemSelect} />
            <Item level="normal" filter={filter} onSelect={onItemSelect} />
            <Item level="hard" filter={filter} onSelect={onItemSelect} />
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <BtnPrime onClick={onRepeatHandler}>Repeat</BtnPrime>
        </div>
      </Box>
      <Modal open={open} setOpen={setOpen}>
        {(Icon: any) => (
          <div className=" w-full max-w-lg ">
            <Box css="p-1 px-2 overflow-hidden">
              <div className="flex items-center justify-between ">
                <p>{selected}</p>
                <button className="m-0 py-0" onClick={(_) => setOpen(false)}>
                  close
                </button>
              </div>
              {filter(selected)?.length == 0 && (
                <h1 className="text-slate-500 m-2 text-center min-h-[130px] rounded-xl bg-slate-100 ring-1 flex items-center justify-center ring-slate-200  ">
                  No Cards
                </h1>
              )}
              <div className="max-h-[90vh] overflow-auto">
                {filter(selected)?.map((card) => (
                  <CardItem card={card} key={card?.id} />
                ))}
              </div>
            </Box>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Item({
  level,
  filter,
  onSelect,
}: {
  level: string;
  filter: any;
  onSelect: any;
}) {
  const onSelectHandler = () => onSelect(level);

  const color = () =>
    level == "easy"
      ? " text-teal-400 "
      : level == "normal"
      ? " text-lime-400 "
      : " text-red-400 ";
  return (
    <div
      onClick={onSelectHandler}
      className="hover:bg-slate-100d hover:shadow-lg cursor-pointer p-[2px] px-3 rounded-lg flex gap-3 items-center justify-between hover:bg-white"
    >
      <p className={"text-lg " + color()}>
        {level} : {filter?.(level)?.length}
      </p>
      <RefreshIcon className="text-slate-500 text-xl" />
    </div>
  );
}
