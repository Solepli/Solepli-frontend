import React from 'react';

interface ReviewTagProps {
  text: string;
  selected?: boolean;
  onClick?: () => void;
}

const ReviewTag: React.FC<ReviewTagProps> = ({ text, selected, onClick }) => {
  const baseStyle =
    'min-w-[120px] h-40 flex flex-row items-center justify-center py-[10px] px-[8px] border-[1px] border-solid border-primary-100 rounded-[4px]';
  const selectedStyle = selected
    ? 'bg-secondary-600 text-secondary-50'
    : 'text-primary-900';

  return (
    <div className={`${baseStyle} ${selectedStyle}`} onClick={onClick}>
      <div className='text-normal text-sm leading-[150%] tracking-[-0.18px] whitespace-nowrap'>
        {text}
      </div>
    </div>
  );
};

export default ReviewTag;
