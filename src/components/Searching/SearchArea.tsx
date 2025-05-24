import React from 'react';
import SearchBar from './SearchBar';
import XButton from '../XButton';
import { useSearchStore } from '../../store/searchStore';
import { useNavigate } from 'react-router-dom';

const SearchArea: React.FC = () => {
  // const { isFocused, setIsFocused } = useSearchStore();
  const navigate = useNavigate();
  return (
    <div className='flex flex-row items-center justify-start gap-8 pt-[12px] px-[16px]'>
      <SearchBar />
      <XButton onClickFunc={() => navigate(-1)} />
    </div>
  );
};

export default SearchArea;
