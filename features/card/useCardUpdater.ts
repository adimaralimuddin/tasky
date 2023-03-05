import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import _fileReader from "../../lib/utils/_fileReader";
import useField from "../field/useField";
import useTopicGetter from "../topic/useTopicGetter";
import { CardTypes, FieldType } from "./CardType";

interface Props {
  card: CardTypes;
  setOpen: any;
}
function useCardUpdater({ card, setOpen }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const { query } = useRouter();
  const { updateFields } = useField();

  const client = useQueryClient();

  const topicId = useTopicGetter().getSelectedTopicId();

  const onUpdateQueryState = async (updatedCard: CardTypes) => {
    if (!updatedCard) return console.error(`err: no updatedCard`, updatedCard);
    if (!topicId) return console.error(`err: no topic id`, topicId);

    const resolveFields = async (f: FieldType) => {
      let value: any = f.newValue;
      if (typeof f.newValue === "object") {
        const result = await _fileReader(f.newValue as File);
        console.log(`file here `, result);

        value = result;
      }

      if (!f.newValue) {
        value = f.value;
      }
      return { ...f, value };
    };
    if (!updatedCard?.fronts?.length && !updatedCard?.backs?.length) {
      console.log(`no fronts and backs`, updatedCard);
    } else {
      const queryStateCard = { ...updatedCard };
      console.log(`proced to updated`, queryStateCard);

      queryStateCard.fronts = await Promise.all(
        updatedCard?.fronts?.map(async (f) => await resolveFields(f))
      );

      queryStateCard.backs = await Promise.all(
        updatedCard?.backs?.map(async (f) => await resolveFields(f))
      );

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
    }
  };

  const updateCard = async (fronts: FieldType[], backs: FieldType[]) => {
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

    console.log(`updated data`, data);
    onUpdateQueryState({ ...card, ...data });

    setOpen(false);
    setIsUpdating(false);
    const ret = await updateFields(data);
    // console.log(`ret`, ret);

    // onUpdated?.(ret);
  };

  return {
    // work,
    query,
    // fronts,
    // backs,
    topicId,
    isUpdating,
    // setFronts,
    // setBacks,
    setIsUpdating,
    updateCard,
  };
}

export default useCardUpdater;
