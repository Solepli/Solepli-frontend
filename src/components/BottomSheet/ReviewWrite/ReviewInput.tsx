import React, { useRef, useEffect } from 'react';

import useReviewWriteStore from '../../../store/reviewWriteStore';
import { useShallow } from 'zustand/shallow';

const ReviewInput: React.FC = () => {
  const { text, setText } = useReviewWriteStore(
    useShallow((state) => ({
      text: state.text,
      setText: state.setText,
    }))
  );

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
          <span className='text-base font-semibold leading-[150%] text-primary-900 whitespace-nowrap'>
            어떤 점이 좋았나요?
          </span>
        </div>

        <div className='self-stretch flex flex-col gap-10 items-start justify-start'>
          <div
            className='self-stretch flex flex-col items-center justify-center gap-2 px-12 py-8 bg-primary-50 rounded-xl
              outline outline-1 outline-offset-[-1px] outline-primary-100'>
            <div className='self-stretch flex flex-row items-center justify-center'>
              <textarea
                spellCheck={false}
                ref={textareaRef}
                value={text}
                onChange={handleChangeText}
                placeholder='리뷰를 남기면 다른 쏠플러에게 도움이 될 수 있어요.'
                rows={5}
                className='focus:outline-none focus:ring-0 resize-none placeholder:text-primary-500
                flex-1 text-sm leading-tight text-primary-900 font-normal'
                name='review'
              />
            </div>

            <div className='self-stretch flex flex-row items-center justify-end pt-[6px]'>
              <div className='text-xs leading-none font-normal text-primary-500 text-right whitespace-nowrap'>
                {text.length}/500
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewInput;
