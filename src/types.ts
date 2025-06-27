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

export type ReleatedSearchPlace = RelatedSearchWord & {
  isAdded: boolean;
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

export type LatLngType = {
  lat: number;
  lng: number;
};

export type MarkerInfoType = {
  id: number;
  category: string;
  latitude: number;
  longitude: number;
};

export type SollectPhotoType = {
  sollectId: number;
  title: string;
  thumbnailImage: string;
  district:string;
  neighborhood:string;
  isMarked:boolean;
  placeName:string;
};

export type Paragraph = {
  seq: number;
  type: 'TEXT' | 'IMAGE';
  // content: 등록용   text: 조회용
  content?: string;  // IMAGE일 경우 file name을 저장
  text?:string;      // 쏠렉트 등록에서는 content인데, 쏠렉트 조회에서는 text라 optional로 필드 추가
  file?: File; // 이미지 파일을 저장할 수 있는 속성 추가
  imageUrl?: string; // 이미지 URL을 저장할 수 있는 속성 추가
};


export type placeSummary = {
  name:string;
  category:string;
  tags:string[];
  isMarked?:boolean;
  rating:number;
}