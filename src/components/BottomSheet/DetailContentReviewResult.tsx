import { ReviewType } from '../../types';
import Review from './Review/Review';
import ShowAllReviewsButton from './Review/ShowAllReviewsButton';

interface DetailContentReviewResultProps {
  reviews: ReviewType[];
}

const DetailContentReviewResult: React.FC<DetailContentReviewResultProps> = ({
  reviews,
}) => {
  return (
    <div>
      {reviews.map((review) => (
        <Review key={review.userNickname+review.createdAt} review={review} />
      ))}
      <ShowAllReviewsButton />
    </div>
  );
};

export default DetailContentReviewResult;
