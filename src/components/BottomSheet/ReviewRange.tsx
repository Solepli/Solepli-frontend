import React from 'react';
import star from '../../assets/starFill.svg';

interface ReviewRangeProps {
  rating: number;
  recommend: number;
  hasReviews: boolean;
}

const ReviewRange: React.FC<ReviewRangeProps> = ({
  rating,
  recommend,
  hasReviews,
}) => {
  return (
    <div className='px-16 pb-8'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-xs text-primary-900 font-medium mb-2'>
            {hasReviews ? `${recommend}% 추천` : '리뷰 없음'}
          </p>

          {/* 바 */}
          <div className='w-130 h-6 relative bg-primary-200 rounded-tl-sm rounded-br-sm overflow-hidden'>
            <div
              className='absolute h-6 bg-secondary-400 rounded-br-sm'
              style={{ width: `${recommend}%` }}></div>
          </div>
        </div>

        {/* 별점 */}
        <div className='flex items-center pt-4'>
          <img src={star} alt='star' className='w-20 h-20' />
          <p className='text-xs text-primary-900 font-medium'>
            {hasReviews ? rating?.toFixed(1) : '0.0'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewRange;
