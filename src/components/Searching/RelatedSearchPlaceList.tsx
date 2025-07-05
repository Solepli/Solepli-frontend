import React, { useEffect } from 'react';
import SearchTitle from './SearchTitle';
import { useSearchStore } from '../../store/searchStore';
import useDebounce from '../../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { getRelatedSearchPlaces } from '../../api/searchApi';
import { useShallow } from 'zustand/shallow';
import RelatedSearchPlace from './RelatedSearchPlace';
import { useSollectWriteStore } from '../../store/sollectWriteStore';
import { useLocation } from 'react-router-dom';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';

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

  //place가 저장된는 곳과 관련된 것
  const { places, addPlace, removePlace } = useWriteStoreByPath();

  const debouncedInput = useDebounce(inputValue, 500);

  // 입력값과 관련된 장소들을 RelatedSearchPlace type으로 가져옴
  const { data, isSuccess, error } = useQuery({
    queryKey: ['RSList', debouncedInput],
    queryFn: () => {
      return getRelatedSearchPlaces(debouncedInput);
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

      {relatedSearchPlaceList.map((data) => {
        const isSelected = Array.from(places).some((p) => p.id === data.id);
        return (
          <RelatedSearchPlace
            selectablePlace={{ ...data, isSelected }}
            addPlace={addPlace}
            removePlace={removePlace}
            key={data.id}
          />
        );
      })}
    </div>
  );
};

export default RelatedSearchPlaceList;

function useWriteStoreByPath() {
  const path = useLocation().pathname;
  const sollect = useSollectWriteStore(
    useShallow((state) => ({
      places: state.places,
      addPlace: state.addPlace,
      removePlace: state.removePlace,
    }))
  );

  const solroute = useSolrouteWriteStore(
    useShallow((state) => ({
      places: state.placeInfos,
      addPlace: state.addPlace,
      removePlace: state.deletePlaceInfo,
    }))
  )

  return path.includes('sollect') ? sollect : solroute;
}
