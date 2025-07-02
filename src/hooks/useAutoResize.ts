import { useCallback, useEffect } from 'react';
import { SCALE_16_14 } from '../constants';

export const useAutoResize = (
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
) => {
  const handleResize = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    const emptySpace = textarea.scrollHeight * (1 - SCALE_16_14);
    textarea.style.marginBottom = `-${emptySpace}px`;
  }, [textareaRef]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.addEventListener('input', handleResize);

    return () => {
      textarea.removeEventListener('input', handleResize);
    };
  }, [textareaRef, handleResize]);
};
