import React from 'react';
import heartFill from '../../assets/heartFill.svg';
import { useNavigate } from 'react-router-dom';
import { SolmarkPlaceList } from '../../types';
import { useSolmarkStore } from '../../store/solmarkStore';
import { useShallow } from 'zustand/shallow';

interface SolmarkPlaceListProps {
  list: SolmarkPlaceList;
  isSolroute?: boolean;
}

const SolmarkPlaceListCard: React.FC<SolmarkPlaceListProps> = ({ list, isSolroute=false }) => {
  const navigate = useNavigate();
  const { setList } = useSolmarkStore(
    useShallow((state) => ({
      setList: state.setList,
    }))
  );

  const handleClick = () => {
    setList(list);
    if (!isSolroute) {
      navigate(`/mark/place/list/${list.collectionId}`);
    } else {
      navigate(`/solroute/place/list/${list.collectionId}`);
    }
  };

  return (
    <div
      className='py-8 px-10 flex bg-white rounded-lg border-1 border-primary-200 items-center gap-10 button'
      onClick={handleClick}>
      <div className='w-40 h-40 p-8 bg-primary-50 rounded'>
        <img src={heartFill} alt='' />
      </div>
      <div>
        <p className='text-primary-950 text-sm font-bold'>
          {list.collectionName}
        </p>
        <p className='text-primary-600 text-xs'>장소 {list.placeCount}개</p>
      </div>
    </div>
  );
};

export default SolmarkPlaceListCard;
