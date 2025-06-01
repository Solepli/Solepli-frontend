import React, { useEffect, useState } from 'react';
import RelatedSearch from './RelatedSearch';
import SearchTitle from './SearchTitle';
import { useSearchStore } from '../../store/searchStore';
import useDebounce from '../../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { getRelatedSearchWords } from '../../api/searchApi';
import { useShallow } from 'zustand/shallow';

const RelatedSearchList: React.FC = () => {
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
      return getRelatedSearchWords(debouncedInput, latlng.lat, latlng.lng);
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

  // 사용자가 위치정보를 허용하지 않을 시 좌표가 0,0으로 설정됨.
  const [latlng, setLatlng] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          setLatlng({ lat: res.coords.latitude, lng: res.coords.longitude });
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }, []);

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
