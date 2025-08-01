import { RefObject, useCallback, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/shallow';
import { useSollectWriteStore } from '../../../store/sollectWriteStore';

interface SollectWriteTextareaProps {
  seq: number;
  index: number; // Optional index for tracking focus
  contentRef: RefObject<HTMLDivElement | null>;
  lastTextareaRef?: RefObject<HTMLTextAreaElement | null>;
  value?: string;
}

const SollectWriteTextarea: React.FC<SollectWriteTextareaProps> = ({
  seq,
  index,
  contentRef,
  lastTextareaRef,
  value,
}) => {
  const { paragraphs, deleteParagraph, setFocus } = useSollectWriteStore(
    useShallow((state) => ({
      getNextSeq: state.getNextSeq,
      paragraphs: state.paragraphs,
      setFocus: state.setFocus,
      setParagraphs: state.setParagraphs,
      updateParagraphContent: state.updateParagraphContent,
      deleteParagraph: state.deleteParagraph,
      setCaretPositoin: state.setCaretPosition,
    }))
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const vv = window.visualViewport;

  // useEffect(() => {
  //   if (isFocused) {
  //     focusTextareaRef.current = textareaRef.current; // 현재 textarea를 focusTextareaRef에 저장
  //     focusTextareaRef.index = index; // 현재 인덱스 저장
  //   } else {
  //     focusTextareaRef.current = null; // 포커스가 벗어나면 null로 설정
  //   }
  //   console.log('focusTextareaRef updated:', focusTextareaRef.current);
  // }, [index, isFocused]);

  useEffect(() => {
    if (lastTextareaRef) {
      lastTextareaRef.current = textareaRef.current; // 콜백 ref로 마지막 textarea 저장
    }
  }, [lastTextareaRef]);

  const adjustLayout = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;

    const content = contentRef.current; // 스크롤 컨테이너
    if (!content) return;

    ta.style.height = 'auto'; // 1) 높이 초기화
    ta.style.height = `${ta.scrollHeight}px`; // 2) 실제 높이로 재설정

    content.scrollTop = content.scrollHeight; // 3) 항상 맨 아래로
  }, [contentRef, textareaRef]); // 부모 스크롤 DOM 이 바뀔 때만 새로 만듦

  /** value(초기값·외부 변경) 반영 직후 레이아웃 확정 */
  useEffect(() => {
    if (!textareaRef.current) return;
    if (value !== undefined) textareaRef.current.value = value;
    textareaRef.current.focus(); // 포커스
    adjustLayout(); // 👈 여기서 한 번만 호출
  }, [adjustLayout, value]);

  // useEffect(() => {
  //   console.log('paragraphs in SollectWriteTextarea:', paragraphs);
  // }, [paragraphs]);

  //키보드만큼 추가된 높이를 다시 textarea 길이에 맞춰 변경
  // safari에선 되나 chrome에선 안됨
  // useLayoutEffect(() => {
  //   if (isFocused) return;
  //   const ta = textareaRef.current;
  //   if (!ta) return;

  //   ta.style.height = 'auto';
  //   const newHeight = ta.scrollHeight;
  //   // Force layout reflow to ensure browser applies new height
  //   void ta.offsetHeight;
  //   ta.style.height = `${newHeight}px`;
  // }, [isFocused]);

  if (!vv) return <div>Visual viewport not supported</div>;

  function focus() {
    // console.log('focus called');
    // setIsFocused(true);
    // console.log(textareaRef.current);

    window.scrollTo(0, 1); // Scroll to the top to avoid keyboard overlap
    // focusTextareaRef.current = textareaRef.current; // 현재 textarea를 focusTextareaRef에 저장
    // focusTextareaRef.seq = seq; // 현재 인덱스 저장
    // console.log('focusTextareaRef updated:', focusTextareaRef.current);
    // caretRef.current = e.currentTarget.selectionStart ?? 0;
    // setIsFocused(true);
    setFocus(seq, textareaRef.current); // 상태 업데이트
    setTimeout(() => {
      console.log('focus timeout');
      contentRef.current!.style.height = `${vv!.height - 95}px`; // Adjust height based on viewport
      window.scrollTo(0, 1); // Scroll to the top to avoid keyboard overlap
    }, 0);
  }

  function blur(e: React.FocusEvent<HTMLTextAreaElement>) {
    requestAnimationFrame(() => {
      console.log('blur animation frame');
      contentRef.current!.style.height = `100dvh`; // Adjust height based on viewport
    });
    // setIsFocused(false);

    // If the content is empty, remove the paragraph
    if (e.target.value.trim() === '') {
      console.log('Empty content, deleting paragraph');
      console.log('index:', index);
      deleteParagraph(seq);
      console.log('paragraphs after delete:', paragraphs);
      return;
    }

    // Update the paragraph content
    setTimeout(() => {
      paragraphs[index].content = e.target.value; // Update local state
      // updateParagraphContent(seq, e.target.value);
    }, 0);
  }

  return (
    <div className='w-full h-auto flex flex-col px-16'>
      <textarea
        ref={textareaRef}
        onFocus={focus}
        onBlur={blur}
        onChange={() => {
          adjustLayout(); // Adjust layout on change
        }}
        className='w-full h-full resize-none border-none outline-none bg-transparent'
      />
    </div>
  );
};

export default SollectWriteTextarea;
