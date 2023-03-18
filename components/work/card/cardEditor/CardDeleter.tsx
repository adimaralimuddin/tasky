import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import useCardDeleter from "../../../../features/card/useCardDeleter";
import Verifier from "../../../elements/Verifier";

interface Props {
  isDeleting: boolean;
  setIsDeleting: any;
  topicId: string | undefined;
  userId: string | undefined;
  cardId: string;
  editorMode: boolean;
}
function CardDeleter({
  isDeleting,
  setIsDeleting,
  topicId,
  userId,
  cardId,
  editorMode,
}: Props) {
  const { deleteCard } = useCardDeleter(topicId);

  if (!topicId) return null;

  if (editorMode) {
    return (
      <AiOutlineDelete
        className="text-3xl cursor-pointer bg-slate-200 dark:bg-slate-500 p-1 rounded-lg hover:scale-[1.05] transition duratio hover:shadow-lg"
        onClick={() => deleteCard({ userId, cardId })}
      />
    );
  }

  return (
    <Verifier
      message="are you sure to delete this Card?"
      open={isDeleting}
      setOpen={setIsDeleting}
      onOkay={() => deleteCard({ userId, cardId })}
    />
  );
}

export default CardDeleter;
