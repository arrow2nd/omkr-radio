export type RadioData = {
  name: string;
  tag: string;
  items: RadioItem[];
};

export type RadioItem = {
  title: string;
  num: number;
  url: string;
};

export type ListItem = {
  name: string;
  onAir: boolean;
};
