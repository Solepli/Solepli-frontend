import React, { useRef, useEffect, } from 'react';

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
          <span className="text-base font-semibold leading-[150%] text-primary-900 whitespace-nowrap">
            어떤 점이 좋았나요?
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
                placeholder='리뷰를 남기면 다른 쏠플러에게 도움이 될 수 있어요.'
                rows={5}
                className="focus:outline-none focus:ring-0 resize-none placeholder:text-primary-400
                flex-1 text-sm leading-[150%] text-primary-900 font-normal"
              />
            </div>

            <div className='self-stretch flex flex-row items-center justify-end pt-[6px]'>
              <div className="text-sm leading-[150%] font-normal text-grayScale-900 text-right whitespace-nowrap">
                {text.length}
              </div>
              <div className="text-xs leading-[150%] text-grayScale-600 text-right whitespace-nowrap">
                /500
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewInput;
