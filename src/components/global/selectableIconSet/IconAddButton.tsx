import { useEffect, useRef, useState } from 'react';
import AddButton from '../../../assets/addGray.svg?react';
import SelectableIconSet from './SelectableIconSet';
import { selectableIconMap } from '../../../utils/icon';

const SelectedIcon: React.FC<{ icon: number }> = ({ icon }) => {
  const IconComponent = selectableIconMap[icon];
  return IconComponent ? <IconComponent /> : null;
};

interface IconAddButtonProps {
  initIcon: number | null;
  setSelectedIcon: (icon: number) => void;
  isSolroute?: boolean;
}

const IconAddButton: React.FC<IconAddButtonProps> = ({
  initIcon,
  setSelectedIcon,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [icon, setIcon] = useState<number | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  //초기 아이콘 값 설정
  useEffect(() => {
    setIcon(initIcon);
  }, [initIcon]);

  //아이콘이 변경될 경우
  useEffect(() => {
    if (!icon) return;
    setSelectedIcon(icon);
  }, [icon, setSelectedIcon]);

  const rect = buttonRef.current?.getBoundingClientRect();

  return (
    <>
      <div
        className='w-28 h-28 p-2 bg-primary-50 rounded justify-center items-center'
        onClick={() => setModalOpen(true)}
        ref={buttonRef}>
        {!icon ? <AddButton /> : <SelectedIcon icon={icon} />}
      </div>

      {modalOpen && (
        <div
          className={`fixed inset-0 z-101 ${window.innerWidth < 400 ? 'flex justify-center' : ''}`}
          onClick={() => setModalOpen(false)}>
          <div
            className='absolute'
            style={{
              top: (rect?.bottom ?? 0) + 10,
              left: window.innerWidth >= 400 ? rect?.left : undefined,
            }}
            onClick={(e) => e.stopPropagation()}>
            <SelectableIconSet setIcon={setIcon} closeModal={setModalOpen} />
          </div>
        </div>
      )}
    </>
  );
};

export default IconAddButton;
