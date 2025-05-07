import React from 'react';
import xButtonCircle from '../assets/xButtonCircle.svg';

interface XButtonCircleProps {
  onClickFunc: () => void;
}

const XButtonCircle: React.FC<XButtonCircleProps> = ({ onClickFunc }) => {
  return (
    <button className='w-24 h-24' onClick={onClickFunc}>
      <img className='w-24 h-24' src={xButtonCircle} alt='xButtonCircle' />
    </button>
  );
};
export default XButtonCircle;
