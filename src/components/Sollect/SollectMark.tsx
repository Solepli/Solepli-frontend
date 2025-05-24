import React from 'react';
import heartFillWhite from '../../assets/heartFillWhite.svg';
import heartWhite from '../../assets/heartWhite.svg';
interface SollectMarkProps {
  marked: boolean;
  setMarked: (marked: boolean) => void;
}

const SollectMark: React.FC<SollectMarkProps> = ({ marked, setMarked }) => {
  const handleClick = () => {
    setMarked(!marked);
  };
  return (
    <div
      className='w-28 h-28 bg-black/10 rounded-lg border-1 border-black/50 backdrop-blur-[2px] flex justify-center items-center'
      onClick={handleClick}>
      <img src={marked ? heartFillWhite : heartWhite} alt='heart' />
    </div>
  );
};

export default SollectMark;
