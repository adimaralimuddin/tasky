import request, { gql } from "graphql-request";
import { fileUploader } from "../../lib/db";
export const CardUrl = "/api/graphql";

type Field = {
  name: string;
  type: string;
  value: any;
};

export async function fieldsSolve(fields: Field[]) {
  const client = fileUploader();
  return Promise.all(
    fields?.map(async (f) => {
      if (f.type === "audio" || f.type == "image") {
        if (!f?.value) return { ...f, value: "" };
        const x = await client.upload(f.value);
        return { ...f, value: x.url };
      }
      return f;
    })
  );
}

// export async function cardApiSetCardLevel({
//   cardId,
//   level,
// }: {
//   cardId: string;
//   level: string;
// }) {
//   const q = gql`
//     mutation SetCardLevel($cardId: String!, $level: String) {
//       setCardLevel(cardId: $cardId, level: $level) {
//         id
//         level
//       }
//     }
//   `;
//   const ret = await request(CardUrl, q, { cardId, level });
//   return ret.setCardLevel;
// }
