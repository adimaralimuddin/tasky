import { TemplateType } from "../template/templateType";

export type TopicType = {
  id: string;
  name: string;
  description?: string;
  templateId: string;
  folderId: string;
  userId: string;
  template?: TemplateType;
};
