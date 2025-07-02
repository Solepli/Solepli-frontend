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
}

const IconAddButton: React.FC<IconAddButtonProps> = ({ initIcon, setSelectedIcon }) => {
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
        // 네이버 마커가 z-100이라 z-101로 설정해 마크를 가림
          className='fixed inset-0 z-101 flex justify-center' 
          style={{
            top: buttonRef.current
              ? buttonRef.current.getBoundingClientRect().bottom + 10
              : 0,
          }}
          onClick={() => setModalOpen(false)}>
          <SelectableIconSet setIcon={setIcon} />
        </div>
      )}
    </>
  );
};

export default IconAddButton;
