import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import useField from "../field/useField";
import useTopicGetter from "../topic/useTopicGetter";
import { CardTypes } from "./CardType";

interface Props {
  card: CardTypes;
  setOpen: any;
  onUpdated: any;
}
function useCardUpdater({ card, setOpen, onUpdated }: Props) {
  const [fronts, setFronts] = useState(card?.fronts);
  const [backs, setBacks] = useState(card?.backs);
  const [isUpdating, setIsUpdating] = useState(false);

  const { query } = useRouter();
  const { updateFields } = useField();

  const client = useQueryClient();

  const topicId = useTopicGetter().getSelectedTopicId();

  const onUpdateQueryState = (updatedCard: CardTypes) => {
    if (!updatedCard) return console.error(`err: no updatedCard`, updatedCard);
    if (!topicId) return console.error(`err: no topic id`, topicId);

    const queryStateCard = { ...updatedCard };
    queryStateCard.fronts = updatedCard?.fronts?.map((f) => ({
      ...f,
      value: f.newValue,
    }));
    queryStateCard.backs = updatedCard?.backs?.map((f) => ({
      ...f,
      value: f.newValue,
    }));

    client.setQueryData(
      ["cards", topicId],
      (prevCards: CardTypes[] | undefined) => {
        if (!prevCards?.length) return [queryStateCard];

        let x = prevCards.map((c) =>
          c.id === queryStateCard.id ? queryStateCard : c
        );
        console.log(`done`, x);
        return x;
      }
    );
  };

  const onUpdateHandler = async () => {
    if (card?.sample) {
      return alert(
        "sample card will not be edited. you can always add, edit and delete your own card instead."
      );
    }
    // setIsUpdating(true);
    const data: any = {
      fronts,
      backs,
      topicId: topicId,
      cardId: card?.id,
    };

    // console.log(`cards to update`, card);
    console.log(`updated data`, data);
    onUpdateQueryState({ ...card, ...data });

    // onUpdated?.(data);
    setOpen(false);
    setIsUpdating(false);
    const ret = await updateFields(data);
    console.log(`ret`, ret);

    onUpdated?.(ret);
  };

  return {
    // work,
    query,
    fronts,
    backs,
    topicId,
    isUpdating,
    setFronts,
    setBacks,
    setIsUpdating,
    onUpdateHandler,
  };
}

export default useCardUpdater;
