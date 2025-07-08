import React from 'react';
import Compass from '../../assets/compass.svg?react';
import { ReloadMarkerButtonProps } from '../../interface';
import { MAX_Y } from '../../constants';
import { useBottomSheetStore } from '../../store/bottomSheetStore';

const ReloadMarkerButton: React.FC<ReloadMarkerButtonProps> = ({
  handleClick,
}) => {
  const { snap } = useBottomSheetStore();
  const isVisible = snap !== MAX_Y;

  return (
    <div
      style={{
        width: '100%',
        position: 'absolute',
        bottom: `${(snap || 0) + 6}px`,
        display: isVisible ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'bottom 0.2s ease-in-out',
      }}>
      <div
        className='inline-flex h-32 py-16 pr-12 pl-8 items-center shrink-0 rounded-[100px] bg-primary-50 shadow-[0px_0px_4px_0px_rgba(18,18,18,0.10)] gap-2'
        onClick={handleClick}>
        <div className='flex w-24 h-24 p-4 justify-center items-center'>
          <Compass />
        </div>
        <p className='text-primary-700 text-xs font-medium leading-[120%] tracking-[-0.18px]'>
          이 지역에서 검색
        </p>
      </div>
    </div>
  );
};

export default ReloadMarkerButton;
