import { useEffect, useState } from 'react';
import heart from '../../../assets/heart.svg';
import heartFill from '../../../assets/heartFill.svg';
import share from '../../../assets/share.svg';
import { useSollectDetailStore } from '../../../store/sollectDetailStore';
import {
  deleteSolmarkSollect,
  postSolmarkSollect,
} from '../../../api/sollectApi';
import { useParams } from 'react-router-dom';
import LoginRequiredAction from '../../../auth/LoginRequiredAction';
import { toast } from 'react-toastify';
import Success from '../../global/Success';

const SollectDetailBottomBar = () => {
  const { markedCount, isMarked } = useSollectDetailStore();
  const [count, setCount] = useState(markedCount);

  const { sollectId } = useParams();

  const [marked, setMakred] = useState(isMarked);

  const postMark = () => {
    setMakred(!marked);
    postSolmarkSollect(Number(sollectId));
    setCount(count + 1);
  };

  const deleteMark = () => {
    setMakred(!marked);
    deleteSolmarkSollect(Number(sollectId));
    setCount(count - 1);
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (e) {
      console.log(e);
    }

    toast(<Success title='링크가 복사되었습니다' />);
  };

  useEffect(() => {
    setMakred(isMarked);
    setCount(markedCount);
  }, [isMarked, markedCount]);

  return (
    <div className='sticky bottom-0 z-60 inset-x-0 bg-white w-full h-52 px-12 pb-8 flex justify-between items-center'>
      <div className='flex text-chip-bg-mark items-center text-sm'>
        {marked ? (
          <LoginRequiredAction onAction={deleteMark}>
            <img src={heartFill} alt='heartFill' className='w-32 h-32' />
          </LoginRequiredAction>
        ) : (
          <LoginRequiredAction onAction={postMark}>
            <img src={heart} alt='heart' className='w-32 h-32' />
          </LoginRequiredAction>
        )}
        <p>{count}</p>
      </div>
      <img src={share} alt='' className='w-32 h-32 button' onClick={copyUrl} />
    </div>
  );
};

export default SollectDetailBottomBar;
