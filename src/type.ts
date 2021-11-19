export type RadioData = {
  name: string;
  updated: Date;
  episodes: Episode[];
};

export type Episode = {
  title: string;
  number: number;
  path: string;
};

export type ListItem = {
  id: string,
  name: string;
  tag: string;
  onAir: boolean;
};
