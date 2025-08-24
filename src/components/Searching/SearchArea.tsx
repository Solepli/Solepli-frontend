import React from 'react';
import SearchBar from './SearchBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/searchStore';
import { useShallow } from 'zustand/shallow';

const SearchArea: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPlace = location.pathname.includes('/write/search'); //sollect와 solroute 작성 중 장소 검색시 사용됨

  const { setInputValue, setRelatedSearchList, setRelatedSearchPlaceList } =
    useSearchStore(
      useShallow((state) => ({
        setInputValue: state.setInputValue,
        setRelatedSearchList: state.setRelatedSearchList,
        setRelatedSearchPlaceList: state.setRelatedSearchPlaceList,
      }))
    );

  const handleClick = () => {
    setInputValue('');
    setRelatedSearchList([]);
    setRelatedSearchPlaceList([]);
    if (location.pathname.includes('/solroute/write/search')) {
      navigate('/solroute/write');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className='flex flex-row items-center justify-start gap-8 pt-[12px] px-[16px]'>
      <SearchBar />
      <button
        className='w-38 h-38 text-primary-950 text-sm font-medium leading-tight'
        onClick={handleClick}>
        {fromPlace ? '완료' : '닫기'}
      </button>
    </div>
  );
};

export default SearchArea;
