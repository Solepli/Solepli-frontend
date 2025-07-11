import { RelatedSearchWord } from '../types';

/**
 * searchList에 '지역명'만 있으면 최상단 지역명 반환,
 * searchList에 '지역명+장소명' or '장소명' 있으면 장소 id 리스트 반환
 */
type ExtractedData =
  | { type: 'DISTRICT'; result: string }
  | { type: 'PLACE'; result: number[] };

export const extractRegionOrPlaceIds = (
  searchList: RelatedSearchWord[]
): ExtractedData => {
  const placeIdList: number[] = [];

  searchList.filter((result) => {
    if (result.type === 'PLACE') {
      placeIdList.push(result.id!);
    }
  });

  // 최상단 지역명 반환
  if (!placeIdList.length) {
    const index: number = searchList.findIndex((i) => i.type === 'DISTRICT');
    const firstRegion: string = searchList[index].name;
    return { type: 'DISTRICT', result: firstRegion };
  }

  // 장소 id 리스트 반환
  return { type: 'PLACE', result: placeIdList };
};
