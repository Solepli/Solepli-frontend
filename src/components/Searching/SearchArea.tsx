import React from 'react';
import SearchBar from './SearchBar';
import XButton from '../XButton';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/searchStore';
import { useShallow } from 'zustand/shallow';

const SearchArea: React.FC = () => {
  const navigate = useNavigate();

  const { setInputValue, setRelatedSearchList, setRelatedSearchPlaceList } =
    useSearchStore(
      useShallow((state) => ({
        setInputValue: state.setInputValue,
        setRelatedSearchList: state.setRelatedSearchList,
        setRelatedSearchPlaceList: state.setRelatedSearchPlaceList,
      }))
    );

  const handleXButtonClick = () => {
    setInputValue('');
    setRelatedSearchList([]);
    setRelatedSearchPlaceList([]);
    navigate(-1);
  };

  return (
    <div className='flex flex-row items-center justify-start gap-8 pt-[12px] px-[16px]'>
      <SearchBar />
      <XButton onClickFunc={handleXButtonClick} />
    </div>
  );
};

export default SearchArea;
