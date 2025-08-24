import React from 'react';
import currentLocation from '../../assets/currentLocation.svg';
import { CurrentLocationButtonProps } from '../../interface';
import { useBottomSheetStore } from '../../store/bottomSheetStore';
import { MIN } from '../../constants';

const CurrentLocationButton: React.FC<CurrentLocationButtonProps> = ({
  handleClick,
}) => {
  const { snap } = useBottomSheetStore();
  const isVisible = snap !== MIN;

  return (
    <div
      className='w-30 h-30 bg-white rounded-full flex justify-center items-center right-14 shadow-[0px_0px_4px_0px_rgba(18,18,18,0.10)] button'
      style={{
        position: 'absolute',
        top: `${(snap || 0) - 45}px`,
        display: isVisible ? 'flex' : 'none',
        transition: 'bottom 0.2s ease-in-out',
      }}
      onClick={handleClick}>
      <img src={currentLocation} alt='currentLocation' className='w-24 h-24' />
    </div>
  );
};

export default CurrentLocationButton;
