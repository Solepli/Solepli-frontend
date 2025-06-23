import React from 'react';
import { RelatedSearchWord } from '../../types';
import { iconRelatedSearch } from '../../utils/icon';
import { useNavigate } from 'react-router-dom';
import { useMapStore } from '../../store/mapStore';
import { useShallow } from 'zustand/shallow';
import { useMarkerStore } from '../../store/markerStore';
import { getRegionMarkers } from '../../api/mapApi';
import {
  createMarkerObjectList,
  createMarkersBounds,
} from '../../utils/mapFunc';

interface RelatedSearchProps {
  relatedSearchWord: RelatedSearchWord;
}

const RelatedSearch: React.FC<RelatedSearchProps> = ({ relatedSearchWord }) => {
  const navigate = useNavigate();

  const { setIsSearchBounds, setLastBounds } = useMapStore(
    useShallow((state) => ({
      setIsSearchBounds: state.setIsSearchBounds,
      setLastBounds: state.setLastBounds,
    }))
  );

  const { setNewMarkerObjectList, setMarkerIdList } = useMarkerStore(
    useShallow((state) => ({
      setNewMarkerObjectList: state.setNewMarkerObjectList,
      setMarkerIdList: state.setMarkerIdList,
    }))
  );

  const IconComponent =
    relatedSearchWord.type === 'PLACE'
      ? iconRelatedSearch[relatedSearchWord.category!]
      : iconRelatedSearch['location'];

  const clickResult = async () => {
    if (relatedSearchWord.type === 'PLACE') {
      // todo : 상세정보 api로 마커+디테일뷰 한 번에 불러오기
    } else if (relatedSearchWord.type === 'DISTRICT') {
      // getRegionMarkers api 호출
      const newInfo = await getRegionMarkers(relatedSearchWord.name);
      // 새로운 마커 객체(+ idList) 생성 및 저장
      const result = createMarkerObjectList(newInfo);
      const { objectList, idList } = result!;
      setNewMarkerObjectList(objectList);
      setMarkerIdList(idList);
      // 새로운 bounds 생성 및 저장
      const newBounds = createMarkersBounds(objectList);
      setIsSearchBounds(true);
      setLastBounds(newBounds);
      // todo : 지역정보 api로 장소 리스트 불러오기
    }
    navigate('/map/list');
  };

  return (
    <div
      className='flex p-[16px_16px_4px_16px] items-center gap-10 self-stretch'
      onClick={clickResult}>
      <div className='flex p-4 items-start rounded-[4px] bg-gray-400/10'>
        <IconComponent className='w-24 h-24' />
      </div>

      <div className='flex flex-col items-start gap-4 flex-[1_0_0]'>
        <div className='flex flex-col items-start gap-4 flex-[1_0_0]'>
          <div className='text-[14px] leading-[100%] font-[500] tracking-[-0.35px] text-center text-primary-950'>
            {relatedSearchWord.name}
          </div>
        </div>

        {relatedSearchWord.type === 'PLACE' && (
          <div className='flex justify-between items-center self-stretch'>
            <div className='text-[12px] leading-[120%] tracking-[-0.18px] text-center text-primary-400'>
              {relatedSearchWord.address}
            </div>
            <div className='flex items-center'>
              <div className='text-[12px] leading[120%] tracking-[-0.18px] text-center text-primary-400'>
                {relatedSearchWord.distance.value +
                  relatedSearchWord.distance.unit}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedSearch;
