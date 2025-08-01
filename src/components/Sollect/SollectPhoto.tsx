import React, { useState } from 'react';
import { SollectPhotoProps } from '../../interface';
import { useNavigate } from 'react-router-dom';
import SollectMark from './SollectMark';
import kebabWhite from '../../assets/kebabWhite.svg';
import EditDeletePopover from '../global/EditDeletePopover';
import { deleteSollect } from '../../api/sollectApi';
import { transformSollectDetailToWrite } from '../../utils/transformDetailToWrite';

type Props = SollectPhotoProps & {
  isMine?: boolean;
  horizontal?: boolean;
};

const SollectPhoto: React.FC<Props> = ({ sollect, isMine, horizontal }) => {
  const navigate = useNavigate();
  const [marked, setMarked] = useState(sollect.isMarked);
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    navigate(`/sollect/${sollect.sollectId}`);
  };

  // 쏠마크 마이페이지에서 사용
  const funcDelete = async () => {
    await deleteSollect(Number(sollect.sollectId));
    setShowMenu(false);
    location.reload();
  };

  const onEditClick = () => {
    transformSollectDetailToWrite(Number(sollect.sollectId));
    navigate('/sollect/write/');
  };

  return (
    <div
      onClick={handleClick}
      className='relative h-220 rounded-lg overflow-hidden flex flex-col justify-end shrink-0 button'
      style={{
        backgroundImage: `url(${sollect.thumbnailImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: horizontal ? '174px' : '',
      }}>
      {/* background */}
      <div className='bg-gradient-to-b from-black/0 to-black/75 absolute top-0 left-0 w-full h-full'></div>

      {/* Sollect Mark */}
      <div
        className='absolute top-8 right-8'
        onClick={(e) => e.stopPropagation()}>
        {isMine ? (
          <div className='relative'>
            <img
              src={kebabWhite}
              alt='kebab'
              className='w-24 h-24 button'
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <EditDeletePopover
                funcDelete={funcDelete}
                onEditClick={onEditClick}
              />
            )}
          </div>
        ) : (
          <SollectMark
            marked={marked}
            setMarked={setMarked}
            id={sollect.sollectId}
          />
        )}
      </div>

      <div className='p-20 z-1 text-white'>
        <p className='text-sm font-bold pb-4'>{sollect.title}</p>
        <p className='text-xs'>
          {sollect.district}, {sollect.neighborhood}
        </p>
      </div>
    </div>
  );
};

export default SollectPhoto;
