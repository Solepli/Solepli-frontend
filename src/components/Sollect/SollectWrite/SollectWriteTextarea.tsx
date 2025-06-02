import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.focus();
    textareaRef.current.value = value || ''; // Set initial value if provided
  }, [value]);

  useEffect(() => {
    if (!textareaRef.current) return;

    const target = textareaRef.current;
    const scrollContainer = parentScrollRef.current;

    target.style.height = 'auto'; // Reset height first
    target.style.height = `${target.scrollHeight}px`; // Then set to scrollHeight

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight; // Scroll to the bottom
    } 
  }, [value, parentScrollRef]);

  const handleScroll = () => {
    if (!textareaRef.current) return;

    const target = textareaRef.current;
    const scrollContainer = parentScrollRef.current;

    target.style.height = 'auto'; // Reset height first
    target.style.height = `${target.scrollHeight}px`; // Then set to scrollHeight

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight; // Scroll to the bottom
    }
  };

  return (
    <div className='w-full flex flex-1 flex-col h-full'>
      <textarea
        ref={(el) => {
          textareaRef.current = el;
          register(el); // Register the textarea element
        }}
        onChange={(e) => {
          caretRef.current = e.currentTarget.selectionStart ?? 0;
          handleScroll();
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
