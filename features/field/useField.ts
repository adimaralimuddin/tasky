import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileUploader } from "../../lib/db";
import { fieldApiAddField } from "../app/fields/useFieldAdder";
import { CardTypes, FieldType } from "../card/CardType";
import { fieldApiUpdateField } from "./fieldApi";

export default function useField() {
  const client = useQueryClient();
  const updateField = useMutation(fieldApiUpdateField);

  const updateSide = async (fields: FieldType[]) => {
    const client = fileUploader();
    return await Promise.all(
      fields?.map(async (f) => {
        if (f?.isNew) {
          // console.log(`new field is here `, f);

          delete f.isNew;
          if ((f.type === "text" || f.type === "number") && f?.value) {
            return await fieldApiAddField(f);
          } else if ((f.type === "image" || f.type === "audio") && f?.value) {
            const { url } = await client.upload(f.value);
            // console.log(`url here`, url);
            f.value = url;
            // console.log(`file updated `, f);

            return await fieldApiAddField(f);
          }
          return f;
        }

        if (f.newValue && f?.id) {
          const toUpdateField = {
            newValue: f?.newValue,
            val: f?.value,
            id: f.id,
          };

          if ((f?.type == "text" || f?.type == "number") && f?.newValue) {
            return await fieldApiUpdateField(toUpdateField);
          } else if (
            (f?.type == "image" || f?.type == "audio") &&
            f?.newValue
          ) {
            const { url } = await client.upload(f.newValue);
            toUpdateField.newValue = url;
            // console.log(`done file url `, toUpdateField);

            const ret = await fieldApiUpdateField(toUpdateField);
            // console.log(`ret of file url `, ret);
          }
        }
        // console.log(`just return f`, f);

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
    if (f?.length && b?.length) {
      const fronts = await updateSide(f);
      const backs = await updateSide(b);
      client.invalidateQueries(["cards", topicId]);

      return { fronts, backs };
    } else {
      console.log(`no fronts and backs `, { f, b });
    }
  };

  return {
    updateFields,
    updateField: updateField.mutate,
  };
}
