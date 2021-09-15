export type RadioData = {
  id: string;
  name: string;
  tag: string;
  items: RadioItem[];
};

export type RadioItem = {
  title: string;
  num: number;
  url: string;
};
