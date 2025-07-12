import React, { useEffect } from 'react';
import RelatedSearch from './RelatedSearch';
import SearchTitle from './SearchTitle';
import { useSearchStore } from '../../store/searchStore';
import useDebounce from '../../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import {
  getRelatedSearchPlaces,
  getRelatedSearchWords,
} from '../../api/searchApi';
import { useShallow } from 'zustand/shallow';
import { useMapStore } from '../../store/mapStore';

const RelatedSearchList: React.FC = () => {
  const { inputValue, relatedSearchList, setRelatedSearchList } =
    useSearchStore(
      useShallow((state) => ({
        inputValue: state.inputValue,
        relatedSearchList: state.relatedSearchList,
        setRelatedSearchList: state.setRelatedSearchList,
      }))
    );

  const { userLatLng } = useMapStore();

  const debouncedInput = useDebounce(inputValue, 500);

  const { data: dataWithLoc, isSuccess: successWithLoc } = useQuery({
    queryKey: ['RSList', debouncedInput],
    queryFn: () => {
      return getRelatedSearchWords(
        debouncedInput,
        userLatLng!.lat,
        userLatLng!.lng
      );
    },
    enabled: debouncedInput !== '' && !!userLatLng,
  });

  // 입력값과 관련된 장소들을 RelatedSearchPlace type으로 가져옴
  const { data: dataNoLoc, isSuccess: successNoLoc } = useQuery({
    queryKey: ['RSList', debouncedInput],
    queryFn: () => {
      return getRelatedSearchPlaces(debouncedInput);
    },
    enabled: debouncedInput !== '' && userLatLng === null,
  });

  useEffect(() => {
    if (successWithLoc) {
      setRelatedSearchList(dataWithLoc);
    } else if (successNoLoc && dataNoLoc) {
      setRelatedSearchList(dataNoLoc);
    }
  }, [
    setRelatedSearchList,
    successWithLoc,
    successNoLoc,
    dataWithLoc,
    dataNoLoc,
  ]);

  return (
    <div className='flex flex-col items-start'>
      <SearchTitle title={'검색 결과'} />

      {relatedSearchList?.map((data) => (
        <RelatedSearch relatedSearchWord={data} key={data.id || data.name} />
      ))}
    </div>
  );
};

export default RelatedSearchList;
