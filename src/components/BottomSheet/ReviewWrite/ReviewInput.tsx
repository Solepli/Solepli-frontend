import React, { useState, useRef, useEffect } from 'react';

const ReviewInput: React.FC = () => {
  const [text, setText] = useState<string>('');
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
        <div className='self-stretch flex items-center justify-center pb-12'>
          <div className="text-[14px] leading-[100%] tracking-[-0.35px] font-['Pretendard'] font-[500] text-[#343846] whitespace-nowrap">
            어떤 점이 좋았나요?
          </div>
        </div>

        <div className='self-stretch flex flex-col gap-10 items-start justify-start'>
          <div className='self-stretch flex flex-col items-center justify-center gap-2 p-12 bg-[#eceef2] rounded-[4px]'>
            <div className='self-stretch flex flex-row items-center justify-center'>
              <textarea
                spellCheck={false}
                ref={textareaRef}
                value={text}
                onChange={handleChangeText}
                placeholder=''
                rows={5}
                className="focus:outline-none focus:ring-0 resize-none 
                flex-1 text-[12px] leading-[120%] tracking-[-0.18px] font-['Pretendard'] text-[#343846]"
              />
            </div>

            <div className='self-stretch flex flex-row items-center justify-end pt-[6px]'>
              <div className="text-[12px] leading-[120%] tracking-[-0.18px] font-['Pretendard'] font-[500] text-[#3d3d3d] text-right whitespace-nowrap">
                {text.length}
              </div>
              <div className="text-[10px] leading-[120%] font-['Pretendard'] text-[#5d5d5d] text-right whitespace-nowrap">
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
