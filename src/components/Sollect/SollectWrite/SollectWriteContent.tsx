import { useShallow } from 'zustand/shallow';

import { useSollectWriteStore } from '../../../store/sollectWriteStore';
import { useEffect, useRef } from 'react';
import SollectWriteTitle from './SollectWriteTitle';

const SollectWriteTextarea: React.FC = () => {
  useEffect(() => {
    textareaRef.current?.focus({ preventScroll: true });
  }, []);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div
      className='w-full h-auto flex items-start justify-start'
      onClick={(e) => {
        e.stopPropagation(); // 클릭 이벤트 전파 방지
      }}>
      <textarea
        ref={textareaRef}
        rows={1}
        onChange={(e) => {
          const target = e.target;
          target.style.height = 'auto'; // Reset height first
          target.style.height = `${target.scrollHeight}px`; // Then set to scrollHeight
        }}
        className='w-full resize-none border-none outline-none bg-transparent overflow-hidden'
      />
    </div>
  );
};

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

  const makeTextarea = () => {
    addTextParagraph();
    return <SollectWriteTextarea />;
  };

  return (
    <div className='w-full h-full overflow-hidden flex flex-col mb-45'>
      <div className='flex flex-col h-full overflow-y-auto relative'>
        <SollectWriteTitle />
        <div
          className='flex-1 w-full pt-20 px-16 flex flex-col gap-16'
          onClick={makeTextarea}>
            {paragraphs.length === 0 && (
              <div className='w-full flex items-center justify-start text-primary-500 text-sm font-normal leading-tight'>
                쏠플 경험에 대해 자세히 알려주세요!
              </div>
            )}

            {paragraphs.map((para) =>
              para.type === 'TEXT' ? (
                <SollectWriteTextarea key={para.seq} />
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
