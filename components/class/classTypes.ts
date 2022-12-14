export type ClassType = {
  id: string;
  name?: string;
  description?: string;
  userId?: String;
  sample?: boolean;
};

export type ClassCreateType = {
  name?: string;
  description?: string;
  userId?: string;
  sample?: boolean;
};
