export type Category = {
  title: string;
  id: string;
};

// export type Place = {
//   id: number;
//   name: string;
//   closingTime:string;
//   isOpen:boolean;
//   category?:string;
//   address?: string;
//   isSoloRecommended:number;
//   latitude: number;
//   longitude: number;
//   detailedCategory: string;
//   rating: number;
//   tags?: string[]; // TagType 제거
//   thumbnailUrls: string[];
//   openingHours?:Hours[];
//   mood?:TagType[];
//   solo?:TagType[];
//   markedCount:number;
// };

type BasePlace = {
  id: number;
  name: string;
  closingTime: string;
  isOpen: boolean;
  detailedCategory: string;
  isSoloRecommended: number;
  rating: number;
};

export type DetailPlace = BasePlace & {
  tags: {
    mood: TagType[];
    solo: TagType[];
  };
  markedCount: number;
  openingHours: Hours[];
  latitude: number;
  longitude: number;
  category: string;
  address: string;
  thumbnailUrl: string[];

  // 디테일에서 쏠마크 되었는지 확인. 나중에 백엔드에서 받아옴
  isMarked: boolean;
};

export type PreviewPlace = BasePlace & {
  tags: string[];
  thumbnailUrls: string[];
};

type Hours = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

export type TagType = {
  tagName: string;
  tagTotal: number;
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

export type PlaceInfo = {
  id: number;
  name: string;
  detailedCategory: string;
  address: string;
  category: string;
  latitude: number;
  longitude: number;
};

export type SelectablePlace = PlaceInfo & {
  isSelected: boolean;
};

export type SolroutePlacePreview = PlaceInfo & {
  seq: number;
  memo: string;
};

export type SolroutePreviewSummary = PlaceInfo & {
  recommendationPercent: number;
  tags: string[];
  rating: number;
};

export type Emoji = 'good' | 'bad' | null;

export type ReviewType = {
  userProfileUrl: string;
  userNickname: string;
  createdAt: string;
  isRecommended: boolean;
  rating: number;
  content: string;
  photoUrls: string[];
  tags: string[];
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
  district: string;
  neighborhood: string;
  isMarked: boolean;
  placeName: string;
};

export type Paragraph = {
  seq: number;
  type: 'TEXT' | 'IMAGE';
  // content: 등록용   text: 조회용
  content?: string; // IMAGE일 경우 file name을 저장
  text?: string; // 쏠렉트 등록에서는 content인데, 쏠렉트 조회에서는 text라 optional로 필드 추가
  file?: File; // 이미지 파일을 저장할 수 있는 속성 추가
  imageUrl?: string; // 이미지 URL을 저장할 수 있는 속성 추가
};

export type placeSummary = {
  id: number;
  name: string;
  detailedCategory: string;
  recommendationPercent: number;
  tags: string[];
  isMarked?: boolean;
  rating: number;
};

export type SolmarkPlaceList = {
  collectionName: string;
  collectionId: number;
  iconId: number;
  placeCount: number;
};

export type SolroutePreview = {
  id: number;
  iconId: number;
  name: string;
  placeCount: number;
  status: boolean;
};
