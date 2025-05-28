import React, { useEffect } from 'react';
import search from '../../assets/search.svg';
import { useSearchStore } from '../../store/searchStore';
import XButtonCircle from '../XButtonCircle';
import useDebounce from '../../hooks/useDebounce';
import {
  getRelatedSearchWords,
  postRecentSearchWord,
} from '../../api/searchApi';
import { useShallow } from 'zustand/shallow';
import { useQuery } from '@tanstack/react-query';

const SearchBar: React.FC = () => {
  const { inputValue, setInputValue, setRelatedSearchList } = useSearchStore(
    useShallow((state) => ({
      inputValue: state.inputValue,
      setInputValue: state.setInputValue,
      setRelatedSearchList: state.setRelatedSearchList,
    }))
  );

  const debouncedInput = useDebounce(inputValue, 500);

  const { data, isSuccess, error } = useQuery({
    queryKey: ['RSList', debouncedInput],
    queryFn: () => {
      return getRelatedSearchWords(debouncedInput, 37.51234, 127.060395);
    },
    enabled: debouncedInput !== '',
  });

  useEffect(() => {
  if (isSuccess) {
      setRelatedSearchList(data);
  }
  }, [isSuccess, data, setRelatedSearchList]);

  if (error) {
    console.log('RSList error :::', error);
  }

  const mode = window.location.pathname.includes('/sollect/search')
    ? 'sollect'
    : 'map';

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log(inputValue);
      postRecentSearchWord(inputValue, mode);
    }
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
            onChange={(e) => onChangeInputValue(e)}
            placeholder='오늘은 어디서 시간을 보내나요?'
            autoFocus
            onKeyDown={(e) => handleEnter(e)}
          />
        </div>
      </div>
      {inputValue && <XButtonCircle onClickFunc={() => setInputValue('')} />}
    </div>
  );
};

export default SearchBar;
