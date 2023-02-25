import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { DBURL } from "../../lib/public";
import { TemplateType } from "./templateType";

export default function useTemplateUpdater(userId?: any) {
  const client = useQueryClient();

  const templateUpdater = useMutation(templateApiUpdateTemplate, {
    onSuccess: (updatedTemplate) => {
      client.setQueryData(["templates", userId], (templates: any) => {
        return templates?.map((tem: TemplateType) => {
          if (tem.id == updatedTemplate.id) {
            return { ...tem, ...updatedTemplate };
          }
          return tem;
        });
      });
    },
  });

  return {
    ...templateUpdater,
    updateTemplate: templateUpdater.mutate,
  };
}

export async function templateApiUpdateTemplate({
  id,
  userId,
  name,
  fronts,
  backs,
}: {
  id: string;
  userId: string;
  name: string;
  fronts: any[];
  backs: any[];
}) {
  const q = gql`
    mutation UpdateTemplate(
      $id: String!
      $userId: String!
      $name: String!
      $fronts: [FieldListInputType]
      $backs: [FieldListInputType]
    ) {
      updateTemplate(
        id: $id
        userId: $userId
        name: $name
        fronts: $fronts
        backs: $backs
      ) {
        id
        name
        userId
        fronts
        backs
      }
    }
  `;

  const ret = await request(DBURL, q, { id, userId, name, fronts, backs });
  return ret.updateTemplate;
}
