import { useQuery } from "@tanstack/react-query";
import { templateFields } from "../app/appSlice";
import { templateApiSampleTemplate, templateApiTemplates } from "./templateApi";

export default function useTemplates(userId?: string | null) {
  const myTemplates = useQuery(["templates", userId], () =>
    templateApiTemplates({ userId })
  );

  const sampleTemplates = useQuery(
    ["sampleTemplates"],
    templateApiSampleTemplate
  );

  const sampleTemplatesParsed = () => {
    return sampleTemplates?.data?.map((temp) => templateFields(temp));
  };
  const myTemplatesParsed = () => {
    return myTemplates?.data?.map((temp) => templateFields(temp));
  };

  const templatesParsed = () => {
    const rawTemplates = sampleTemplates?.data?.concat(myTemplates?.data || []);
    return rawTemplates?.map((temp) => templateFields(temp));
  };
  return {
    myTemplates,
    sampleTemplates,
    templatesParsed,
    sampleTemplatesParsed,
    myTemplatesParsed,
  };
}
