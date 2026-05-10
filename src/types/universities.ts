export type Section =
  | { title: string; type: "text"; value: string }
  | { title: string; type: "list"; value: string[] }
  | {
      title: string;
      type: "regions";
      value: { states: string; requirement: string }[];
    };

export type University = {
  id: string;
  enabled: boolean;
  name: string;
  image: string;
  sections: Section[];
};