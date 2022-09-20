import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  templateApiDeleteTemplate,
  templateApiUpdateTemplate,
} from "./templateApi";
import { TemplateType } from "./templateType";

export default function useTemplateMutation() {
  const client = useQueryClient();
  const deleteTemplate = useMutation(templateApiDeleteTemplate, {
    onSuccess: (deletedTemplate) => {
      client.setQueryData(["templates"], (templates) => {
        return templates.filter((tem) => tem?.id !== deletedTemplate?.id);
      });
    },
  });

  const updateTemplate = useMutation(templateApiUpdateTemplate, {
    onSuccess: (updatedTemplate) => {
      client.setQueryData(["templates"], (templates) => {
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
    updateTemplate: updateTemplate.mutate,
    deleteTemplate: deleteTemplate.mutate,
  };
}
