import React from 'react';

interface HeaderBothTextProps {
  leftText: string;
  rightText: string;
  onLeft: () => void;
  onRight: () => void;
  validation: boolean;
}
const HeaderBothText: React.FC<HeaderBothTextProps> = ({
  leftText,
  rightText,
  onLeft,
  onRight,
  validation = false,
}) => {
  return (
    <div className='w-full h-50 py-4 flex justify-between items-center text-sm leading-normal bg-white'>
      <div
        className='w-42 h-42 pl-16 inline-flex justify-start items-center text-primary-950 font-normal tracking-[-0.35px]'
        onClick={onLeft}>
        {leftText}
      </div>
      <div
        className={`w-42 h-42 pr-16 inline-flex justify-end items-center ${
          validation
            ? 'text-primary-950 font-bold tracking-[-0.21px]'
            : 'text-primary-300 font-normal tracking-[-0.35px]'
        }`}
        onClick={onRight}>
        {rightText}
      </div>
    </div>
  );
};
export default HeaderBothText;
