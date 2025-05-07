export type Category = {
  title: string;
  id: string;
};

export type Place = {
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  category: Category;
  rating: number;
  tags: string[];
};

export type Tag = {
  id: string;
  text: string;
};

export type AutoSearchResults = {
  title: string;
  address: string | null;
  category: { title: string; id: string };
  distance: number | null;
};
