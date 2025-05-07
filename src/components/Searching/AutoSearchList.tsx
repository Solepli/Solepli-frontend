import React from 'react';
import AutoSearch from './AutoSearch';
import { autoSearchResults } from '../../autoSearchResults';
import SearchTitle from './SearchTitle';

const AutoSearchList: React.FC = () => {
  const filteredData = autoSearchResults;

  return (
    <div className='flex flex-col items-start'>
      <SearchTitle title={'검색 결과'} />

      {filteredData.map((data, i) => (
        <AutoSearch autoSearchData={data} key={i} />
      ))}
    </div>
  );
};

export default AutoSearchList;
