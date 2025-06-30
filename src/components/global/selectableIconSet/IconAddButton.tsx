import { useRef, useState } from 'react';
import AddButton from '../../../assets/addGray.svg?react';
import SelectableIconSet from './SelectableIconSet';

const IconAddButton: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className='w-28 h-28 p-2 bg-primary-50 rounded justify-center items-center'
        onClick={() => setModalOpen(true)}
        ref={buttonRef}>
        <AddButton />
      </div>

      {modalOpen && (
        <div
          className='fixed inset-0 z-50 flex justify-center'
          style={{
            top: buttonRef.current
              ? buttonRef.current.getBoundingClientRect().bottom + 10
              : 0,
          }}
          onClick={() => setModalOpen(false)}>
          <SelectableIconSet />
        </div>
      )}
    </>
  );
};

export default IconAddButton;
