import React from 'react';
import search from '../../assets/search.svg';
import useSearchStore from '../../store/searchStore';
import XButtonCircle from '../XButtonCircle';

const SearchBar: React.FC = () => {
  const { isFocused, setIsFocused, inputValue, setInputValue } =
    useSearchStore();

  return (
    <div
      className={[
        isFocused
          ? 'bg-primary-100'
          : 'bg-white shadow-[0_2px_2px_0_rgba(18,18,18,0.1)]',
        'h-[34px] flex-[1_0_0] flex items-center px-[8px] rounded-[12px]',
      ].join(' ')}
      onClick={() => setIsFocused(true)}>
      <div className='flex-1 flex items-center justify-start gap-[4px]'>
        <img className='w-[24px] h-[24px]' src={search} />
        <div className='flex-[1_0_0] flex items-center gap-2'>
          <input
            className="focus:outline-none focus:ring-0 resize-none 
            flex-[1_0_0] text-[14px] leading-[100%] tracking-[-0.21px] font-['Pretendard'] text-primary-900"
            type='text'
            value={inputValue}
            spellCheck={false}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='오늘은 어디서 시간을 보내나요?'
          />
        </div>
      </div>
      {isFocused && inputValue && (
        <XButtonCircle onClickFunc={() => setInputValue('')} />
      )}
    </div>
  );
};

export default SearchBar;
