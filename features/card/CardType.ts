export type CardTypes = {
  id: string;
  name: string;
  description?: string;
  level?: string;
  category?: string;
  fronts?: FieldType[];
  backs?: FieldType[];
  ind?: number;
  correct?: boolean;
};

export type FieldType = {
  id?: string;
  text: string;
  type: string;
  value?: string;
  newValue?: string;
  view?: boolean;
  backId?: string | undefined | null;
  frontId?: string | undefined | null;
  ind: number;
};
