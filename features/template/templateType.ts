import { FieldType } from "../card/CardType";

export type TemplateType = {
  id?: string;
  name: string;
  userId: string;
  fronts: FieldType[] | string;
  backs: FieldType[] | string;
  noVal?: boolean;
};
