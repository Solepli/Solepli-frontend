import { useShallow } from 'zustand/shallow';

import { useSollectWriteStore } from '../../../store/sollectWriteStore';
import { RefObject, useRef } from 'react';
import SollectWriteTitle from './SollectWriteTitle';
import SollectWriteTextarea from './SollectWriteTextarea';
import XButton from '../../../assets/xButtonForImage.svg?react';

const SollectWriteContent = ({
  ref,
}: {
  ref: RefObject<HTMLDivElement | null>;
}) => {
  const { paragraphs, addTextParagraph, deleteParagraph } =
    useSollectWriteStore(
      useShallow((state) => ({
        paragraphs: state.paragraphs,
        setParagraphs: state.setParagraphs,
        addTextParagraph: state.addTextParagraph,
        deleteParagraph: state.deleteParagraph,
      }))
    );

  const lastTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // 콜백 ref: 마지막 것만 저장
  // const registerLastTextarea =
  //   (isLast: boolean) => (el: HTMLTextAreaElement | null) => {
  //     if (isLast) lastTextareaRef.current = el;
  //   };

  const handleBlankClick = () => {
    // 빈 영역 클릭 시 새 텍스트 단락 추가
    if (paragraphs.length === 0) {
      addTextParagraph(); // 첫 번째 위치에 새 단락 추가
      return;
    }

    // console.log('paragraphs', paragraphs);
    const last = paragraphs[paragraphs.length - 1];
    // const lastValues = [...refMap.current.values()];
    // const last = lastValues[lastValues.length - 1];
    // console.log('last', last);

    // 마지막 요소가 TEXT 타입이면 포커스 설정, 아니면 새 텍스트 단락 추가
    if (last.type === 'TEXT') {
      lastTextareaRef.current?.focus();
      // console.log('lastTextareaRef', lastTextareaRef.current);
    } else {
      // setParagraphs([...paragraphs, createTextParagraph()]);
      addTextParagraph();
    }
  };

  // console.log('paragraphs in SollectWriteContent:', paragraphs);

  return (
    <div className='flex flex-col h-full overflow-y-auto' ref={ref}>
      <SollectWriteTitle />
      <div
        className='flex-1 w-full pt-16 flex flex-col gap-16 pb-50 button'
        onClick={(e) => {
          if (e.target !== e.currentTarget) return; // 클릭한 영역이 빈 영역일 때만 실행
          // 빈 영역 클릭 시 새 텍스트 단락 추가
          handleBlankClick();
        }}>
        {/* 빈 영역일 때 */}
        {paragraphs.length === 0 && (
          <div
            className='w-full flex flex-1 px-16 items-up justify-start text-primary-500 text-sm font-normal leading-tight button'
            onClick={handleBlankClick}>
            쏠플 경험에 대해 자세히 알려주세요!
          </div>
        )}

        {/* 내용이 존재할 때 */}
        {paragraphs.map((para, index) =>
          para.type === 'TEXT' ? (
            <SollectWriteTextarea
              key={para.seq} // seq와 현재 시간을 조합하여 고유 키 생성
              seq={para.seq}
              index={index} // 현재 인덱스 전달
              value={para.content}
              contentRef={ref}
              lastTextareaRef={lastTextareaRef}
            />
          ) : (
            <div key={para.seq} className='w-full relative'>
              <div
                className='absolute top-0 right-0 p-8'
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
  );
};
export default SollectWriteContent;
