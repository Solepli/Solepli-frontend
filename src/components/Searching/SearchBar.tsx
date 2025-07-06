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

  const { setMarkerIdList, setNewMarkerObjectList } = useMarkerStore(
    useShallow((state) => ({
      setMarkerIdList: state.setMarkerIdList,
      setNewMarkerObjectList: state.setNewMarkerObjectList,
    }))
  );

  const { setCategory } = usePlaceStore();

  const pathname = window.location.pathname;
  const mode = pathname.includes('/sollect')
    ? pathname.includes('/write')
      ? 'place' //sollect/write/search
      : 'sollect'
    : 'solmap';

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
    if (mode === 'place') return;

    if (mode === 'sollect') {
      clearCategory();
      navigate('/sollect/search/result');
      await postRecentSearchWord(inputValue, mode);
    } else if (mode === 'solmap') {
      if (!relatedSearchList.length) {
        // 검색 결과가 없을 때
        setSelectedRegion('');
        setMarkerIdList([]);
        setNewMarkerObjectList([]);
        navigate('/map/not-found');
      } else if (
        relatedSearchList.length === 1 &&
        relatedSearchList[0].type === 'PLACE'
      ) {
        // 결과가 1개이고 PLACE일 때
        setInputValue(relatedSearchList[0].name);
        navigate(`/map/detail/${relatedSearchList[0].id}?detailType=searching`);
        await postRecentSearchWord(relatedSearchList[0].name, mode);
      } else if (
        relatedSearchList.length === 1 &&
        relatedSearchList[0].type === 'DISTRICT'
      ) {
        // 결과가 1개이고 DISTRICT일 때
        setSelectedRegion(relatedSearchList[0].name);
        setInputValue(relatedSearchList[0].name);
        navigate('/map/list?queryType=region');
        await postRecentSearchWord(relatedSearchList[0].name, mode);
      } else {
        const anyResult = extractRegionOrPlaceIds(relatedSearchList);
        if (Array.isArray(anyResult)) {
          // 장소 id 리스트 반환시
          setRelatedPlaceIdList(anyResult);
          navigate('/map/list?queryType=idList');
          await postRecentSearchWord(inputValue, mode);
        } else {
          // 지역명 반환시
          setSelectedRegion(anyResult);
          setInputValue(relatedSearchList[0].name);
          navigate('/map/list?queryType=region');
          await postRecentSearchWord(relatedSearchList[0].name, mode);
        }
      }
    }

    setCategory(null);
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
        />
      </div>
      {inputValue && <XButtonCircle onClickFunc={clickXButtonCircle} />}
    </div>
  );
};

export default SearchBar;
