import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDb } from "../../lib/db";
import { FieldType } from "../card/CardType";
import { fieldApiUpdateField } from "./fieldApi";

export default function useField() {
  const client = useQueryClient();
  const updateField = useMutation(fieldApiUpdateField, {
    onSuccess: (data) => {
      console.log("updated ", data);
    },
  });

  const updateSide = async (fields: FieldType[]) => {
    const client = useDb();
    return await Promise.all(
      fields?.map(async (f) => {
        if (f.newValue && f?.id) {
          const args = {
            newValue: f?.newValue,
            val: f?.value,
            id: f.id,
          };

          if (f?.type == "text" || f?.type == "number") {
            const res = await fieldApiUpdateField(args);
            return res;
          } else if (f?.type == "image" || f?.type == "audio") {
            const { url } = await client.upload(f.newValue);
            args.newValue = url;
            const res = await fieldApiUpdateField(args);
            return res;
          }
        }
        return f;
      })
    );
  };

  const updateFields = async ({
    fronts: f,
    backs: b,
    cardId,
    topicId,
  }: {
    fronts: FieldType[];
    backs: FieldType[];
    cardId: string;
    topicId: string;
  }) => {
    console.log("pre ", { f, b, cardId, topicId });
    // console.log({ cardId, topicId });
    const fronts = await updateSide(f);
    const backs = await updateSide(b);
    await client.setQueryData(["cards", topicId], (cards) => {
      //   console.log("cards ", cards);
      const n = cards?.map((card) => {
        if (card?.id == cardId) {
          console.log("yes ", { card, fronts, backs });
          card.fronts = fronts;
          card.backs = backs;
        }
        return card;
      });
      return n;
    });

    return { fronts, backs };
    // console.log({ f, b });
  };

  return {
    updateFields,
    updateField: updateField.mutate,
  };
}
