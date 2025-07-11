import React from 'react';
import ClockFill from '../../assets/clockFill.svg?react';
import XButtonCircle from '../XButtonCircle';
import {
  deleteRecentSearchWords,
  getRelatedSearchWords,
} from '../../api/searchApi';
import { useQueryClient } from '@tanstack/react-query';
import { useMapStore } from '../../store/mapStore';
import { extractRegionOrPlaceIds } from '../../utils/placeFunc';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/searchStore';
import { useShallow } from 'zustand/shallow';
import { usePlaceStore } from '../../store/placeStore';
import { postRecentSearchWord } from '../../api/searchApi';
import { useSollectStore } from '../../store/sollectStore';
import { useMarkerStore } from '../../store/markerStore';

interface RecentSearchTextProps {
  text: string;
  mode: string;
}

const RecentSearch: React.FC<RecentSearchTextProps> = ({ text, mode }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { setCategory } = usePlaceStore();
  const { clearCategory } = useSollectStore();
  const { userLatLng } = useMapStore();
  const { setRelatedPlaceIdList, setSelectedRegion, setInputValue } =
    useSearchStore(
      useShallow((state) => ({
        setRelatedPlaceIdList: state.setRelatedPlaceIdList,
        setSelectedRegion: state.setSelectedRegion,
        setInputValue: state.setInputValue,
      }))
    );
  const { searchByRegion, searchByPlace, searchByPlaces } = useMarkerStore(
    useShallow((state) => ({
      searchByRegion: state.searchByRegion,
      searchByPlace: state.searchByPlace,
      searchByPlaces: state.searchByPlaces,
    }))
  );

  const onClickDeleteRow = async () => {
    await deleteRecentSearchWords(mode, text);
    queryClient.invalidateQueries({ queryKey: ['recentSearchWords'] });
  };

  const handleClick = async () => {
    setInputValue(text);
    setCategory(null); // usePlaceStore
    clearCategory(); // useSollectStore

    if (mode === 'sollect') {
      navigate('/sollect/search/result');
    }
    if (mode === 'solmap') {
      const relatedSearchList = await getRelatedSearchWords(
        text,
        userLatLng!.lat,
        userLatLng!.lng
      );
      const { type, result } = extractRegionOrPlaceIds(relatedSearchList);
      if (type === 'DISTRICT') {
        // 지역명 반환시
        searchByRegion(result); // 마커 업데이트
        setSelectedRegion(result);
        navigate('/map/list?queryType=region');
      } else if (type === 'PLACE' && result.length === 1) {
        // 장소 id 반환시
        searchByPlace(relatedSearchList[0].id); // 마커 업데이트
        navigate(
          `/map/detail/${relatedSearchList[0].id}?detailType=searching`,
          { state: { from: 'map' } }
        );
      } else if (type === 'PLACE') {
        // 장소 id 리스트 반환시
        searchByPlaces(result); // 마커 업데이트
        setRelatedPlaceIdList(result);
        navigate('/map/list?queryType=idList');
      }
    }
    await postRecentSearchWord(text, mode);
  };

  return (
    <div className='flex pt-8 pl-12 pr-8 pb-0 items-center gap-10'>
      <div className='flex h-36 items-center gap-4 flex-[1_0_0] justify-start'>
        <div
          className='flex items-center gap-4 flex-[1_0_0]'
          onClick={handleClick}>
          <ClockFill />
          <div className='flex-[1_0_0] text-[12px] leading-[120%] tracking-[-0.18px] text-primary-950'>
            {text}
          </div>
        </div>

        <XButtonCircle onClickFunc={() => onClickDeleteRow()} />
      </div>
    </div>
  );
};

export default RecentSearch;
