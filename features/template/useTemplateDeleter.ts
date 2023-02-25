import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { DBURL } from "../../lib/public";
import { TemplateType } from "./templateType";

function useTemplateDeleter(userId?: string) {
  const client = useQueryClient();

  const templateDeleter = useMutation(templateApiDeleteTemplate, {
    onSuccess: (deletedTemplate) => {
      client.setQueryData(["templates", userId], (templates: any) => {
        return templates.filter(
          (tem: TemplateType) => tem?.id !== deletedTemplate?.id
        );
      });
    },
  });
  return { ...templateDeleter, deleteTemplate: templateDeleter.mutate };
}

export default useTemplateDeleter;

export async function templateApiDeleteTemplate(templateId?: string) {
  const q = gql`
    mutation DeleteTemplate($templateId: String!) {
      deleteTemplate(templateId: $templateId) {
        id
        name
        userId
        fronts
        backs
      }
    }
  `;
  const ret = await request(DBURL, q, { templateId });
  return ret?.deleteTemplate;
}
