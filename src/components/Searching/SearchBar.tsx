import React, { useEffect, useRef } from 'react';
import search from '../../assets/search.svg';
import { useSearchStore } from '../../store/searchStore';
import XButtonCircle from '../XButtonCircle';
import { postRecentSearchWord } from '../../api/searchApi';
import { useShallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';
import { useMarkerStore } from '../../store/markerStore';
import { extractRegionOrPlaceIds } from '../../utils/placeFunc';
import { usePlaceStore } from '../../store/placeStore';
import { useSollectStore } from '../../store/sollectStore';
import { SCALE_16_14 } from '../../constants';

const SearchBar: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  let mode: 'place' | 'sollect' | 'solmap' = 'solmap';

  if (pathname.includes('/write/search')) {
    mode = 'place';
  } else if (pathname.includes('/sollect')) {
    mode = 'sollect';
  }

  const { setCategory } = usePlaceStore();

  const { clearCategory } = useSollectStore();

  const {
    inputValue,
    setInputValue,
    relatedSearchList,
    setRelatedSearchList,
    setSelectedRegion,
    setRelatedPlaceIdList,
  } = useSearchStore(
    useShallow((state) => ({
      inputValue: state.inputValue,
      setInputValue: state.setInputValue,
      relatedSearchList: state.relatedSearchList,
      setRelatedSearchList: state.setRelatedSearchList,
      setSelectedRegion: state.setSelectedRegion,
      setRelatedPlaceIdList: state.setRelatedPlaceIdList,
    }))
  );

  const { searchByRegion, searchByPlaces, clearActiveFilter } = useMarkerStore(
    useShallow((state) => ({
      searchByRegion: state.searchByRegion,
      searchByPlaces: state.searchByPlaces,
      clearActiveFilter: state.clearActiveFilter,
    }))
  );

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const inputWidth = inputElement.offsetWidth / SCALE_16_14 - 34;
      console.log(inputWidth);
      inputElement.style.width = `${inputWidth}px`;
      const inputWidthtMargin = inputWidth * (1 - SCALE_16_14);
      inputElement.style.marginRight = `-${inputWidthtMargin}px`;
    }
  }, []);

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEnter = async (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    setCategory(null); // usePlaceStore
    clearCategory(); // useSollectStore
    if (mode === 'place') return;
    if (mode === 'sollect') {
      navigate('/sollect/search/result');
      await postRecentSearchWord(inputValue, mode);
    }
    if (mode === 'solmap') {
      if (!relatedSearchList.length) {
        // 검색 결과 갯수 === 0
        setSelectedRegion('');
        clearActiveFilter();
        navigate('/map/not-found');
      } else {
        // 검색 결과 갯수 >= 1
        const { type, result } = extractRegionOrPlaceIds(relatedSearchList);
        if (type === 'DISTRICT') {
          // 지역명 반환시
          searchByRegion(result); // 마커 업데이트
          setSelectedRegion(result);
          setInputValue(result);
          navigate('/map/list?queryType=region');
          await postRecentSearchWord(result, mode);
        } else if (type === 'PLACE') {
          // 장소 id 리스트 반환시
          searchByPlaces(result); // 마커 업데이트
          setRelatedPlaceIdList(result);
          navigate('/map/list?queryType=idList');
          await postRecentSearchWord(inputValue, mode);
        }
      }
    }
  };

  const clickXButtonCircle = () => {
    setInputValue('');
    setRelatedSearchList([]);
  };

  return (
    <div className='flex gap-10 h-34 px-8 justify-between items-center grow bg-primary-100 rounded-xl'>
      <div className='grow flex items-center justify-start gap-4'>
        <img className='w-24 h-24 aspect-square' src={search} />
        <input
          ref={inputRef}
          className='focus:outline-none focus:ring-0 resize-none 
            text-base self-stretch grow not-italic font-medium leading-[100%] tracking-[-0.35px] text-primary-900
            scale-[var(--scale-16-14)] origin-left'
          type='text'
          value={inputValue}
          spellCheck={false}
          onChange={(e) => changeInputValue(e)}
          placeholder='오늘은 어디서 시간을 보내나요?'
          autoFocus
          onKeyDown={(e) => handleEnter(e)}
          maxLength={50}
        />
      </div>
      {inputValue && <XButtonCircle onClickFunc={clickXButtonCircle} />}
    </div>
  );
};

export default SearchBar;
