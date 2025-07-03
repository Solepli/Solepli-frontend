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
          className={`fixed inset-0 z-101 ${
            //쏠루트일 때 window.innerWidth가 400px 작을 경우 모달을 가운데에 위치
            window.innerWidth < 400 ? 'flex justify-center' : ''
          }`}
          style={{
            top: (rect?.bottom ?? 0) + 10,
            //window.innerWidth가  400px보다 클 경우 모달 왼쪽을 + 버튼 왼쪽과  동일하게 설정
            left: window.innerWidth >= 400 ? rect?.left : undefined,
          }}
          onClick={() => setModalOpen(false)}>
          <SelectableIconSet setIcon={setIcon} />
        </div>
      )}
    </>
  );
};

export default IconAddButton;
