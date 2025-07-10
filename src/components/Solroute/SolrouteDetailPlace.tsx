import { useEffect, useRef } from 'react';
import { SolroutePlacePreview } from '../../types';
import { SCALE_16_14 } from '../../constants';

interface SolroutePlaceProps {
  place: SolroutePlacePreview;
}

const SolrouteDetailPlace: React.FC<SolroutePlaceProps> = ({ place }) => {
  const lineColumnRef = useRef<HTMLDivElement | null>(null);
  const infoColumnRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lineElement = lineColumnRef.current;
    const infoElement = infoColumnRef.current;
    if (!infoElement || !lineElement) return;

    const multiple = 8; // repeat되는 'solroute-dash-under-num-repeat.svg'의 height

    const observer = new ResizeObserver(() => {
      const infoHeight = infoElement.offsetHeight;
      const targetHeight = Math.max(60, infoHeight);
      const newHeight = Math.ceil(targetHeight / multiple) * multiple;
      lineElement.style.height = `${newHeight}px`;
    });
    observer.observe(infoElement);

    return () => {
      observer.disconnect();
    };
  }, [textareaRef]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    const emptySpace = textarea.scrollHeight * (1 - SCALE_16_14);
    textarea.style.marginBottom = `-${emptySpace}px`;
  }, [place.memo]);

  return (
    <div ref={containerRef} className='flex items-start self-stretch'>
      <div className='flex pl-20 items-start gap-16 grow'>
        {/* line */}
        <div
          ref={lineColumnRef}
          className='flex w-9 flex-col justify-start items-center gap-4 self-stretch'>
          <img src={'/solroute-dash-top-num.svg'} alt='solroute-dash-top-num' />

          {/* 숫자 상자 */}
          <div className='flex w-24 h-24 flex-col justify-center items-center gap-10 aspect-square rounded-lg bg-secondary-700'>
            <span className='text-secondary-50 text-xs font-bold leading-none'>
              {String(place.seq).padStart(2, '0')}
            </span>
          </div>

          {/* 라인 이어서 */}
          <div className='flex flex-col justify-start items-center self-stretch grow '>
            <img
              src={'/solroute-dash-under-num-start.svg'}
              alt='solroute-dash-under-num-start'
            />
            <div
              className={`self-stretch grow bg-repeat-y bg-top bg-[url("/solroute-dash-under-num-repeat.svg")]`}
            />
            <img
              src={'/solroute-dash-under-num-end.svg'}
              alt='solroute-dash-under-num-end'
            />
          </div>
        </div>

        {/* info */}
        <div
          ref={infoColumnRef}
          className='flex py-12 pr-16 flex-col justify-center items-start gap-8 grow'>
          {/* place */}
          <div className='flex items-center gap-10 self-stretch'>
            <div className='flex flex-col items-start gap-2 grow'>
              <div className='flex justify-center items-center gap-8'>
                <div className='text-primary-950 text-center text-base not-italic font-bold leading-24 tracking-tight'>
                  {place.name}
                </div>
                <div className='text-primary-400 text-xs not-italic font-normal leading-18 tracking-[-0.18px]'>
                  {place.detailedCategory}
                </div>
              </div>
              <div className='text-primary-400 text-sm not-italic font-normal leading-[120%] tracking-[-0.21px]'>
                {place.address}
              </div>
            </div>
          </div>

          {/* memo */}
          {place.memo && (
            <div className='flex w-full flex-col items-start'>
              <div
                className='flex w-full py-8 px-12 flex-col items-start gap-4 self-stretch rounded-xl border-1 border-solid
             border-secondary-100 focus-within:border-secondary-700 bg-secondary-50'>
                <textarea
                  ref={textareaRef}
                  value={place.memo}
                  placeholder='메모를 남겨보세요.'
                  rows={1}
                  disabled
                  maxLength={100}
                  className='text-primary-950 placeholder:text-secondary-500
                focus:outline-none focus:ring-0 resize-none
                self-stretch not-italic font-normal leading-[150%] tracking-[-0.35px]
                text-base scale-[var(--scale-16-14)] origin-top-left w-[calc(100%/var(--scale-16-14))]'
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolrouteDetailPlace;
