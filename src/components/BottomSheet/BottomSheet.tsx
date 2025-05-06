import React, { useEffect } from 'react';
import { usePlaceStore } from '../../store/placeStore';
import { places } from '../../places';

const BottomSheet: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const setPlaces = usePlaceStore((state)=>state.setPlaces);
  
  useEffect(()=>{
    console.log(places);
    setPlaces(places);
  });

  return (
    <div className='w-full h-450 bg-white rounded-t-xl flex flex-col z-1 fixed bottom-0 pb-50 shadow-[0_-1px_20px_rgba(0,0,0,0.1)]'>

      {/* Header */}
      <div className='flex justify-center py-8 items-center'>
        <div className='rounded-xl bg-primary-200 w-30 h-4'></div>
      </div>

      <div className='overflow-y-auto'>{children}</div>
    </div>
  );
};

export default BottomSheet;
