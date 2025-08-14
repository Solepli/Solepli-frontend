import { useState } from 'react';
import arrowTail from '../../../assets/arrowTail.svg';
import arrowTailWhite from '../../../assets/arrowTailWhite.svg';
import kebabWhite from '../../../assets/kebabWhite.svg';
import kebabGray from '../../../assets/kebabGray.svg';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteSollect } from '../../../api/sollectApi';
import EditDeletePopover from '../../global/EditDeletePopover';
import { useSollectDetailStore } from '../../../store/sollectDetailStore';
import { transformSollectDetailToWrite } from '../../../utils/transformDetailToWrite';

const SollectDetailHeader = ({ isTop }: { isTop: boolean }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { sollectId } = useParams();
  const location = useLocation();
  const to = location.state?.to || null;

  // 내 글인지 확인
  const userId = localStorage.getItem('userId');
  const { writerId } = useSollectDetailStore(); // 쏠렉트 상세 조회에서 받아오기
  const mySollect = Number(userId) === writerId;

  const funcDelete = () => {
    deleteSollect(Number(sollectId));
    navigate(-1);
  };

  const onEditClick = () => {
    transformSollectDetailToWrite(Number(sollectId));
    navigate('/sollect/write/');
  };

  const onBackClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className={`w-full h-50 py-4 flex justify-between items-center fixed z-70 ${isTop ? 'bg-transparent' : 'bg-white'} transition-colors duration-300`}>
      {/* 뒤로가기 */}
      <div
        className='flex w-42 h-42 justify-center items-center gap-10 shrink-0 button'
        onClick={onBackClick}>
        <img
          src={isTop ? arrowTailWhite : arrowTail}
          alt='arrowTail'
          className='rotate-180 w-24 h-24 shrink-0'
        />
      </div>

      {mySollect && (
        <div>
          <div className='flex w-42 h-42 justify-center items-center shrink-0'>
            {/* 메뉴 */}
            <img
              src={isTop ? kebabWhite : kebabGray}
              alt='kebab'
              className='flex w-24 h-24 px-4.5 justify-center items-center shrink-0 button'
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>

          {showMenu && (
            <EditDeletePopover
              funcDelete={funcDelete}
              onEditClick={onEditClick}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SollectDetailHeader;
