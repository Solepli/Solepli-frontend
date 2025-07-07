import React from 'react';
import Arrow from '../../assets/arrowLeft.svg?react';
import { TitleHeaderProps } from '../../interface';

const TitleHeader: React.FC<TitleHeaderProps> = ({
  title,
  onClick,
  center,
}) => {
  return (
    <header
      className={`w-full flex items-center py-8 fixed z-10 bg-white top-0 ${center ? 'text-center' : ''}`}>
      <div className='p-9 flex items-center justify-content' onClick={onClick}>
        <Arrow />
      </div>
      <p className='text-primary-950 text-base font-bold leading-normal w-full pr-42'>
        {title}
      </p>
    </header>
  );
};

export default TitleHeader;
