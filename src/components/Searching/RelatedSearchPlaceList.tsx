import React, { useEffect } from 'react';
import SearchTitle from './SearchTitle';
import { useSearchStore } from '../../store/searchStore';
import useDebounce from '../../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { getRelatedSearchWords } from '../../api/searchApi';
import { useShallow } from 'zustand/shallow';
import RelatedSearchPlace from './RelatedSearchPlace';
import { useSollectWriteStore } from '../../store/sollectWriteStore';

const RelatedSearchPlaceList: React.FC = () => {
  const { inputValue, relatedSearchList, setRelatedSearchList } =
    useSearchStore(
      useShallow((state) => ({
        inputValue: state.inputValue,
        relatedSearchList: state.relatedSearchList,
        setRelatedSearchList: state.setRelatedSearchList,
      }))
    );
  const { places } = useSollectWriteStore(
    useShallow((state) => ({ places: state.places }))
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

      {/* relatedSearchList의 relatedSearchWord 객체를
      isAdded 필드를 추가한 relatedSearchPlace로 변환해줌 */}
      {relatedSearchList
        ?.filter((data) => data.type === 'PLACE')
        .map((data) => {
          const isAdded = places.some((p) => p.id === data.id);
          return (
            <RelatedSearchPlace
              relatedSearchPlace={{ ...data, isAdded }}
              key={data.id}
            />
          );
        })}
    </div>
  );
};

export default RelatedSearchPlaceList;
