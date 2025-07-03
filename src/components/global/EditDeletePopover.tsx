import React from 'react';
import edit from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';

type EditDeletePopoverProps = {
  clickDeleteModal: () => void;
};
const EditDeletePopover: React.FC<EditDeletePopoverProps> = ({
  clickDeleteModal,
}) => {
  const my = location.pathname.includes('/mark/my');
  return (
    <div
      className={`absolute top-${my ? '30' : '40'} right-4 rounded-lg border-1 border-primary-100 bg-white w-136 shadow-[3px_3px_4px_0px_rgba(24,24,24,0.06)] text-primary-950
text-sm`}>
      {/* 수정 */}
      <div className='p-12 flex gap-8 items-center border-b border-primary-100'>
        <img src={edit} alt='edit' />
        수정
      </div>
      {/* 삭제 */}
      <div className='p-12 flex gap-8 items-center' onClick={clickDeleteModal}>
        <img src={deleteIcon} alt='delete' />
        삭제
      </div>
    </div>
  );
};

export default EditDeletePopover;
