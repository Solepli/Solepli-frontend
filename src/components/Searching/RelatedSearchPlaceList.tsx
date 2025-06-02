import React, { useEffect, } from 'react';
import SearchTitle from './SearchTitle';
import { useSearchStore } from '../../store/searchStore';
import useDebounce from '../../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { getRelatedSearchWords } from '../../api/searchApi';
import { useShallow } from 'zustand/shallow';
import RelatedSearchPlace from './RelatedSearchPlace';

const RelatedSearchPlaceList: React.FC = () => {
  const { inputValue, relatedSearchList, setRelatedSearchList } =
    useSearchStore(
      useShallow((state) => ({
        inputValue: state.inputValue,
        relatedSearchList: state.relatedSearchList,
        setRelatedSearchList: state.setRelatedSearchList,
      }))
    );

  const debouncedInput = useDebounce(inputValue, 500);

  const { data, isSuccess, error } = useQuery({
    queryKey: ['RSList', debouncedInput],
    queryFn: () => {
      return getRelatedSearchWords(debouncedInput, 0, 0);
    },
    enabled: debouncedInput !== '',
  });

  if (error) {
    console.log('RSList error :::', error);
  }

  useEffect(() => {
    if (isSuccess) {
      setRelatedSearchList(data);
    }
  }, [isSuccess, data, setRelatedSearchList]);

  return (
    <div className='flex flex-col items-start'>
      <SearchTitle title={'검색 결과'} />

      {relatedSearchList?.filter((data) => data.type === 'PLACE').map((data) => (
        <RelatedSearchPlace relatedSearchWord={data} key={data.id} />
      ))}
    </div>
  );
};

export default RelatedSearchPlaceList;
