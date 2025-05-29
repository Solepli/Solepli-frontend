export type Category = {
  title: string;
  id: string;
};

export type Place = {
  id: number;
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

export type RelatedSearchWord = {
  address: string | null;
  category: string | null;
  distance: {
    unit: string;
    value: number;
  };
  id: number | null;
  name: string;
  type: 'DISTRICT' | 'PLACE';
};

export type Emoji = 'good' | 'bad' | null;

export type ReviewType = {
  id: number;
  username: string;
  profileImage: string;
  date: string;
  rating: number;
  emoji: Emoji;
  content: string;
  images: string[];
  tags: TagType[];
};

export type CurrentLatLng = {
  swY: number;
  swX: number;
  neY: number;
  neX: number;
};

export type MarkersInfoType = {
  id: number;
  category: string;
  latitude: number;
  longitude: number;
};

export type SollectPhotoType = {
  id: number;
  title: string;
  placeTitle?: string;
  address: string;
  imageUrl: string;
};
