import React, { useEffect } from 'react';
import AutoSearch from './AutoSearch';
import SearchTitle from './SearchTitle';
import { useSearchStore } from '../../store/searchStore';
import useDebounce from '../../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { getRelatedSearchWords } from '../../api/searchApi';
import { useShallow } from 'zustand/shallow';

const AutoSearchList: React.FC = () => {
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
      return getRelatedSearchWords(debouncedInput, 37.51234, 127.060395);
    },
    enabled: debouncedInput !== '',
  });

  useEffect(() => {
    if (isSuccess) {
      setRelatedSearchList(data);
    }
  }, [isSuccess, data, setRelatedSearchList]);

  if (error) {
    console.log('RSList error :::', error);
  }

  return (
    <div className='flex flex-col items-start'>
      <SearchTitle title={'검색 결과'} />

      {relatedSearchList.map((data) => (
        <AutoSearch relatedSearchWord={data} key={data.id} />
      ))}
    </div>
  );
};

export default AutoSearchList;
