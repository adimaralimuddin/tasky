import { useMutation } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import React from "react";
import { DBURL } from "../../../lib/public";
import { FieldType } from "../../card/CardType";

function useFieldAdder() {
  const fieldAdder = useMutation(fieldApiAddField);

  const addField = (fieldPayload: FieldType) => {
    console.log(`payload`, fieldPayload);

    fieldAdder.mutate(fieldPayload);
  };
  return { ...fieldAdder, addField };
}

export default useFieldAdder;

export const fieldApiAddField = async (args: FieldType) => {
  const q = gql`
    mutation CreateFieldFront(
      $ind: Int!
      $viewId: String!
      $value: String!
      $type: String!
      $text: String!
      $frontId: String
      $backId: String
      $id: String!
    ) {
      addField(
        ind: $ind
        viewId: $viewId
        value: $value
        type: $type
        text: $text
        frontId: $frontId
        backId: $backId
        id: $id
      ) {
        backId
        frontId
        id
        ind
        text
        type
        value
        viewId
      }
    }
  `;

  const res = await request(DBURL, q, args);
  return res.addField;
};
