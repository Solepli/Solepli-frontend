import React, { useState } from 'react';
import { SollectPhotoProps } from '../../interface';
import { useNavigate } from 'react-router-dom';
import SollectMark from './SollectMark';
import kebabWhite from '../../assets/kebabWhite.svg';
import EditDeletePopover from '../global/EditDeletePopover';
import { deleteSollect } from '../../api/sollectApi';
import Modal from '../global/Modal';

type Props = SollectPhotoProps &{
  isMine?:boolean;
}

const SollectPhoto: React.FC<Props> = ({ sollect, isMine }) => {
  const navigate = useNavigate();
  const [marked, setMarked] = useState(sollect.isMarked);
  const [showMenu, setShowMenu] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClick = () => {
    navigate(`/sollect/${sollect.sollectId}`);
  };

  // 쏠마크 마이페이지에서 사용
    const clickDeleteModal = () => {
    setShowDeleteModal(true);
  };

    const onLeftClick = () => {
      setShowDeleteModal(false);
    };
  
    const onRightClick = async () => {
      setShowDeleteModal(false);
      await deleteSollect(Number(sollect.sollectId));
      setShowMenu(false);
      location.reload();
    };
  

  return (
    <div
      onClick={handleClick}
      className='relative w-174 h-220 rounded-lg overflow-hidden flex flex-col justify-end shrink-0'
      style={{
        backgroundImage: `url(${sollect.thumbnailImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
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
              className='w-24 h-24'
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <EditDeletePopover clickDeleteModal={clickDeleteModal} />
            )}
          </div>
        ) : (
          <SollectMark
            marked={marked}
            setMarked={setMarked}
            id={sollect.sollectId}
          />
        )}

        {showDeleteModal && (
            <Modal
              title='정말 삭제하시겠습니까?'
              subtitle='삭제하면 복구할 수 없어요!'
              leftText='취소'
              rightText='삭제'
              onLeftClick={onLeftClick}
              onRightClick={onRightClick}
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
