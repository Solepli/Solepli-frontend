import React from 'react';
import xButton from '../assets/xButton.svg';

interface XButtonProps {
  onClickFunc: () => void;
  detail?:boolean
}

const XButton: React.FC<XButtonProps> = ({ onClickFunc, detail }) => {
  console.log(detail);
  return (
    <button
      className={`w-34 h-34 flex p-4 justify-center items-center gap-10 shrink-0 bg-primary-100 ${detail ?'rounded-lg' : 'rounded-xl'}`}
      onClick={onClickFunc}>
      <img className='w-24 h-24' src={xButton} alt='xButton' />
    </button>
  );
};
export default XButton;
