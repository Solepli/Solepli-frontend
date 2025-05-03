import React from 'react';
import SearchBar from './SearchBar';

const SearchArea: React.FC = () => {
  return (
    <div className='flex flex-row items-center justify-start pt-12 px-16'>
      <SearchBar />
    </div>
  );
};

export default SearchArea;
