import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileUploader } from "../../lib/db";
import { CardTypes, FieldType } from "../card/CardType";
import { fieldApiUpdateField } from "./fieldApi";

export default function useField() {
  const client = useQueryClient();
  const updateField = useMutation(fieldApiUpdateField);

  const updateSide = async (fields: FieldType[]) => {
    const client = fileUploader();
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
    const fronts = await updateSide(f);
    const backs = await updateSide(b);
    await client.setQueryData(["cards", topicId], (cards: any) => {
      const n = cards?.map((card: CardTypes) => {
        if (card?.id == cardId) {
          card.fronts = fronts;
          card.backs = backs;
        }
        return card;
      });
      return n;
    });

    return { fronts, backs };
  };

  return {
    updateFields,
    updateField: updateField.mutate,
  };
}
