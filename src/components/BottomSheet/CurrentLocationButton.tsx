import React from 'react';
import currentLocation from '../../assets/currentLocation.svg';
import { CurrentLocationButtonProps } from '../../interface';
import { useBottomSheetStore } from '../../store/bottomSheetStore';
import { MAX_Y } from '../../constants';

const CurrentLocationButton: React.FC<CurrentLocationButtonProps> = ({
  handleClick,
}) => {
  const { snap } = useBottomSheetStore();
  const isVisible = snap !== MAX_Y;

  return (
    <div
      className='w-30 h-30 bg-white rounded-full flex justify-center items-center right-14 shadow-[0px_0px_4px_0px_rgba(18,18,18,0.10)] button'
      style={{
        position: 'absolute',
        bottom: `${(snap || 0) + 6}px`,
        display: isVisible ? 'flex' : 'none',
        transition: 'bottom 0.2s ease-in-out',
      }}
      onClick={handleClick}>
      <img src={currentLocation} alt='currentLocation' className='w-24 h-24' />
    </div>
  );
};

export default CurrentLocationButton;
