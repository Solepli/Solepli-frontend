import React, { useEffect } from 'react';
import RelatedSearch from './RelatedSearch';
import SearchTitle from './SearchTitle';
import { useSearchStore } from '../../store/searchStore';
import useDebounce from '../../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { getRelatedSearchWords } from '../../api/searchApi';
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

  const { data, isSuccess } = useQuery({
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

  useEffect(() => {
    if (isSuccess) {
      setRelatedSearchList(data);
    }
  }, [isSuccess, data, setRelatedSearchList]);

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
