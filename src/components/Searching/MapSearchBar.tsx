import React, { useEffect } from 'react';
import { useSearchStore } from '../../store/searchStore';
import useDebounce from '../../hooks/useDebounce';
import search from '../../assets/search.svg';
import { useNavigate } from 'react-router-dom';

const MapSearchBar = () => {
  const { inputValue, setInputValue } = useSearchStore();

  const debouncedInput = useDebounce(inputValue, 500);

  // api로 보낼 검색어(inputValue)가 잘 debounced 되었는지 확인
  useEffect(() => {
    console.log(debouncedInput);
  }, [debouncedInput]);

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const navigate = useNavigate();

  return (
    <div
      className='bg-white shadow-[0_2px_2px_0_rgba(18,18,18,0.1)] h-[34px] flex-[1_0_0] flex items-center px-[8px] rounded-[12px] mt-12 mx-16 button'
      onClick={() => navigate('/map/search')}>
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
          />
        </div>
      </div>
    </div>
  );
};

export default MapSearchBar;
