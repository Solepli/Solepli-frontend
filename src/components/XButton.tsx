import React from 'react';

import xButton from '../assets/xButton.svg';

const XButton: React.FC = () => {
  return (
    <div className='w-34 h-34 flex p-4 justify-center items-center gap-10 shrink-0 rounded-[12px] bg-primary-100'>
      <img className='w-24 h-24' src={xButton} alt='xButton' />
    </div>
  );
};
export default XButton;
