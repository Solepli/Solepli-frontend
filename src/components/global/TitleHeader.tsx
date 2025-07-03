import React from 'react';
import arrow from '../../assets/arrow.svg';
import { TitleHeaderProps } from '../../interface';

const TitleHeader: React.FC<TitleHeaderProps> = ({ title, onClick, center }) => {
  return (
    <header
      className={`w-full flex items-center py-8 fixed z-10 bg-white top-0 ${center ? 'text-center' : ''}`}>
      <img
        src={arrow}
        alt='arrow'
        className='rotate-180 w-24 h-24 m-9'
        onClick={onClick}
      />
      <p className='text-primary-950 text-lg font-bold w-full pr-42'>{title}</p>
    </header>
  );
};

export default TitleHeader;
