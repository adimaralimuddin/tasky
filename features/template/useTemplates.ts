import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "@tanstack/react-query";
import { TemplatesProps } from "../../components/template/TemplatePage";
import { templateFields } from "../app/appSlice";
import { templateApiSampleTemplate, templateApiTemplates } from "./templateApi";

export default function useTemplates() {
  const { user } = useUser();
  const userId = user?.sub;
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
    myTemplatesData: myTemplates?.data,
    sampleTemplatesData: sampleTemplates?.data,
    myTemplates,
    sampleTemplates,
    templatesParsed,
    sampleTemplatesParsed,
    myTemplatesParsed,
  };
}
