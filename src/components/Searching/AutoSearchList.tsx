import React from 'react';
import AutoSearch from './AutoSearch';
import { autoSearchResults } from '../../autoSearchResults';

const AutoSearchList: React.FC = () => {
  const filteredData = autoSearchResults;

  return (
    <div className='flex flex-col items-start'>
      {filteredData.map((data) => (
        <AutoSearch autoSearchData={data} />
      ))}
    </div>
  );
};

export default AutoSearchList;
