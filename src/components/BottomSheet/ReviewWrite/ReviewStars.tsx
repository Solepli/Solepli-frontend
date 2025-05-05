import React from 'react';

import starEmpty from '../../../assets/starEmpty.svg';

const ReviewStars: React.FC = () => {
  return (
    <div className='self-stretch flex flex-row items-center justify-center gap-[2px]'>
      {Array.from({ length: 5 }).map((_, i) => (
        <img
          className='p-[4px]'
          width='32'
          height='32'
          src={starEmpty}
          key={i}
        />
      ))}
    </div>
  );
};

export default ReviewStars;
