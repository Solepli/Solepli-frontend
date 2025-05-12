import { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLines?: number;
}

const ExpandableText = ({ text, maxLines = 3 }: ExpandableTextProps) => {
  const [expanded, setExpanded] = useState(false);

  const shouldTruncate =
    text.split('\n').length > maxLines || text.length > 100;

  return (
    <div className='w-full px-16 pb-12 text-primary-900 text-xs font-normal leading-relaxed'>
      {!expanded ? (
        <div className={`relative line-clamp-${maxLines}`}>
          <p className='whitespace-pre-line'>{text}</p>

          {shouldTruncate && (
            <button
              onClick={() => setExpanded(true)}
              className='absolute right-0 bottom-0 bg-white text-primary-400 text-xs pl-1 pr-2'>
              더보기
            </button>
          )}
        </div>
      ) : (
        <>
          <p className='whitespace-pre-line'>{text}</p>
          {shouldTruncate && (
            <button
              className='text-primary-400 text-xs'
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
