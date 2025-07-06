import { useEffect, useRef, useState } from 'react';
import DragAndDropLine from '../../assets/dragAndDropLine.svg?react';
import Trash from '../../assets/trash.svg?react';
import { useAutoResizeAndScroll } from '../../hooks/useAutoResizeAndScroll';
import { SolroutePlacePreview } from '../../types';
import useDebounce from '../../hooks/useDebounce';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';
import { useShallow } from 'zustand/shallow';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import Modal from '../global/Modal';

interface SolroutePlaceProps {
  place: SolroutePlacePreview;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

const SolroutePlace: React.FC<SolroutePlaceProps> = ({
  place,
  dragHandleProps,
}) => {
  const lineColumnRef = useRef<HTMLDivElement | null>(null);
  const infoColumnRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [memo, setMemo] = useState(place.memo);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const debouncedMemo = useDebounce(memo, 300);
  useAutoResizeAndScroll(textareaRef);

  const { deletePlaceInfo, setPlaceMemo } = useSolrouteWriteStore(
    useShallow((state) => ({
      deletePlaceInfo: state.deletePlaceInfo,
      setPlaceMemo: state.setPlaceMemo,
    }))
  );

  useEffect(() => {
    setPlaceMemo(place.id, memo);
  }, [debouncedMemo, memo, place.id, setPlaceMemo]);

  useEffect(() => {
    const lineElement = lineColumnRef.current;
    const infoElement = infoColumnRef.current;
    if (!infoElement || !lineElement) return;

    const multiple = 8; // repeat되는 'solroute-dash-under-num-repeat.svg'의 height

    const observer = new ResizeObserver(() => {
      const infoHeight = infoElement.offsetHeight;
      const targetHeight = Math.max(90, infoHeight);
      const newHeight = Math.ceil(targetHeight / multiple) * multiple;
      lineElement.style.height = `${newHeight}px`;
    });
    observer.observe(infoElement);

    return () => {
      observer.disconnect();
    };
  }, [textareaRef]);

  const onDeleteClick = () => {
    deletePlaceInfo(place.id);
  };

  return (
    <>
      <div
        ref={containerRef}
        className='flex items-start self-stretch rounded-lg bg-white'>
        <div className='flex pl-20 items-start gap-16 grow'>
          {/* line */}
          <div
            ref={lineColumnRef}
            className='flex w-9 flex-col justify-start items-center gap-4 self-stretch'>
            <img
              src={'/solroute-dash-top-num.svg'}
              alt='solroute-dash-top-num'
            />
            <div
              {...dragHandleProps}
              className='flex w-24 h-24 flex-col justify-center items-center gap-10 aspect-square'>
              <DragAndDropLine />
            </div>
            <div className='min-h-90 flex flex-col justify-start items-center self-stretch grow '>
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
              <div className='flex w-40 h-40 justify-end items-center gap-10'>
                <div
                  onClick={() => setShowDeleteModal(true)}
                  className='flex p-4 items-center rounded-lg border-1 border-solid border-primary-700'>
                  <Trash className='text-primary-700' />
                </div>
              </div>
            </div>

            {/* memo */}
            <div className='flex w-full flex-col items-start'>
              <div
                className='flex py-8 px-12 flex-col items-start gap-4 self-stretch rounded-xl border-1 border-solid
             border-secondary-100 focus-within:border-secondary-700 bg-secondary-50'>
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
      {showDeleteModal && (
        <Modal
          title='추가한 장소를 삭제하시겠습니까?'
          subtitle={memo ? '작성된 메모도 함께 삭제됩니다.' : ''}
          leftText='취소'
          rightText='삭제'
          onLeftClick={() => setShowDeleteModal(false)}
          onRightClick={() => deletePlaceInfo(place.id)}
        />
      )}
    </>
  );
};

export default SolroutePlace;
