import { useEffect, useRef } from 'react';

interface SollectWriteTextareaProps {
  parentScrollRef: React.RefObject<HTMLDivElement | null>;
}

const SollectWriteTextarea: React.FC<SollectWriteTextareaProps> = ({
  parentScrollRef,
}) => {
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleScroll = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    const scrollContainer = parentScrollRef.current;
    const prevScroll = scrollContainer?.scrollTop ?? 0;

    target.style.height = 'auto'; // Reset height first
    target.style.height = `${target.scrollHeight}px`; // Then set to scrollHeight

    if (scrollContainer) scrollContainer.scrollTop = prevScroll;
  };

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
        onChange={handleScroll}
        className='w-full resize-none border-none outline-none bg-transparent overflow-hidden'
      />
    </div>
  );
};

export default SollectWriteTextarea;
