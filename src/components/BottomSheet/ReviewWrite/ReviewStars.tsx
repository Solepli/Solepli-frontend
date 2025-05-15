import React from 'react';

import StarEmpty from '../../../assets/starEmpty.svg?react';
import StarFill from '../../../assets/starFill.svg?react';
import { useShallow } from 'zustand/shallow';
import useReviewWriteStore from '../../../store/useReviewWriteStore';

const ReviewStars: React.FC = () => {
  const { rating, setRating } = useReviewWriteStore(
    useShallow((state) => ({
      rating: state.rating,
      setRating: state.setRating,
    })),
  );
  return (
    <div className='self-stretch flex flex-row items-center justify-center gap-[2px]'>
      {Array.from({ length: 5 }).map((_, i) =>
        i <= rating ? (
          <StarFill
            key={i}
            onClick={() => setRating(i)}
          />
        ) : (
          <StarEmpty
            key={i}
            onClick={() => setRating(i)}
          />
        )
      )}
    </div>
  );
};

export default ReviewStars;
