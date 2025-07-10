import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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
  const {
    updateParagraphContent,
    deleteParagraph,
    setFocus,
    setCaretPositoin,
  } = useSollectWriteStore(
    useShallow((state) => ({
      setFocus: state.setFocus,
      updateParagraphContent: state.updateParagraphContent,
      deleteParagraph: state.deleteParagraph,
      setCaretPositoin: state.setCaretPosition,
    }))
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const caretRef = useRef<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const adjustLayout = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;

    const sc = parentScrollRef.current; // 스크롤 컨테이너

    ta.style.height = 'auto'; // 1) 높이 초기화
    const visualHeight = window.visualViewport?.height || window.innerHeight;
    const keyboardOffset = window.innerHeight - visualHeight + 60;
    ta.style.height = `${ta.scrollHeight + keyboardOffset}px`; // 2) 실제 높이로 재설정 + 키보드 높이

    if (sc) sc.scrollTop = sc.scrollHeight; // 3) 항상 맨 아래로
  }, [parentScrollRef]); // 부모 스크롤 DOM 이 바뀔 때만 새로 만듦

  /** value(초기값·외부 변경) 반영 직후 레이아웃 확정 */
  useLayoutEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.focus(); // 포커스
    textareaRef.current.value = value || ''; // prop→DOM
    adjustLayout(); // 👈 여기서 한 번만 호출
  }, [value, adjustLayout]);

  //키보드만큼 추가된 높이를 다시 textarea 길이에 맞춰 변경
  //safari에선 되나 chrome에선 안됨
  useLayoutEffect(() => {
    if (isFocused) return;
    const ta = textareaRef.current;
    if (!ta) return;

    ta.style.height = 'auto';
    const newHeight = ta.scrollHeight;
    // Force layout reflow to ensure browser applies new height
    void ta.offsetHeight;
    ta.style.height = `${newHeight}px`;
  }, [isFocused]);

  return (
    <div className='w-full h-auto flex flex-col px-16'>
      <textarea
        ref={(el) => {
          textareaRef.current = el;
          register(el); // Register the textarea element
        }}
        onChange={(e) => {
          caretRef.current = e.currentTarget.selectionStart ?? 0;
          setCaretPositoin(caretRef.current);
          adjustLayout(); // Adjust layout on change
        }}
        onFocus={(e) => {
          setFocus(seq, e.target);
          caretRef.current = e.currentTarget.selectionStart ?? 0;
          setIsFocused(true);
        }}
        onBlur={(e) => {
          setIsFocused(false);
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
