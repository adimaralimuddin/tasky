import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { templateApiCreate, templateApiTemplate } from "./templateApi";

export default function useTemplate(id?: string, userId?: string | any) {
  const client = useQueryClient();

  const templateAdder = useMutation(templateApiCreate, {
    onSuccess: (newTemplate) => {
      console.log(`done tempalte created`, newTemplate);

      client.setQueryData(["templates", userId], (templates: any) => {
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
    templateAdder,
    createTemplate: templateAdder.mutate,
  };
}
