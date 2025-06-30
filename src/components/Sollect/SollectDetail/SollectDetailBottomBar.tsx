import { useState } from 'react';
import heart from '../../../assets/heart.svg';
import heartFill from '../../../assets/heartFill.svg';
import share from '../../../assets/share.svg';
import { useSollectDetailStore } from '../../../store/sollectDetailStore';
import {
  deleteSolmarkSollect,
  postSolmarkSollect,
} from '../../../api/sollectApi';
import { useParams } from 'react-router-dom';

const SollectDetailBottomBar = () => {
  // id 받아와야함
  //   const { id } = useSollectDetailStore();
  const { markedCount } = useSollectDetailStore();
  const [count, setCount] = useState(markedCount);

  const { sollectId } = useParams();

  const [isMarked, setIsMakred] = useState(false);

  const postMark = () => {
    setIsMakred(!isMarked);
    postSolmarkSollect(Number(sollectId));
    setCount(count + 1);
  };

  const deleteMark = () => {
    setIsMakred(!isMarked);
    deleteSolmarkSollect(Number(sollectId));
    setCount(count - 1);
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='sticky bottom-0 z-60 inset-x-0 bg-white w-full h-52 px-12 pb-8 flex justify-between items-center'>
      <div className='flex text-chip-bg-mark items-center text-sm'>
        {isMarked ? (
          <img
            src={heartFill}
            alt='heartFill'
            className='w-32 h-32'
            onClick={deleteMark}
          />
        ) : (
          <img
            src={heart}
            alt='heart'
            className='w-32 h-32'
            onClick={postMark}
          />
        )}
        <p>{count}</p>
      </div>
      <img src={share} alt='' className='w-32 h-32' onClick={copyUrl} />
    </div>
  );
};

export default SollectDetailBottomBar;
