import React from 'react';
import SearchBar from './SearchBar';

const SearchArea: React.FC = () => {
  return (
    <div
      className='fixed top-0 inset-x-0 z-50
    flex flex-row items-center justify-start pt-[12px] px-[16px]'>
      <SearchBar />
    </div>
  );
};

export default SearchArea;
