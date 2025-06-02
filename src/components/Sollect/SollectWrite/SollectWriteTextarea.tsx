import { useCallback, useLayoutEffect, useRef } from 'react';
import { useShallow } from 'zustand/shallow';
import { useSollectWriteStore } from '../../../store/sollectWriteStore';

interface SollectWriteTextareaProps {
  seq: number;
  index: number;
  parentScrollRef: React.RefObject<HTMLDivElement | null>;
  isLast: boolean;
  register: (el: HTMLTextAreaElement | null) => void;
  value?: string;
}

const SollectWriteTextarea: React.FC<SollectWriteTextareaProps> = ({
  seq,
  parentScrollRef,
  register,
  value,
}) => {
  const { updateParagraphContent, deleteParagraph, setFocus } =
    useSollectWriteStore(
      useShallow((state) => ({
        maxSeq: state.seq,
        focusSeq: state.focusSeq,
        paragraphs: state.paragraphs,
        setFocus: state.setFocus,
        addTextParagraph: state.addTextParagraph,
        setParagraphs: state.setParagraphs,
        updateParagraphContent: state.updateParagraphContent,
        deleteParagraph: state.deleteParagraph,
      }))
    );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const caretRef = useRef<number | null>(null);

  const adjustLayout = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;

    const sc = parentScrollRef.current; // 스크롤 컨테이너

    ta.style.height = 'auto'; // 1) 높이 초기화
    ta.style.height = `${ta.scrollHeight}px`; // 2) 실제 높이로 재설정

    if (sc) sc.scrollTop = sc.scrollHeight; // 3) 항상 맨 아래로
  }, [parentScrollRef]); // 부모 스크롤 DOM 이 바뀔 때만 새로 만듦

  /** value(초기값·외부 변경) 반영 직후 레이아웃 확정 */
  useLayoutEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.focus(); // 포커스
    textareaRef.current.value = value || ''; // prop→DOM
    adjustLayout(); // 👈 여기서 한 번만 호출
  }, [value, adjustLayout]);

  return (
    <div className='w-full flex flex-1 flex-col h-full'>
      <textarea
        ref={(el) => {
          textareaRef.current = el;
          register(el); // Register the textarea element
        }}
        onChange={(e) => {
          caretRef.current = e.currentTarget.selectionStart ?? 0;
          adjustLayout(); // Adjust layout on change
        }}
        onFocus={(e) => {
          setFocus(seq, e.target);
          caretRef.current = e.currentTarget.selectionStart ?? 0; // Save caret position
        }}
        onBlur={(e) => {
          if (e.target.value.trim() === '') {
            // If the content is empty, remove the paragraph
            deleteParagraph(seq);
          }
          updateParagraphContent(seq, e.target.value.trim());
        }}
        onSelect={(e) =>
          (caretRef.current = e.currentTarget.selectionStart ?? 0)
        }
        onKeyUp={(e) =>
          (caretRef.current = e.currentTarget.selectionStart ?? 0)
        }
        className='w-full h-full resize-none border-none outline-none bg-transparent'
      />
    </div>
  );
};

export default SollectWriteTextarea;
