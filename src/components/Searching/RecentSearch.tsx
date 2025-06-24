import React from 'react';
import xBottonCircle from '../../assets/xButtonCircle.svg';
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

interface RecentSearchTextProps {
  text: string;
  mode: string;
}

const RecentSearch: React.FC<RecentSearchTextProps> = ({ text, mode }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { userLatLng } = useMapStore();

  const { setRelatedPlaceIdList, setSelectedRegion, setInputValue } =
    useSearchStore(
      useShallow((state) => ({
        setRelatedPlaceIdList: state.setRelatedPlaceIdList,
        setSelectedRegion: state.setSelectedRegion,
        setInputValue: state.setInputValue,
      }))
    );

  const { setCategory } = usePlaceStore();

  const onClickDeleteRow = async () => {
    await deleteRecentSearchWords(mode, text);
    queryClient.invalidateQueries({ queryKey: ['recentSearchWords'] });
  };

  const handleClick = async () => {
    setInputValue(text);

    const relatedSearchList = await getRelatedSearchWords(
      text,
      userLatLng!.lat,
      userLatLng!.lng
    );

    if (
      relatedSearchList.length === 1 &&
      relatedSearchList[0].type === 'PLACE'
    ) {
      // 디테일 페이지로 이동
      navigate(`/map/detail/${relatedSearchList[0].id}?detailType=searching`);
    } else {
      // 프리뷰 리스트 페이지로 이동
      const anyResult = extractRegionOrPlaceIds(relatedSearchList);
      if (Array.isArray(anyResult)) {
        // 장소 id 리스트
        setRelatedPlaceIdList(anyResult);
        navigate('/map/list?queryType=idList');
      } else {
        // 지역명
        setSelectedRegion(anyResult);
        navigate('/map/list?queryType=region');
      }
    }

    setCategory(null);
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
