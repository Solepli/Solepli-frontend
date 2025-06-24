import React from 'react';
import search from '../../assets/search.svg';
import { useSearchStore } from '../../store/searchStore';
import XButtonCircle from '../XButtonCircle';
import { postRecentSearchWord } from '../../api/searchApi';
import { useShallow } from 'zustand/shallow';
import { searchSollect } from '../../api/sollectApi';
import { useNavigate } from 'react-router-dom';
import { useMarkerStore } from '../../store/markerStore';
import { RelatedSearchWord } from '../../types';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();

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

  const mode = window.location.pathname.includes('/sollect/search')
    ? 'sollect'
    : 'solmap';

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;

    if (mode === 'sollect') {
      navigate('/sollect/search/result');
    } else if (mode === 'solmap') {
      if (!relatedSearchList.length) {
        // 검색 결과가 없을 때
        setSelectedRegion('');
        setMarkerIdList([]);
        setNewMarkerObjectList([]);
        navigate('/map/not-found');
      } else {
        // 검색어 있을 때 처리
        const anyResult = extractRegionOrPlaceIds(relatedSearchList);
        if (Array.isArray(anyResult)) {
          // 장소 id 리스트 반환시
          setRelatedPlaceIdList(anyResult);
          navigate('/map/list?queryType=idList');
        } else {
          // 지역명 반환시
          setSelectedRegion(anyResult);
          navigate('/map/list?queryType=region');
        }
      }
    }

    postRecentSearchWord(inputValue, mode);
  };

  const clickXButtonCircle = () => {
    setInputValue('');
    setRelatedSearchList([]);
  };

  return (
    <div className='bg-primary-100 h-34 flex-[1_0_0] flex items-center px-8 rounded-xl'>
      <div className='flex-1 flex items-center justify-start gap-[4px]'>
        <img className='w-[24px] h-[24px]' src={search} />
        <div className='flex-[1_0_0] flex items-center gap-2'>
          <input
            className="focus:outline-none focus:ring-0 resize-none 
            flex-[1_0_0] text-[14px] leading-[100%] tracking-[-0.21px] font-['Pretendard'] text-primary-900"
            type='text'
            value={inputValue}
            spellCheck={false}
            onChange={(e) => changeInputValue(e)}
            placeholder='오늘은 어디서 시간을 보내나요?'
            autoFocus
            onKeyDown={(e) => handleEnter(e)}
          />
        </div>
      </div>
      {inputValue && <XButtonCircle onClickFunc={clickXButtonCircle} />}
    </div>
  );
};

/* wordList에 '지역명'만 있으면 최상단 지역명 반환,
 * wordList에 '지역명+장소명' or '장소명' 있으면 장소 id 리스트 반환
 */
const extractRegionOrPlaceIds = (wordList: RelatedSearchWord[]) => {
  const placeIdList: number[] = [];
  wordList.filter((word) => {
    if (word.type === 'PLACE') {
      placeIdList.push(word.id!);
    }
  });

  // 최상단 지역명 반환
  if (!placeIdList.length) {
    const index: number = wordList.findIndex((i) => i.type === 'DISTRICT');
    const firstRegion: string = wordList[index].name;
    return firstRegion;
  }

  // 장소 id 리스트 반환
  return placeIdList;
};

export default SearchBar;
