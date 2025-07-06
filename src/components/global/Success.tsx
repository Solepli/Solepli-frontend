import React from 'react';
import success from '../../assets/success.svg';

const Success: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className='flex w-361 px-12 py-8 bg-primary-950 rounded-lg gap-4 items-center'>
      <img src={success} alt='' />
      <div className='flex-1 flex flex-col gap-2'>
        <span className='text-primary-50 text-sm font-semibold leading-tight'>
          {title}
        </span>
      </div>
    </div>
  );
};

export default Success;
