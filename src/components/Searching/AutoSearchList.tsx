import React from 'react';
import AutoSearch from './AutoSearch';
import SearchTitle from './SearchTitle';
import { useSearchStore } from '../../store/searchStore';

const AutoSearchList: React.FC = () => {
  const { relatedSearchList } = useSearchStore();

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
