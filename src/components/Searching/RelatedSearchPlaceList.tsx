import React, { useEffect } from 'react';
import SearchTitle from './SearchTitle';
import { useSearchStore } from '../../store/searchStore';
import useDebounce from '../../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { getRelatedSearchPlaces } from '../../api/searchApi';
import { useShallow } from 'zustand/shallow';
import RelatedSearchPlace from './RelatedSearchPlace';
import { useMapStore } from '../../store/mapStore';

const RelatedSearchPlaceList: React.FC = () => {
  //search와 관련된 store
  const { inputValue, relatedSearchPlaceList, setRelatedSearchPlaceList } =
    useSearchStore(
      useShallow((state) => ({
        inputValue: state.inputValue,
        relatedSearchPlaceList: state.relatedSearchPlaceList,
        setRelatedSearchPlaceList: state.setRelatedSearchPlaceList,
      }))
    );

  const { userLatLng } = useMapStore();
  const debouncedInput = useDebounce(inputValue, 500);

  // 입력값과 관련된 장소들을 RelatedSearchPlace type으로 가져옴
  const { data, isSuccess, error } = useQuery({
    queryKey: ['RSList', debouncedInput],
    queryFn: () => {
      return getRelatedSearchPlaces(
        debouncedInput,
        userLatLng?.lat,
        userLatLng?.lng
      );
    },
    enabled: debouncedInput !== '',
  });

  if (error) {
    console.log('RSList error :::', error);
  }

  useEffect(() => {
    if (isSuccess && data !== undefined) {
      setRelatedSearchPlaceList(data);
    }
  }, [isSuccess, data, setRelatedSearchPlaceList]);

  return (
    <div className='flex flex-col items-start'>
      <SearchTitle title={'검색 결과'} />

      {relatedSearchPlaceList.map((place) => {
        return <RelatedSearchPlace place={place} key={place.id} />;
      })}
    </div>
  );
};

export default RelatedSearchPlaceList;
