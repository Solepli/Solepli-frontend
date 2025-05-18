export type Category = {
  title: string;
  id: string;
};

export type Place = {
  id:number;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  category: Category;
  rating: number;
  tags: TagType[];
  hours: Hours[];
};

type Hours = {
  day: number;
  startTime: string;
  endTime: string;
};


export type TagType = {
  id: string;
  text: string;
};

export type AutoSearchResults = {
  title: string;
  address: string | null;
  category: { title: string; id: string };
  distance: number | null;
};

export type ReviewType = {
  id: number;
  username: string;
  profileImage: string;
  date: string;
  rating: number;
  emoji: 'good' | 'bad';
  content: string;
  images: string[];
  tags: TagType[];
}