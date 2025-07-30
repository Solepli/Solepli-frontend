import React from 'react';

import StarEmpty from '../../../assets/starEmpty.svg?react';
import StarFillDark from '../../../assets/starFillDark.svg?react';
import { useShallow } from 'zustand/shallow';
import useReviewWriteStore from '../../../store/reviewWriteStore';

const ReviewStars: React.FC = () => {
  const { rating, setRating } = useReviewWriteStore(
    useShallow((state) => ({
      rating: state.rating,
      setRating: state.setRating,
    }))
  );
  return (
    <div className='self-stretch flex flex-row items-center justify-center gap-[2px] button'>
      {Array.from({ length: 5 }).map((_, i) =>
        i + 1 <= rating ? (
          <StarFillDark
            key={i}
            onClick={() => setRating(i + 1)}
            className='text-primary-900'
          />
        ) : (
          <StarEmpty key={i} onClick={() => setRating(i + 1)} />
        )
      )}
    </div>
  );
};

export default ReviewStars;
