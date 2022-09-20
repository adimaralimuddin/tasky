import request, { gql } from "graphql-request";
const url = "/api/graphql";

export async function fieldApiUpdateField({
  id,
  newValue,
  val,
}: {
  id: string;
  newValue?: string;
  val?: string;
}) {
  const q = gql`
    mutation UpdateField($val: String!, $newValue: String!, $id: String!) {
      updateField(val: $val, newValue: $newValue, id: $id) {
        value
        frontId
        backId
        type
        id
        text
      }
    }
  `;
  const ret = await request(url, q, { id, newValue, val });
  return ret?.updateField;
}
