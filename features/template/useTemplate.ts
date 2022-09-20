import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { templateApiCreate, templateApiTemplate } from "./templateApi";

export default function useTemplate(id?: string) {
  const client = useQueryClient();

  const createTemplate = useMutation(templateApiCreate, {
    onSuccess: (newTemplate) => {
      client.setQueryData(["templates"], (templates: any) => {
        return [...templates, newTemplate];
      });
    },
  });

  const template = useQuery(
    ["tempalte", id],
    async () => await templateApiTemplate(id)
  );

  return {
    template,
    createTemplate: createTemplate.mutate,
  };
}
