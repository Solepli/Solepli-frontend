import React from 'react';
import { useSollectDetailStore } from '../../../store/sollectDetailStore';

const SollectDetailProfile = () => {
  const sollect = useSollectDetailStore();

  return (
    <div className='p-16 pt-20 flex gap-8'>
      <img
        src={sollect.profileImageUrl}
        alt=''
        className='w-36 h-36 rounded-full'
      />
      <div>
        <p className='text-primary-900 text-sm font-bold'>{sollect.nickname}</p>
        <p className='text-primary-400 text-xs'>
          {sollect.createdAt?.substring(0, 10).replace(/-/g, '.')}
        </p>
      </div>
    </div>
  );
};

export default SollectDetailProfile;
