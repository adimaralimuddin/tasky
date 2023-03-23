import { CardTypes } from "../card/CardType";
import { TemplateType } from "../template/templateType";

export type TopicType = {
  id: string;
  name: string;
  description?: string;
  templateId: string;
  folderId: string;
  userId: string | undefined;
  template?: TemplateType;
  Template?: TemplateType;
  sample?: boolean | string;
  cards?: CardTypes[];
};
