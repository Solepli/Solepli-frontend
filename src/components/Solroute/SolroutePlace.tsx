import { useEffect, useRef, useState } from 'react';
import DragAndDropLine from '../../assets/dragAndDropLine.svg?react';
import Trash from '../../assets/trash.svg?react';

const SolroutePlace = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [memo, setMemo] = useState('');

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length > 100) return;

    setMemo(newValue);
    if (textareaRef.current) {
      textareaRef.current.style.height = `auto`;
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // textarea의 크기 변경 감지시 스크롤 처리
  useEffect(() => {
    const textareaElement = textareaRef.current;
    const containerElement = containerRef.current;
    const visualViewport = window.visualViewport;

    if (!textareaElement || !containerElement || !visualViewport) return;

    const observer = new ResizeObserver(() => {
      const rect = containerElement.getBoundingClientRect();

      // (컨테이너 높이 <= 보이는 화면 높이) : 컨테이너가 화면에 완전히 보임
      if (rect.bottom <= visualViewport.height) return;

      const scrollAmount = window.scrollY + rect.bottom - visualViewport.height;

      window.scrollTo({
        top: scrollAmount,
        behavior: 'smooth',
      });
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
          <img src={'/solrouteLineDash.svg'} alt='SolrouteLineDash' />
          <div className='flex w-24 h-24 flex-col justify-center items-center gap-10 aspect-square rounded-lg bg-secondary-700'>
            <DragAndDropLine />
          </div>
          <div
            className={`min-h-90 self-stretch grow bg-repeat-y bg-top bg-[url("/solrouteLineDash.svg")]`}
          />
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
                onChange={handleChangeText}
                placeholder='메모를 남겨보세요.'
                rows={1}
                className='text-primary-950 placeholder:text-secondary-500
                focus:outline-none focus:ring-0 resize-none 
                self-stretch text-sm not-italic font-normal leading-[150%] tracking-[-0.35px]'
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
