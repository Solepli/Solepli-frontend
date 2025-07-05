import React from 'react';
import heartFillWhite from '../../assets/heartFillWhite.svg';
import heartWhite from '../../assets/heartWhite.svg';
import { deleteSolmarkSollect, postSolmarkSollect } from '../../api/sollectApi';
import LoginRequiredAction from '../../auth/LoginRequiredAction';
interface SollectMarkProps {
  marked: boolean;
  id: number;
  setMarked: (marked: boolean) => void;
}

const SollectMark: React.FC<SollectMarkProps> = ({ marked, setMarked, id }) => {
  const handleClick = () => {
    setMarked(!marked);
    
    if(marked){
      deleteSolmarkSollect(id);
    }else{
      postSolmarkSollect(id);
    }
  };




  return (
    <LoginRequiredAction onAction={handleClick}>
      <div
        className='w-28 h-28 bg-black/10 rounded-lg border-1 border-black/50 backdrop-blur-[2px] flex justify-center items-center'>
        <img src={marked ? heartFillWhite : heartWhite} alt='heart' />
      </div>
    </LoginRequiredAction>
  );
};

export default SollectMark;
