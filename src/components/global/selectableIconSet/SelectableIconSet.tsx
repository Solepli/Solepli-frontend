import React from 'react';
import { selectableIconMap } from '../../../utils/icon';

interface SelectableIconSetProps {
  setIcon: (iconKey: number) => void;
  closeModal: (turn: boolean) => void;
}

const SelectableIconSet: React.FC<SelectableIconSetProps> = ({ setIcon, closeModal }) => {
  const onClickIcon = (iconKey: string) => {
    const iconNumber = parseInt(iconKey);
    setIcon(iconNumber);
  };
  return (
    <div
      className='w-373 h-124 p-16 grid grid-cols-7 gap-y-12 gap-x-10 justify-items-center bg-white rounded-lg 
    shadow-[3px_3px_4px_0px_rgba(24,24,24,0.06)] outline outline-1 outline-offset-[-1px] outline-primary-100'>
      {Object.entries(selectableIconMap).map(([key, Icon]) => (
        <div
          key={key}
          className='w-40 h-40 flex items-center justify-center bg-primary-50 rounded outline outline-1 outline-offset-[-1px] outline-primary-100'
          onClick={() => {closeModal(false); onClickIcon(key)}}>
          <Icon />
        </div>
      ))}
    </div>
  );
};

export default SelectableIconSet;
