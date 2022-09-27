import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  templateApiDeleteTemplate,
  templateApiUpdateTemplate,
} from "./templateApi";
import { TemplateType } from "./templateType";

export default function useTemplateMutation(userId?: any) {
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

  const templateUpdater = useMutation(templateApiUpdateTemplate, {
    onSuccess: (updatedTemplate) => {
      client.setQueryData(["templates", userId], (templates: any) => {
        return templates?.map((tem: TemplateType) => {
          if (tem.id == updatedTemplate.id) {
            return updatedTemplate;
          }
          return tem;
        });
      });
    },
  });

  return {
    templateUpdater,
    templateDeleter,
    updateTemplate: templateUpdater.mutate,
    deleteTemplate: templateDeleter.mutate,
  };
}
