import React from 'react';

interface SollectWriteHeaderProps {
  leftText: string;
  rightText: string;
  onLeft: () => void;
  onRight: () => void;
  title?:string;
}
const SollectWriteHeader: React.FC<SollectWriteHeaderProps> = ({
  leftText,
  rightText,
  onLeft,
  onRight,
  title
}) => {
  return (
    <div className='w-full h-50 py-4 flex justify-between items-center text-primary-950 text-sm font-normal leading-tight bg-white'>
      <div
        className='w-42 h-42 pl-16 inline-flex justify-start items-center button'
        onClick={onLeft}>
        {leftText}
      </div>
      <div className='text-primary-950 font-bold'>
        {title}
      </div>
      <div
        className='w-42 h-42 pr-16 inline-flex justify-end items-center button'
        onClick={onRight}>
        {rightText}
      </div>
    </div>
  );
};
export default SollectWriteHeader;
