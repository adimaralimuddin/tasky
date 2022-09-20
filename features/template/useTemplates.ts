import { useQuery } from "@tanstack/react-query";
import { templateApiTemplates } from "./templateApi";

export default function useTemplates(userId: string) {
  const templates = useQuery(["templates", userId], () =>
    templateApiTemplates({ userId })
  );
  return { templates };
}
