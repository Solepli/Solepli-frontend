import { useShallow } from 'zustand/shallow';

import { useSollectWriteStore } from '../../../store/sollectWriteStore';
import { useRef } from 'react';
import SollectWriteTitle from './SollectWriteTitle';
import SollectWriteTextarea from './SollectWriteTextarea';

const SollectWriteContent = () => {
  const { paragraphs, addTextParagraph } = useSollectWriteStore(
    useShallow((state) => ({
      seq: state.seq,
      paragraphs: state.paragraphs,
      addTextParagraph: state.addTextParagraph,
      addImageParagraph: state.addImageParagraph,
      updateParagraphContent: state.updateParagraphContent,
      deleteParagraph: state.deleteParagraph,
    }))
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  const makeTextarea = () => {
    addTextParagraph();
    return <SollectWriteTextarea parentScrollRef={scrollRef} />;
  };

  return (
    <div className='w-full h-full overflow-hidden flex flex-col mb-45'>
      <div
        className='flex flex-col h-full overflow-y-auto relative'
        ref={scrollRef}>
        <SollectWriteTitle />
        <div
          className='flex-1 w-full pt-20 px-16 flex flex-col gap-16'
          onClick={makeTextarea}>
          {/* 빈 영역일 때 */}
          {paragraphs.length === 0 && (
            <div className='w-full flex items-center justify-start text-primary-500 text-sm font-normal leading-tight'>
              쏠플 경험에 대해 자세히 알려주세요!
            </div>
          )}

          {/* 내용이 존재할 때 */}
          {paragraphs.map((para) =>
            para.type === 'TEXT' ? (
              <SollectWriteTextarea
                key={para.seq}
                parentScrollRef={scrollRef}
              />
            ) : (
              <img key={para.seq} src={para.content} className='w-full' /> // 이미지
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default SollectWriteContent;
