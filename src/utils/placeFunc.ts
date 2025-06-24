import { RelatedSearchWord } from '../types';

/* wordList에 '지역명'만 있으면 최상단 지역명 반환,
 * wordList에 '지역명+장소명' or '장소명' 있으면 장소 id 리스트 반환
 */
export const extractRegionOrPlaceIds = (wordList: RelatedSearchWord[]) => {
  const placeIdList: number[] = [];
  wordList.filter((word) => {
    if (word.type === 'PLACE') {
      placeIdList.push(word.id!);
    }
  });

  // 최상단 지역명 반환
  if (!placeIdList.length) {
    const index: number = wordList.findIndex((i) => i.type === 'DISTRICT');
    const firstRegion: string = wordList[index].name;
    return firstRegion;
  }

  // 장소 id 리스트 반환
  return placeIdList;
};
