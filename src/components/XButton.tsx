import React from 'react';
import xButton from '../assets/xButton.svg';

interface XButtonProps {
  onClickFunc: () => void;
}

const XButton: React.FC<XButtonProps> = ({ onClickFunc }) => {
  return (
    <button
      className='w-34 h-34 flex p-4 justify-center items-center gap-10 shrink-0 rounded-[12px] bg-primary-100'
      onClick={onClickFunc}>
      <img className='w-24 h-24' src={xButton} alt='xButton' />
    </button>
  );
};
export default XButton;
