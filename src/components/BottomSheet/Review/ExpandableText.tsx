import { useState, useEffect, useRef } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLines?: number;
}

const ExpandableText = ({ text, maxLines = 3 }: ExpandableTextProps) => {
  const [expanded, setExpanded] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [shouldTruncate, setShouldTruncate] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
      const maxHeight = lineHeight * maxLines;
      setShouldTruncate(textRef.current.scrollHeight > maxHeight);
    }
  }, [text, maxLines]);

  return (
    <div className='w-full px-16 pb-8 text-primary-900 text-sm font-normal leading-[150%]'>
      {!expanded ? (
        <div
          className="relative overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: 'vertical',
          }}
        >
          <p ref={textRef} className='whitespace-pre-line'>{text}</p>

          {shouldTruncate && (
            <button
              onClick={() => setExpanded(true)}
              className='absolute right-0 bottom-0 bg-white text-primary-400 text-sm leading-[150%] pl-1 pr-2'>
              ...더보기
            </button>
          )}
        </div>
      ) : (
        <>
          <p ref={textRef} className='whitespace-pre-line'>{text}</p>
          {shouldTruncate && (
            <button
              className='text-primary-400 text-sm leading-[150%]'
              onClick={() => setExpanded(false)}>
              접기
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ExpandableText;
