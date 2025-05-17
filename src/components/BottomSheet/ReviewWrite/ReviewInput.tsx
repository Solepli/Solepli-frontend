import React, { useRef, useEffect, } from 'react';

import photo from '../../../assets/photo.svg';
import useReviewWriteStore from '../../../store/useReviewWriteStore';
import { useShallow } from 'zustand/shallow';

const ReviewInput: React.FC = () => {
  const { text, setText } = useReviewWriteStore(useShallow((state) => ({
    text: state.text,
    setText: state.setText,
  })));

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 500) {
      setText(e.target.value);
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  return (
    <>
      <div className='self-stretch flex flex-col items-center justify-center pt-32 px-16 pb-4'>
        <div className='self-stretch flex items-center justify-center pb-12 gap-3'>
          <span className="text-sm font-medium leading-none tracking-[-0.35px] text-primary-900 whitespace-nowrap">
            어떤 점이 좋았나요?
          </span>
          <span className='text-primary-500 text-[10px] font-normal leading-3 relative top-[1px]'>
            (선택)
          </span>
        </div>

        <div className='self-stretch flex flex-col gap-10 items-start justify-start'>
          <div className='self-stretch flex flex-col items-center justify-center gap-2 p-12 bg-primary-100 rounded-[4px]'>
            <div className='self-stretch flex flex-row items-center justify-center'>
              <textarea
                spellCheck={false}
                ref={textareaRef}
                value={text}
                onChange={handleChangeText}
                placeholder=''
                rows={5}
                className="focus:outline-none focus:ring-0 resize-none 
                flex-1 text-[12px] leading-[120%] tracking-[-0.18px] text-primary-900"
              />
            </div>

            <div className='self-stretch flex flex-row items-center justify-end pt-[6px]'>
              <div className="text-[12px] leading-[120%] tracking-[-0.18px] font-[500] text-gray2-900 text-right whitespace-nowrap">
                {text.length}
              </div>
              <div className="text-[10px] leading-[120%] text-gray2-600 text-right whitespace-nowrap">
                /500
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='self-stretch flex flex-col items-start justify-center px-20'>
        <div className='flex flex-row items-center gap-4 py-4'>
          <div className='flex justify-center items-start w-[24px] h-[24px] p-4'>
            <img width='16px' height='16px' src={photo} />
          </div>
          <button className="text-[12px] leading-[120%] tracking-[-0.18px] text-primary-500 whitespace-nowrap">
            사진 추가하기
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewInput;
