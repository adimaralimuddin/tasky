import React from "react";
import { useCardMutation } from "../../../../features/card/useCardMutation";
import Verifier from "../../../elements/Verifier";

interface Props {
  isDeleting: boolean;
  setIsDeleting: any;
  topicId: string | undefined;
  userId: string;
  cardId: string;
}
function CardDeleter({
  isDeleting,
  setIsDeleting,
  topicId,
  userId,
  cardId,
}: Props) {
  const { deleteCard, cardDeleter } = useCardMutation(topicId);

  if (!topicId) return null;

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
