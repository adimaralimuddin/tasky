import { useQuery } from "@tanstack/react-query";
import { templateApiSampleTemplate, templateApiTemplates } from "./templateApi";

export default function useTemplates(userId?: string | null) {
  const templates = useQuery(["templates", userId], () =>
    templateApiTemplates({ userId })
  );

  const sampleTemplates = useQuery(
    ["sampleTemplates"],
    templateApiSampleTemplate
  );
  return { templates, sampleTemplates };
}
