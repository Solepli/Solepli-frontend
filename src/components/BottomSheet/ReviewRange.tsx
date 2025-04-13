import React from 'react';
import star from '../../assets/star.svg';

interface ReviewRangeProps {
  rating: number;
  recommend: number;
}

const ReviewRange: React.FC<ReviewRangeProps> = ({ rating, recommend }) => {
  return (
    <div className='px-16 pb-4'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-xs text-gray-900 font-medium mb-2'>
            {recommend}% 추천
          </p>

          {/* 바 */}
          <div className='w-130 h-6 relative bg-gray-200 rounded-tl-sm rounded-br-sm overflow-hidden'>
            <div
              className='absolute h-6 bg-green-400 rounded-br-sm'
              style={{ width: `${recommend}%` }}></div>
          </div>
        </div>

        {/* 별점 */}
        <div className='flex items-center pt-4'>
          <img src={star} alt='star' className='w-20 h-20' />
          <p className='text-xs text-black font-medium'>{rating}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewRange;
