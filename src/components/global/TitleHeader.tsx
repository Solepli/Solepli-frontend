import React from 'react';
import arrow from '../../assets/arrow.svg';
import { TitleHeaderProps } from '../../interface';

const TitleHeader: React.FC<TitleHeaderProps> = ({ title, onClick }) => {
  return (
    <header className='w-full flex items-center py-8 fixed z-10 bg-white'>
      <img
        src={arrow}
        alt='arrow'
        className='rotate-180 w-24 h-24 m-9'
        onClick={onClick}
      />
      <p className='text-primary-950 text-lg font-bold'>{title}</p>
    </header>
  );
};

export default TitleHeader;
