import React, { useEffect, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import useFieldsGetter from "../../../../features/app/fields/useFieldsGetter";
import { CardTypes, FieldType } from "../../../../features/card/CardType";
import useCardUpdater from "../../../../features/card/useCardUpdater";
import { ImageIcon, Mp3, RefreshIcon } from "../../../../lib/icons";
import _charLimits from "../../../../lib/utils/_charLimits";
import Box from "../../../elements/Box";
import BtnSec from "../../../elements/BtnSec";
import BtnWarm from "../../../elements/BtnWarm";
import ImageItem from "../../../elements/ImageItem";
import Input from "../../../elements/Input";
import Modal from "../../../elements/Modal";
import CardSidesEditor from "./CardSidesEditor";

type props = {
  card: CardTypes;
  onCancel: any;
  open: boolean;
  editorMode: boolean;
  setOpen: any;
};

export default function CardEditor({
  open,
  card,
  onCancel,
  setOpen,
  editorMode,
}: props) {
  const [fronts, setFronts] = useState(card?.fronts);
  const [backs, setBacks] = useState(card?.backs);

  useEffect(() => {
    if (!fronts?.length || !backs?.length) {
      setFronts(card?.fronts);
      setBacks(card?.backs);
    }
  }, [card]);

  const { updateCard, isUpdating } = useCardUpdater({
    card,
    setOpen,
  });

  const onUpdateHandler = () => {
    updateCard(fronts, backs);
  };

  const views = useFieldsGetter().getFields();

  if (editorMode && !open) {
    return (
      <MdOutlineModeEditOutline
        className="text-3xl cursor-pointer bg-slate-200 dark:bg-slate-500 p-1 rounded-lg hover:scale-[1.05] transition duratio hover:shadow-lg"
        onClick={() => setOpen((p: boolean) => !p)}
      />
    );
  }
  if (!open) return null;

  return (
    <div>
      <Modal
        className="max-w-[58rem] max-h-[90vh] "
        open={open && !isUpdating}
        setOpen={setOpen}
      >
        {(closePop) => (
          <div className="flex-1 flex flex-col  overflow-auto ">
            <h3 className="px-2 text-prime">Editing card</h3>
            <div className="flex  px-2 text-accent">
              <h3 className="flex-1">Fronts</h3>
              <h3 className="flex-1">backs</h3>
            </div>
            <div className="p-2 flex flex-1 overflow-y-auto flex-wrap gap-3">
              <CardSidesEditor
                side="front"
                views={views?.fronts}
                fields={card.fronts}
                setter={setFronts}
                card={card}
              />
              <CardSidesEditor
                side="back"
                views={views?.backs}
                fields={card.backs}
                setter={setBacks}
                card={card}
              />
            </div>
            <div className="flex items-center justify-between px-2 p-1">
              <button
                className="btn-prime"
                onClick={() => {
                  closePop(() => {
                    onUpdateHandler();
                  });
                }}
              >
                save card
              </button>
              <button
                className="btn-sec"
                onClick={() => {
                  closePop(() => {
                    onCancel();
                  });
                }}
              >
                cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
