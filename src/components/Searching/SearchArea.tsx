import React from 'react';
import SearchBar from './SearchBar';
import XButton from '../XButton';
import useSearchStore from '../../store/searchStore';

const SearchArea: React.FC = () => {
  const { isFocused, setIsFocused } = useSearchStore();

  return (
    <div className='flex flex-row items-center justify-start gap-8 pt-[12px] px-[16px]'>
      <SearchBar />
      {isFocused && <XButton onClickFunc={() => setIsFocused(false)} />}
    </div>
  );
};

export default SearchArea;
