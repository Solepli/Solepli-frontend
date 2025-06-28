import React, { useState } from 'react';
import arrowTail from '../../../assets/arrowTail.svg';
import arrowTailWhite from '../../../assets/arrowTailWhite.svg';
import kebabWhite from '../../../assets/kebabWhite.svg';
import kebabGray from '../../../assets/kebabGray.svg';
import edit from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';

import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../global/Modal';
import { deleteSollect } from '../../../api/sollectApi';
import { useSollectDetailStore } from '../../../store/sollectDetailStore';

const SollectDetailHeader = ({ isTop }: { isTop: boolean }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {sollectId} = useParams();

  // TODO: 내 글인지 확인
  // const userId = localStorage.getItem('userId');
  // const {authorId} = useSollectDetailStore(); // 쏠렉트 상세 조회에서 받아오기
  // const mySollect = userId === authorId;
  const mySollect = true;

  const clickDeleteModal = () => {
    setShowDeleteModal(true);
  }
  const onLeftClick = () =>{
    setShowDeleteModal(false);
  }
  const onRightClick = ()=>{
    setShowDeleteModal(false);
    // delete
    // sollect id 응답으로 받아야함
    deleteSollect(Number(sollectId));
    navigate(-1);
  }


  return (
    <div
      className={`w-full h-54 flex justify-between items-center fixed z-10 px-9 ${isTop ? 'bg-transparent' : 'bg-white'} transition-colors duration-300`}>
      {/* 뒤로가기 */}
      <img
        src={isTop ? arrowTailWhite : arrowTail}
        alt='arrowTail'
        className='rotate-180 w-24 h-24'
        onClick={() => navigate(-1)}
      />

      {mySollect && (
        <div>
          {/* 메뉴 */}
          <img
            src={isTop ? kebabWhite : kebabGray}
            alt='kebab'
            className='w-24 h-24'
            onClick={() => setShowMenu(!showMenu)}
          />

          {showMenu && (
            <div
              className='absolute top-40 right-12 rounded-lg border-1 border-primary-100 bg-white w-136 shadow-[3px_3px_4px_0px_rgba(24,24,24,0.06)] text-primary-950
text-sm'>
              {/* 수정 */}
              <div className='p-12 flex gap-8 items-center border-b border-primary-100'>
                <img src={edit} alt='edit' />
                수정
              </div>
              {/* 삭제 */}
              <div
                className='p-12 flex gap-8 items-center'
                onClick={clickDeleteModal}>
                <img src={deleteIcon} alt='delete' />
                삭제
              </div>

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
          )}
        </div>
      )}
    </div>
  );
};

export default SollectDetailHeader;
