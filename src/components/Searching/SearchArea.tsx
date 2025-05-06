import React from 'react';
import SearchBar from './SearchBar';
import XButton from '../XButton';

const SearchArea: React.FC = () => {
  return (
    <div className='flex flex-row items-center justify-start gap-8 pt-[12px] px-[16px]'>
      <SearchBar />
      <XButton />
    </div>
  );
};

export default SearchArea;
