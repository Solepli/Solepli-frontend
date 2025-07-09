import { useShallow } from 'zustand/shallow';

import { useSollectWriteStore } from '../../../store/sollectWriteStore';
import { useRef } from 'react';
import SollectWriteTitle from './SollectWriteTitle';
import SollectWriteTextarea from './SollectWriteTextarea';
import XButton from '../../../assets/xButtonForImage.svg?react';

const SollectWriteContent = () => {
  const { paragraphs, addTextParagraph, deleteParagraph } = useSollectWriteStore(
    useShallow((state) => ({
      paragraphs: state.paragraphs,
      addTextParagraph: state.addTextParagraph,
      addImageParagraph: state.addImageParagraph,
      updateParagraphContent: state.updateParagraphContent,
      deleteParagraph: state.deleteParagraph,
      setParagraphs: state.setParagraphs,
    }))
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const lastTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // 콜백 ref: 마지막 것만 저장
  const registerLastTextarea =
    (isLast: boolean) => (el: HTMLTextAreaElement | null) => {
      if (isLast) lastTextareaRef.current = el;
    };

  const handleBlankClick = () => {
    // 빈 영역 클릭 시 새 텍스트 단락 추가
    if (paragraphs.length === 0) {
      addTextParagraph();
      return;
    }

    const last = paragraphs[paragraphs.length - 1];

    // 마지막 요소가 TEXT 타입이면 포커스 설정, 아니면 새 텍스트 단락 추가
    if (last.type === 'TEXT') {
      lastTextareaRef.current?.focus();
    } else {
      addTextParagraph();
    }
  };

  return (
    <div className='w-full h-full flex flex-col overflow-hidden pb-45'>
      <div
        className='flex flex-col h-full overflow-y-auto relative'
        ref={scrollRef}>
        <SollectWriteTitle />
        <div
          className='flex-1 w-full pt-16 flex flex-col gap-16 pb-30'
          onClick={(e) => {
            if (e.target !== e.currentTarget) return; // 클릭한 영역이 빈 영역일 때만 실행
            // 빈 영역 클릭 시 새 텍스트 단락 추가
            handleBlankClick();
          }}>
          {/* 빈 영역일 때 */}
          {paragraphs.length === 0 && (
            <div
              className='w-full flex flex-1 px-16 items-up justify-start text-primary-500 text-sm font-normal leading-tight'
              onClick={handleBlankClick}>
              쏠플 경험에 대해 자세히 알려주세요!
            </div>
          )}

          {/* 내용이 존재할 때 */}
          {paragraphs.map((para, index) =>
            para.type === 'TEXT' ? (
              <SollectWriteTextarea
                key={para.seq}
                seq={para.seq}
                index={index}
                isLast={index === paragraphs.length - 1}
                register={registerLastTextarea(index === paragraphs.length - 1)}
                parentScrollRef={scrollRef}
                value={para.content}
              />
            ) : (
              <div key={para.seq} className='w-full relative'>
                <div className='absolute top-10 right-10'
                onClick={() => {
                  deleteParagraph(para.seq);
                }}>
                  <XButton />
                </div>
                <img src={para.imageUrl} className='w-full' /> 
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default SollectWriteContent;
