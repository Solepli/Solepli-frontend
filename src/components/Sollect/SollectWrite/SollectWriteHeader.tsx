import React from 'react';

interface SollectWriteHeaderProps {
  leftText: string;
  rightText: string;
  onLeft: () => void;
  onRight: () => void;
}
const SollectWriteHeader: React.FC<SollectWriteHeaderProps> = ({
  leftText,
  rightText,
  onLeft,
  onRight,
}) => {
  return (
    <div className='w-full h-50 py-4 flex justify-between items-center text-primary-950 text-sm font-normal leading-tight bg-white'>
      <div
        className='w-42 h-42 pl-16 inline-flex justify-start items-center'
        onClick={onLeft}>
        {leftText}
      </div>
      <div
        className='w-42 h-42 pr-16 inline-flex justify-end items-center'
        onClick={onRight}>
        {rightText}
      </div>
    </div>
  );
};
export default SollectWriteHeader;
