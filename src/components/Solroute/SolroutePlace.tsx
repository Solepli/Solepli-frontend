import { useEffect, useRef, useState } from 'react';
import DragAndDropLine from '../../assets/dragAndDropLine.svg?react';
import Trash from '../../assets/trash.svg?react';
import { useAutoResizeAndScroll } from '../../hooks/useAutoResizeAndScroll';

const SolroutePlace = () => {
  const dashUnderRepeatRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [memo, setMemo] = useState('');

  useAutoResizeAndScroll(textareaRef);

  useEffect(() => {
    const textareaElement = dashUnderRepeatRef.current;
    if (!textareaElement) return;

    const multiple = 8; // repeat되는 'solroute-dash-under-num-repeat.svg'의 height

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { height } = entry.contentRect;
      const newHeight = Math.ceil(height / multiple) * multiple;
      textareaElement.style.height = `${newHeight}px`;
    });
    observer.observe(textareaElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className='flex items-start self-stretch'>
      <div className='flex pl-20 items-start gap-16 grow'>
        {/* line */}
        <div className='flex w-9 flex-col justify-start items-center gap-4 self-stretch'>
          <img src={'/solroute-dash-top-num.svg'} alt='solroute-dash-top-num' />
          <div className='flex w-24 h-24 flex-col justify-center items-center gap-10 aspect-square'>
            <DragAndDropLine />
          </div>
          <div className='min-h-90 flex flex-col justify-start items-center self-stretch grow '>
            <img
              src={'/solroute-dash-under-num-start.svg'}
              alt='solroute-dash-under-num-start'
            />
            <div
              ref={dashUnderRepeatRef}
              className={`self-stretch grow bg-repeat-y bg-top bg-[url("/solroute-dash-under-num-repeat.svg")]`}
            />
            <img
              src={'/solroute-dash-under-num-end.svg'}
              alt='solroute-dash-under-num-end'
            />
          </div>
        </div>

        {/* info */}
        <div className='flex py-12 pr-16 flex-col justify-center items-start gap-8 grow'>
          {/* place */}
          <div className='flex items-center gap-10 self-stretch'>
            <div className='flex flex-col items-start gap-2 grow'>
              <div className='flex justify-center items-center gap-8'>
                <div className='text-primary-950 text-center text-base not-italic font-bold leading-24 tracking-tight'>
                  성수까망
                </div>
                <div className='text-primary-400 text-xs not-italic font-normal leading-18 tracking-[-0.18px]'>
                  카페
                </div>
              </div>
              <div className='text-primary-400 text-sm not-italic font-normal leading-[120%] tracking-[-0.21px]'>
                서울 성동구 연무장5가길 20 2층
              </div>
            </div>
            <div className='flex w-40 h-40 justify-end items-center gap-10'>
              <div className='flex p-4 items-center rounded-lg border-1 border-solid border-primary-700'>
                <Trash className='text-primary-700' />
              </div>
            </div>
          </div>

          {/* memo */}
          <div className='flex w-full flex-col items-start'>
            <div className='flex py-8 px-12 flex-col items-start gap-4 self-stretch rounded-xl border-1 border-solid border-secondary-100 bg-secondary-50'>
              <textarea
                spellCheck={false}
                ref={textareaRef}
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder='메모를 남겨보세요.'
                rows={1}
                maxLength={100}
                className='text-primary-950 placeholder:text-secondary-500
                focus:outline-none focus:ring-0 resize-none
                self-stretch not-italic font-normal leading-[150%] tracking-[-0.35px]
                text-base scale-[var(--scale-16-14)] origin-top-left w-[calc(100%/var(--scale-16-14))]'
              />
              <div className='self-stretch text-secondary-500 text-right text-xs not-italic font-normal leading-[120%] tracking-[-0.18px]'>
                ({memo.length}/100)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolroutePlace;
